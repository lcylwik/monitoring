(function () {
    angular.module("EST.directives", [])
            .directive("fileread", [
                function () {
                    return {
                        scope: {
                            fileread: "=",
                            filename: "="
                        },
                        link: function (scope, element, attributes) {
                            element.bind("change", function (changeEvent) {
                                var reader = new FileReader();
                                reader.onload = function (loadEvent) {
                                    scope.$apply(function () {
                                        scope.fileread = loadEvent.target.result;
                                        scope.filename = changeEvent.target.files[0].name;
                                    });
                                }
                                reader.readAsDataURL(changeEvent.target.files[0]);
                            });
                        }
                    }
                }
            ])
            .directive("passwordVerify", function () {
                return {
                    require: "ngModel",
                    scope: {
                        passwordVerify: '='
                    },
                    link: function (scope, element, attrs, ctrl) {
                        scope.$watch(function () {
                            var combined;

                            if (scope.passwordVerify || ctrl.$viewValue) {
                                combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                            }
                            return combined;
                        }, function (value) {
                            if (value) {
                                ctrl.$parsers.unshift(function (viewValue) {
                                    var origin = scope.passwordVerify;
                                    if (origin !== viewValue) {
                                        ctrl.$setValidity("passwordVerify", false);
                                        return undefined;
                                    } else {
                                        ctrl.$setValidity("passwordVerify", true);
                                        return viewValue;
                                    }
                                });
                            }
                        });
                    }
                };
            })
            .directive('convertToNumber', function () {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModel) {
                        ngModel.$parsers.push(function (val) {
                            return val != null ? parseInt(val, 10) : null;
                        });
                        ngModel.$formatters.push(function (val) {
                            return val != null ? '' + val : null;
                        });
                    }
                };
            })
            .directive('urllink', ['$location', '$state', function ($state) {
                    return {
                        restrict: 'A',
                        scope: {
                            sublevel: '='
                        },
                        link: function (scope, element, attrs) {
                            element.on('click', function (e) {
                                e.preventDefault();

                                if ((scope.sublevel && !element.parent().hasClass('active')) || attrs.id === "inicio") {
                                    $('.sublevel.active, .level.active').removeClass('active');
                                    element.parent().addClass('active');
                                    element.closest('.level').addClass('active');
                                } else if (!scope.sublevel) {
                                    if (element.parent().hasClass('active')) {
                                        $('.level.active').removeClass('active');
                                    } else {
                                        //$('.level.active').removeClass('active');
                                        element.parent().addClass('active');
                                    }
                                }
                                if (attrs.id === "Mi Dashboard") {
                                    window.location.href = '#/bitacoras/my';
                                }


                            });
                        }
                    };
                }])
            .directive('calendarEvents', function ($timeout) {
                return {
                    restrict: 'A',
                    replace: true,
                    template: `<div id='external-events'>
                                <div class='{[{droppableElementsClass}]}' data-event={[{event}]} ng-repeat='event in events track by $index' >{[{event.title}]}</div>
                                <div class='new-element' ng-if='adding'>
                                    <div class='form-group'>
                                        <label>Titulo</label>
                                        <input type='text' class='form-control' ng-model='new.title'/>
                                    </div>
                                    <div class='form-group'>
                                        <label>Valor</label>
                                        <input type='text' class='form-control' ng-model='new.value'/>
                                    </div>
                                </div>
                                <div class='form-group pull-right'>
                                    <button class='btn btn-primary form-control' ng-hide='adding'ng-click='onAddEvent()'>Add Event</button>
                                    <button class='btn btn-success form-control' ng-if='adding' ng-click='onConfirmEvent()'>Confirm</button>
                                    <button class='btn btn-default form-control' ng-if='adding' ng-click='onCancelEvent()'>Cancel</button>
                                </div>
           </div>`,
                    scope: {
                        calendarId: '@',
                        events: '=',
                        droppableElementsClass: '@',
                        fullCallendarOptions: '=',
                        add: '=',
                        update: '=',
                        getAll: '='
                    },
                    link: function (scope, element, attrs) {

                        function makeDraggables() {
                            setTimeout(function () {
                                $('#external-events .' + scope.droppableElementsClass).each(function () {
                                    $(this).data('event', {
                                        title: $.trim($(this).text()), // use the element's text as the event title
                                        stick: true // maintain when user navigates (see docs on the renderEvent method)
                                    });

                                    $(this).draggable({
                                        zIndex: 999,
                                        revert: true, // will cause the event to go back to its
                                        revertDuration: 0  //  original position after the drag
                                    });
                                });

                            }, 200);
                        }

                        makeDraggables();



                        //var calendarElement = angular.element(document.getElementById(scope.calendarId));
                        var defaultCalendarOptions = {
                            editable: true, // enable draggable events
                            droppable: true, // this allows things to be dropped onto the calendar
                            aspectRatio: 1.8,
                            scrollTime: '00:00', // undo default 6am scrollTime
                            header: {
                                left: 'today prev,next',
                                center: 'title',
                                right: 'agendaWeek,month'
                            },

                            events: scope.events,
                            drop: function (date, jsEvent, ui, resourceId) {
                                // is the "remove after drop" checkbox checked?
                                if ($('#drop-remove').is(':checked')) {
                                    // if so, remove the element from the "Draggable Events" list
                                    $(this).remove();
                                }
                            },
                            eventReceive: function (event) { // called when a proper external event is dropped
                                var objEvent = {
                                    id: event.id,
                                    title: event.title,
                                    start: moment(event.start).add(1, "days"),
                                    end: event.end
                                }
                                console.log(scope.events);
                                console.log(objEvent);
                                scope.update(objEvent);

                            },
                            eventDrop: function (event) { // called when an event (already on the calendar) is moved
                                var objEvent = {
                                    id: event.id,
                                    title: event.title,
                                    start: moment(event.start).add(1, "days"),
                                    end: event.end
                                }

                                scope.update(objEvent);
                            }
                        };

                        var cal = $('#' + scope.calendarId).fullCalendar(defaultCalendarOptions);


                        scope.onConfirmEvent = function () {
                            scope.adding = false;
                            scope.new.start = "0000-00-00";
                            scope.new.end = "0000-00-00";

                            scope.add(scope.new).then(function (data) {
                                scope.new.id = data.data;
                                scope.events.push(Object.assign({}, scope.new));
                                makeDraggables();
                            });

                        }
                        scope.onCancelEvent = function () {
                            scope.new = {};
                            scope.adding = false;
                        }
                        scope.onAddEvent = function () {
                            scope.new = {};
                            scope.adding = true;
                        }
                    }
                }
            })
})();