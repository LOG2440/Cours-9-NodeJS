let express = require('express')
let http = require('http')

let app = express()

// On inclut nos middlware ici
app.use(express.json())
app.post("/home/:id", (req, res, next) => {
    console.log(req.params.id)
    console.log(req.body)
    console.log(req.query)
    res.cookie("id", req.params.id)
    res.set('Content-Type', 'text/plain')
    res.status(200).send(req.body)
})
   
http.createServer(app).listen(3000)