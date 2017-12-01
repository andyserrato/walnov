const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('usuarios');
const Biblioteca = mongoose.model('Biblioteca');

module.exports = function() {
  passport.use(new LocalStrategy((login, password, done) => {

    User.findOne({'login': login },
      (err, user) => {
        if (err) {
          return done(err);
        }

        if (user && user.activo === false) {
          return done(null, false, { success: false,
                                      message: 'Oops! tu cuenta no se encuentra activa, revisa tu email',
                                      error: 'Oops! tu cuenta no se encuentra activa, revisa tu email'});
        }

        if (!user) {
          return done(null, false, {
            success: false,
            message: 'Oops! no recuerdo ese nombre de usuario verifica que está bien escrito',
            error: 'Oops! no recuerdo ese nombre de usuario verifica que está bien escrito'});
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            success: false,
            message: 'Woow! contraseña inválida',
            error: 'Woow! contraseña inválida'
          });
        }
        return done(null, user);
    });
  }));
};
