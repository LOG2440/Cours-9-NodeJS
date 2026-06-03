const express = require("express");
const router = express.Router();

const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }];

router.get("/", (req, res) => res.json(users));

router.get("/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    res.status(user ? 200 : 404).json(user);
});

router.post("/", (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json({ newUser });
});

module.exports = router;