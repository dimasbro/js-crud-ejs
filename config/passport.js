const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');

module.exports = function(passport) {
    passport.use(new LocalStrategy(function verify(email, password, cb) {
        User.findOne({email: email}).then(user=>{
            if (user) {
              if (bcrypt.compareSync(password,user.password)) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'password salah' });
              }
            } else {
                return done(null, false, { message: 'email belum terdaftar' });
            }
        });
      }));

      passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
          });
        });
      });
      
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });
}