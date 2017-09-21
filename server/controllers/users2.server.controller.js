// Load the module dependencies
const mongoose = require('mongoose');
const User = mongoose.model('usuarios');
const Provider = mongoose.model('provider');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const Constantes = require("../constantes/constantes");
const Biblioteca = mongoose.model('Biblioteca');
var redirection = '';
// Rutas
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
router.put('/auth/:id', updateUserProfileById);
router.post('', createUser);

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
    res.status(400).send('error usuario requerido ');
  } else if (!req.body.login) {
    res.status(400).send('error username requerido');
  } else if (!req.body.email) {
    res.status(400).send('error email requerido');
  } else if (!req.body.password) {
    res.status(400).send('error password requerido');
  }

  const user = new User({
    login: req.body.login,
    perfil: {
      email: req.body.email,
      display_name: req.body.login
    }
  });
  user.password = user.generateHash(req.body.password);
  user.provider = 'local';

  User.findLoginDuplicate(user, function (user) {
    // Ocurrió un error o el usuario ya se encuentra registrado
    if (!user) {
      res.status(400).send(req.body.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.usuarioYaSeEncuentra : Constantes.Mensajes.MENSAJES.es.usuarioYaSeEncuentra);
    } else {
      User.findEmailDuplicate(user, function (user) {
        if (!user) {
          res.status(400).send(req.body.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.emailYaSeEncuentra : Constantes.Mensajes.MENSAJES.es.emailYaSeEncuentra);
        }  else {
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
                biblioteca.save( (err) => {
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
                biblioteca.save( (err) => {
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

function updateUserProfileById(req, res) {
  // console.log(req.params);
  if (!req.params.id)
    res.status(400).send(req.body.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.error : Constantes.Mensajes.MENSAJES.es.error);
  User.findById(req.params.id)
    .exec(function (err, user) {
      user.perfil = req.body.perfil;
      user.save(function (err,resultados) {
        if(err) {
          res.send(err);
        }else{
          res.send(resultados);
        }
      });
    });
  // User.findOneAndUpdate({id :req.params.id}, {$set: req.body.perfil} ,function (err, user) {
  //   if (err)
  //     res.status(400).send(req.body.lang === 'en' ? Constantes.Mensajes.MENSAJES.en.error : Constantes.Mensajes.MENSAJES.es.error);
  //
  //   res.status(200).send(user);
  // });
}

function getUserByParams(req, res) {
  let queries = req.query;
  let query = User.find();
  console.log(queries);
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

    if (queries && queries.display_name) {
      query.where('perfil.display_name').equals(queries.display_name);
    }

    if (queries && queries.display_name) {
      query.where('perfil.display_name').equals(queries.display_name);
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
