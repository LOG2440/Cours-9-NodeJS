const express = require('express');
const http = require('http');
const app = express();

function firstMiddleware(req, res, next) {
    if(req.get('X-Auth')==='123') return next();
    res.status(401).send('Accès refusé');
}

function lastMiddleware(req, res) {
    console.log(`Requête vers ${req.originalUrl} répondue avec ${res.statusCode}`);
};

// On inclut nos middlwares ici
app.use(firstMiddleware);
app.use((req, res, next) => {
    res.send('Allo tout le monde');
    next();
});
app.use(lastMiddleware);

http.createServer(app).listen(3000);
console.log('Serveur avec Express démarré sur localhost:3000');
