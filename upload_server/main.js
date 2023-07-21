const express = require('express');
const fileUpload = require('express-fileupload'); // middleware pour des fichiers
const path = require('path'); // module natif de NodeJS
const fs = require('fs');

const app = express();
app.use(fileUpload({ limits: { fileSize: 1024 * 1024 }, abortOnLimit: true })); // Pas plus que 1MB
app.use("/", express.static('public')); // Contenu statique (notre page web)

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.files.file;
  // Construire le chemin dans le répertoire "uploads" dans la racine du projet
  const uploadPath = path.join(__dirname, 'uploads', file.name);

  fs.writeFile(uploadPath, file.data, (err) => {
    if (err) {
      console.error('Erreur de sauvegarde:', err);
      return res.status(500).send('Erreur de sauvegarde.');
    }

    // Sera interprété comme du HTML par le navigateur
    res.status(201).send(`<p>Le fichier "${file.name}" a été téléversé et sauvegardé</p>
    <a href="./">Retourner à la page principale</a>`);
  });
});

app.get('/upload/:name', async (req, res) => {
  const uploadPath = path.join(__dirname, 'uploads', req.params.name);
  try {
    await fs.promises.access(uploadPath);
    res.sendFile(uploadPath);
  }
  catch (e) {
    res.status(404).send('Fichier non trouvé');
  }
});
// On peut utiliser le middleware "static" si on n’a pas de logique de plus à faire
// app.use('/upload',express.static('uploads')); // Contenu du répertoire "uploads"


app.listen(3000, () => {
  console.log(`Serveur de fichiers disponible sur http://localhost:3000`);
});