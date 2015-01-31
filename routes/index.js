var express = require('express');
var router = express.Router();
var main = require('../controllers/main');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
    var result;
    result = main.run(req, res);
    result.value = result.value === Infinity ? "Win" : "Loss";
    res.json({result: result});
});

module.exports = router;
