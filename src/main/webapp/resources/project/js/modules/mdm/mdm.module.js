(function () {
    angular.module("MDM")
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
                            templateUrl: 'js/modules/mdm/views/search.html',
                            controller: 'MdmController',
                            controllerAs: "ctrl"
                        }
                    },
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.controllers',
                                files: [
                                    'js/modules/mdm/controllers/mdm.controller.js'
                                ]
                            }), $ocLazyLoad.load({
                                name: 'MDM.directives',
                                files: [
                                    'js/modules/mdm/filters/mdm.filters.js'
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
                            templateUrl: 'js/modules/mdm/views/multiple.load.html',
                            controller: 'MdmMultipleLoadController',
                            controllerAs: "ctrl"
                        }
                    },
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.controllers',
                                files: [
                                    'js/modules/mdm/controllers/mdm.multiple.load.controller.js'
                                ]
                            });
                        }
                    }
                })
        })
})();