
(function () {
    angular.module('EST.controllers')
        .controller('HeaderController', function($scope, $sessionStorage, Auth, growlService){
            var ctrl = this;

            $scope.user = $sessionStorage.Auth.User.user;

            $scope.header = {
                title: ''
            }
            ctrl.logout = function(){
                Auth.logout();
            }
            
             growlService.growl('Bienvenido Monitoreo Online!', 'inverse')
        });
})();