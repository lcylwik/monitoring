(function () {
    'use strict';

    angular.module("MDM")
        .config(function ($stateProvider) {
            $stateProvider
                .state('home.users', {
                    url: 'users',
                    views: {
                        'container@': {
                            templateUrl: 'js/modules/users/users/views/list.html',
                            controller: 'UsersController',
                            controllerAs: "ctrl"
                        }
                    },
                    resolve: {
                        authorize: function ($rootScope, $sessionStorage, $state, $stateParams, $q) {
                            if (!$rootScope.hasPermission("users.manage")) {
                                return $q.reject({
                                    code: 403,
                                    message: "No tiene permisos suficientes para acceder al recurso"
                                });
                            }
                        },
                        item: function(){
                            return false;
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.controllers',
                                files: [
                                    'js/modules/users/users/controllers/users.controller.js'
                                ]
                            });
                        }
                    }
                })
                .state('home.usersEdit', {
                    url: 'users/{action}/{id}',
                    params: {item: null},
                    templateUrl: 'js/modules/users/users/views/register.html',
                    controller: 'UsersController',
                    controllerAs: "ctrl",
                    resolve: {
                        authorize: function ($rootScope, $sessionStorage, $state, $stateParams, $q) {
                            if (!$rootScope.hasPermission("users.manage") && $stateParams.id !== $sessionStorage.Auth.User.user.id.toString()) {
                                return $q.reject({
                                    code: 403,
                                    message: "No tiene permisos suficientes para acceder al recurso"
                                });
                            }
                        },
                        item: function ($stateParams, Auth) {
                            if (!$stateParams.item && $stateParams.id) {
                                return Auth.getUserById($stateParams.id).then(function (data) {
                                    $stateParams.item = data.data;
                                    return data.data;
                                })
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.controllers',
                                files: [
                                    'js/modules/users/users/controllers/users.controller.js'
                                ]
                            });
                        }
                    }
                })
                .state('home.roles', {
                    url: 'roles',
                    views: {
                        'container@': {
                            templateUrl: 'js/modules/users/roles/views/list.html',
                            controller: 'RolesController',
                            controllerAs: 'ctrl'
                        }
                    },
                    resolve: {
                        authorize: function ($rootScope, $sessionStorage, $state, $stateParams, $q) {
                            if (!$rootScope.hasPermission("users.manage")) {
                                return $q.reject({
                                    code: 403,
                                    message: "No tiene permisos suficientes para acceder al recurso"
                                });
                            }
                        },
                        item: function(){
                            return false;
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.controllers',
                                files: [
                                    'js/modules/users/roles/controllers/roles.controller.js'
                                ]
                            });
                        }
                    }
                })
                .state('home.rolesEdit', {
                    url: 'roles/{action}/{id}',
                    params: {item: null},
                    templateUrl: 'js/modules/users/roles/views/register.html',
                    controller: 'RolesController',
                    controllerAs: "ctrl",
                    resolve: {
                        authorize: function ($rootScope, $sessionStorage, $state, $stateParams, $q) {
                            if (!$rootScope.hasPermission("users.manage")) {
                                return $q.reject({
                                    code: 403,
                                    message: "No tiene permisos suficientes para acceder al recurso"
                                });
                            }
                        },
                        item: function ($stateParams, Crud) {
                            if (!$stateParams.item && $stateParams.id) {
                                return Crud.get('/rol', $stateParams.id).then(function (data) {
                                    $stateParams.item = data.data;
                                    return data.data;
                                })
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.controllers',
                                files: [
                                    'js/modules/users/roles/controllers/roles.controller.js'
                                ]
                            });
                        }
                    }
                })
                .state('home.permissions', {
                    url: 'permissions',
                    views: {
                        'container@': {
                            templateUrl: 'js/modules/users/permissions/views/list.html',
                            controller: 'PermissionsController',
                            controllerAs: 'ctrl'
                        }
                    },
                    resolve: {
                        authorize: function ($rootScope, $sessionStorage, $state, $stateParams, $q) {
                            if (!$rootScope.hasPermission("users.manage")) {
                                return $q.reject({
                                    code: 403,
                                    message: "No tiene permisos suficientes para acceder al recurso"
                                });
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.controllers',
                                files: [
                                    'js/modules/users/permissions/controllers/permissions.controller.js'
                                ]
                            });
                        }
                    }
                })
                .state('home.permissionsEdit', {
                    url: 'permissions/{action}/{id}',
                    params: {item: null},
                    templateUrl: 'js/modules/users/permissions/views/register.html',
                    controller: 'PermissionsController',
                    controllerAs: "ctrl",
                    resolve: {
                        authorize: function ($rootScope, $sessionStorage, $state, $stateParams, $q) {
                            if (!$rootScope.hasPermission("users.manage")) {
                                return $q.reject({
                                    code: 403,
                                    message: "No tiene permisos suficientes para acceder al recurso"
                                });
                            }
                        },
                        item: function ($stateParams, Crud) {
                            if (!$stateParams.item && $stateParams.id) {
                                Crud.get('/perm', $stateParams.id).then(function (data) {
                                    $stateParams.item = data.data;
                                })
                            }
                        },
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MDM.controllers',
                                files: [
                                    'js/modules/users/permissions/controllers/permissions.controller.js'
                                ]
                            });
                        }
                    }
                })
        })

})();
