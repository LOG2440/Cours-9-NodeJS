# Exemple récapitulatif

Ce répertoire contient un exemple qui couvre une grande partie des notions vues dans le cours dans un seul projet : NodeJs, Express et ses middlewares, requêtes HTTP, accès au disque et gestion des erreurs.

## Mise en garde

Cet exemple a pour but de montrer le plus de notions en même temps d'une manière concise à des fins académiques seulement. L'approche utilisée n'est pas sécure et ne devrait pas être utilisée pour un projet en production disponible publiquement sur le Web.

Lorsque vous traitez des fichiers et des informations sensibles, l'accès devrait être géré par un mécanisme quelconque : mot de passe, cookie, JWT ou tout autre mécanisme. De plus, votre serveur de fichiers ne devrait pas être directement exposé au public, mais plutôt derrière un serveur de proxy qui gère l'accès au serveur.

## Installation des dépendances et lancement du serveur

Vous avez besoin d'installer les dépendances avec la commande `npm ci`.

Vous pouvez lancer le serveur sur le port `3000` avec la commande `npm start`.

## Gestionnaire de fichiers

Le projet est un simple serveur qui permet à un utilisater de téléverser un fichier qui sera sauvegardé sur disque. Par la suite, l'utilisateur peut accéder aux fichiers sauvegardés à travers une route dynamique.

Si vous naviguez sur `localhost:3000`, vous allez accéder à la page [`index.html`](./public/index.html) qui vous permet d'ajouter un fichier et le téléverser vers le serveur à l'aide d'une requête `POST /upload` dont le corps contient le formulaire dans un objet `FormData`. Si l'opération est réussie, vous aurez un lien pour naviguer sur la page principale.

Si vous naviguez sur `localhost:3000/upload/{fileName}`, vous pouvez récupérer le fichier `{fileName}` s'il existe. Le fichier s'affichera sur la page web, si le fichier est lisible par le navigateur (texte, pdf, image, etc.). 

## Middlewares Express

### Serveur statique

Le serveur joue le rôle de serveur statique qui sert une page web [`index.html`](./public/index.html) contenant le formulaire de fichier à soumettre à travers une requête POST directement dans le code HTML. On utilise le middleware `static` d'Express avec un répertoire racine : 
```js
app.use("/", express.static('public')); 
```

Chaque requête `GET {fileName}` se fait répondre par le fichier `public/{fileName}`, si le fichier existe. Par défaut, `GET /` est traitée comme `GET index.html`.

### Serveur dynamique

Le serveur joue également le rôle d'un serveur dynamique qui permet de téléverser et récupérer un fichier à travers des requêtes HTTP. On utilise le middleware [express-fileupload](https://github.com/richardgirges/express-fileupload/blob/master/README.md) pour gérer les fichiers dans le formulaire soumis avec le type `multipart/form-data` :
```js
app.use(fileUpload({ 
    limits: { fileSize: 1024 * 1024 }, 
    abortOnLimit: true 
    })
); 
```
Cette configuration limite la taille des fichiers envoyés à `1MB`. Tout fichier plus grand que cette taille maximiale sera refusé et une réponse `413 Payload Too Large` sera envoyée.

Ce middleware permet d'ajouter une propriété `files` à l'objet `body` de la requête qui contient le ou les fichiers dans la `FormData` soumise :
```js
if (!req.files || !req.files.file) {
    return res.status(400).send('No file uploaded.');
}

const file = req.files.file;
```
Ici, le fichier est récupéré à partir de `req.files.file` puisqu'on a nommé l'élément `input` du formulaire `file`.

## Routes Express et route dynamique

La route `POST /upload` est une route Express statique qui permet d'envoyer un fichier à sauvegarder par le serveur. Notez que cette route doit être définie après le middleware `express-fileupload` puisque'elle utilise l'objet `files` qui est créé par le middleware avant de passer au gestionnaire de route.

La route `GET /upload:name` est une route Express dynamique qui permet de récupérer un fichier en fonction de son nom (paramètre `name` dans la requête), s'il existe.

Une requête `GET /upload/:name` sera possible seulement si l'origine est une page servie du serveur puisque `CORS` n'est pas activé. La soumission d'un formulaire est considérée comme une `requête simple` et n'est pas soumise à la politique `CORS`. 

Notez que la gestion de lecture du fichier peut être remplacée par le middleware `static` si on n'a pas besoin de logique autre que la récupération du fichier :
```js
app.use('/upload',express.static('uploads'))
```

## Utilisation du système de fichiers

Le serveur écrit et lit les fichiers sur le disque de la machine à l'aide du module `fs`. Le projet contient les 2 notations possibles pour les fonctions asynchrones :

Fonctions de rappel dans la route `POST /upload` :
```js
fs.writeFile(uploadPath, file.data, (err) => { ... });
```

Syntaxe `async`/`await` dans la route `GET /upload:name` :
```js
async (req, res) => {
  try {
    await fs.promises.access(uploadPath);
    res.sendFile(uploadPath);
  }
  catch (e) {
    res.status(404).send('Fichier non trouvé');
  }
}
```

## Codes de retour HTTP

Les différentes requêtes et situations retournent différents codes de retour suivant la sémantique du protocole HTTP. Voici les différents codes retournes :

| Situation                    | Code de retour            |
| ---------------------------- | ------------------------- |
| **Téléversement de fichier** |                           |
| Pas de fichier envoyé        | **400** Bad Request       |
| Fichier trop grand           | **413** Payload Too Large |
| Erreur de sauvegarde         | **500** Server Error      |
| Fichier sauvegardé           | **201** Created           |
| **Récupération de fichier**  |                           |
| Fichier récupéré             | **200** OK                |
| Fichier non trouvé           | **404** Not Found         |
