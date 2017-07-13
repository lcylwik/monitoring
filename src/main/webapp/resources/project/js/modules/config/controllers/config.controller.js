
(function () {
    angular.module('EST.controllers')
            .controller('ConfigController', function ($scope, $state, Crud) {
                var ctrl = this;

                $scope.eventsDB = [];
                $scope.eventSources = [];

                function makeDraggables() {
                    setTimeout(function () {
                        $('#external-events .fc-event').each(function () {
                            $(this).draggable({
                                zIndex: 999,
                                revert: true, // will cause the event to go back to its
                                revertDuration: 0  //  original position after the drag
                            });
                        });

                    }, 200);
                }

                ctrl.getAllEvent = function () {
                    Crud.getAll('/eventos').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            element.stick = true;
                            $scope.eventsDB.push(element);
                        });
                    });
                    console.log('getAll', $scope.eventsDB);

                    return $scope.eventsDB;
                };

                ctrl.AddDB = function () {
                    console.log($scope.itemEvent);
                    $scope.adding = false;
                    return Crud.create('/eventos', $scope.itemEvent).then(function () {
                        $state.go('home.config', {}, {reload: true});
                    });
                }

                ctrl.updateDB = function (evento) {
                    Crud.update('/eventos', evento).then(function () {
                        //  console.log("updateEvent",evento);
                    });
                }
                ctrl.removeEvent = function (evento) {
                    Crud.delete('/eventos', evento).then(function () {
                        $state.go('home.config', {}, {reload: true});
                    });
                }
                ctrl.onCancelEvent = function () {
                    $scope.itemEvent = {};
                    $scope.adding = false;
                }

                ctrl.onAddEvent = function () {
                    $scope.itemEvent = {};
                    $scope.adding = true;
                }

                if ($state.current.name === 'home.config') {
                    ctrl.getAllEvent();
                    makeDraggables();
                }

                $scope.uiConfig = {
                    calendar: {
                        height: 450,
                        editable: true,
                        droppable: true,
                        drop: function (date, allDay, jsEvent, ui) {
                            console.log('Here ,but where is the object?');
                        },
                        eventReceive: function (event) { // called when a proper external event is dropped
                            var objEvent = {
                                id: event.id,
                                title: event.title,
                                start: moment(event.start).add(1, "days"),
                                end: event.end,
                            }
                            console.log('update', objEvent);
                            ctrl.updateDB(objEvent);
                        },
                        eventDrop: function (event) { // called when an event (already on the calendar) is moved
                            var objEvent = {
                                id: event.id,
                                title: event.title,
                                start: moment(event.start).add(1, "days"),
                                end: event.end,
                            }
                            ctrl.updateDB(objEvent);
                        },
                        header: {
                            left: 'title',
                            center: '',
                            right: 'today prev,next'
                        }
                    }
                };

                $scope.eventSources = [$scope.eventsDB];
            });

})();
