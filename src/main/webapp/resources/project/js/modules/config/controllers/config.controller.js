
(function () {
    angular.module('EST.controllers')
            .controller('ConfigController', function ($scope, $compile, EST, Util, TXN, SweetAlert, ngTableParams, $state, $filter, $sessionStorage) {
                var ctrl = this;

                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();


                /* event source that contains custom events on the scope */
                $scope.events = [
                    {title: 'All Day Event', start: new Date(y, m, 1)},
                    {title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2)},
                    {id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false},
                    {id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false},
                    {title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false},
                    {title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/'}
                ];
                /* event source that calls a function on every view switch */


                /* Render Tooltip */
                $scope.eventRender = function (event, element, view) {
                    element.attr({
                        'tooltip': event.title,
                        'tooltip-append-to-body': true
                    });
                    $compile(element)($scope);
                };

                /* config object */
                $scope.uiConfig = {
                    calendar: {
                        height: 450,
                        editable: true,
                        header: {
                            left: 'title',
                            center: '',
                            right: 'today prev,next'
                        },
                        eventRender: $scope.eventRender
                    }
                };
                /* event sources array*/
                $scope.eventSources = [$scope.events];
            });
})();
