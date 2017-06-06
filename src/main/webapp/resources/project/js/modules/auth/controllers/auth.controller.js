
(function () {
    angular.module('EST.controllers')
        .controller('AuthController', function (API, Auth, Util, $state, $scope, $sessionStorage, $rootScope, $stateParams, SweetAlert) {
            var ctrl = this;

            ctrl.login = function () {
                delete $rootScope.message;
                var credentials = {name: $scope.name, password: $scope.password};
                Auth.login(credentials).then(function (data) {
                    $sessionStorage.Auth = {
                        token: data.data.token
                    };
                    $sessionStorage.Auth.User = Auth.getUser();
                    $state.go('home.search');
                })
            };

            ctrl.logout = function () {
                Auth.logout();
            };
        });
})();