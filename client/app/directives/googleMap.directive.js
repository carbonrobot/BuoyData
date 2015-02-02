(function(window, angular, google) {
    'use strict';
    
    /**
     * @name googleMap
     * @desc Google maps angular directive
     */
    function googleMap() {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                stations: '=',
                selected: '='
            }
        };
        
        /**
         * @name link
         * @desc Manipulate the dom element and attach a gmap
         */
        function link(scope, element, attrs) {

            // set up the gmap with initial options
            var mapOptions = {
                zoom: 5,
                center: new google.maps.LatLng(42.674, -87.026),
                mapTypeId: google.maps.MapTypeId.HYBRID
            };
            var map = new google.maps.Map(element[0], mapOptions);
            var info = new google.maps.InfoWindow();
            var markers = [];

            // watch for station changes, and reset markers
            scope.$watch('stations', function () {
                clearMarkers();

                if (scope.stations) {
                    _.forEach(scope.stations, function (station) {
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(parseFloat(station.lat), parseFloat(station.lon)),
                            title: station.name,
                            icon: 'public/img/brand/rsz_aton_sm.png',
                            id: station.id,
                            station: station
                        });
                        
                        google.maps.event.addListener(marker, 'click', function () {
                            scope.selected = marker.station;
                            openInfo(marker.station, marker);
                        });

                        marker.setMap(map);
                        markers.push(marker);
                    });
                }
            });

            // watch for selected marker changes
            scope.$watch('selected', function () {
                if (scope.selected) {
                    var station = scope.selected;
                    var marker = _.where(markers, { 'id': station.id })[0];
                    openInfo(station, marker);
                    centerViewport(marker);
                }
            });

            /**
             * @name centerViewport
             * @desc Centers the gmap on the selected marker
             */
            function centerViewport(marker) {
                map.setCenter(marker.position);
            }

            /**
             * @name openInfo
             * @desc Opens the info window for the selected marker
             */
            function openInfo(station, marker) {
                info.setContent('<div><a href="#/station/' + station.id + '">' + station.name + ' (' + station.lat + ', ' + station.lon + ')</a></div>');
                info.open(map, marker);
            }

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