const express = require("express");
const router = express.Router();

const products = [{ id: 1, name: "ABC", price: 999.99 }, { id: 2, name: "XYZ", price: 499.99 }, { id: 3, name: "DEF", price: 199.99 }];

router.get("/", (req, res) => res.json(products));

router.get("/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    res.status(product ? 200 : 404).json(product);
});

router.delete("/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        products.splice(products.indexOf(product), 1);
        return res.sendStatus(204);
    }
    res.status(404).json({ message: "Product not found" });
});

module.exports = router;