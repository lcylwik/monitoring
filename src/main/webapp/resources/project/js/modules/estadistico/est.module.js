(function () {
    angular.module("EST")
        .config(function($stateProvider){
            $stateProvider
                .state('home.search', {
                    url: 'search',
                    views: {
                        // 'header':{
                        //     templateUrl: 'js/modules/layout/views/header.html',
                        //     controller: 'HeaderController',
                        //     controllerAs: "ctrl"
                        // },
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
                }).state('home.multipleLoad', {
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