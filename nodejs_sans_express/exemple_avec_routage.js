let http = require('http');
let url = require('url');

http.createServer(function(req,res){
    // On décompose la requête
    let r = url.parse(req.url,true);
    let path = r.pathname;
    let query = r.query;

    switch(path) {
    case '/':
        res.writeHead(200, {'Content-Type': 'text/plain;' });
        res.end('Page principale');
        break;
    default:
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Désolé. Cette page n\'existe pas');
        break;
    }
}).listen(3000);
   