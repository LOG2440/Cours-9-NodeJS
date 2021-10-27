const express = require('express')
const app = express()

app.use(require('cookie-parser')('mon secret'));

app.get('/', function(req, res) {
    res.cookie('contenuNonSigne', 'John Lewis');
    res.cookie('contenuSigne', 'John Coltrane', { signed: true });
    res.send({'genre': 'Jazz'});
});

app.get('/about', function(req, res) {
    res.send({'contenuCookieNonSigne':req.cookies.contenuNonSigne,
               'contenuCookieSigne':req.signedCookies.contenuSigne});
});

app.listen(3000)
