/**
 * Created by PLANET MEDIA on 5/3/2017.
 */
(function () {
    angular.module('MDM.controllers')
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