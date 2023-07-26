const express = require('express');
const routes = require('./routes');
const app = express();

app.use('/myRouter', routes);

app.listen(3000);