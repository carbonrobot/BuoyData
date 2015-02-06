"use strict";

var Hapi = require('hapi'),
    config = require('../../config/config.js');

function IndexController() {
    return {
        index: index
    };

    /**
     * @name index
     * @desc Serves the static index page
     */
    function index(request, reply) {
        reply.view('index', { googleApiKey: config.googleApiKey });
    }

};

module.exports = IndexController();