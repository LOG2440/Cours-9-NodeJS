const express = require('express')

const app = express()

app.use(express.urlencoded(
  { extended: true }))
app.use(express.json())

const commentaires = []

app.post('/commentaires', (req, res) => {
  const auteur = req.body.auteur
  const commentaire = req.body.commentaire
  commentaires.push({auteur, commentaire})
  res.redirect('/commentaires')
})

app.get('/commentaires', (req, res) => {
  res.json(commentaires)
})

app.listen(3000)