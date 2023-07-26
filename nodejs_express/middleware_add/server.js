const express = require('express');
const http = require('http');
const app = express();

function handleRequest(req, res, handler) {
    const message = `Requête ${req.method} reçue sur ${req.originalUrl} et capté par ${handler}`;
    console.log(message);
    res.send(message);
}
// On inclut nos middlware ici
app.get("/", (req, res, next) => { handleRequest(req, res, 'get') });
app.post("/cours", (req, res, next) => { handleRequest(req, res, 'post') });
app.put("/cours", (req, res, next) => { handleRequest(req, res, 'put') });
app.delete("/cours", (req, res, next) => { handleRequest(req, res, 'delete') });
app.use("/cours", (req, res, next) => { handleRequest(req, res, 'use') });
app.all("/cours/gigl", (req, res, next) => { handleRequest(req, res, 'all') });

http.createServer(app).listen(3000);
console.log('Serveur avec Express démarré sur localhost:3000');