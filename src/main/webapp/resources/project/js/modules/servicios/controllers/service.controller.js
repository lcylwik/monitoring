
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

                ctrl.showFilters = false;

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
                    if (tipo == 'banco') {
                        $scope.filtros.banco = element;

                    } else if (tipo == 'tarjeta') {
                        $scope.filtros.tarjeta = element;

                    } else if (tipo == 'bin') {
                        $scope.filtros.bin = element;

                    } else if (tipo == 'servicio') {
                        $scope.filtros.servicio = element;

                    } else if (tipo == 'producto') {
                        $scope.filtros.producto = element;

                    }
                };

                ctrl.PintarCajas = function (element, tipo, isMenu) {
                    ctrl.showFilters = true;
                    if (isMenu) {
                        ctrl.initFilter();
                        $scope.traza = [];
                    }
                    if ($scope.traza.indexOfObject(element) === -1) {
                        $scope.traza.push({'elemento': element, 'tipo': tipo});
                    }
                    ctrl.LimpiarCajas();
                    ctrl.AdicionarFiltro(element, tipo, isMenu);
                    console.log("filtros", $scope.filtros);
                    angular.forEach(ctrl.bancos, function (banco, posB) {
                        angular.forEach(banco.tipotarjetas, function (tarjeta, posT) {
                            angular.forEach(tarjeta.prefijoses, function (bin, posBin) {
                                angular.forEach(bin.servicios, function (service, posS) {
                                    var obj = {
                                        banco: ctrl.bancos[posB].name,
                                        tarjeta: banco.tipotarjetas[posT].name,
                                        bin: tarjeta.prefijoses[posBin].name,
                                        servicio: bin.servicios[posS].name,
                                        producto: bin.servicios[posS].producto};

                                    if (ctrl.checkFiltros(obj)) {
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
                    for (var item in object) {
                        if (object.hasOwnProperty(item)) {
                            if ($scope.filtros[item] !== object[item] && $scope.filtros[item] !== "") {
                                flats = false;
                                break;
                            }
                        }
                    }
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
                    var lenth = $scope.traza.length;
                    for (var i = 0, max = lenth - 1; i < max; i++) {
                        $scope.traza.pop();
                    }
                    ctrl.PintarCajas($scope.traza[0].elemento, $scope.traza[0].tipo, true);

                }

                ctrl.ClickTraza = function (traza) {
                    var pos = $scope.traza.indexOfObject(traza.elemento);
                    var lenth = $scope.traza.length;
                    for (var i = lenth - 1; i >= 0; i--) {
                        if (i > pos) {
                            $scope.traza.pop();
                        }
                    }
                    var isMenu = true;
                    angular.forEach($scope.traza, function (traza) {
                        ctrl.PintarCajas(traza.elemento, traza.tipo, isMenu);
                        isMenu = false;
                    });
                };

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