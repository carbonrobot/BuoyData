(function(angular) {
    'use strict';

    function stationController($stateParams, noaaService) {
        var vm = this;
        vm.buoy = null;
        
        (function init() {

            noaaService.getStations().then(function (data) {

                var stations = data;
                vm.buoy = _.find(stations, { 'id': $stateParams.id });

            });

        })();
    }

    stationController.$inject = ['$stateParams', 'noaaService'];
    angular.module('buoyApp').controller('StationController', stationController);

})(window.angular);