const http = require("http");
const url = require("url");

http
  .createServer(function (req, res) {
    // On décompose la requête
    const r = url.parse(req.url, true);
    const path = r.pathname;
    const query = r.query;
    switch (path) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/plain;" });
        res.end("Page principale");
        break;
      case "/about":
        res.writeHead(200, { "Content-Type": "text/plain;" });
        res.end("Page d'information");
        break;
      case "/data":
        res.writeHead(200, { "Content-Type": "text/plain;" });
        const data = query.message ? query.message : "rien";
        res.end(`Vous avez envoye : ${data}`);
        break;
      case "/add":
        res.writeHead(200, { "Content-Type": "text/plain;" });
        res.end(`Vous avez envoye : ${parseInt(query.a) + parseInt(query.b)}`);
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Désolé. Cette page n'existe pas");
        break;
    }
  })
  .listen(3000);
