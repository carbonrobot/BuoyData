'use strict';

var httpClient = require('request-json'),
    httpRequest = require('request'),
    moment = require('moment'),
    xml = require('xml2js'),
    q = require('q');

function NoaaServices() {

    var noaaBaseUri = 'http://www.ndbc.noaa.gov/';

    /**
     * @name getObservations
     * @desc Get current observations for the given station id
     */
    function getObservations(stationId) {
        var deferred = q.defer();

        var uri = noaaBaseUri + 'get_observation_as_xml.php?station=' + stationId;
        httpRequest(uri, function(err, res, body) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {

                xml.parseString(body, {trim: true}, function(xmlErr, result) {
                    if (xmlErr) {
                        console.log(xmlErr);
                        console.log('Unable to parse station data for id ' + stationId);
                        deferred.reject(err);
                    } else {

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
                            ['Air Temp', 'airtemp'],
                            ['Water Temp', 'watertemp'],
                            ['Pressure', 'pressure'],
                            ['Wind Direction', 'winddir'],
                            ['Wind Speed', 'windspeed'],
                            ['Wind Gust', 'windgust']
                        ]);

                        deferred.resolve(JSON.stringify(json));
                    }
                });

            }
        });

        return deferred.promise;
    }

    /**
     * @name getStations
     * @desc Get a list of all known NOAA stations
     */
    function getStations() {
        var deferred = q.defer();
        var client = httpClient.newClient(noaaBaseUri);

        client.get('ndbcmapstations.json', function(err, res, body) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(body.station);
            }
        });

        return deferred.promise;
    }

    // internal parser for noaa data
    function parse(r, d, a) {
        a.forEach(function (s) {
            if (d[s[1]]) {
                r.data.push({
                    name: s[0],
                    value: d[s[1]][0]._,
                    unit: d[s[1]][0].$.uom
                });
            }
        });
    }

    return {
        getObservations: getObservations,
        getStations: getStations
    };
}

module.exports = NoaaServices();