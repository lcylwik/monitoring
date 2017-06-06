(function () {
    angular.module("EST")
        .config(function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        'menu': {
                            templateUrl: '/js/modules/layout/views/menu.html',
                            controller: 'MenuController',
                            controllerAs: 'ctrl',
                            resolve: {
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'EST.controllers',
                                        files: [
                                            '/js/modules/layout/controllers/menu.controller.js'
                                        ]
                                    })
                                }
                            }

                        },
                        'header': {
                            templateUrl: '/js/modules/layout/views/header.html',
                            controller: 'HeaderController',
                            controllerAs: 'ctrl',
                            resolve: {
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'EST.controllers',
                                        files: [
                                            '/js/modules/layout/controllers/header.controller.js'
                                        ]
                                    })
                                }
                            }
                        },
                        'container': {
                            templateUrl: '/js/modules/layout/views/container.html'
                        }
                    }
                }).state('home.error', {
                url: 'error',
                views: {
                    'container@': {
                        templateUrl: '/js/modules/layout/views/error.html',
                        controller: 'ErrorController',
                        controllerAs: "ctrl"
                    }
                },
                resolve: {
                    error: function(){
                        return this.self.error;
                    },
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'EST.controllers',
                            files: [
                                '/js/modules/layout/controllers/error.controller.js'
                            ]
                        });
                    }
                }
            });
        })
})();