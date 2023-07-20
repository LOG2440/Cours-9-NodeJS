let express = require('express')
let http = require('http')

let app = express()

// On inclut nos middlware ici
app.use(monPremierMiddleware)
app.use((req, res, next) => res.envoyerAllo())

function monPremierMiddleware(req, res, next) {
    res.envoyerAllo = () => res.send('Allo tout le monde')
    next()
}
   
http.createServer(app).listen(3000)