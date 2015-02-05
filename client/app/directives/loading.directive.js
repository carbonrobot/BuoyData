(function (angular) {
    'use strict';

    var template = [
        '<div class="loading-container">',
        '<div class="loading"></div>',
        '<div class="loading-text">loading</div>',
        '</div>'
    ].join(',');

    /**
     * @name loading
     * @desc Loading indicator
     */
    function loading() {
        return {
            restrict: 'EA',
            scope: {
                waitFor: '='
            },
            template: template
        };
    }
    angular.module('buoyApp').directive('loading', loading);

})(window.angular);