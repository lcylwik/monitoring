(function () {
    'use strict';
    angular.module('EST.controllers')
            .controller('AdminController', function (API, Crud, Util, Config, $state, $scope, $stateParams, SweetAlert) {
                var ctrl = this;

                $scope.vari = "lianet";

                ctrl.editConfig = function (campo, valor, id) {
                    var datos = {
                        campo: campo,
                        valor: valor
                    }
                    Config.updateOrCreate(datos, id).then(function (data) {
                        $state.go('home.admin', {}, {reload: true});
                    });
                };

                if ($state.current.name === 'home.admin') {
                    Config.getConfig().then(function (data) {
                        angular.forEach(data.data, function (element) {
                            console.log(element.idC);
                            if (element.idC == 1) {
                                ctrl.timeD = element.valor;
                            } else if (element.idC == 2) {
                                ctrl.minPass = element.valor;
                            }
                        });
                    });
                }

            })
})();
