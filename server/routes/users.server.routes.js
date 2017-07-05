// Load the module dependencies
const users = require('../controllers/users2.server.controller');
const passport = require('passport');
const User = require('mongoose').model('usuarios');
// Define the routes module' method
module.exports = function(app) {
  // Set up the 'signup' routes
  app.route('/auth/signup').post(users.signup);

  // Set up the 'signin' routes
  app.route('/auth/signin').post(users.signin);

  // Set up the 'signout' route
  app.route('/auth/signout').get(users.signout);

  // Obtiene los datos del usuario
  app.get('/oauth/userdata', users.isLoggedIn, users.findUserByProviderId);

  // Set up the Facebook OAuth routes
  app.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }));
  app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin',
    successRedirect: '/'
  }));

  // Set up the Twitter OAuth routes
  app.get('/oauth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }));
  app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin',
    successRedirect: '/inicio'
  }));

  // Set up the Google OAuth routes
  app.get('/oauth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    failureRedirect: '/signin'
  }));
  app.get('/oauth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin',
    successRedirect: '/'
  }));
};
