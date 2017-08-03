
(function () {
    angular.module('EST.controllers')
            .controller('ESTService', function ($scope, $timeout, Crud, EST, Util, TXN, SweetAlert, ngTableParams, $state, $filter, $sessionStorage) {
                var ctrl = this;
                //inicializar variable
                ctrl.bancos = [];
                ctrl.tipotarjeta = [];
                ctrl.prefijo = [];
                ctrl.service = [];
                $scope.traza = [];
                
                ctrl.showFilters=false;

                var contador = 0;

                $scope.binsCaja = [];
                $scope.serviciosCaja = [];
                $scope.bancoCaja = [];
                $scope.ProductoCaja = [];
                $scope.tarjetaCaja = [];

                ctrl.initFilter = function () {
                    $scope.filtros = {
                        banco: "",
                        tarjeta: "",
                        bin: "",
                        servicio: "",
                        producto: ""
                    };
                };

                //obtener los bancos
                ctrl.getBancos = function () {
                    Crud.getAll('/banco').then(function (event) {
                        angular.forEach(event.data, function (element) {
                            ctrl.bancos.push(element);
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

                ctrl.AdicionarFiltro = function (element, tipo, isMenu) {
                    contador++;
                    if (tipo == 'banco') {
                        $scope.filtros.banco = element;
                        $scope.lugarBanco = contador;
                    } else if (tipo == 'tarjeta') {
                        $scope.filtros.tarjeta = element;
                        $scope.lugarTarjeta = contador;
                    } else if (tipo == 'bin') {
                        $scope.filtros.bin = element;
                        $scope.lugarBin = contador;
                    } else if (tipo == 'servicio') {
                        $scope.filtros.servicio = element;
                        $scope.lugarServicio = contador;
                    } else if (tipo == 'producto') {

                        $scope.filtros.producto = element;
                        $scope.lugarProducto = contador;
                    }
                };

                ctrl.PintarCajas = function (element, tipo, isMenu) {
                    ctrl.showFilters=true;
                    if (isMenu) {
                        ctrl.initFilter();
                        $scope.traza = [];
                        contador = 0;
                    }
                    if ($scope.traza.indexOf(element) === -1) {
                        $scope.traza.push(element);
                    }
                    console.log('ctrl.bancos',ctrl.bancos);
                    ctrl.LimpiarCajas();
                    ctrl.AdicionarFiltro(element, tipo, isMenu);
                    angular.forEach(ctrl.bancos, function (banco, posB) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta, posT) {
                            angular.forEach(tarjeta.prefijoses, function (bin, posBin) {
                                angular.forEach(bin.servicios, function (service, posS) {
                                     console.log('bin',bin);
                                    var obj = {
                                        banco: ctrl.bancos[posB].name,
                                        tarjeta: banco.tipotarjetas[posT].name,
                                        bin: tarjeta.prefijoses[posBin].name,
                                        servicio: bin.servicios[posS].name,
                                        producto: bin.servicios[posS].producto};
                                    if (ctrl.checkFiltros(obj)) {
                                        console.log(obj);
                                        if ($scope.binsCaja.indexOf(obj.bin) === -1) {
                                            $scope.binsCaja.push(obj.bin);
                                        }
                                        if ($scope.serviciosCaja.indexOf(obj.servicio) === -1) {
                                            $scope.serviciosCaja.push(obj.servicio);
                                        }
                                        if ($scope.bancoCaja.indexOf(obj.banco) === -1) {
                                            $scope.bancoCaja.push(obj.banco);
                                        }
                                        if ($scope.tarjetaCaja.indexOf(obj.tarjeta) === -1) {
                                            $scope.tarjetaCaja.push(obj.tarjeta);
                                        }
                                        if ($scope.ProductoCaja.indexOf(obj.producto) === -1) {
                                            $scope.ProductoCaja.push(obj.producto);
                                        }
                                    }
                                });
                            });
                        });
                    });
                };

                ctrl.checkFiltros = function (object) {
                    var flats = true;
                    console.log($scope.filtros, "==", object);
                    for (var item in object) {
                        console.log(item);
                        if (object.hasOwnProperty(item)) {
                            //  console.log($scope.filtros[item], "==", object[item]);
                            if ($scope.filtros[item] !== object[item] && $scope.filtros[item] !== "") {
                                flats = false;
                                break;
                            }
                        }
                    }
                    console.log(flats);
                    return flats;
                };

                ctrl.LimpiarCajas = function () {
                    $scope.binsCaja = [];
                    $scope.serviciosCaja = [];
                    $scope.bancoCaja = [];
                    $scope.ProductoCaja = [];
                    $scope.tarjetaCaja = [];
                };

                ctrl.LimpiarFiltros = function () {
                    if ($scope.lugarBanco !== 1) {
                        $scope.bancoCaja = [];
                    }
                    if ($scope.lugarTarjeta !== 1) {
                        $scope.tarjetaCaja = [];
                    }
                    if ($scope.lugarBin !== 1) {
                        $scope.binsCaja = [];
                    }
                    if ($scope.lugarServicio !== 1) {
                        $scope.serviciosCaja = [];
                    }
                    if ($scope.lugarProducto !== 1) {
                        $scope.ProductoCaja = [];
                    }
                    var lenth = $scope.traza.length;
                    for (var i = 0, max = lenth - 1; i < max; i++) {
                        $scope.traza.pop();
                    }
                }

                if ($state.current.name === 'home.service') {
                    ctrl.traza = [];
                    ctrl.getBancos();
                    ctrl.getAllTipoTarjeta();
                    ctrl.getAllPrefijo();
                    ctrl.getAllService();
                    ctrl.initFilter();
                }


            });
})();