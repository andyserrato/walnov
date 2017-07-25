// Load the module dependencies
const passport = require('passport');
const url = require('url');
const mongoose = require('mongoose');
const User = mongoose.model('usuarios');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../config');
const users = require('../../controllers/users2.server.controller');

// Create the Twitter strategy configuration method
module.exports = function () {
  // Use the Passport's Twitter strategy
  passport.use(new TwitterStrategy({
      consumerKey: config.twitter.clientID,
      consumerSecret: config.twitter.clientSecret,
      callbackURL: config.twitter.callbackURL,
      passReqToCallback: true
    }, (req, token, tokenSecret, profile, cb) => {
      // Set the user's provider data and include tokens
      const providerData = profile._json;
      providerData.token = token;
      providerData.tokenSecret = tokenSecret;

      console.log(providerData);

      // Create the user OAuth profile
      const providerUserProfile = {
        fullName: profile.displayName,
        username: profile.username,
        provider: 'twitter',
        providerId: profile.id,
        providerData: providerData
      };

      usuario = new User();
      usuario.providers.push({
        provider: 'twitter',
        providerId: profile.id,
        providerData: providerData
      });

      usuario.findByUserProviderId(function (err, userResult) {
        if (err) {
          console.log('Error');
          return cb(err,null);
        } else if (userResult) {
          console.log(userResult);
          console.log('He Encontrado uno');
          req.session.user = userResult;
          return cb(err, userResult)
        } else if (!userResult) {
          usuario.save(function (err, usuarioGuardado) {
            if (err) {
              return cb(err,usuarioGuardado);
            }
            req.session.user = userResult;
            return cb(null, usuarioGuardado);
          })
        }
      });
    }
  ));
};
