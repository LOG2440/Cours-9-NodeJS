# Serveurs web et NodeJS

`NodeJS` est un environnement d'exécution qui permet d'exécuter du code JS à l'extérieur d'un navigateur grâce à l'engin `V8`. NodeJS a un fonctionnement similaire à un navigateur et se base sur une boucle d'événements et des traitements asynchrones des actions normalement bloquantes : communication réseau, accès au système de fichiers, etc.

Par défaut, NodeJS utilise la syntaxe CJS pour la gestion des modules JS dans son code.


## Serveur HTTP natif

NodeJS peut être utilisé comme un serveur HTTP à l'aide de son module natif `http`. Sa syntaxe est cependant assez verbeuse et c'est plutôt rare d'utiliser NodeJS en tant que serveur HTTP sans une librairie externe. Les exemples dans cet entrepôt utilisent ExpressJS. Consultez la section [Librairie Express](#librairie-express) pour plus d'information.

Le répertoire [nodejs](./nodejs/) contient 2 exemples de serveurs HTTP utilisant le module natif `http`. Chaque serveur est créé avec la fonction `createServer(callback)` où `callback` est une fonction de rappel qui gère la logique de traitement des requêtes. Le serveur est par la suite démarré sur un port spécifique à l'aide de la fonction `listen(port)`.

Le fichier [server.js](./nodejs/server.js) est un exemple minimaliste d'un serveur HTTP qui répondre de la même manière à toute requête envoyée au serveur.

Le fichier [routing.js](./nodejs/routing.js) est un exemple d'un serveur qui peut gérer plusieurs "routes" et répond de manière différente en fonction du chemin ciblé par la requête envoyée.

## Librairie Express

La librarie [ExpressJS](https://expressjs.com/) est une librairie minimaliste qui permet de plus facilement gérer un serveur HTTP utilisant NodeJS.

Le répertoire [nodejs_express](./nodejs_express/) contient plusieurs exemples d'utilisation de la librairie. Notez que comme c'est une dépendance externe, vous devez l'installer à travers la commande `npm ci` dans chaque sous-répertoire qui l'utilise. Certains exemples peuvent utiliser d'autres dépendances externes qui seront aussi installés avec la même commande.

### Middlewares

Express se base sur la notion de `middleware` et une chaîne de middlewares. Chaque middleware est une fonction `(req,res,next)=>{...}` qui peut traiter la requête et réponse HTTP et, optionnellement, passer au prochain middleware avec la fonction `next()`.

L'exemple dans [example/server.js](./nodejs_express/example/server.js) est une démonstration de l'ajout de middlewares dans une chaîne de traitement. Notez que tous les middlewares, sauf le dernier, font appel à la fonction `next()`. Sans cet appel, la chaîne sera bloquée et les prochains middlewares ne seront jamais exécutés.

### Gestionnaires de Route

Un middleware est ajouté à la chaîne avec la fonction `use(path,callback)` ou une fonction plus spécifique qui indique la méthode HTTP de la requête à gérer. Il est donc possible de gérer des méthodes différentes sur la même route. Un middleware responsable d'une méthode HTTP spécifique s'appelle un **gestionnaire de route**.

À noter que la méthode `use()` a seulement besoin de détecter le début du chemin de la cible de la requête pour la traiter. Par exemple : `use("/abc),()=>{}` va capter les requêtes `GET /abc`, `POST /abc`, mais aussi `POST /abc/123`.

L'exemple dans [middleware_add/server.js](./nodejs_express/middleware_add/server.js) présente un exemple d'ajout de gestionnaires de routes de différentes types de requêtes HTTP (méthodes et cibles). Chaque réponse message qui contient la méthode et la cible de la requête ainsi que le type de gestionnaire qui a traité la requête.

Vous pouvez utiliser un outil comme `curl` ou l'extension `ThunderClient` de VSCode pour envoyer différentes requêtes à votre serveur et tester les gestionnaires. 

### Routes dynamiques, objets Requête et Réponse

Express permt de définir des routes dynamiques, ç.à.d une manière de définir un seul gestionnaire pour plusieurs chemins similaires. Ex : `/cours/:id` serait une route dynamique qui gère des requêtes comme `GET /cours/LOG2440` ou `GET /cours/INF1015` de la même manière.

La syntaxe `:var` permet d'extraire une partie du chemin de la requête et le sauvegarder comme une variable de l'attribut `params` de la requête. Il est également possible de récupérer les éléments de la _query_ de la requête à travers l'attribut `query` de la requête. Par exemple, la requête `POST /home/abc?x=12` peut être traitée avec le gestionnaire suivant :
```js
app.post("/home/:id", (req, res, next) => {
  console.log(req.params.id);
  console.log(req.query.x); 
});
``` 
Les objets `req` et `res` qui représentent la requête et la réponse HTTP peuvent être utilisés pour avoir accès à des informations supplémentaires sur la requête ou la réponse.

L'exemple dans [variables/server.js](./nodejs_express/variables/server.js) présente un exemple de gestion d'une requête HTTP `POST` : l'extraction des données de la requête et la configuration de la réponse. Le middleware `express.json` est utilisé avant le gestionnaire de la route pour permettre d'avoir accès à un objet `body` sur l'objet `req` et traiter le contenu de la requête.

### Routage

Express permet de grouper plusieurs gestionnaires de routes ayant le même préfixe ensemble à l'aide d'un _Router_. 
Ceci permet d'isoler et grouper des routes communes ensemble et éviter à devoir mettre tout le code de votre serveur dans le même fichier.

L'exemple dans [routing/server.js](./nodejs_express/routing/server.js) présente un exemple d'utilisation de routeur Express. La configuration du routeur est dans le fichier [routes.js](./nodejs_express/routing/routes.js) et le routeur est attaché à l'application Express à l'aide de la méthode `use` : 
```js
const routes = require('./routes');
const app = express();
app.use('/myRouter', routes);
```

### Formulaire

Express permet de traiter des formulaires soumis à un serveur HTTP grâce au middleware `urlencoded` qui permet de décoder le contenu du formulaire en se basant sur l'attribut `name` des champs de saisie du formulaire. À noter que si le formulaire a un encodage différent, ex :`multipart/form-data`, un autre middleware serait nécessaire.

L'exemple dans [form/server.js](./nodejs_express/form/server.js) présente un exemple d'un traitement d'un formulaire de commentaires envoyé par l'élément `<form>` de [index.html](./nodejs_express/form/index.html). Le contenu du formulaire est transformé en objet JS et ajouté à un tableau d'objets accessible sur le chemin `/comments`.

Le comportement par défaut d'une page web après la soumission d'un formulaire est d'afficher le contenu de la réponse HTTP de la soumission. Ceci a pour effet de rafraichir la page web à moins d'arrêter se comportement en gérant l'événement `submit` dans le code du client. L'approche alternative utilisé dans cet exemple est de rediriger le client vers la route `/comments` et afficher la liste des commentaires.

### Temoins (_Cookie_)

Express permet de gérer les témoins (_cookies_) HTTP. On peut créer ou trairer des cookies déjà existants. 

Express offre un type de cookie spécialisé : un cookie signé. Ce cookie est généré à l'aide du middleware `cookie-parser` et un code secret. Si le client modifie le cookie signé et l'envoie au serveur, le middleware peut détecter ce changement et agir en conséquence.

L'exemple dans [cookies/server.js](./nodejs_express/cookies/server.js) présente un exemple d'utilisation de cookies réguliers et signés. Si un utilisateur accède au chemin `/`, il se fait assigner un cookie normal et un cookie signé. Si l'utilisateur accède au chemin `/about` sans le cookie signé ou avec un cookie signé modifié, le serveur enverra un message différent. Vous pouvez le tester en modifiant le cookie signé directement dans les outils de développement de votre navigateur après l'avoir obtenu une première fois.

## Accès au système de fichiers

NodeJS permet d'accéder directement au système de fichiers, contrairement à un navigateur. Cet accès se fait à l'aide du module natif `fs` (File System). Par défaut, l'accès au système de fichiers se fait de manière asynchrone.

Les exemples dans [fs/base](./fs/base) présentent 2 manières différentes d'intéragir avec le système de fichiers. Le fichier [fs_callback.js](./fs/base/fs_callback.js) utilise les fonctions asynchrones avec des fonctions de rappels. Le fichier [fs_promise.js](./fs/base/fs_promise.js) utilise la syntaxe `async`/`await`.

Dans les deux cas, la séquence d'actions est la même :
- Lire ["file1.txt"](./fs/base/file1.txt) dont le contenu est "file2.txt"
- Créer un fichier dont le nom est "file2.txt" et le contenu étant un chiffre aléatoire
- Lire le 2e fichier et afficher le contenu dans la console
- Supprimer le 2e fichier

## Exemple récapitulatif

Le répertoire [upload_server](./upload_server/) présente un exemple récapitulatif qui combine plusieurs des éléments présentés dans les sections plus haut. Consultez le fichier [README](./upload_server/README.MD) pour plus d'informations sur l'exemple.