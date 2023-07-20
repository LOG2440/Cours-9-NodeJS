const router = require("express").Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("Page accueil");
});
router.get("/about", (req, res, next) => {
  res.send("Page à propos");
});

router.get("/:id", (req, res, next) => {
  const message = `Vous avez envoyé : ${req.params.id}`;
  console.log(message);
  res.send(message);
});

module.exports = router;
