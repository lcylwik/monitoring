(function () {
    'use strict';
    angular.module('EST.controllers')
            .controller('AdminController', function (API, Crud, Util, Config, $state, $scope, $stateParams, SweetAlert) {
                var ctrl = this;

                $scope.vari = "lianet";

                ctrl.editConfig = function () {
                    var datos = {
                        campo: "Deshabilitar",
                        valor: ctrl.timeD
                    }
                    Config.updateOrCreate(datos,1).then(function (data) {
                        $state.go('home.admin', {}, {reload: true});
                    });
                };
                
                if ($state.current.name === 'home.admin') {
                    var id="1"
                    Config.getConfig(id).then(function (data) {
                        ctrl.timeD = data.data.valor;
                    });
                }
            })
})();
