const express = require('express');
const http = require('http');
const app = express();

function firstMiddleware(req, res, next) {
    res.envoyerAllo = () => res.send('Allo tout le monde');
    next();
}
function lastMiddleware(req, res) {
    console.log(`Requête vers ${req.originalUrl} répondue avec ${res.statusCode}`);
};

// On inclut nos middlwares ici
app.use(firstMiddleware);
app.use((req, res, next) => {
    res.envoyerAllo();
    next();
});
app.use(lastMiddleware);

http.createServer(app).listen(3000);
console.log('Serveur avec Express démarré sur localhost:3000');
