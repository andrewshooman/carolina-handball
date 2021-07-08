var express = require('express');
var router = express.Router();

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// exports.index = function(req, res){
//   res.render('index', { title: 'ejs' });};

module.exports = router;
