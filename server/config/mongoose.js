// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function () {
  // Use Mongoose to connect to MongoDB
  const db =  mongoose.connect(config.db,{
    useMongoClient: true
  });

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${config.db}`);
  });
  mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });

  const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
      console.log(`Mongoose disconnected through ${msg}`);
      callback();
    });
  };

// For nodemon restarts
  process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
      process.kill(process.pid, 'SIGUSR2');
    });
  });
// For app termination
  process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
      process.exit(0);
    });
  });
// For Heroku app termination
  process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
      process.exit(0);
    });
  });

  // Load Models
  require('../models/user.model');
  require('../models/wall.model');
  require('../models/relato.model');
  require('../models/estadistica.model');
  require('../models/chatstory.model');
  require('../models/biblioteca.model');
  // Return the Mongoose connection instance
  return db;
};
