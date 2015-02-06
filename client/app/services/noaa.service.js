(function(angular) {
    'use strict';

    function noaa($http, $q) {

        var stations = null;

        function getStations() {
            if (stations) {

                var deferred = $q.defer();
                deferred.resolve(stations);
                return deferred.promise;

            } else {

                return $http.get('/stations', { cache: true }).then(function (response) {
                    stations = response.data;
                    return stations;
                });

            }
        }

        function getStation(id) {
            return $http.get('/stations/' + id, { cache: true }).then(function (response) {
                return response.data;
            });
        }

        return {
            getStations: getStations,
            getStation: getStation
        };
    };

    noaa.$inject = ['$http', '$q'];
    angular.module('buoyApp').factory('noaaService', noaa);

})(window.angular);