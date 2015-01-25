'use strict';

var init = require('./config/init')(),
	config = require('./config/config'),
	express = require('express'),
	http = require('http');

// Init the express application
var app = require('./config/express')();
var server = http.createServer(app);

// Start the app by listening on <port>
server.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Application started on port ' + server.address().port);