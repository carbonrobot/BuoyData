(function(angular) {
    'use strict';

    function noaa($http, $q) {

        var stations = null;
        var selectedStation = null;

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

        function getSelectedStation() {
            return selectedStation;
        }

        return {
            getStations: getStations,
            getSelectedStation: getSelectedStation
        };
    };

    noaa.$inject = ['$http', '$q'];
    angular.module('buoyApp').factory('noaaService', noaa);

})(window.angular);