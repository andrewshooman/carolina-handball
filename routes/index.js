var express = require('express');
var router = express.Router();

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/twitter', function(req, res, next) {
  res.render('twitter', { title: 'Express' });
});

router.get('/sponsors', function(req, res, next) {
  res.render('sponsors', { title: 'Express' });
});

router.get('/tournaments', function(req, res, next) {
  res.render('tournaments', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// exports.index = function(req, res){
//   res.render('index', { title: 'ejs' });};

module.exports = router;
