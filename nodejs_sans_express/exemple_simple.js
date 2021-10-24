let http = require('http');

let serveur =
  http.createServer((req, res)=>{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!');
  })

serveur.listen(3000);

console.log('Serveur démarré sur localhost:3000');
