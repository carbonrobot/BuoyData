(function(angular) {
    'use strict';

    function stationController($stateParams, noaaService) {
        var vm = this;
        vm.station = null;
        
        (function init() {

            noaaService.getStation($stateParams.id).then(function (data) {
                vm.station = data;
            });

        })();
    }

    stationController.$inject = ['$stateParams', 'noaaService'];
    angular.module('buoyApp').controller('StationController', stationController);

})(window.angular);