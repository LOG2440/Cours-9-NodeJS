let express = require('express');
let routes = require('./routes');

let app = express();

app.use('/monRouteur', routes);

app.listen(3000);