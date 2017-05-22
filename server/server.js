// Get dependencies
require('rootpath')();
const express = require('express');
var cors = require('cors');
var expressJwt = require('express-jwt');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var config = require('./config.json');
/*var config = {
    "connectionString": "mongodb://root:root@ds137101.mlab.com:37101/mongoose",
    "apiUrl": "http://localhost:3000",
    "secret": "WALNOVWEB"
};*/

// Get our API routes
const api = require('./routes/api');

const app = express();

// Parsers for POST data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));

// use JWT auth to secure the api
app.use(expressJwt({ secret: config.secret }).unless({ path: ['/users/authenticate', '/users/register'] }));

// routes
app.use('/users', require('./controllers/users.controller'));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT === 'production' ? 80 : 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));