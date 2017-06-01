(function () {
    'use strict';
    angular.module('MDM.controllers')
        .controller('PermissionsController', function (API, Crud, Util, $state, $scope, $stateParams, SweetAlert) {

            var ctrl = this;
            var apiEndpoint = '/perm';

            ctrl.register = function () {
                Crud.create(apiEndpoint, $scope.item).then(function (data) {
                    $state.go('home.permissions', {}, {reload: true});
                });
            };
            ctrl.edit = function () {
                Crud.update(apiEndpoint, $scope.item).then(function (data) {
                    $state.go('home.permissions', {}, {reload: true});
                });
            };
            ctrl.remove = function (item) {
                Crud.delete(apiEndpoint, item).then(function (data) {
                    SweetAlert.success('Completado', 'El permiso ha sido eliminado satisfactoriamente');
                    $state.go('home.permissions', {}, {reload: true});
                });
            };


            if ($state.current.name === 'home.permissions') {
                Crud.getAll(apiEndpoint).then(function (data) {
                    $scope.permissionsTableParams = Util.generateTableParams(data.data, $scope);
                });
            } else if ($state.current.name === 'home.permissionsEdit') {
                $scope.item = $stateParams.item ? $stateParams.item : {};
            }

        })
})();
