"use strict";

var controller = require('../controllers/index.controller.js');

module.exports = function() {
    return [
        {
            method: 'GET',
            path: '/',
            config: {
                handler: controller.index
            }
        },
        {
            method: 'GET',
            path: '/stations',
            config: {
                handler: controller.getStations
            }
        },
        {
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