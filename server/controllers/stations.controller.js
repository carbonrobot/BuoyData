"use strict";

var Hapi = require('hapi'),
    config = require('../../config/config.js'),
    httpClient = require('request-json'),
    httpRequest = require('request'),
    xml = require('xml2js'),
    moment = require('moment'),
    _ = require('lodash');

function StationsController() {

    var noaaBaseUri = 'http://www.ndbc.noaa.gov/';
    
    /**
     * @name getStation
     * @desc Gets initial data for a station
     */
    function index(request, reply) {
        var id = request.params.id;
        if (!id) {
            return reply('Missing station Id. /stations/{stationId}').code(401);
        }

        var uri = noaaBaseUri + 'get_observation_as_xml.php?station=' + id;
        httpRequest(uri, function (err, res, body) {
            if (err) {
                console.log(err);
                return reply('No station found for id ' + id).code(404);
            }

            xml.parseString(body, { trim: true }, function (xmlErr, result) {
                if (xmlErr) {
                    console.log(xmlErr);
                    return reply('Unable to parse station data for id ' + id).code(500);
                }

                result = result.observation;
                var json = {
                    id: result.$.id,
                    name: result.$.name,
                    lat: result.$.lat,
                    lon: result.$.lon,
                    data: []
                };
                if (result.datetime) {
                    json.datetime = moment(result.datetime[0].replace(/UTC/, 'Z'));
                }

                parse(json, result, [
                    [ 'Air Temp', 'airtemp' ],
                    [ 'Water Temp', 'watertemp'],
                    [ 'Pressure', 'pressure'],
                    [ 'Wind Direction', 'winddir'],
                    [ 'Wind Speed', 'windspeed'],
                    [ 'Wind Gust', 'windgust']
                ]);
                
                return reply(JSON.stringify(json));
            });
        });
    }

    function parse(r, d, a) {
        a.forEach(function(s) {
            if (d[s[1]]) {
                r.data.push({
                    name: s[0],
                    value: d[s[1]][0]._,
                    unit: d[s[1]][0].$.uom
                });
            }
        });
    }

    /**
     * @name getStations
     * @desc Gets a list of known NOAA buoy stations
     */
    function list(request, reply) {
        var client = httpClient.newClient(noaaBaseUri);
        var uri = 'ndbcmapstations.json';

        client.get(uri, function (err, res, body) {
            if (err) {
                return console.log(err);
            }

            return reply(body.station);
        });
    }

    return {
        index: index,
        list: list
    };
};

module.exports = StationsController();