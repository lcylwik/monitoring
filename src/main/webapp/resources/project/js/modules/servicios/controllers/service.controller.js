
(function () {
    angular.module('EST.controllers')
            .controller('ESTService', function ($scope, Crud, EST, Util, TXN, SweetAlert, ngTableParams, $state, $filter, $sessionStorage) {
                var ctrl = this;
                $scope.bancos = [];
                $scope.tipotarjeta = [];
                $scope.prefijo = [];
                $scope.service = [];


                //obtener los bancos
                ctrl.getBancos = function () {
                    Crud.getAll('/banco').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            $scope.bancos.push(element);
                        });
                    });
                };

                //obtener los tipoTarjeta
                ctrl.getAllTipoTarjeta = function () {
                    Crud.getAll('/tipotarjeta').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            $scope.tipotarjeta.push(element);
                        });
                    });
                };

                //obtener los prefijo
                ctrl.getAllPrefijo = function () {
                    Crud.getAll('/prefijo').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            $scope.prefijo.push(element);
                        });
                    });
                };
                //obtener los servicios
                ctrl.getAllService = function () {
                    Crud.getAll('/service').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            $scope.service.push(element);
                        });
                    });
                };


                if ($state.current.name === 'home.service') {
                    ctrl.getBancos();
                    ctrl.getAllTipoTarjeta();
                    ctrl.getAllPrefijo();
                    ctrl.getAllService();
                    console.log($scope.bancos);
                }


            });
})();