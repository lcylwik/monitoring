
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
                $scope.bancosTemp=[];

                //obtener los bancos
                ctrl.getBancos = function () {
                    Crud.getAll('/banco').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            $scope.bancos.push(element);
                            $scope.bancosTemp.push(element);
                        });
                    });
                   
                     console.log('$scope.bancos',$scope.bancos);
                    console.log('$scope.bancosTemp',$scope.bancosTemp);
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
                    console.log('borrar',$scope.bancosTemp);
                    angular.forEach($scope.bancosTemp, function (banco,posB) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta,posT) {
                           $scope.bancosTemp[posB].tipotarjetas[posT].prefijoses=tarjeta.prefijoses
                                   .filter(function (prefijo) {
                                return prefijo.name === bin.name;
                            });
                        });
                    });
                    
                };

                ctrl.BorrarCuenta = function (cuenta) {
                    angular.forEach($scope.bancosTemp, function (banco,posB) {
                        $scope.bancosTemp[posB].tipotarjetas = banco.tipotarjetas.filter(function (tarjeta) {
                            return tarjeta.name === cuenta.name;
                        });
                    });
                    console.log('$scope.bancosTemp',$scope.bancosTemp)
                };

                ctrl.BorrarServicio = function (servicio) {
                    angular.forEach($scope.bancosTemp, function (banco, bancoPos) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta, tarjetaPos) {
                            angular.forEach(tarjeta.prefijoses, function (bin, binPos) {
                                $scope.bancosTemp[bancoPos]
                                        .tipotarjetas[tarjetaPos]
                                        .prefijoses[binPos]
                                        .servicios = bin.servicios.filter(function (service) {
                                            return service.name === servicio.name;
                                        });
                            });
                        });
                    });



                };

                ctrl.BorrarBanco = function (banco) {
                    $scope.bancosTemp = $scope.bancosTemp.filter(function (ban, pos) {
                        return ban.name === banco.name;
                    });

                };
                ctrl.BorrarProducto = function (producto) {
                    angular.forEach($scope.bancosTemp, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (bin) {
                                bin.servicios = bin.servicios.filter(function (service) {
                                    return service.producto === producto.name;
                                });
                            });
                        });
                    });
                };

                //metodos para asignarle valores a las cajas
                ctrl.Banco = function (value, isMenu) {
                    ctrl.BorrarBanco(value);
                    
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = $scope.bancos;
                    } else {
                        arrayElement = $scope.bancosTemp;
                        console.log("esteeeeeeeee", arrayElement);
                        console.log("esteeeeeeeee", $scope.bancos);
                    }

                    ctrl.LimpiarFiltros();
                    $scope.traza.push({id: value.idbanco, value: value.name});
                    angular.forEach(arrayElement, function (banco) {

                        if (banco.name == value.name) {
                            $scope.bancoCaja.push(banco);
                            $scope.tarjetaCaja = banco.tipotarjetas;
                            
                            angular.forEach(banco.tipotarjetas, function (tarjeta) {
                                angular.forEach(tarjeta.prefijoses, function (bin) {
                                    $scope.binsCaja.push(bin);
                                    angular.forEach(bin.servicios, function (service) {
                                        $scope.serviciosCaja.push(service);
                                        $scope.ProductoCaja.push({name: service.producto});
                                    })
                                })
                            });

                        }
                    });
                    ctrl.limpiarArray();
                };

                ctrl.Bins = function (bin, isMenu) {

                   // ctrl.BorrarBin(bin);
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = $scope.bancos;
                    } else {
                        console.log("no es menu",$scope.bancosTemp)
                        arrayElement = $scope.bancosTemp;
                    }

                    ctrl.LimpiarFiltros();
                    console.log('ctrl.Bins',arrayElement);
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
                                    if (servicios.producto == producto.name || producto.name == "ALL") {
                                        console.log(servicios.producto)
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
                    ctrl.getAllService();;


                }


            });
})();