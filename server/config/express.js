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
const api = require('../routes/api');
const config = require('./config');
const session = require('express-session');
const compress = require('compression');
const methodOverride = require('method-override');

//const flash = require('connect-flash');


module.exports = function () {
  // Create a new Express application instance
  const app = express();

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors());
  app.use(bodyParser.json());
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
  app.use('/users', require('../controllers/users.controller'));
  require('../routes/users.server.routes.js')(app);

  // Set our api routes
  app.use('/api', api);

  // Catch all other routes and return the index file
  app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

  return app;
}

