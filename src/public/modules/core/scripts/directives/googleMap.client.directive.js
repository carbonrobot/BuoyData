(function(angular, google) {
    'use strict';
    
    function googleMap () {
        var directive = {
            controller: controller,
            link: link,
            restrict: 'EA'
        };
        return directive;

        function controller() {

        }

        function link(scope, element, attrs) {
            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(42.674, -87.026),
                mapTypeId: google.maps.MapTypeId.HYBRID
            };

            var map = new google.maps.Map(element, mapOptions);
        }
    }

    googleMap.$inject = [];
    angular.module('google').directive('googleMap', googleMap);

})(window.angular, window.google);