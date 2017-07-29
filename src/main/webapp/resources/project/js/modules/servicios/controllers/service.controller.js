
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

                ctrl.limpiarArray = function () {
                    $scope.binsCaja = $scope.binsCaja.removeDuplicates("name");
                    $scope.serviciosCaja = $scope.serviciosCaja.removeDuplicates("name");
                    $scope.bancoCaja = $scope.bancoCaja.removeDuplicates("name");
                    $scope.ProductoCaja = $scope.ProductoCaja.removeDuplicates("name");
                    $scope.tarjetaCaja = $scope.tarjetaCaja.removeDuplicates("name");
                };


                ctrl.Banco = function (value) {
                    console.log(value);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.ProductoCaja = [];

                    $scope.tarjetaCaja = value.tipotarjetas;
                    $scope.bancoCaja.push(value);
                    angular.forEach(value.tipotarjetas, function (tarjeta) {
                        angular.forEach(tarjeta.prefijoses, function (bin) {
                            $scope.binsCaja.push(bin);
                            angular.forEach(bin.servicios, function (service) {
                                $scope.serviciosCaja.push(service);
                                $scope.ProductoCaja.push({name: service.producto});
                            })
                        })
                    });
                    ctrl.limpiarArray();
                };

                ctrl.Bins = function (bin) {
                    console.log(bin);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.tarjetaCaja = []
                    $scope.ProductoCaja = [];

                    $scope.binsCaja.push(bin);
                    $scope.serviciosCaja = bin.servicios;
                    angular.forEach(bin.servicios, function (servicio) {
                        if (servicio.producto == 'ALL') {
                            $scope.ProductoCaja.push({name: 'POS'});
                            $scope.ProductoCaja.push({name: 'ATM'});
                        } else {
                            $scope.ProductoCaja.push({name: servicio.producto});
                        }
                    });
                    angular.forEach($scope.bancos, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                if (prefijo.name == bin.name) {
                                    $scope.tarjetaCaja.push(tarjeta);
                                    $scope.bancoCaja.push(banco);
                                }
                            });
                        });
                    });
                    ctrl.limpiarArray();
                };

                ctrl.TTarjeta = function (cuenta) {
                    console.log(cuenta);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.tarjetaCaja = [];
                    $scope.ProductoCaja = [];

                    $scope.tarjetaCaja.push(cuenta);
                    $scope.binsCaja = cuenta.prefijoses;

                    angular.forEach($scope.bancos, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            if (tarjeta.name == cuenta.name) {
                                $scope.bancoCaja.push(banco);
                            }
                        });
                    });
                    angular.forEach($scope.binsCaja, function (prefijo) {
                        angular.forEach(prefijo.servicios, function (service) {
                            $scope.serviciosCaja.push(service);
                            if (service.producto == 'ALL') {
                                $scope.ProductoCaja.push({name: 'POS'});
                                $scope.ProductoCaja.push({name: 'ATM'});
                            } else {
                                $scope.ProductoCaja.push({name: service.producto});
                            }

                        });
                    });
                    ctrl.limpiarArray();
                };

                ctrl.Servicio = function (service) {
                    console.log(service);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.tarjetaCaja = [];
                    $scope.ProductoCaja = [];

                    $scope.serviciosCaja.push(service);
                    if (service.producto == 'ALL') {
                        $scope.ProductoCaja.push({name: 'POS'});
                        $scope.ProductoCaja.push({name: 'ATM'});
                    } else {
                        $scope.ProductoCaja.push({name: service.producto});
                    }
                    $scope.ProductoCaja.push(service.producto);

                    angular.forEach($scope.bancos, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                angular.forEach(prefijo.servicios, function (servicios) {
                                    if (servicios.name == service.name) {
                                        $scope.tarjetaCaja.push(tarjeta);
                                        $scope.bancoCaja.push(banco);
                                        $scope.binsCaja.push(prefijo);
                                    }
                                });
                            });
                        });
                    });
                    ctrl.limpiarArray();
                };

                ctrl.Producto = function (producto) {
                    console.log(producto);
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.tarjetaCaja = [];
                    $scope.ProductoCaja = [];

                    if (producto == 'ALL') {
                        $scope.ProductoCaja.push({name: 'POS'});
                        $scope.ProductoCaja.push({name: 'ATM'});
                    } else {
                        $scope.ProductoCaja.push({name: producto});
                    }

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
                    });
                    ctrl.limpiarArray();
                };


                if ($state.current.name === 'home.service') {
                    ctrl.getBancos();
                    ctrl.getAllTipoTarjeta();
                    ctrl.getAllPrefijo();
                    ctrl.getAllService();
                }


            });
})();