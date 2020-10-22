(function () {
    angular.module("EST")
            .config(function ($stateProvider) {
                $stateProvider
                        .state('home.configb24', {
                            url: 'configb24',
                            views: {
                                'container@': {
                                    templateUrl: 'js/modules/configb24/views/configb24.html',
                                    controller: 'ConfigB24Controller',
                                    controllerAs: "ctrl"
                                }
                            },
                            resolve: {
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'EST.controllers',
                                        files: [
                                            'js/modules/configb24/controllers/configb24.controller.js'
                                        ]
                                    }), $ocLazyLoad.load({
                                        name: 'EST.directives',
                                        files: [
                                            'js/modules/configb24/filters/configb24.filters.js'
                                        ]
                                    });
                                }
                            }
                        })
                        
            })
})();