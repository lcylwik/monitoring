
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
        "EST.services",
        "EST.controllers",
        "EST.directives"
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
        }).run(['$rootScope', '$state', '$stateParams', 'Auth', function ($rootScope, $state, $stateParams, Auth) {
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
            }
            else {
                // unexpected error
                $state.go('home.error');
            }
        });
    }
    ]);
})();