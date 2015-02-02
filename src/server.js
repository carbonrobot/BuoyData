var Hapi = require('hapi'),
    Path = require('path'),
    config = require('./config/config.js'),
    routes = require('./server/routes');

// make it so, hapi
var server = new Hapi.Server();
server.connection({
    port: config.port
});

// on the main viewer
server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'server/views')
});

// chart a course
for (var route in routes) {
    server.route(routes[route]);
}

// engage
server.start(function () {
    console.log('Server running at:', server.info.uri);
});