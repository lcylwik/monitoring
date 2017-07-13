
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
                    redLogicaAdq: "LN Adquiriente",
                    codigoRespuesta: "Codigo de Respuesta",
                    redLogicaEmi: "LN Emisor",
                    producto: "Producto",
                    ambiente: "Ambiente",
                    tipoTransaccion: "LN Emisor",
                    tipoMensaje: "Tipo de Mensaje",
                    tipoTerminal: "Tipo de Terminal",
                    tipoCuenta: "Tipo de Cuenta",
                    responder: "Responder",
                    entryMode: "Modo de Entrada",
                    medioAcceso: "Medio Acceso",
                    tokenB4: "Token B4",
                    tokenB0: "Token B0"
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
                }, true);
                $scope.$watch('filters', function () {
                    ctrl.generateData();
                    ctrl.generateChart();
                }, true);
                //obtener las transacciones
                ctrl.getTXN = function () {
                    $scope.datos = TXN.getService($scope.filtersDate.firstDate, $scope.filtersDate.lastDate).then(function (trans) {
                        $scope.datos = trans.data;
                        angular.forEach($scope.datos, function (field) {
                            field.prtProcDte = moment(field.prtProcDte, "x").format("DD/MM/YYYY");
                        })
                        ctrl.initCatalogo();
                        ctrl.generateData();
                        ctrl.generateChart();
                    });
                }


                //generar datos dinámicos
                ctrl.generateData = function () {
                    var data = [];
                    var rtn = false;
                    $scope.arrayTotal = {};
                    if ($scope.catalogo && $scope.filters.field1) {

                        $scope.arrayFilas = $scope.catalogo[$scope.filters.field1.name].filter(ctrl.filtrarFilas);

                        angular.forEach($scope.arrayFilas, function (field) {
                            var obj = {
                                ejeY: field,
                                ejeX: ctrl.getColumnas(field)
                            }
                            data.push(obj);
                        })
                        $scope.tableData = data;
                    }
                }

                ctrl.filtrarFilas = function (el) {
                    var rtn = true;
                    angular.forEach($scope.filters.all, function (value, key) {
                        if ($scope.filters.field1.name == key) {
                            if (value.indexOf(el) == -1 && value != 0) {
                                rtn = false;
                            }
                        }
                    });
                    return rtn;
                }

                ctrl.filtrarColumnas = function (el) {
                    var rtn = true;
                    angular.forEach($scope.filters.all, function (value, key) {
                        if ($scope.filters.field2.name == key) {
                            if (value.indexOf(el) == -1 && value != 0) {
                                rtn = false;
                            }
                        }
                    });
                    return rtn;
                }


                //Columnas de la tabla
                ctrl.getColumnas = function (valorX) {
                    var columnas = [], totalValorX = 0, total = "TotalDeTotal";
                    var data = $scope.datos.filter(ctrl.filterFunction);
                    if ($scope.filters.field2) {
                        $scope.arrayColumnas = $scope.catalogo[$scope.filters.field2.name].filter(ctrl.filtrarColumnas);
                        angular.forEach($scope.arrayColumnas, function (valorY) {
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

                ctrl.filterFunctionTabla = function (el) {
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
                //Metodos de la Grafica

                ctrl.getXByY = function (array, y) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].ejeY == y) {
                            return array[i].ejeX;
                        }
                    }
                    return 0;
                }

                ctrl.findCantByX = function (array, x) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].title == x && array[i].title != "Total") {
                            return array[i].cantidad;
                        }
                    }
                    return 0;
                }
               
                //calculando las estadisticas
                ctrl.estadisticos=function (ejeY,ejeX){
                   
                    $scope.arrayEst ="";
                };

                //pintando las celdas de la tabla
                ctrl.getClass = function (cantidad, ejeY, ejeX) {
                    var alfa = 2.575;
                    

                    var estadistico = [];

                    

                    /* angular.forEach(ctrl.estadisticos(ejeY,ejeX), function (value) {
                     console.log(moment(fecha, 'd-MM-YY').subtract(1, 'months').format('YYYY-MM'));
                     if (moment(value[4]).format('YYYY-MM') == moment(fecha, 'd-MM-YY').subtract(1, 'months').format('YYYY-MM') && element == value[1])
                     {
                     estadistico.push(value);
                     }
                     });
                     
                     
                     //$rootScope.cant = $rootScope.cant ? $rootScope.cant + 1 : 1;
                     console.log(estadistico[0]);
                     if (cantidad > (estadistico[0] + estadistico[3] * alfa)) {
                     //$rootScope.messages.push({
                     //    img: "",
                     //    type: "Sobrepasado",
                     //    text: "El dï¿½a '" + fecha + "' se realizaron mï¿½s transacciones"
                     //});
                     console.log("rojooooo");
                     return 'color-danger';
                     } else if (cantidad < (estadistico[2] - estadistico[3] * alfa)) {
                     //$rootScope.messages.push({
                     //    img: "",
                     //    type: "Por Debajo",
                     //    text: "El dï¿½a '" + fecha + "' se realizaron menos transacciones"
                     //});
                     console.log("azul");
                     
                     return 'color-primary';
                     } else {
                     return 'red';
                     }*/
                }


                // GrÃ¡fica Line Chart

                ctrl.generateChart = function () {
                    $scope.myChartObject = {};
                    $scope.myChartObject.type = "LineChart";
                    $scope.myChartObject.data = {cols: [], rows: []};
                    if ($scope.catalogo && $scope.filters.field1) {
                        $scope.myChartObject.data.cols.push({
                            "id": "x",
                            "label": $scope.filters.field1.name,
                            "type": "string",
                            "p": {}
                        });
                        if ($scope.catalogo) {
                            angular.forEach($scope.catalogo[$scope.filters.field1.name], function (value) {
                                $scope.myChartObject.data.cols.push({
                                    "id": value,
                                    "label": value,
                                    "type": "number",
                                    "p": {}
                                });
                            });
                        }
                        angular.forEach($scope.columnas, function (object) {
                            if (object.title != "Total") {
                                var objRows = [{v: object.title}];
                                angular.forEach($scope.catalogo[$scope.filters.field1.name], function (value) {
                                    var x = ctrl.getXByY($scope.tableData, value);
                                    objRows.push({
                                        v: ctrl.findCantByX(x, object.title)
                                    })
                                });
                                $scope.myChartObject.data.rows.push({
                                    c: objRows
                                });
                            }
                        });
                        $scope.myChartObject.options = {
                            "title": " ",
                            "isStacked": "true",
                            "fill": 20,
                            'is3D': 'true',
                            "displayExactValues": true,
                            "vAxis": {
                                "title": "Cant. Transacciones",
                                "gridlines": {
                                    "count": 10
                                }
                            },
                            "hAxis": {
                                "title": $scope.filters.field1.name
                            }
                        }
                    }
                }

            });
})();