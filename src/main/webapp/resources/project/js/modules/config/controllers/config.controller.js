
(function () {
    angular.module('EST.controllers')
            .controller('ConfigController', function ($scope, $state, $rootScope, $compile, $timeout, uiCalendarConfig, Crud) {
                var ctrl = this;

                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();
                $scope.changeTo = 'Hungarian';
                /* event source that pulls from google.com */
                $scope.eventSource = {
                    url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                    className: 'gcal-event', // an option!
                    currentTimezone: 'America/Chicago' // an option!
                };
                /* event source that contains custom events on the scope */
                $scope.events = [];

                if ($state.current.name === 'home.config') {
                    $scope.getEvents = Crud.getAll('/eventos').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            $scope.events.push(element);
                        });
                    });
                }

                ctrl.AddDB = function (evento) {
                    Crud.create('/eventos',evento);
                }
                
                ctrl.updateDB= function (evento) {
                    Crud.update('/eventos',evento).then(function () {
                        console.log(evento);
                        console.log("update");
                    });
                }











            });

})();
