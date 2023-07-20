const express = require('express');
const fileUpload = require('express-fileupload'); // middleware pour des fichiers
const path = require('path');
const fs = require('fs');

const app = express();
app.use(fileUpload({ limits: 1024 * 1024 })); // Pas plus que 1MB
app.use(express.static('public')); // Contenu statique (notre page web)

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
    res.send(`<p>Le fichier "${file.name}" a été téléversé et sauvegardé</p>
    <a href="./">Retourner à la page principale</a>`);
  });
});

app.listen(3000, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});