(function () {
    'use strict';
    angular.module('EST.controllers')
            .controller('UsersController', function (Config, API, Auth, Util, $http, $state, $scope, $sessionStorage, $rootScope, $stateParams, SweetAlert, Crud, item) {
                var ctrl = this;

                ctrl.register = function () {
                    //cleaning picklist data
                    $scope.item.roleses = $scope.item.addedRoles;
                    delete $scope.item.addedRoles;
                    delete $scope.item.password_confirmation;
                    if (ctrl.check($scope.item.password)) {
                        Auth.registerUser($scope.item).then(function (data) {
                            $state.go('home.users', {}, {reload: true});
                        });
                    } else {
                        SweetAlert.swal('Error', 'La contraseņa no cumple con el formato establecido');
                    }

                };


                ctrl.check = function checkPassword(str)
                {
                    Config.getConfigID(2).then(function (data) {
                        ctrl.minPass = data.data.valor;
                    });
                    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
                    return re.test(str);
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
                        password: $scope.item.password,
                        password_confirmation: $scope.item.password_confirmation
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
