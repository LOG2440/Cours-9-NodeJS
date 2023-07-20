const http = require("http");
const url = require("url");

http.createServer(function (req, res) {
    // On décompose la requête
    const fullURL = url.parse(req.url, true);
    const path = fullURL.pathname;
    const query = fullURL.query;

    res.writeHead(200, { "Content-Type": "text/plain;" });
    switch (path) {
      case "/":
        res.end("Page principale");
        break;
      case "/about":
        res.end("Page d'information");
        break;
      case "/data":
        const data = query.message ? query.message : "rien";
        res.end(`Vous avez envoye : ${data}`);
        break;
      case "/add":
        const sum = 0; // TODO
        res.end(`La somme est : ${sum}`);
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Désolé. Cette page n'existe pas");
        break;
    }
  })
  .listen(3000);

console.log('Serveur avec routage démarré sur localhost:3000');
