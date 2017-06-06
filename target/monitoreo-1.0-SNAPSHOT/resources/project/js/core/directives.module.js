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
        .directive("passwordVerify", function() {
            return {
                require: "ngModel",
                scope: {
                    passwordVerify: '='
                },
                link: function(scope, element, attrs, ctrl) {
                    scope.$watch(function() {
                        var combined;

                        if (scope.passwordVerify || ctrl.$viewValue) {
                            combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                        }
                        return combined;
                    }, function(value) {
                        if (value) {
                            ctrl.$parsers.unshift(function(viewValue) {
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
        .directive('convertToNumber', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(val) {
                        return val != null ? parseInt(val, 10) : null;
                    });
                    ngModel.$formatters.push(function(val) {
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
})();