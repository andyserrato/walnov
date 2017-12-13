// Load the module dependencies
const passport = require('passport');
const url = require('url');
const mongoose = require('mongoose');
const User = mongoose.model('usuarios');
const Biblioteca = mongoose.model('Biblioteca');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');
const Constantes = require("../../constantes/constantes");
const users = require('../../controllers/users2.server.controller');

// Create the Facebook strategy configuration method
module.exports = function () {
  // Use the Passport's Facebook strategy
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      passReqToCallback: true,
      enableProof: true,
      profileFields: ['id', 'name', 'email',
        'about', 'cover', 'picture', 'locale', 'location', 'gender']
    },
    (req, accessToken, refreshToken, profile, cb) => {
      // Set the user's provider da|ta and include tokens
      if (!profile || !profile._json) {
        return cb('Ha ocurrido un error inesperado', null);
      }

      const providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // Create the user OAuth profile
      usuario = new User();

      usuario.providers.push({
        provider: profile.provider,
        providerId: profile.id,
        providerData: providerData
      });

      usuario.login = profile.username ? profile.username : '';
      usuario.estado = Constantes.Usuario.ESTADO_SIN_VERIFICAR;
      usuario.perfil = {
        nombre: providerData.first_name ? providerData.first_name : '',
        apellidos: providerData.last_name ? providerData.last_name : '',
        sexo: providerData.gender ? providerData.gender : '',
        foto_portada: providerData.cover ? providerData.cover.source ? providerData.cover.source : '' : '',
        foto_perfil: profile.photos !== undefined && profile.photos.length > 0 ? profile.photos[0].value : '',
        // foto_perfil: providerData.picture ? providerData.picture.data.url : '',
        email: providerData.email ? providerData.email : '',
        pais: '',
        lenguajes: [providerData.locale ? providerData.locale : ''],
        descripcion: providerData.description ? providerData.description : '',
        display_name: profile.displayName ? profile.displayName : providerData.first_name + ' ' + providerData.last_name,
        perfilCompleto: false,
      };

      usuario.findByUserProviderId(function (err, userResult) {
        if (err) {
          return cb(err, null);
        } else if (userResult) {
          req.session.user = userResult;
          return cb(err, userResult);
        } else if (!userResult) {
          User.findOne({
            'login': {'$regex': '^' + usuario.login + '$', $options: 'i'}
          }, (err, usu) => {
            if (err) {
              return cb(err, usuario);
            } else {
              if (usu !== null) {
                usuario.login = '';
              }
              User.findOne({
                'perfil.email': usuario.perfil.email
              }, (err, usuRes) => {
                if (err) {
                  return cb(err, usuRes);
                } else {
                  if (usuRes !== null) {
                    usuario.perfil.email = '';
                  }
                  usuario.save(function (err, usuarioGuardado) {
                    if (err) {
                      return cb(err, usuarioGuardado);
                    }
                    let biblioteca = new Biblioteca();
                    biblioteca.usuario = usuarioGuardado.id;
                    biblioteca.save((err) => {
                      if (err) {
                        return cb(err, usuarioGuardado);
                      }
                      else {
                        req.session.user = usuarioGuardado;
                        return cb(null, usuarioGuardado);
                      }
                    });
                  });
                }
              });
            }
          });
        }
      });
    }
  ));
};
