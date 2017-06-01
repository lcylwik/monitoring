(function () {
    'use strict';

    angular.module("MDM")
        .config(function ($stateProvider) {
            $stateProvider
                .state('home.myBitacoras', {
                    url: 'bitacoras/my',
                    views: {
                        'container@': {
                            templateUrl: 'js/modules/bitacoras/views/list.html',
                            controller: 'BitacorasController',
                            controllerAs: "ctrl"
                        }
                    },
                    resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.services',
                                files: ['js/modules/bitacoras/services/bitacoras.services.js']
                            }), $ocLazyLoad.load({
                                name: 'MDM.controllers',
                                files: [
                                    'js/modules/bitacoras/controllers/bitacoras.controller.js'
                                ]
                            });
                        }
                    }
                })
                .state('home.adminBitacoras', {
                    url: 'bitacoras/admin',
                    views: {
                        'container@': {
                            templateUrl: 'js/modules/bitacoras/views/list.html',
                            controller: 'BitacorasController',
                            controllerAs: "ctrl"
                        }
                    },
                    resolve: {
                        permission: function ($stateParams, Auth, $rootScope) {
                            if(!$rootScope.hasRole('admin')){
                                $state.go('home.search');
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.services',
                                files: [
                                    'js/modules/bitacoras/services/bitacoras.services.js',
                                    'js/modules/bitacoras/controllers/bitacoras.controller.js'
                                ]
                            });
                        }
                    }
                })
        })

})();
