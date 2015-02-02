(function (angular) {
    'use strict';

    var config = function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'home.view.html'
            });
    };

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    angular.module('buoyApp').config(config);

})(window.angular);