// Load the module dependencies
const passport = require('passport');
const url = require('url');
const mongoose = require('mongoose');
const User = mongoose.model('usuarios');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../config');
const users = require('../../controllers/users2.server.controller');
const Constantes = require("../../constantes/constantes");

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

      if (!profile || !profile._json) {
        return cb('Ha ocurrido un error inesperado', null);
      }

      const providerData = profile._json;
      providerData.token = token;
      providerData.tokenSecret = tokenSecret;

      usuario = new User();
      usuario.login = profile.username ? profile.username : '';
      usuario.estado = Constantes.Usuario.ESTADO_VERIFICADO;
      usuario.perfil = {
        nombre: providerData.name ? providerData.name : '',
        apellidos: '',
        sexo: '',
        foto_portada: providerData.profile_background_image_url ? providerData.profile_background_image_url : '',
        foto_perfil: providerData.profile_image_url ? providerData.profile_image_url : '',
        email: '',
        pais: '',
        lenguajes: [providerData.lang ? providerData.lang : ''],
        descripcion: providerData.description ? providerData.description : '',
        display_name: profile.displayName ? profile.displayName : '',
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
            req.session.user = usuarioGuardado;
            return cb(null, usuarioGuardado);
          })
        }
      });
    }
  ));
};
