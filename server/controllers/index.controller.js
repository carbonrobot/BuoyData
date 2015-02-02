"use strict";

var Hapi = require('hapi'),
    httpClient = require('request-json'),
    _ = require('lodash'),
    config = require('../../config/config.js');

function IndexController() {
    return {
        index: index,
        getStations: getStations
    };

    /**
     * @name index
     * @desc Serves the static index page
     */
    function index(request, reply) {
        reply.view('index', { googleApiKey: config.googleApiKey });
    }

    /**
     * @name getStations
     * @desc Gets a list of known NOAA buoy stations
     */
    function getStations(request, reply) {
        var client = httpClient.newClient('http://www.ndbc.noaa.gov/');
        client.get('ndbcmapstations.json', function(err, res, body) {
            if (err) {
                return console.log(err);
            }

            reply(body.station);
        });
    }
};

module.exports = IndexController();