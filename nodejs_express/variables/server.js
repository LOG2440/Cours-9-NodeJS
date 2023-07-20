const express = require("express");
const http = require("http");
const app = express();

// On inclut nos middlware ici
app.use(express.json());
app.post("/home/:id", (req, res, next) => {
  console.log(req.params.id);
  console.log(req.query.x);
  console.log(req.body);
  console.log(req.query);
  res.cookie("id", req.params.id);
  res.set("Content-Type", "application/json");
  res.status(201).send({...req.body, random : Math.random()});
});

http.createServer(app).listen(3000);
console.log('Serveur avec Express démarré sur localhost:3000');