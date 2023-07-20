let express = require('express')
let http = require('http')

let app = express()

// On inclut nos middlware ici
app.get("/", () => {})
app.post("/cours", () => {})
app.put("/cours", () => {})
app.delete("/cours", () => {})
app.all("/cours/gigl", () => {})
app.use("/cours", () => {})
   
http.createServer(app).listen(3000)