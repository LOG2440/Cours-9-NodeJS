const express = require('express');
const app = express();

// Généralement le secret est un code hexadécimal complexe
app.use(require('cookie-parser')('mon secret'));

app.get('/', function (req, res) {
    res.cookie('contenuNonSigne', 'John Lewis');
    res.cookie('contenuSigne', 'John Coltrane', { signed: true });
    res.send({ 'genre': 'Jazz' });
});

app.get('/about', function (req, res) {
    if (!req.signedCookies.contenuSigne) {
        res.send('ATTENTION : cookie signé invalide');
        return;
    }
    res.send({
        'contenuCookieNonSigne': req.cookies.contenuNonSigne,
        'contenuCookieSigne': req.signedCookies.contenuSigne
    });
});

app.listen(3000);
console.log('Serveur de cookies démarré sur localhost:3000');