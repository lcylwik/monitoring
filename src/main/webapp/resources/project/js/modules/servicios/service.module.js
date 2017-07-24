(function () {
    angular.module("EST")
            .config(function ($stateProvider) {
                $stateProvider
                        .state('home.service', {
                            url: 'service',
                            views: {
                                'container@': {
                                    templateUrl: 'js/modules/servicios/views/service.html',
                                    controller: 'ESTService',
                                    controllerAs: "ctrl"
                                }
                            },
                            resolve: {
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'EST.controllers',
                                        files: [
                                            'js/modules/servicios/controllers/service.controller.js'
                                        ]
                                    }), $ocLazyLoad.load({
                                        name: 'EST.directives',
                                        files: [
                                            'js/modules/servicios/filters/service.filters.js'
                                        ]
                                    });
                                }
                            }
                        })
                        
            })
})();