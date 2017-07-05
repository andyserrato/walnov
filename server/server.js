// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');
const configurePassport = require('./config/passport');

// Create a new Mongoose connection instance
const db = configureMongoose();

// Create a new Express application instance
const app = configureExpress();

// Configure the Passport middleware
const passport = configurePassport();

var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
    console.log('Server running at http://localhost:3000/');
});

module.exports = app;
module.exports.io = io;

const startSockets = require('./services/sockets.service');
