"use strict";

var indexController = require('../controllers/index.controller.js'),
    stationsController = require('../controllers/stations.controller.js');

module.exports = function() {
    return [
        {
            method: 'GET',
            path: '/',
            config: {
                handler: indexController.index
            }
        },
        {
            method: 'GET',
            path: '/stations',
            config: {
                handler: stationsController.list
            }
        },
        {
            method: 'GET',
            path: '/stations/{id}',
            config: {
                handler: stationsController.index
            }
        },
        {
            // static content
            method: 'GET',
            path: '/public/{param*}',
            handler : {
                directory: {
                    path: 'public'
                }
            }
        }
    ];
}();