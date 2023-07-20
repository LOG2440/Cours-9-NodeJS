const express = require('express');
const path = require('path');
const app = express();

// Permet de lire le contenu du corps
app.use(express.urlencoded(
  { extended: true })
);

const comments = [];

// Récupère la page HTML avec le formulaire
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/comments', (req, res) => {
  // On se base sur l'attribut "name" des inputs du formulaire
  const author = req.body.author;
  const comment = req.body.comment;
  comments.push({ author, comment })
  // Le comportement par défaut d'un form est d'aller sur le lien de l'action
  res.status(201).redirect('/comments');
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.listen(3000);
console.log('Serveur gestionnaire de formulaires démarré sur localhost:3000');
