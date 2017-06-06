(function () {
    'use strict';
    angular.module('EST.controllers')
        .controller('RolesController', function (API, Crud, $http, Util, $state, $scope, $stateParams, SweetAlert, item) {

            var ctrl = this;
            var apiEndpoint = '/rol';

            ctrl.register = function () {
                //cleaning picklist data
                $scope.item.permissionses = $scope.item.addedPerms;
                delete $scope.item.addedPerms;

                Crud.create(apiEndpoint, $scope.item).then(function (data) {
                    $state.go('home.roles', {}, {reload: true});
                });
            };
            ctrl.edit = function () {
                //cleaning picklist data
                $scope.item.permissionses = $scope.item.addedPerms;
                delete $scope.item.addedPerms;

                Crud.update(apiEndpoint, $scope.item).then(function (data) {
                    $state.go('home.roles', {}, {reload: true});
                });
            };
            ctrl.remove = function (item) {
                Crud.delete(apiEndpoint, item).then(function (data) {
                    SweetAlert.success('Completado', 'El rol ha sido eliminado satisfactoriamente');
                    $state.go('home.roles', {}, {reload: true});
                });
            };


            if ($state.current.name === 'home.roles') {
                Crud.getAll(apiEndpoint).then(function (data) {
                    $scope.rolesTableParams = Util.generateTableParams(data.data, $scope);
                });
            } else if ($state.current.name === 'home.rolesEdit') {
               
                $scope.item = item ? item : $stateParams.item ? $stateParams.item : {};
                
                $scope.permissions = Crud.getAll('/perm').then(function (data) {
                    $scope.permissions = data.data;

                    //cleaning picklist data
                    angular.forEach($scope.item.permissionses, function (element, pos) {
                                $scope.item.addedPerms[pos] = Util.getElementById(element.id, $scope.permissions);
                            });
                    
                })
            }

        })
})();
