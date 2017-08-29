// Get dependencies
const express = require('express');
const expressJwt = require('express-jwt');
const path = require('path');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const api1 = require('../routes/api1');
const config = require('./config');
const session = require('express-session');
const compress = require('compression');
const methodOverride = require('method-override');
const Constantes = require("../constantes/constantes");

//const flash = require('connect-flash');


module.exports = function () {
  // Create a new Express application instance
  const app = express();

  process.env.TZ = 'Europe/Madrid';

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
  app.use(cors());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(methodOverride());

  // Configure the 'session' middleware
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  // Para la integración con passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Point static path to dist
  app.use(express.static(path.join(__dirname, '../../dist')));

  // use JWT auth to secure the api
  //app.use(expressJwt({ secret: config.jwtSecret }).unless({ path: ['/users/authenticate', '/users/register', '/api', '/passportAuth/signup','/passportAuth/signin','/passportAuth/userByUserName' ] }));

  // routes
  // TODO Existe una forma más sencilla y correcta de hacer esto, pero no la recuerdo, esto es un apaño
  app.use('/' + Constantes.ApiVersion.API_VERSION + '/users', require('../controllers/users2.server.controller'));
  app.use('/' + Constantes.ApiVersion.API_VERSION + '/walls', require('../controllers/wall.controller'));
  app.use('/' + Constantes.ApiVersion.API_VERSION + '/tests', require('../controllers/test.controller'));
  app.use('/' + Constantes.ApiVersion.API_VERSION + '/relatos', require('../controllers/relatos.controller'));
  app.use('/' + Constantes.ApiVersion.API_VERSION + '/chatstories', require('../controllers/chatstories.controller'));
  app.use('/' + Constantes.ApiVersion.API_VERSION + '/biblioteca', require('../controllers/biblioteca.controller'));

  // Set our api routes
  app.use('/apiv1', api1);

  //Pruebas andy
  // require('../routes/users.server.routes.js')(app)

  // Catch all other routes and return the index file
  app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

  return app;
}
