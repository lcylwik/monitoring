(function () {
    angular.module("EST")
            .config(function ($stateProvider) {
                $stateProvider
                        .state('login', {
                            url: '/login',
                            templateUrl: '/js/modules/auth/views/login.html',
                            controller: 'AuthController',
                            controllerAs: "ctrl",
                            resolve: {
                                loadMyFiles: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'EST.controllers',
                                        files: [
                                            'js/modules/auth/controllers/auth.controller.js'
                                        ]
                                    });
                                }
                            }
                        })
            })
            .constant("CSRF", window.localStorage.csrf_token)

            .run(['$rootScope', 'Auth', '$sessionStorage', function ($rootScope, Auth, $sessionStorage) {
                    $rootScope.hasPermission = function (capability) {
                        if (!capability) {
                            return true;
                        }
                        //get user
                        if ($sessionStorage.Auth && $sessionStorage.Auth.User) {
                            var user = $sessionStorage.Auth.User;
                        } else {
                            return false;
                        }
                        var rtn = false;
                        if (Object.prototype.toString.call(capability) === '[object Array]') {
                            for (var permPos in capability) {
                                for (var i = 0; i < user.permissions.length; i++) {
                                    if (user.permissions[i].name === capability[permPos]) {
                                        rtn = true;
                                        break;
                                    }
                                }
                            }
                            return rtn;
                        } else {
                            for (var i = 0; i < user.permissions.length; i++) {
                                if (user.permissions[i].name === capability) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    };
                    $rootScope.hasRole = function (role) {
                        if (!role) {
                            return true;
                        }
                        //get user
                        if ($sessionStorage.Auth && $sessionStorage.Auth.User) {
                            var user = $sessionStorage.Auth.User;
                        } else {
                            return false;
                        }
                        //check role
                        for (var i = 0; i < user.roles.length; i++) {
                                if(user.roles[i].name === role){
                                    return true;
                                }
                        }
                        return false;
                    };
                }])


})();