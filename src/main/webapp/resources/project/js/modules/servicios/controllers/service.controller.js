
(function () {
    angular.module('EST.controllers')
            .controller('ESTService', function ($scope, Crud, EST, Util, TXN, SweetAlert, ngTableParams, $state, $filter, $sessionStorage) {
                var ctrl = this;
                $scope.bancos = [];
                $scope.tipotarjeta = [];
                $scope.prefijo = [];
                $scope.service = [];
                $scope.traza = [];
                $scope.binsCaja = [];
                $scope.serviciosCaja = [];
                $scope.bancoCaja = [];
                $scope.tarjetaCaja = [];
                $scope.ProductoCaja = [];

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
                //Al dar click en el elemento de las cajas
                ctrl.ElementCaja = function (value, tipo) {
                    var contbanco = 0;
                    if (tipo == "banco") {
                        $scope.bancoCaja = [];
                        ctrl.Banco(value);
                    } else if (tipo == "tipotarjeta") {
                        $scope.tarjetaCaja = [];
                        ctrl.TTarjeta(value);
                    }
                };

                //quita todos los filtros
                ctrl.LimpiarFiltros = function () {
                    $scope.traza = [];
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.ProductoCaja = [];
                    $scope.tarjetaCaja = [];
                };

                //Al dar click en el menu
                ctrl.Banco = function (value) {
                    console.log(value);
                    ctrl.LimpiarFiltros();
                    $scope.traza.push({id: "banco", value: value.name});
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

                    ctrl.LimpiarFiltros();
                    console.log(bin);
                    $scope.traza.push({id: "bin", value: bin.name});
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

                    ctrl.LimpiarFiltros();
                    $scope.traza.push({id: "cuenta", value: cuenta.name});
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

                    ctrl.LimpiarFiltros();

                    $scope.traza.push({id: "service", value: service.name});
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

                    ctrl.LimpiarFiltros();
                    
                    $scope.traza.push({id: "producto", value: producto.name});
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
                    $scope.traza = [];
                    ctrl.getBancos();
                    ctrl.getAllTipoTarjeta();
                    ctrl.getAllPrefijo();
                    ctrl.getAllService();
                }


            });
})();