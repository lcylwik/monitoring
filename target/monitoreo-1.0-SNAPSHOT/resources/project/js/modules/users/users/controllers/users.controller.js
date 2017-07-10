(function () {
    'use strict';
    angular.module('EST.controllers')
            .controller('UsersController', function (Config,sha256, API, Auth, Util, $http, $state, $scope, $sessionStorage, $rootScope, $stateParams, SweetAlert, Crud, item) {
                var ctrl = this;
                
                ctrl.register = function () {
                    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,}/;
                    $scope.item.roleses = $scope.item.addedRoles;
                    delete $scope.item.addedRoles;
                    delete $scope.item.password_confirmation;
                    Crud.isRepeat('usersRepeat', $scope.item.name).then(function (data) {
                        if (data.data) {
                            SweetAlert.swal('Error', 'Elige otro usuario, ya ese esta registrado');
                        } else {
                            Config.getConfigID(2).then(function (datos) {
                                ctrl.minPass = datos.data.valor;
                                if ($scope.item.password.length < ctrl.minPass || !re.test($scope.item.password)) {
                                    SweetAlert.swal('Error', 'La contrasenna no cumple el formato establecido');
                                } else {
                                    $scope.item.password=sha256.convertToSHA256($scope.item.password);
                                    Auth.registerUser($scope.item).then(function (data) {
                                        $state.go('home.users', {}, {reload: true});
                                    });
                                }
                            });
                        }
                    });
                };

                ctrl.edit = function () {
                    //cleaning picklist data
                    $scope.item.roleses = $scope.item.addedRoles;
                    delete $scope.item.addedRoles;

                    Auth.editUser($scope.item).then(function (data) {
                        $state.go('home.users', {}, {reload: true});
                    });
                };
                ctrl.remove = function (item) {
                    Auth.removeUser(item).then(function (data) {
                        SweetAlert.success('Completado', 'El usuario ha sido eliminado satisfactoriamente');
                        $state.go('home.users', {}, {reload: true});
                    });
                };
                ctrl.updatePassword = function () {
                    Auth.updatePassword($scope.item.id, {
                        current_password: $scope.item.current_password,
                        password:  sha256.convertToSHA256($scope.item.password),
                        password_confirmation: sha256.convertToSHA256($scope.item.password_confirmation)
                    }).then(function (data) {
                        $state.go('home.users', {}, {reload: true});
                    });
                };
                ctrl.returnUrl = function () {
                    return $rootScope.hasPermission("users.manage") ? "home.users" : "home.myBitacoras";
                }


                if ($state.current.name === 'home.users') {
                    Auth.getUsers().then(function (data) {
                        $scope.usersTableParams = Util.generateTableParams(data.data, $scope);
                    });
                } else if ($state.current.name === 'home.usersEdit') {
                    $scope.item = item ? item : $stateParams.item ? $stateParams.item : {};
                    if ($rootScope.hasPermission("users.manage")) {
                        $scope.roles = Crud.getAll('/rol').then(function (data) {
                            $scope.roles = data.data;

                            //cleaning picklist data
                            angular.forEach($scope.item.roleses, function (element, pos) {
                                $scope.item.addedRoles[pos] = Util.getElementById(element.id, $scope.roles);
                            });
                        });
                    }
                }
            })
})();
