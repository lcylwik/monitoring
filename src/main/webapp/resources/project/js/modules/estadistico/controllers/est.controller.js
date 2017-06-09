
(function () {
    angular.module('EST.controllers')
            .controller('ESTController', function ($scope, EST, Util, TXN, SweetAlert, ngTableParams, $state, $filter, $sessionStorage) {
                var ctrl = this;

                ctrl.visibleNames = {
                    id: "Identificador",
                    prtFilename: "Archivo",
                    prtProcDte: "Fecha",
                    fiidEmisor: "FIID Emisor",
                    fiidAdquiriente: "FIID Adquiriente",
                    redLogica: "Red Logica",
                    codigoRespuesta: "Codigo de Respuesta",
                    numeroPrsaAdquiriente: "Numero Prosa Adquiriente",
                    numeroPrsaEmisor: "Numero Prosa Emisor"
                }
                $scope.onTimeSet = function (newDate, oldDate, field) {
                    ctrl[field] = false;
                }

                $scope.filtersDate = {
                    firstDate: moment().subtract(15, 'days').toDate(),
                    lastDate: moment().toDate()
                };
                $scope.filters = {};

                $scope.$watch('filtersDate', function () {
                    ctrl.getTXN();
                    ctrl.initCatalogo();
                    ctrl.generateData();
                    //  tctrl.generateChart();
                }, true);

                $scope.$watch('filters', function () {
                    ctrl.generateData();
                    //  tctrl.generateChart();
                }, true);


                //obtener las transacciones
                ctrl.getTXN = function () {
                    $scope.datos = TXN.getService($scope.filtersDate.firstDate, $scope.filtersDate.lastDate).then(function (trans) {
                        $scope.datos = trans.data;
                        ctrl.initCatalogo();
                        ctrl.generateData();
                        //  tctrl.generateChart();
                    });
                }

                // ctrl.estadisticos = TXN.getServiceEstadistico().then(function (data) {
                //     ctrl.estadisticos = data.data;

                //  });

                //generar datos dinámicos
                ctrl.generateData = function () {
                    var data = [];
                    $scope.arrayTotal = {};
                    if ($scope.catalogo && $scope.filters.field1) {
                        angular.forEach($scope.catalogo[$scope.filters.field1.name], function (field) {
                            var obj = {
                                ejeY: field,
                                ejeX: ctrl.getColumnas(field)
                            }
                            data.push(obj);
                        })
                        $scope.tableData = data;
                    }
                }

                //Columnas de la tabla
                ctrl.getColumnas = function (valorX) {

                    var  columnas = [], totalValorX = 0, total = "TotalDeTotal";
                    var data = $scope.datos.filter(ctrl.filterFunction);
                    if ($scope.filters.field2) {
                        angular.forEach($scope.catalogo[$scope.filters.field2.name], function (valorY) {
                            var cant = ctrl.getCantTransacciones($scope.filters.field1.name, valorX, valorY, $scope.filters.field2.name, data);
                            $scope.arrayTotal[valorY] = $scope.arrayTotal[valorY] != undefined ? $scope.arrayTotal[valorY] + cant : cant;
                            $scope.arrayTotal[total] = $scope.arrayTotal[total] != undefined ? $scope.arrayTotal[total] + cant : cant;
                            totalValorX += cant;

                            var obj = {
                                title: valorY,
                                field: valorY,
                                cantidad: cant //TODO: aki se cambian los literales de las columnas
                            }
                            columnas.push(obj);
                        })
                    }

                    columnas.push({
                        title: 'Total',
                        field: 'Total',
                        cantidad: totalValorX,
                    });

                    $scope.columnas = columnas;
                    return columnas;
                }

                //determinar la catidad de transacciones de field1 y field2
                ctrl.getCantTransacciones = function (field1, valorX, valorY, field2, data) {
                    var cant = 0;
                    angular.forEach(data, function (value) {
                        if (value[field1] == valorX && value[field2] == valorY) {
                            cant++;
                        }
                    });
                    return cant;
                }

                //inicializando el catalogo
                ctrl.initCatalogo = function () {
                    var obj = $scope.datos[0];
                    $scope.catalogo = {};
                    $scope.catalogoName = [];
                    if (obj) {
                        Object.getOwnPropertyNames(obj).forEach(function (val, idx, array) {
                            $scope.catalogo[val] = ctrl.getElementsFromArray($scope.datos, val);
                            var obj1 = {
                                name: val
                            }
                            $scope.catalogoName.push(obj1);
                        });
                    }
                }

                ctrl.getElementsFromArray = function (array, columnaAcomparar) {
                    var codigos = [];
                    angular.forEach(array, function (element) {
                        if (codigos.indexOf(element[columnaAcomparar].toString()) == -1) {
                            codigos.push(element[columnaAcomparar].toString());
                        }
                    })
                    return codigos;
                }

                ctrl.filterFunction = function (el) {
                    var rtn = true;
                    if (!$scope.filters.all) {
                        return rtn;
                    }
                    Object.getOwnPropertyNames($scope.filters.all).forEach(function (val, idx, array) {

                        if ($scope.filters.all[val] && $scope.filters.all[val] != "" && $scope.filters.all[val] instanceof Array) {
                            var temp = false;
                            angular.forEach($scope.filters.all[val], function (value) {
                                if (el[val] == value) {
                                    temp = true;
                                }
                            });
                            rtn = rtn && temp;
                        } else if ($scope.filters.all[val] && $scope.filters.all[val] != "" && typeof $scope.filters.all[val] === "string") {
                            if (el[val].indexOf($scope.filters.all[val]) === -1) {
                                rtn = false;
                            }
                        }
                    });

                    return rtn;
                }

            });
})();