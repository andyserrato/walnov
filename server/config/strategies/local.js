const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('usuarios');
const bcrypt = require('bcryptjs');

module.exports = function() {
  passport.use(new LocalStrategy((username, password, done) => {

    User.findOne({'username': username },
      (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: 'Unknown user' });
        }

        if (!user.password === password) {
          return done(null, false, {
            message: 'Invalid password'
          });
        }

        return done(null, user);
    });
  }));
};
