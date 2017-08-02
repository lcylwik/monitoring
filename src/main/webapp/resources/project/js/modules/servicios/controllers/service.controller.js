
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
                    $scope.bancosTemp = $scope.bancos;
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


                //quita todos los filtros
                ctrl.LimpiarFiltros = function () {
                    $scope.traza = [];
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.ProductoCaja = [];
                    $scope.tarjetaCaja = [];
                };

                //Borrar del arreglo temporal
                ctrl.BorrarBin = function (bin) {
                    angular.forEach($scope.bancosTemp, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                if (prefijo.name != bin.name) {
                                    console.log(prefijo.name);
                                    $scope.bancosTemp[$scope.bancosTemp.indexOf(banco)]
                                            .tipotarjetas[banco.tipotarjetas.indexOf(tarjeta)].prefijoses
                                            .splice(tarjeta.prefijoses.indexOf(prefijo), 1);

                                }
                            });
                        });
                    });
                };

                ctrl.BorrarCuenta = function (cuenta) {
                    angular.forEach($scope.bancosTemp, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            if (cuenta.name != tarjeta.name) {
                                $scope.bancosTemp[$scope.bancosTemp.indexOf(banco)]
                                        .tipotarjetas.splice(banco.tipotarjetas.indexOf(tarjeta), 1);
                            }
                        });
                    });
                };

                ctrl.BorrarServicio = function (servicio) {
                    angular.forEach($scope.bancosTemp, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (bin) {
                                angular.forEach(bin.servicios, function (service) {
                                    if (servicio.name != service.name) {
                                        $scope.bancosTemp[$scope.bancosTemp.indexOf(banco)]
                                                .tipotarjetas[banco.tipotarjetas.indexOf(tarjeta)]
                                                .prefijoses[tarjeta.prefijoses.indexOf(bin)].servicios
                                                .splice(bin.servicios.indexOf(service), 1);
                                    }
                                });
                            });
                        });
                    });
                };

                ctrl.BorrarBanco = function (banco) {
                    angular.forEach($scope.bancosTemp, function (ban) {
                        if (banco.name != ban.name) {
                            $scope.bancosTemp.splice($scope.bancosTemp.indexOf(ban), 1);
                        }
                    });
                };
                ctrl.BorrarProducto = function (producto) {
                    angular.forEach($scope.bancosTemp, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (bin) {
                                angular.forEach(bin.servicios, function (service) {
                                    if (producto.name != service.producto) {
                                        $scope.bancosTemp[$scope.bancosTemp.indexOf(banco)]
                                                .tipotarjetas[banco.tipotarjetas.indexOf(tarjeta)]
                                                .prefijoses[tarjeta.prefijoses.indexOf(bin)].servicios
                                                .splice(bin.servicios.indexOf(service), 1);
                                    }
                                });
                            });
                        });
                    });
                };

                //metodos para asignarle valores a las cajas
                ctrl.Banco = function (value, isMenu) {
                    ctrl.BorrarBanco(value);
                    console.log($scope.bancos);
                    console.log($scope.bancosTemp);
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = $scope.bancos;
                    } else {
                        arrayElement = $scope.bancosTemp;
                    }
                    console.log(value);
                    ctrl.LimpiarFiltros();
                    $scope.traza.push({id: value.id, value: value.name});
                    angular.forEach(arrayElement, function (banco) {

                        if (banco.name == value.name) {
                            $scope.bancoCaja.push(banco);
                            $scope.tarjetaCaja = banco.tipotarjetas;
                        }
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (bin) {
                                $scope.binsCaja.push(bin);
                                angular.forEach(bin.servicios, function (service) {
                                    $scope.serviciosCaja.push(service);
                                    $scope.ProductoCaja.push({name: service.producto});
                                })
                            })
                        });
                    });
                    $scope.bancosTemp = arrayElement;
                    ctrl.limpiarArray();
                };

                ctrl.Bins = function (bin, isMenu) {
                   
                    ctrl.BorrarBin(bin);
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = $scope.bancos;
                    } else {
                        arrayElement = $scope.bancosTemp;
                    }

                    ctrl.LimpiarFiltros();
                    console.log(arrayElement);
                    $scope.traza.push({id: bin.id, value: bin.name});
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
                    angular.forEach(arrayElement, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                if (prefijo.name == bin.name) {
                                    $scope.tarjetaCaja.push(tarjeta);
                                    $scope.bancoCaja.push(banco);
                                }
                            });
                        });
                    });
                    $scope.bancosTemp = arrayElement;
                    ctrl.limpiarArray();
                };

                ctrl.TTarjeta = function (cuenta, isMenu) {
                    ctrl.BorrarCuenta(cuenta);
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = $scope.bancos;
                    } else {
                        arrayElement = $scope.bancosTemp;
                    }

                    console.log(cuenta);
                    ctrl.LimpiarFiltros();
                    $scope.traza.push({id: cuenta.id, value: cuenta.name});
                    $scope.tarjetaCaja.push(cuenta);
                    $scope.binsCaja = cuenta.prefijoses;
                    angular.forEach(arrayElement, function (banco) {
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
                    $scope.bancosTemp = arrayElement;
                    ctrl.limpiarArray();
                };
                ctrl.Servicio = function (service, isMenu) {
                    ctrl.BorrarServicio(service);
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = $scope.bancos;
                    } else {
                        arrayElement = $scope.bancosTemp;
                    }
                    console.log(service);

                    ctrl.LimpiarFiltros();

                    $scope.traza.push({id: service.id, value: service.name});
                    $scope.serviciosCaja.push(service);
                    if (service.producto == 'ALL') {
                        $scope.ProductoCaja.push({name: 'POS'});
                        $scope.ProductoCaja.push({name: 'ATM'});
                    } else {
                        $scope.ProductoCaja.push({name: service.producto});
                    }
                    $scope.ProductoCaja.push(service.producto);
                    angular.forEach(arrayElement, function (banco) {
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
                    $scope.bancosTemp = arrayElement;
                    ctrl.limpiarArray();
                };
                ctrl.Producto = function (producto, isMenu) {
                     console.log(producto);
                    ctrl.BorrarProducto(producto);
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = $scope.bancos;
                    } else {
                        arrayElement = $scope.bancosTemp;
                    }
                    console.log(producto);

                    ctrl.LimpiarFiltros();

                    $scope.traza.push({id: "idProducto", value: producto.name});
                    if (producto.name == 'ALL') {
                        $scope.ProductoCaja.push({name: 'POS'});
                        $scope.ProductoCaja.push({name: 'ATM'});
                    } else {
                        $scope.ProductoCaja.push({name: producto.name});
                    }

                    angular.forEach(arrayElement, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                angular.forEach(prefijo.servicios, function (servicios) {
                                    if (servicios.producto == producto.name) {
                                        $scope.serviciosCaja.push(servicios);
                                        $scope.tarjetaCaja.push(tarjeta);
                                        $scope.bancoCaja.push(banco);
                                        $scope.binsCaja.push(prefijo);
                                    }
                                })
                            })

                        })
                    });
                    $scope.bancosTemp = arrayElement;
                    ctrl.limpiarArray();
                };


                if ($state.current.name === 'home.service') {
                    $scope.traza = [];
                    ctrl.getBancos();
                    ctrl.getAllTipoTarjeta();
                    ctrl.getAllPrefijo();
                    ctrl.getAllService();
                    console.log($scope.bancosTemp);


                }


            });
})();