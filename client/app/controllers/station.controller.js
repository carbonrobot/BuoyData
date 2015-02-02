(function(angular) {
    'use strict';

    function stationController($scope, $state, $stateParams) {
        var vm = this;
        vm.buoy = null;
        
        (function init() {

            var stations = $scope.$parent.$parent.main.stations; // TODO: this seems fragile, should refactor to a service
            if (_.size(stations) > 0) {
                vm.buoy = _.where(stations, { 'id': $stateParams.id })[0];
            } else {
                $state.go('map');
            }

        })();
    }

    stationController.$inject = ['$scope', '$state', '$stateParams'];
    angular.module('buoyApp').controller('StationController', stationController);

})(window.angular);