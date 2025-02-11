
(function () {
    angular.module("EST", [
        "ui.router",
        "oc.lazyLoad",
        "ngStorage",
        "ngTable",
        "ngAnimate",
        "ui.bootstrap",
        "ngCsvImport",
        "oitozero.ngSweetAlert",
        "fxpicklist",
        "ui.bootstrap.datetimepicker",
        'btorfs.multiselect',
        'googlechart',
        'ngSanitize',
        'ui.select',
        "EST.services",
        "EST.controllers",
        "EST.directives",
        "angular-encryption",
        "ui.calendar",
        "ui.bootstrap",
    ])
            .constant('API', 'http://localhost:8084/api')
            .config(function ($urlRouterProvider, $interpolateProvider, $ocLazyLoadProvider, $stateProvider, $httpProvider) {
                $urlRouterProvider.otherwise('/search');
                //$urlRouterProvider.when('/', '/search');

                $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

                window.localStorage.csrf_token = $('meta[name="csrf"]').attr('content');

                $ocLazyLoadProvider.config({
                    debug: false,
                    events: false
                });
                $httpProvider.interceptors.push(['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage', '$location', 'SweetAlert', function ($rootScope, $q, $location, $localStorage, $sessionStorage, SweetAlert) {
                        return {
                            'request': function (config) {

                                if (config.headers.noLoader) {
                                    delete config.headers.noLoader;
                                } else {
                                    $rootScope.showLoader = true;
                                }
                                config.headers = config.headers || {};
                                if ($sessionStorage.Auth && $sessionStorage.Auth.token) {
                                    config.headers.Authorization = 'Bearer ' + $sessionStorage.Auth.token;
                                }
                                if (window.localStorage.csrf_token) {
                                    //config.headers['X-CSRF-TOKEN'] = window.localStorage.csrf_token;
                                }
                                return config;
                            },
                            'response': function (response) {
                                $rootScope.showLoader = false;
                                if (response.data && Object.prototype.toString.call(response.data) === '[object Array]' && response.data.length === 1 && response.data[0]['type'] === 'error') {
                                    swal('Error', response.data[0].message, 'error');
                                    return $q.reject(response);
                                } else {
                                    if (response.data && response.data.message) {
                                        $rootScope.message = {
                                            type: 'success',
                                            title: response.data.message
                                        };
                                    } else if (response.status === 200) {
                                        // $rootScope.message = {
                                        //     type: 'success',
                                        //     title: response.statusText
                                        // };
                                    }
                                }
                                return response;
                            },
                            'responseError': function (response) {
                                $rootScope.showLoader = false;
                                switch (response.status) {
                                    case 400:
                                        delete $sessionStorage.Auth;
                                        $rootScope.message = {
                                            type: 'danger',
                                            title: 'Su sesión ha expirado.'
                                        };
                                        $location.path('/login');
                                        break;
                                    case 401:
                                        delete $sessionStorage.Auth;
                                        $rootScope.message = {
                                            type: 'danger',
                                            title: 'Credenciales inválidas.'
                                        };
                                        $location.path('/login');
                                        break;
                                    case 500:
                                        swal('Error', 'Ocurrió un problema en el servidor', 'error');
                                        break;
                                    case 404:
                                        swal('Error', 'No se encuentra la ruta que intenta acceder', 'error');
                                        break;

                                    default :
                                }
                                return $q.reject(response);
                            }
                        };
                    }]);
            })
            .run(['$rootScope', '$state', '$stateParams', 'Auth', function ($rootScope, $state, $stateParams, Auth) {
                    $rootScope.menuOpen = true;

                    $rootScope.$on('$stateChangeStart',
                            function (event, toState, toStateParams) {
                                if (!Auth.isLoggedIn() && toState.name !== 'login') {
                                    event.preventDefault();
                                    return $state.go('login');
                                } else if (Auth.isLoggedIn() && toState.name === 'login') {
                                    event.preventDefault();
                                    return $state.go('home.search');
                                }
                            });
                    $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
                        if (angular.isObject(error)) {
                            switch (error.code) {
                                default:
                                    // set the error object on the error state and go there
                                    $state.get('home.error').error = error;
                                    $state.go('home.error');
                            }
                        } else {
                            // unexpected error
                            $state.go('home.error');
                        }
                    });
                }
            ]);

    Array.prototype.stanDeviate = function () {
        var i, j, total = 0, mean = 0, diffSqredArr = [];
        for (i = 0; i < this.length; i += 1) {
            total += this[i];
        }
        mean = total / this.length;
        for (j = 0; j < this.length; j += 1) {
            diffSqredArr.push(Math.pow((this[j] - mean), 2));
        }
        return (Math.sqrt(diffSqredArr.reduce(function (firstEl, nextEl) {
            return firstEl + nextEl;
        }) / this.length));
    };

    Array.prototype.mediam = function () {
        var i, total = 0;
        for (i = 0; i < this.length; i += 1) {
            total += this[i];
        }
        return total / this.length;
    };

    Array.prototype.indexOfObject = function (element) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].elemento === element) {
                return i;
            }
        }
        return -1;
    };

    Array.prototype.removeDuplicates = function (prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in this) {
            lookupObject[this[i][prop]] = this[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    Array.prototype.clone = function () {

        return JSON.parse(JSON.stringify(this));
    }


})();