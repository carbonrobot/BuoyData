(function (angular) {
    'use strict';

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/map');

        $stateProvider
            .state('map', {
                url: '/map',
                templateUrl: 'map.view.html'
            })
            .state('station', {
                url: '/station/:id',
                templateUrl: 'station.view.html'
            });
    };

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    angular.module('buoyApp').config(config);

})(window.angular);