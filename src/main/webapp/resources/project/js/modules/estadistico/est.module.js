(function () {
    angular.module("EST")
            .config(function ($stateProvider) {
                $stateProvider
                        .state('home.search', {
                            url: 'search',
                            views: {
                                'container@': {
                                    templateUrl: 'js/modules/estadistico/views/search.html',
                                    controller: 'ESTController',
                                    controllerAs: "ctrl"
                                }
                            },
                            resolve: {
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'EST.controllers',
                                        files: [
                                            'js/modules/estadistico/controllers/est.controller.js'
                                        ]
                                    }), $ocLazyLoad.load({
                                        name: 'EST.directives',
                                        files: [
                                            'js/modules/estadistico/filters/est.filters.js'
                                        ]
                                    });
                                }
                            }
                        })
                        .state('home.search.table', {
                            url: '/table',
                            templateUrl: 'js/modules/estadistico/views/table.html'
                        }).state('home.search.grafica', {
                    url: '/grafica',
                    templateUrl: 'js/modules/estadistico/views/grafica.html'
                }).state('home.search.porcentX', {
                    url: '/porcentX',
                    templateUrl: 'js/modules/estadistico/views/porcentX.html'
                }).state('home.search.porcentY', {
                    url: '/porcentY',
                    templateUrl: 'js/modules/estadistico/views/porcentY.html'
                })

                        .state('home.multipleLoad', {
                            url: 'multipleLoad',
                            views: {
                                // 'header':{
                                //     templateUrl: 'js/modules/layout/views/header.html',
                                //     controller: 'HeaderController',
                                //     controllerAs: "ctrl"
                                // },
                                'container@': {
                                    templateUrl: 'js/modules/estadistico/views/multiple.load.html',
                                    controller: 'ESTMultipleLoadController',
                                    controllerAs: "ctrl"
                                }
                            },
                            resolve: {
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'EST.controllers',
                                        files: [
                                            'js/modules/estadistico/controllers/est.multiple.load.controller.js'
                                        ]
                                    });
                                }
                            }
                        })
            })
})();