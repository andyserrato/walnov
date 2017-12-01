// Load the module dependencies
const mongoose = require('mongoose');
const User = mongoose.model('usuarios');
const Provider = mongoose.model('provider');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const Constantes = require("../constantes/constantes");
const Biblioteca = mongoose.model('Biblioteca');
const GestorNotificaciones = require("../services/notificaciones.service").GestorNotificaciones;
const GestorEmail = require("../services/email.service").GestorEmail;
const Pago = mongoose.model('pago');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const nodemailer = require('nodemailer');
var redirection = '';

// Set up the 'signup' routes
router.post('/auth/signup', signup);
// Set up the 'signin' routes
router.post('/auth/signin', signin);
// Set up the 'signout' route
router.get('/auth/signout', signout);

router.get('/auth/isLoggedIn', function isLoggedIn(req, res) {
  if (req.isAuthenticated()) {
    res.json('yes');
  } else {
    res.json('no');
  }
});

// Obtiene los datos del usuario
router.get('/oauth/userdataPassportLoggedIn', isLoggedIn, findUserByProviderIdPassportLoggedIn);

router.get('/oauth/passport/:provider/:providerId', getUserByProviderAndProviderId);
router.get('', getUserByParams);
router.get('/auth/:id', getUserById);
router.get('/auth/:id/followers', getUserFollowers);
router.put('/auth/:id', updateUserProfileById);
router.post('', createUser);
router.post('/follow', followUser);
router.post('/unfollow', unFollowUser);
router.post('/pago', pago);
router.put('/activate/:token', activateUserAccount);
router.post('/activate/resend', resendActivationLink);
// pass reset
// account link re request

// Set up the Facebook OAuth routes
router.get('/oauth/facebook', passport.authenticate('facebook', {
  failureRedirect: '/social-login/failure',
  successRedirect: '/social-login/success',
  scope: ['public_profile', 'email']
}));

router.get('/oauth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/social-login/failure'}),
  function (req, res) {
    req.login(req.session.user, function (err) {
      res.redirect('/social-login/success');
    });
  });

// Set up the Twitter OAuth routes
router.get('/oauth/twitter', passport.authenticate('twitter'));

router.get('/oauth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/social-login/failure'}),
  function (req, res) {
    req.login(req.session.user, function (err) {
      res.redirect('/social-login/success');
    });
  }
);

// Set up the Google OAuth routes
router.get('/oauth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ],
  failureRedirect: '/social-login/failure'
}));
router.get('/oauth/google/callback', passport.authenticate('google', {failureRedirect: '/social-login/failure'}),
  function (req, res) {
    req.login(req.session.user, function (err) {
      res.redirect('/social-login/success');
    });
  }
);

module.exports = router;

// Create a new error handling controller method
const getErrorMessage = function (err) {
  // Define the error message variable
  let message = '';

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      // If a general error occurs set the message error
      default:
        message = 'Something went wrong';
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};

// Create a new controller method that signin users
function signin(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      // Use the Passport 'login' method to login
      req.login(user, (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};

// Create a new controller method that creates new 'regular' users
function signup(req, res) {
  if (!req.body) {
    res.status(400).send({error: 'error usuario requerido '});
  } else if (!req.body.login) {
    res.status(400).send({error: 'error username requerido'});
  } else if (!req.body.email) {
    res.status(400).send({error: 'error email requerido'});
  } else if (!req.body.password) {
    res.status(400).send({error: 'error password requerido'});
  } else {

    const user = new User({
      login: req.body.login,
      perfil: {
        email: req.body.email,
        display_name: req.body.login
      }
    });
    user.password = user.generateHash(req.body.password);
    user.provider = 'local';
    user.token = jwt.sign({login: user.login, email: user.perfil.login}, config.jwtSecret, {expiresIn: '24h'});
    user.temporaryToken = jwt.sign({login: user.login, email: user.perfil.login}, config.jwtSecret, {expiresIn: '24h'});
    user.activo = false;
    User.findLoginDuplicate(user, function (user) {
      // Ocurrió un error o el usuario ya se encuentra registrado
      if (!user) {
        res.status(400).send(req.body.lang === 'en' ? {
            error: Constantes.Mensajes.MENSAJES.en.usuarioYaSeEncuentra,
            tipo: 0
          } :
          {
            error: Constantes.Mensajes.MENSAJES.es.usuarioYaSeEncuentra,
            tipo: 0
          });
      } else {
        User.findEmailDuplicate(user, function (user) {
          if (!user) {
            res.status(400).send(req.body.lang === 'en' ? {
              error: Constantes.Mensajes.MENSAJES.en.emailYaSeEncuentra,
              tipo: 1
            } : {error: Constantes.Mensajes.MENSAJES.es.emailYaSeEncuentra, tipo: 1});
          } else {
            // Try saving the User
            user.save((err) => {
              if (err) {
                return res.status(400).send({
                  error: getErrorMessage(err)
                });
              } else {
                // Remove sensitive data before login
                user.password = undefined;

                // Login the user
                req.login(user, function (err) {
                  if (err) {
                    res.status(400).send(err);
                  } else {
                    let biblioteca = new Biblioteca();
                    biblioteca.usuario = user.id;
                    biblioteca.save((err) => {
                      if (err) res.status(400).send({error: err});
                      GestorEmail.sendActivationLink(user);
                      res.status(200).send(user);
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
}

// Create a new controller method for signing out
function signout(req, res) {
  // Use the Passport 'logout' method to logout
  req.logout();
  // Redirect the user back to the main application page
  res.json('sesión terminada');
};

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({message: 'error iniciando sesión'});
  }
};

function findUserByProviderIdPassportLoggedIn(req, res) {
  User.findById(req.session.user.id, function (err, fulluser) {
    if (err) res.status(400).send(err);
    res.status(200).json(fulluser);
  })
};

function getUserByProviderAndProviderId(req, res) {
  let provider = req.params.provider.toLowerCase();
  let providerId = req.params.providerId;
  User.find({
    providers: {
      $elemMatch: {
        provider: provider,
        providerId: providerId
      }
    }
  }, function (err, fulluser) {
    if (err) throw err;
    res.json(fulluser);
  })
};

function createUser(req, res) {
  let peticion = req.body;

  if (!peticion) {
    res.status(400).send('usuario requerido');
  }

  let user = new User(peticion);
  user.password = user.generateHash(req.body.password);

  User.findLoginDuplicate(user, function (user) {
    // Ocurrió un error o el usuario ya se encuentra registrado
    if (!user) {
      res.status(400).send(req.body.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.usuarioYaSeEncuentra : Constantes.Mensajes.MENSAJES.es.usuarioYaSeEncuentra);
    } else {
      User.findEmailDuplicate(user, function (user) {
        if (!user) {
          res.status(400).send(req.body.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.emailYaSeEncuentra : Constantes.Mensajes.MENSAJES.es.emailYaSeEncuentra);
        } else {
          // Try saving the User
          user.save((err) => {
            if (err) {
              return res.status(400).send({
                message: getErrorMessage(err)
              });
            } else {
              // Remove sensitive data before login
              user.password = undefined;

              // Login the user
              req.login(user, function (err) {
                if (err) {
                  res.status(400).send(err);
                } else {
                  let biblioteca = new Biblioteca();
                  biblioteca.usuario = user.id;
                  biblioteca.save((err) => {
                    if (err) res.status(400).send(err);
                    res.status(200).send(user);
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

function getUserById(req, res) {
  if (!req.params.id)
    res.status(400).send(req.body.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.error : Constantes.Mensajes.MENSAJES.es.error);

  User.findById(req.params.id).exec(function (err, user) {
    if (err)
      res.status(400).send(req.body.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.error : Constantes.Mensajes.MENSAJES.es.error);
    res.status(200).send(user);
  });
}

function getUserFollowers(req, res) {
  if (!req.params.id)
    res.status(400).send(req.body.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.error} : {error: Constantes.Mensajes.MENSAJES.es.error});

  const options = {
    limit: (isNaN(req.query.top)) ? 12 : +req.query.top,
    skip: (isNaN(req.query.skip)) ? 0 : +req.query.skip
  };

  User.findById(req.params.id)
    .select('seguidores')
    .populate({path: 'seguidores', select: 'perfil id', options})
    // .where('active').eq(true)
    .exec(function (err, user) {
      if (err)
        res.status(400).send(req.body.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.error} : {error: Constantes.Mensajes.MENSAJES.es.error});

      res.status(200).send(user);
    });
}

function updateUserProfileById(req, res) {
  if (!req.params.id)
    res.status(400).send(req.body.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.error : Constantes.Mensajes.MENSAJES.es.error);
  User.findById(req.params.id)
    .exec(function (err, user) {
      user.perfil = req.body.perfil;
      user.save(function (err, resultados) {
        if (err) {
          res.send(err);
        } else {
          res.send(resultados);
        }
      });
    });
}

function getUserByParams(req, res) {
  let queries = req.query;
  let query = User.find();
  // if (Object.hasOwnProperty(queries).length === undefined) {
  if (Object.keys(queries).length === 0) {
    res.status(400).send('Queries required');
  } else {

    if (queries && queries.id) {
      query.where('_id').equals(queries.id);
    }

    if (queries && queries.login) {
      query.where('perfil.login').equals(queries.login);
    }

    if (queries && queries.nombre) {
      query.where('perfil.nombre').equals(queries.nombre);
    }

    if (queries && queries.apellidos) {
      query.where('perfil.apellidos').equals(queries.apellidos);
    }

    if (queries && queries.email) {
      query.where('perfil.email').equals(queries.email);
    }

    // relevantes
    if (queries && queries.sort) {
      let sortQueries = queries.sort.split(',');

      for (i = 0; i < sortQueries.length; i++) {
        if (sortQueries[i].indexOf('fechaModificacion') !== -1) {
          query.sort(sortQueries[i]);
        } else if (sortQueries[i].indexOf('fechaCreacion') !== -1) {
          query.sort(sortQueries[i]);
        } else if (sortQueries[i].indexOf('relevantes') !== -1) {
          query.where('perfil.numWallsCreated').ne(null);
          query.where('perfil.numRelatosCreated').ne(null);
          query.where('perfil.numChatStoriesCreated').ne(null);
          query.sort('-perfil.numWallsCreated');
          query.sort('-perfil.numRelatosCreated');
          query.sort('-perfil.numChatStoriesCreated');
        }
      }
    }

    query.limit((isNaN(queries.top)) ? 10 : +queries.top);
    query.skip((isNaN(queries.skip)) ? 0 : +queries.skip);
    query.where('activo').equals(true);
    ejecutarQuery();
  }

  function ejecutarQuery() {
    query.exec(function (err, users) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(users);
      }
    });
  }

}

function followUser(req, res) {
  let peticion = req.body;

  if (!peticion || !peticion.userId || !peticion.userIdToFollow) {
    res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.follow} : {error: Constantes.Mensajes.MENSAJES.es.follow});
  } else {
    User.findById(peticion.userId, function (err, userFollowing) {
      if (err) {
        res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.userNotFound} : {error: Constantes.Mensajes.MENSAJES.es.userNotFound});
      } else {
        User.findById(peticion.userIdToFollow, function (err, userFollowed) {
          if (err) {
            res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.userNotFound} : {error: Constantes.Mensajes.MENSAJES.es.userNotFound});
          } else {
            if (userFollowing.siguiendo.indexOf(userFollowed.id) === -1) {
              userFollowing.siguiendo.push(userFollowed.id);
              userFollowing.save(function (err) {
                if (err) {
                  res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.errorSavingUser} : {error: Constantes.Mensajes.MENSAJES.es.errorSavingUser});
                } else {
                  userFollowed.seguidores.push(userFollowing.id);
                  userFollowed.save(function (err) {
                    if (err) {
                      res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.errorSavingUser} : {error: Constantes.Mensajes.MENSAJES.es.errorSavingUser});
                    } else {
                      // ha comenzado a seguirte el quetal jajajja
                      let notificacionNuevoSeguidor = GestorNotificaciones.crearNotificacionNuevoSeguidor(
                        peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.followMessage : Constantes.Mensajes.MENSAJES.es.followMessage,
                        userFollowing.perfil.display_name,
                        userFollowing.id
                      );
                      GestorNotificaciones.addNotificacionFeed(notificacionNuevoSeguidor, [userFollowed.id]);
                      res.status(200).send(peticion.lang === 'en' ?
                        {mensaje: userFollowing.perfil.display_name + ' has followed user: ' + userFollowed.perfil.display_name} :
                        {mensaje: userFollowing.perfil.display_name + ' has comenzado a seguir a: ' + userFollowed.perfil.display_name});
                    }
                  });
                }
              });
            } else {
              res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.alreadyFollowing} : {error: Constantes.Mensajes.MENSAJES.es.alreadyFollowing});
            }
          }
        });
      }
    });
  }
}

function unFollowUser(req, res) {
  let peticion = req.body;

  if (!peticion || !peticion.userId || !peticion.userIdToUnFollow) {
    res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.unFollow} : {error: Constantes.Mensajes.MENSAJES.es.unFollow});
  } else {
    User.findById(peticion.userId, function (err, userFollowing) {
      if (err) {
        res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.userNotFound} : {error: Constantes.Mensajes.MENSAJES.es.userNotFound});
      } else {
        User.findById(peticion.userIdToUnFollow, function (err, userFollowed) {
          if (err) {
            res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.userNotFound} : {error: Constantes.Mensajes.MENSAJES.es.userNotFound});
          } else {
            if (userFollowing.siguiendo.indexOf(userFollowed.id) !== -1) {
              userFollowing.siguiendo.splice(userFollowing.siguiendo.indexOf(userFollowed.id), 1);
              userFollowing.save(function (err) {
                if (err) {
                  res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.errorSavingUser} : {error: Constantes.Mensajes.MENSAJES.es.errorSavingUser});
                } else {
                  userFollowed.seguidores.splice(userFollowed.seguidores.indexOf(userFollowing.id), 1);
                  userFollowed.save(function (err) {
                    if (err) {
                      res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.errorSavingUser} : {error: Constantes.Mensajes.MENSAJES.es.errorSavingUser});
                    } else {
                      // ha comenzado a seguirte el quetal jajajja
                      res.status(200).send(peticion.lang === 'en' ?
                        {mensaje: userFollowing.perfil.display_name + ' has unfollowed user: ' + userFollowed.perfil.display_name} :
                        {mensaje: userFollowing.perfil.display_name + ' has dejado de seguir a: ' + userFollowed.perfil.display_name});
                    }
                  });
                }
              });
            } else {
              res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.notFollowing} : {error: Constantes.Mensajes.MENSAJES.es.notFollowing});
            }
          }
        });
      }
    });
  }
}

function pago(req, res) {
  let peticion = req.body;

  if (!peticion || !peticion.userId || !peticion.token) {
    res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.camposRequeridos} : {error: Constantes.Mensajes.MENSAJES.es.camposRequeridos});
  } else {
    User.findById(peticion.userId, function (err, user) {
      if (err) {
        res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.error} : {error: Constantes.Mensajes.MENSAJES.es.error});
      } else {
        pago = new Pago();
        pago.token = peticion.token;
        pago.monto = peticion.monto;
        pago.descripcion = peticion.descripcion;

        // todo hacer lo de que no se pueda meter un pago con el mismo token

        user.pagos.push(pago);
        user.save(function (err, user) {
          if (err) {
            res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.error} : {error: Constantes.Mensajes.MENSAJES.es.error});
          } else {
            res.status(200).send({mensaje: 'ok'});
          }
        });
      }
    });
  }
}

function activateUserAccount(req, res) {
  const peticion = req.params;
  const token = req.params.token;
  if (!peticion || !token) {
    res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.camposRequeridos} : {error: Constantes.Mensajes.MENSAJES.es.camposRequeridos});
  } else {
    User.findOne({temporaryToken: token}, function (err, user) {
      if (err) {
        res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.error} : {error: Constantes.Mensajes.MENSAJES.es.error});
      } else if (user === null) {
        res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.temporaryActivationCodeNotFound} : {error: Constantes.Mensajes.MENSAJES.es.temporaryActivationCodeNotFound});
      } else if (user.activo === true) {
        res.status(401).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.accountAlreadyActivated} : {error: Constantes.Mensajes.MENSAJES.es.accountAlreadyActivated});
      } else {
        jwt.verify(token, config.jwtSecret, function (err, userVerified) {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              res.status(401).json(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.tokenExpired} : {error: Constantes.Mensajes.MENSAJES.es.tokenExpired});
            } else {
              res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.error} : {error: Constantes.Mensajes.MENSAJES.es.error});
            }
          } else {
            user.temporaryToken = 'none';
            user.activo = true;
            user.save(function (err, user) {
              if (err) {
                res.status(400).send(peticion.lang === 'en' ? {error: Constantes.Mensajes.MENSAJES.en.errorOnAccountActivation} : {error: Constantes.Mensajes.MENSAJES.es.errorOnAccountActivation});
              } else {
                GestorEmail.sendSuccessfullActivation(user);
                res.status(200).send({
                  success: true,
                  message: peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.accountActivatedSuccess : Constantes.Mensajes.MENSAJES.es.accountActivatedSuccess,
                  error: ''
                });
              }
            });
          }
        });
      }
    });
  }
}

function resendActivationLink(req, res) {
  peticion = req.body;
  email = peticion.email;

  if (!email) {
    res.status(400).send({
      success: false,
      message: '',
      error: peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.camposRequeridos : Constantes.Mensajes.MENSAJES.es.camposRequeridos
    });
  } else {
    User.findOne({'perfil.email': email}, (err, user) => {
      if (err) {
        res.status(400).send({
          success: false,
          message: '',
          error: peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.error : Constantes.Mensajes.MENSAJES.es.error
        });
      } else if (!user) {
        res.status(400).send({
          success: false,
          message: '',
          error: peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.emailNotFound : Constantes.Mensajes.MENSAJES.es.emailNotFound
        });
      } else if (user.temporaryToken === 'none') {
        // usuario ya está activo
        res.status(200).send({
          success: true,
          message: peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.accountAlreadyActivated : Constantes.Mensajes.MENSAJES.es.accountAlreadyActivated,
          error: ''
        });
      } else {
        jwt.verify(user.temporaryToken, config.jwtSecret, function (err, userVerified) {
          // token caducado tenemos que regenrar
          if (err) {
            if (err.name === 'TokenExpiredError') {
              user.temporaryToken = jwt.sign({
                login: user.login,
                email: user.perfil.login
              }, config.jwtSecret, {expiresIn: '24h'});
              user.save(function (err, userNewTempToken) {
                if (err) {
                  res.status(400).send({
                    success: false,
                    message: '',
                    error: peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.error : Constantes.Mensajes.MENSAJES.es.error
                  });
                } else {
                  GestorEmail.sendActivationLink(userNewTempToken);
                  res.status(200).send({
                    success: true,
                    message: peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.accountActivationLinkSent : Constantes.Mensajes.MENSAJES.es.accountActivationLinkSent,
                    error: ''
                  });
                }
              });
            } else {
              res.status(400).send({
                success: false,
                message: '',
                error: peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.error : Constantes.Mensajes.MENSAJES.es.error
              });
            }
          } else {
            GestorEmail.sendActivationLink(user);
            res.status(200).send({
              success: true,
              message: peticion.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.accountActivationLinkSent : Constantes.Mensajes.MENSAJES.es.accountActivationLinkSent,
              error: ''
            })
          }
        });
      }
    });
  }
}
