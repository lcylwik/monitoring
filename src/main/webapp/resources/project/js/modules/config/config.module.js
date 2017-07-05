(function () {
    angular.module("EST")
            .config(function ($stateProvider) {
                $stateProvider
                        .state('home.config', {
                            url: 'config',
                            views: {
                                'container@': {
                                    templateUrl: 'js/modules/config/views/config.html',
                                    controller: 'ConfigController',
                                    controllerAs: "ctrl"
                                }
                            },
                            resolve: {
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'EST.controllers',
                                        files: [
                                            'js/modules/config/controllers/config.controller.js'
                                        ]
                                    }), $ocLazyLoad.load({
                                        name: 'EST.directives',
                                        files: [
                                            'js/modules/config/filters/config.filters.js'
                                        ]
                                    });
                                }
                            }
                        })
                       
            })
})();