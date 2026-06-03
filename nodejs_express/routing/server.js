const express = require('express');
const usersRouter = require("./users");
const productsRouter = require("./products");
const app = express();

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));