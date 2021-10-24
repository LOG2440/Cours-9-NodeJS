let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Page accueil')
});
router.get('/about', (req, res, next) => {
    res.send('Page à propos')
});

module.exports = router;