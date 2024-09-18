var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/UserSchema')

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Halaman login'});
});

router.post('/login', function(req, res){
  const {email, password} = req.body;

  let errors = [];
  if (!email || !password ) {
    errors.push({msg: 'silahkan lengkapi data'});
    console.log('silahkan lengkapi data');
  }

  if (errors.length > 0) {
    res.render('login', {
      errors,
      email,
      password
    })
  } else {
    User.findOne({email: email}).then(user=>{
      if (user) {
        if (bcrypt.compareSync(password,user.password)) {
          res.redirect('/dashboard');
        } else {
          errors.push({msg: 'password tidak sama'});
          res.render('login', {
            errors
          });
        }
      } else {
        errors.push({msg: 'email belum terdaftar'});
        res.render('login', {
          errors
        });
      }
    });
  }
});

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Halaman register'});
});

router.post('/register', function(req, res) {
  const {name, email, password, password2} = req.body;

  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({msg: 'silahkan lengkapi data'});
    console.log('silahkan lengkapi data');
  }
  if (password != password2) {
    errors.push({msg:'password tidak sama'});
    console.log('password tidak sama');
  }
  
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({email: email}).then(
      user => {
        if (user) {
          console.log('email sudah ada')
          errors.push({msg:'email sudah ada'})
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          newUser.save().then(user => {
            console.log('berhasil registrasi')
            res.redirect('/auth/login')
          }).catch(err => console.log(err))
        }
    })
  }
});

router.get('/logout', function(req, res){
  res.redirect('/');
});

module.exports = router;
