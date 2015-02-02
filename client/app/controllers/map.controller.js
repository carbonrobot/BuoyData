(function(angular) {
    'use strict';

    function mapController($scope, $stateParams) {
        var vm = this;
        vm.query = null;

    }

    mapController.$inject = ['$stateParams', 'noaaService'];
    angular.module('buoyApp').controller('MapController', mapController);

})(window.angular);