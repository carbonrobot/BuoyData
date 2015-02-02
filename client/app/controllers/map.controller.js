(function(angular) {
    'use strict';

    function mapController($scope, $state, $stateParams) {
        var vm = this;
        vm.query = null;
        vm.select = select;

        /**
         * @name select
         * @desc Selects a station
         */
        function select(station) {
            $scope.$parent.$parent.main.selected = station;
            $state.go('station', {id: station.id});
        }
    }

    mapController.$inject = ['$scope', '$state', '$stateParams'];
    angular.module('buoyApp').controller('MapController', mapController);

})(window.angular);