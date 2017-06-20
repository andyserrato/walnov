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

module.exports = function () {
  const app = express();

  // Parsers for POST data
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Para la integración con passport
  app.use(cookieParser());
  app.use(passport.initialize());

  // loggin
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    //app.use(compress());
  }

  // Point static path to dist
  app.use(express.static(path.join(__dirname, '../../dist')));

  // use JWT auth to secure the api
 // app.use(expressJwt({ secret: config.jwtSecret }).unless({ path: ['/users/authenticate', '/users/register', '/api'] }));

  // routes
  app.use('/users', require('../controllers/users.controller'));

  // Set our api routes
  app.use('/api', api);

  // Catch all other routes and return the index file
  app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  return app;
}

