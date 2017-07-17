// Load the module dependencies
const passport = require('passport');
const url = require('url');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');
const users = require('../../controllers/users2.server.controller');

// Create the Facebook strategy configuration method
module.exports = function() {
	// Use the Passport's Facebook strategy
	passport.use(new FacebookStrategy({
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL,
			passReqToCallback: true,
      enableProof: true,
      profileFields: ['email']
		},
		(req, accessToken, refreshToken, profile, done) => {
			// Set the user's provider data and include tokens
			const providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
			const providerUserProfile = {
				provider: 'facebook',
				providerId: profile.id,
				providerData: providerData
			};

			console.log(providerUserProfile);
      let usuario = users.findUserByProviderId(providerUserProfile);

			if (!usuario) {
        usuario = users.saveOAuthUserProfile(providerUserProfile);
      }

      console.log(usuario);
      return done(null, usuario);
		}
	));
};
