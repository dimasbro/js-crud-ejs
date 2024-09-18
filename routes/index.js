var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('welcome', { title: 'Halaman welcome' });
});

router.get('/dashboard', function(req, res, next){
  res.render('dashboard', { title: 'Halaman dashboard' });
})

module.exports = router;
