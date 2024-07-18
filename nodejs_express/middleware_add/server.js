const express = require('express');
const http = require('http');
const app = express();

function handleRequest(req, res, httpMethod) {
    const message = `Requête ${req.method} reçue sur ${req.originalUrl} et capté par ${httpMethod}`;
    console.log(message);
    res.send(message);
}
// On inclut nos middlware ici
app.get("/", (req, res) => { handleRequest(req, res, 'GET') });
app.post("/cours", (req, res) => { handleRequest(req, res, 'POST') });
app.put("/cours", (req, res) => { handleRequest(req, res, 'PUT') });
app.delete("/cours", (req, res) => { handleRequest(req, res, 'DELETE') });
app.use("/cours", (req, res) => { handleRequest(req, res, 'USE') });
app.all("/cours/gigl", (req, res) => { handleRequest(req, res, 'ALL') });

http.createServer(app).listen(3000);
console.log('Serveur avec Express démarré sur localhost:3000');