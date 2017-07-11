// Load the module dependencies
const User = require('mongoose').model('usuarios');
const Provider = require('mongoose').model('provider');
const passport = require('passport');

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
exports.signin = function (req, res, next) {
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
exports.signup = function (req, res) {
  const user = new User(req.body);
  user.provider = 'local';

  // Try saving the User
  user.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      // Login the user
      req.login(user, function (err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  });
}

// Create a new controller method that creates new 'OAuth' users
exports.saveOAuthUserProfile = function (profile) {
  // Try finding a user document that was registered using the current OAuth provider
  user = new User();
  console.log('saveOAuthUserProfile');

  user.perfil = {
    email: profile.providerData.email
  };

  provider = new Provider({
    provider: profile.provider,
    providerId: profile.providerId,
    providerData: profile.providerData
  })

  user.providers().push(provider);

  console.log('provider');
  cosole.log(profile.provider);
  console.log('providerId');
  console.log(profile.providerId);

  user.save();
  return user;
};

// Create a new controller method for signing out
exports.signout = function (req, res) {
  // Use the Passport 'logout' method to logout
  req.logout();

  // Redirect the user back to the main application page
  res.redirect('/');
};

// Middleware
exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({message: 'error iniciando sesión'});
  }
};

exports.findUserByProviderIdPassportLoggedIn = function (req, res) {
  User.findOne({
    provider: req.user.provider,
    providerId: req.user.providerId
  }, function (err, fulluser) {
    if (err) throw err;
    res.json(fulluser);
  })
};

exports.findUserByProviderId = function (providerUserProfile) {
  console.log('holis1');
  console.log(providerUserProfile.provider);
  console.log(providerUserProfile.providerId);
  User.findOne({
    providers: {
      $elemMatch: {
        provider: providerUserProfile.provider,
        providerId: providerUserProfile.providerData.id
      }
    }
  }, function (err, user) {
    if (err) throw err;
    console.log('holis2');
    console.log(user);
    return user;
  })
};

exports.isUserRegisteredByProviderId = function (req, res) {
  User.find({
    providers: {
      $elemMatch: {
        provider: req.body.providers.provider,
        providerId: req.body.providers.providerId
      }
    }
  }, function (err, fulluser) {
    if (err) throw err;
    console.log('holis');
    console.log(fulluser);
    res.json(fulluser);
  })
};


const salvarUserOAuth = function (user, profile, done) {
  console.log('Inicio salvarUserOAuth');

  // If a user could not be found, create a new user, otherwise, continue to the next middleware
  if (!user) {
    // Set a possible base username
    if (profile.provider === 'facebook') {
      user = new (factoryUserFacebook(profile));
    } else if (profile.provider === 'twitter') {
    } else if (profile.provider === 'google') {
    }

    // Try saving the new user document
    user.save(function (err) {
      // Continue to the next middleware
      return done(err, user);
    });
  }

  console.log('Fin salvarUserOAuth');
};

const factoryUserFacebook = function (profile) {
  var user = {};

  // const possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
  // User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
  //   user.username = availableUsername;
  // });

  user.perfil = {
    email: profile.providerData.email
  };
  user.providers[{
    provider: profile.provider,
    providerId: profile.providerId,
    providerData: profile.providerData
  }];

  return user;
}


const retorno = function (err, user) {
  // If an error occurs continue to the next middleware
  if (err) {
    return done(err);
  } else {
    // If a user could not be found, create a new user, otherwise, continue to the next middleware
    if (!user) {
      // Set a possible base username
      const possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

      // Find a unique available username
      User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
        // Set the available user name
        profile.username = availableUsername;

        // Create the user
        user = new User(profile);

        // Try saving the new user document
        user.save(function (err) {
          // Continue to the next middleware
          return done(err, user);
        });
      });
    } else {
      // Continue to the next middleware
      return done(err, user);
    }
  }
}
