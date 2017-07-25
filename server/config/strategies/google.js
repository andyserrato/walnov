// Load the module dependencies
const passport = require('passport');
const url = require('url');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config');
const mongoose = require('mongoose');
const User = mongoose.model('usuarios');

// Create the Google strategy configuration method
module.exports = function() {
	// Use the Passport's Google strategy
	passport.use(new GoogleStrategy({
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
			callbackURL: config.google.callbackURL,
			passReqToCallback: true
		},
		(req, accessToken, refreshToken, profile, done) => {
			// Set the user's provider data and include tokens
			const providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			console.log(providerData);

			// Create the user OAuth profile
			const providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				fullName: profile.displayName,
        email: (profile.hasOwnProperty('emails')) ? profile.emails[0].value : '',
				username: profile.username,
				provider: 'google',
				providerId: profile.id,
				providerData: providerData
			};

      usuario = new User();
      usuario.providers.push({
        provider: 'google',
        providerId: profile.id,
        providerData: providerData
      });

      usuario.findByUserProviderId(function (err, userResult) {
        if (err) {
          done(err);
        } else if (userResult) {
          done(err);
        } else if (!userResult) {
          usuario.save(function (err, usuarioGuardado) {
            if (err) {
              done(err);
            }
            done(null, usuarioGuardado);
          })
        }
      });
		}
	));
};
