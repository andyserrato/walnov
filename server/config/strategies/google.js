// Load the module dependencies
const passport = require('passport');
const url = require('url');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config');
const mongoose = require('mongoose');
const User = mongoose.model('usuarios');
const Biblioteca = mongoose.model('Biblioteca');
const Constantes = require("../../constantes/constantes");

// Create the Google strategy configuration method
module.exports = function() {
	// Use the Passport's Google strategy
	passport.use(new GoogleStrategy({
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
			callbackURL: config.google.callbackURL,
			passReqToCallback: true
		},
		(req, accessToken, refreshToken, profile, cb) => {
      if (!profile || !profile._json) {
        return cb('Ha ocurrido un error inesperado', null);
      }

			// Set the user's provider data and include tokens
			const providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
      usuario = new User();
      usuario.login = providerData.nickname ? providerData.nickname : '';
      usuario.estado = Constantes.Usuario.ESTADO_SIN_VERIFICAR;
      usuario.perfil = {
        nombre: providerData.name ? providerData.name.givenName  ? providerData.name.givenName : '' : '',
        apellidos: providerData.name ? providerData.name.familyName ? providerData.name.familyName : '' : '',
        sexo: providerData.gender ? providerData.gender : '',
        foto_portada: '',
        foto_perfil: providerData.image ? providerData.image.url ? providerData.image.url : '' : '',
        email: (profile.hasOwnProperty('emails')) ? profile.emails[0].value : '',
        pais: '',
        lenguajes: [providerData.language ? providerData.language : ''],
        descripcion: providerData.name ? providerData.name.tagline ? providerData.name.tagline: '' : '',
        display_name: providerData.nickname ? providerData.nickname : providerData.displayName? providerData.displayName : '',
        perfilCompleto: false,
      };

      usuario.providers.push({
        provider: profile.provider,
        providerId: profile.id,
        providerData: providerData
      });

      usuario.findByUserProviderId(function (err, userResult) {
        if (err) {
          return cb(err,null);
        } else if (userResult) {
          req.session.user = userResult;
          return cb(err, userResult)
        } else if (!userResult) {
          usuario.save(function (err, usuarioGuardado) {
            if (err) {
              return cb(err,usuarioGuardado);
            }
            let biblioteca = new Biblioteca();
            biblioteca.usuario = usuarioGuardado.id;
            biblioteca.save( (err) => {
              if (err) { return cb(err,usuarioGuardado); }
              else {
                req.session.user = usuarioGuardado;
                return cb(null, usuarioGuardado);
              }
            });
          })
        }
      });
		}
	));
};
