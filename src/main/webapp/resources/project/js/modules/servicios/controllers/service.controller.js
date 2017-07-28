
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

                ctrl.Banco = function (value) {
                    console.log(value);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];

                    $scope.tarjetaCaja = value.tipotarjetas;
                    $scope.bancoCaja.push(value);

                    angular.forEach(value.tipotarjetas, function (tarjeta) {
                        angular.forEach(tarjeta.prefijoses, function (bin) {
                            $scope.binsCaja.push(bin);
                            angular.forEach(bin.servicios, function (service) {
                                $scope.serviciosCaja.push(service);
                            })
                        })
                    });
                };

                ctrl.Bins = function (bin) {
                    console.log(bin);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.tarjetaCaja = []

                    $scope.binsCaja.push(bin);
                    $scope.serviciosCaja = bin.servicios;
                    angular.forEach($scope.bancos, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                if (prefijo.name == bin.name) {
                                    $scope.tarjetaCaja.push(tarjeta);
                                    $scope.bancoCaja.push(banco);
                                }
                            });
                        })
                    })
                };

                ctrl.TTarjeta = function (cuenta) {
                    console.log(cuenta);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.tarjetaCaja = []

                    $scope.tarjetaCaja.push(cuenta);
                    $scope.binsCaja = cuenta.prefijoses;

                    angular.forEach($scope.bancos, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            if (tarjeta.name == cuenta.name) {
                                $scope.bancoCaja.push(banco);
                            }
                        })
                    })
                    angular.forEach($scope.binsCaja, function (prefijo) {
                        angular.forEach(prefijo.servicios, function (service) {
                            $scope.serviciosCaja.push(service);
                        })
                    })
                };

                ctrl.Servicio = function (service) {
                    console.log(service);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.tarjetaCaja = [];

                    $scope.serviciosCaja.push(service);

                    angular.forEach($scope.bancos, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                angular.forEach(prefijo.servicios, function (servicios) {
                                    if (servicios.name == service.name) {
                                        $scope.tarjetaCaja.push(tarjeta);
                                        $scope.bancoCaja.push(banco);
                                        $scope.binsCaja.push(prefijo);
                                    }
                                })
                            })

                        })
                    })

                };

                ctrl.Producto = function (producto) {
                    console.log(producto);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.tarjetaCaja = [];

                    angular.forEach($scope.bancos, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                angular.forEach(prefijo.servicios, function (servicios) {
                                    if (servicios.producto == producto) {
                                        $scope.serviciosCaja.push(servicios);
                                        $scope.tarjetaCaja.push(tarjeta);
                                        $scope.bancoCaja.push(banco);
                                        $scope.binsCaja.push(prefijo);
                                    }
                                })
                            })

                        })
                    })

                };


                if ($state.current.name === 'home.service') {
                    ctrl.getBancos();
                    ctrl.getAllTipoTarjeta();
                    ctrl.getAllPrefijo();
                    ctrl.getAllService();
                }


            });
})();