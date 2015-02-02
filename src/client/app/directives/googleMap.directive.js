(function(window, angular, google) {
    'use strict';
    
    /**
     * @name googleMap
     * @desc Google maps angular directive
     */
    function googleMap() {
        var directive = {
            controller: controller,
            link: link,
            restrict: 'EA',
            scope: {
                stations: '='
            }
        };
        
        /**
         * @name controller
         * @desc Handles the google maps element
         */
        function controller($scope) {
            // TODO: try to refactor as much as we can into controller
        }
        controller.$inject = ['$scope'];

        /**
         * @name link
         * @desc Manipulate the dom element and attach a gmap
         */
        function link(scope, element, attrs) {

            // set up the gmap with initial options
            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(42.674, -87.026),
                mapTypeId: google.maps.MapTypeId.HYBRID
            };
            var map = new google.maps.Map(element[0], mapOptions);
            var markers = [];

            // watch for station changes, and reset markers
            scope.$watch('stations', function () {
                clearMarkers();

                if (scope.stations) {
                    _.forEach(scope.stations, function (station) {
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(parseFloat(station.lat), parseFloat(station.lon)),
                            title: station.name
                        });
                        var info = new google.maps.InfoWindow({
                            content: '<div>' + station.name + '<hr/>Lat,Long: (' + station.lat + ', ' + station.lon + ')</div>'
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            info.open(map, marker);
                        });

                        marker.setMap(map);
                        markers.push(marker);
                    });
                }
            });

            /**
             * @name clearMarkers
             * @desc Clear all markers from gmap
             */
            function clearMarkers() {
                // remove all markers
                _.forEach(markers, function (m) {
                    m.setMap(null);
                });

                // kill internal marker array
                markers = [];
            }
        }

        return directive;
    }
    googleMap.$inject = [];
    angular.module('buoyApp').directive('googleMap', googleMap);
    
})(window, window.angular, window.google);