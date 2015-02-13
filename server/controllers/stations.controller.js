"use strict";

var Hapi = require('hapi'),
    config = require('../../config/config.js'),
    noaa = require('../services/noaa.service.js');

function StationsController() {
    
    /**
     * @name getStation
     * @desc Gets initial data for a station
     */
    function index(request, reply) {
        var id = request.params.id;
        if (!id) {
            return reply('Missing station Id. /stations/{stationId}').code(401);
        }

        noaa.getObservations(id).then(function(data) {
            return reply(data);
        }, function() {
            return reply('No station found for id ' + id).code(404);
        });
    }

    /**
     * @name getStations
     * @desc Gets a list of known NOAA buoy stations
     */
    function list(request, reply) {
        noaa.getStations().then(function(data) {
            return reply(data);
        }, function(err) {
            return reply('Could not obtain a list of stations from NOAA\r\n' + err).code(500);
        });
    }

    return {
        index: index,
        list: list
    };
};

module.exports = StationsController();