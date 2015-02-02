(function(angular) {
    'use strict';

    function homeController(noaaService) {
        var vm = this;
        vm.selectedStation = null;
        vm.stations = [];

        (function init() {

            noaaService.getStations().then(function(data) {
                vm.stations = data;
            });

        })();
    }

    homeController.$inject = ['noaaService'];
    angular.module('buoyApp').controller('HomeController', homeController);

})(window.angular);