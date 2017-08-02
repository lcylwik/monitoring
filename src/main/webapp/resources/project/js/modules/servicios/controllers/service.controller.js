
(function () {
    angular.module('EST.controllers')
            .controller('ESTService', function ($scope, $timeout, Crud, EST, Util, TXN, SweetAlert, ngTableParams, $state, $filter, $sessionStorage) {
                var ctrl = this;
                ctrl.bancos = [];
                ctrl.tipotarjeta = [];
                ctrl.prefijo = [];
                ctrl.service = [];
                ctrl.traza = [];
                ctrl.binsCaja = [];
                ctrl.serviciosCaja = [];
                ctrl.bancoCaja = [];
                ctrl.tarjetaCaja = [];
                ctrl.ProductoCaja = [];
                ctrl.bancosTemp = [];

                //obtener los bancos
                ctrl.getBancos = function () {
                    Crud.getAll('/banco').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            ctrl.bancos.push(element);
                            ctrl.bancosTemp.push(element);
                        });
                    });
                };
                //obtener los tipoTarjeta
                ctrl.getAllTipoTarjeta = function () {
                    Crud.getAll('/tipotarjeta').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            ctrl.tipotarjeta.push(element);
                        });
                    });
                };
                //obtener los prefijo
                ctrl.getAllPrefijo = function () {
                    Crud.getAll('/prefijo').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            ctrl.prefijo.push(element);
                        });
                    });
                };
                //obtener los servicios
                ctrl.getAllService = function () {
                    Crud.getAll('/service').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            ctrl.service.push(element);
                        });
                    });
                };

                ctrl.limpiarArray = function () {
                    ctrl.binsCaja = ctrl.binsCaja.removeDuplicates("name");
                    ctrl.serviciosCaja = ctrl.serviciosCaja.removeDuplicates("name");
                    ctrl.bancoCaja = ctrl.bancoCaja.removeDuplicates("name");
                    ctrl.ProductoCaja = ctrl.ProductoCaja.removeDuplicates("name");
                    ctrl.tarjetaCaja = ctrl.tarjetaCaja.removeDuplicates("name");
                };
                //Al dar click en el elemento de las cajas


                //quita todos los filtros
                ctrl.LimpiarFiltros = function () {

                    ctrl.binsCaja = [];
                    ctrl.serviciosCaja = [];
                    ctrl.bancoCaja = [];
                    ctrl.ProductoCaja = [];
                    ctrl.tarjetaCaja = [];
                };

                //Borrar del arreglo temporal
                ctrl.BorrarBin = function (bin) {
                    angular.forEach(ctrl.bancosTemp, function (banco, posB) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta, posT) {
                            ctrl.bancosTemp[posB].tipotarjetas[posT].prefijoses = tarjeta.prefijoses
                                    .filter(function (prefijo) {
                                        return prefijo.name === bin.name;
                                    });
                        });
                    });
               
                };

                ctrl.BorrarCuenta = function (cuenta) {
                 
                    angular.forEach(ctrl.bancosTemp, function (banco, posB) {
                        ctrl.bancosTemp[posB].tipotarjetas = banco.tipotarjetas.filter(function (tarjeta) {
                            return tarjeta.name === cuenta.name;
                        });
                    });
                
                };

                ctrl.BorrarServicio = function (servicio) {
                    angular.forEach(ctrl.bancosTemp, function (banco, bancoPos) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta, tarjetaPos) {
                            angular.forEach(tarjeta.prefijoses, function (bin, binPos) {
                                ctrl.bancosTemp[bancoPos]
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
                    ctrl.bancosTemp = ctrl.bancosTemp.filter(function (ban, pos) {
                        return ban.name === banco.name;
                    });
                 
                };

                ctrl.BorrarProducto = function (producto) {
                    angular.forEach(ctrl.bancosTemp, function (banco, posB) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta, posT) {
                            angular.forEach(tarjeta.prefijoses, function (bin, posP) {
                                ctrl.bancosTemp[posB].tipotarjetas[posT].prefijoses[posP].servicios = bin.servicios.
                                        filter(function (service) {
                                            return service.producto === producto.name;
                                        });
                            });
                        });
                    });
                };

              
             
                //metodos para asignarle valores a las cajas
                ctrl.Banco = function (value, isMenu) {
                    var arrayElement = [];
                    if (isMenu) {
                        ctrl.LimpiarFiltros();
                        arrayElement = ctrl.bancos;
                        ctrl.bancosTemp = ctrl.bancos.clone();
                        ctrl.BorrarBanco(value);

                        ctrl.traza = [];
                        ctrl.traza.push({id: value.idbanco, value: value.name});
                    } else {
                        ctrl.BorrarBanco(value);
                        arrayElement = ctrl.bancosTemp.clone();
                        ctrl.traza.push({id: value.idbanco, value: value.name});
                        ctrl.traza.removeDuplicates("value");
                    }

                    angular.forEach(arrayElement, function (banco) {
                        if (banco.name == value.name) {
                            ctrl.bancoCaja.push(banco);
                            angular.forEach(banco.tipotarjetas, function (tarjeta) {
                                ctrl.tarjetaCaja.push(tarjeta);
                                angular.forEach(tarjeta.prefijoses, function (bin) {
                                    ctrl.binsCaja.push(bin);
                                    angular.forEach(bin.servicios, function (service) {
                                        ctrl.serviciosCaja.push(service);
                                        ctrl.ProductoCaja.push({name: service.producto});
                                    });
                                });
                            });
                        }
                    });
                   
                    ctrl.limpiarArray();
                };

                ctrl.Bins = function (bin, isMenu) {
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = ctrl.bancos.clone();
                        ctrl.bancosTemp = ctrl.bancos.clone();
                        ctrl.BorrarBin(bin);

                        ctrl.traza = [];
                        ctrl.traza.push({id: bin.id, value: bin.name});
                    } else {
                        ctrl.BorrarBin(bin);
                        arrayElement = ctrl.bancosTemp.clone();
                        ctrl.traza.push({id: bin.id, value: bin.name});
                        ctrl.traza.removeDuplicates("value");
                    }

                    ctrl.LimpiarFiltros();

                    ctrl.binsCaja.push(bin);
                    ctrl.serviciosCaja = bin.servicios;
                    angular.forEach(bin.servicios, function (servicio) {
                        if (servicio.producto == 'ALL') {
                            ctrl.ProductoCaja.push({name: 'POS'});
                            ctrl.ProductoCaja.push({name: 'ATM'});
                        } else {
                            ctrl.ProductoCaja.push({name: servicio.producto});
                        }
                    });
                    angular.forEach(arrayElement, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                if (prefijo.name == bin.name) {
                                    ctrl.tarjetaCaja.push(tarjeta);
                                    ctrl.bancoCaja.push(banco);
                                }
                            });
                        });
                    });
                    ctrl.limpiarArray();
                };

                ctrl.TTarjeta = function (cuenta, isMenu) {
                    
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = ctrl.bancos.clone();
                        ctrl.bancosTemp = ctrl.bancos.clone();
                        ctrl.BorrarCuenta(cuenta);

                        ctrl.traza = [];
                        ctrl.traza.push({id: cuenta.id, value: cuenta.name});
                    } else {
                        ctrl.BorrarCuenta(cuenta);
                        arrayElement = ctrl.bancosTemp.clone();
                        ctrl.traza.push({id: cuenta.id, value: cuenta.name});
                        ctrl.traza.removeDuplicates("value");
                    }

                   
                    ctrl.LimpiarFiltros();

                    ctrl.tarjetaCaja.push(cuenta);
                    ctrl.binsCaja = cuenta.prefijoses;
                    angular.forEach(arrayElement, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            if (tarjeta.name == cuenta.name) {
                                ctrl.bancoCaja.push(banco);
                            }
                        });
                    });
                    angular.forEach(ctrl.binsCaja, function (prefijo) {
                        angular.forEach(prefijo.servicios, function (service) {
                            ctrl.serviciosCaja.push(service);
                            if (service.producto == 'ALL') {
                                ctrl.ProductoCaja.push({name: 'POS'});
                                ctrl.ProductoCaja.push({name: 'ATM'});
                            } else {
                                ctrl.ProductoCaja.push({name: service.producto});
                            }

                        });
                    });
                    ctrl.bancosTemp = arrayElement;
                    ctrl.limpiarArray();
                };

                ctrl.Servicio = function (service, isMenu) {

                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = ctrl.bancos.clone();
                        ctrl.bancosTemp = ctrl.bancos.clone();
                        ctrl.BorrarServicio(service);

                        ctrl.traza = [];
                        ctrl.traza.push({value: service.name});
                    } else {
                       
                        ctrl.BorrarServicio(service);
                        arrayElement = ctrl.bancosTemp.clone();
                        ctrl.traza.push({value: service.name});
                        ctrl.traza.removeDuplicates("value");
                    }
                  
                    ctrl.LimpiarFiltros();
                    ctrl.serviciosCaja.push(service);
                    if (service.producto == 'ALL') {
                        ctrl.ProductoCaja.push({name: 'POS'});
                        ctrl.ProductoCaja.push({name: 'ATM'});
                    } else {
                        ctrl.ProductoCaja.push({name: service.producto});
                    }
                    ctrl.ProductoCaja.push(service.producto);
                    angular.forEach(arrayElement, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                angular.forEach(prefijo.servicios, function (servicios) {
                                    if (servicios.name == service.name) {
                                        ctrl.tarjetaCaja.push(tarjeta);
                                        ctrl.bancoCaja.push(banco);
                                        ctrl.binsCaja.push(prefijo);
                                    }
                                });
                            });
                        });
                    });
                    ctrl.limpiarArray();
                };

                ctrl.Producto = function (producto, isMenu) {
                    var arrayElement = [];
                    if (isMenu) {
                        arrayElement = ctrl.bancos.clone();
                        ctrl.bancosTemp = ctrl.bancosTemp.clone();
                        ctrl.BorrarProducto(producto);

                        ctrl.traza = [];
                        ctrl.traza.push({id: "idProducto", value: producto.name});
                    } else {
                        arrayElement = ctrl.bancosTemp.clone();
                        ctrl.BorrarProducto(producto);
                        ctrl.traza.push({id: "idProducto", value: producto.name});
                        ctrl.traza.removeDuplicates("value");
                    }

                    ctrl.LimpiarFiltros();

                    if (producto.name == 'ALL') {
                        ctrl.ProductoCaja.push({name: 'POS'});
                        ctrl.ProductoCaja.push({name: 'ATM'});
                    } else {
                        ctrl.ProductoCaja.push({name: producto.name});
                    }

                    angular.forEach(arrayElement, function (banco) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta) {
                            angular.forEach(tarjeta.prefijoses, function (prefijo) {
                                angular.forEach(prefijo.servicios, function (servicios) {
                                    if (servicios.producto == producto.name || producto.name == "ALL") {
                                        ctrl.serviciosCaja.push(servicios);
                                        ctrl.tarjetaCaja.push(tarjeta);
                                        ctrl.bancoCaja.push(banco);
                                        ctrl.binsCaja.push(prefijo);
                                    }
                                })
                            })

                        })
                    });

                    ctrl.limpiarArray();
                };






                if ($state.current.name === 'home.service') {
                    ctrl.traza = [];
                    ctrl.getBancos();
                    ctrl.getAllTipoTarjeta();
                    ctrl.getAllPrefijo();
                    ctrl.getAllService();
                }


            });
})();