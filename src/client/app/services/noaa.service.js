(function(angular) {
    'use strict';

    function noaa($http) {
        var service = {
            getStations: getStations
        };
        return service;

        function getStations() {
            return $http
                .jsonp('http://www.ndbc.noaa.gov/ndbcmapstations.json', {
                    responseType : 'json'
                })
                .then(function(response) {
                    return response.data.station;
                });
        }
    };

    noaa.$inject = ['$http'];
    angular.module('buoyApp').factory('noaaService', noaa);

})(window.angular);