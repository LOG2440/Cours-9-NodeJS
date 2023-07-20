let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("Page accueil");
});
router.get("/about", (req, res, next) => {
  res.send("Page à propos");
  next();
});

router.get("/:id", (req, res, next) => {
  console.log(`Vous avez envoyé : ${req.params.id}`);
});

module.exports = router;
