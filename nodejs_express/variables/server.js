const express = require("express");
const http = require("http");
const app = express();

// On inclut nos middlware ici
app.use(express.json());
app.post("/home/:id", (req, res, next) => {
  console.log(`param id : ${req.params.id}`);
  console.log(`query x : ${req.query.x}`);
  console.log(`request body :`, req.body);
  console.log(`request query :`, req.query);
  console.log(`user agent header : `, req.get('user-agent'));
  res.cookie("id", req.params.id);
  res.set("Content-Type", "application/json");
  res.status(201).send({ ...req.body, random: Math.random() });
});

http.createServer(app).listen(3000);
console.log('Serveur avec Express démarré sur localhost:3000');