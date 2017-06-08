
(function () {
    angular.module('EST.controllers')
            .controller('ESTController', function ($scope, EST, Util, TXN, SweetAlert, ngTableParams, $state, $sessionStorage) {
                var ctrl = this;

                $scope.filters = {
                    // firstDate: new Date(), lastDate: new Date(),
                    firstDate: moment().subtract(15, 'days').toDate(),
                    lastDate: moment().toDate()
                };

                $scope.$watch('filters', function () {
                    $scope.tableParams = ctrl.generateTableParams();
                    ctrl.generateData();
                    console.log($scope.tableData);

                    //  tctrl.generateChart();

                }, true);


                //obtener las transacciones
                $scope.datos = TXN.getService($scope.filters.firstDate, $scope.filters.lastDate).then(function (trans) {
                    $scope.datos = trans.data;

                    ctrl.initCatalogo();
                    $scope.tableParams = ctrl.generateTableParams();
                    ctrl.generateData();
                    //  tctrl.generateChart();
                });


               // ctrl.estadisticos = TXN.getServiceEstadistico().then(function (data) {
               //     ctrl.estadisticos = data.data;
                    $scope.dataReady = true;

              //  });

                //generar tabla din·mica
                ctrl.generateTableParams = function () {
                    return new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                        total: $scope.catalogo ? $scope.catalogo[$scope.filters.field1].length : 0,
                        //Funcion para el paginador
                        getData: function ($defer, params) {
                            var data = [];
                            $scope.arrayTotal = {};
                            angular.forEach($scope.catalogo[$scope.filters.field1], function (field) {
                                var obj = {
                                    ejeY: field,
                                    ejeX: ctrl.getColumnas(field)
                                }
                                data.push(obj);
                            })
                            data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

                            $scope.tableData = data;
                            params.total(data.length); // set total for recalc pagination
                            data = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            $defer.resolve(data);
                        }
                    });
                };

                ctrl.generateData = function () {
                    var data = [];
                    $scope.arrayTotal = {};
                    if ($scope.catalogo) {
                        angular.forEach($scope.catalogo[$scope.filters.field1], function (field) {
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

                    var firstDate = $scope.filters.firstDate, columnas = [], totalValorX = 0, total = "TotalDeTotal";
                    var data = $scope.datos.filter(ctrl.filterFunction);


                    angular.forEach($scope.catalogo[$scope.filters.field2], function (valorY) {
                        var cant = ctrl.getCantTransacciones($scope.filters.field1, valorX, valorY, $scope.filters.field2, data);

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
                    Object.getOwnPropertyNames(obj).forEach(function (val, idx, array) {
                        $scope.catalogo[val] = ctrl.getElementsFromArray($scope.datos, val);
                        $scope.catalogoName.push(val);
                    });
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
    /*     $scope.selectAllCheck = [];
     
     $scope.selected = {};
     $scope.sources = [
     {
     key: 'D',
     name: 'TITAN'
     }, {
     key: 'X',
     name: 'SIIE'
     }, {
     key: 'Z',
     name: 'SUMAJ'
     }
     ];
     $scope.currentSource = {};
     ctrl.selectSource = function (source) {
     $scope.currentSource = source;
     $scope.personsTableParams.reload();
     }
     
     ctrl.filter = function () {
     if (angular.equals($scope.filters, {})) {
     SweetAlert.swal('Error', 'You must select at least one filter', 'warning');
     return;
     }
     $scope.isSearched = true;
     if ($scope.filters.age !== undefined && $scope.filters.age !== "") {
     if ($scope.filters.age_operator === 'between' && !$scope.filters.ageTo) {
     delete $scope.filters.age;
     delete $scope.filters.age_operator;
     } else {
     $scope.filters.age = parseInt($scope.filters.age);
     if ($scope.filters.ageTo) {
     $scope.filters.ageTo = parseInt($scope.filters.ageTo);
     }
     }
     }
     EST.filter($scope.filters).then(function (data) {
     $scope.resultCount = data.data.data.length;
     $scope.sendedFilters = $scope.filters;
     if (data.data.data.length > 0) {
     ctrl.dataGroupes = _.groupBy(data.data.data, function (el) {
     return el.COD_SIST_ORI[0];
     });
     }
     $scope.personsTableParams = new ngTableParams({
     page: 1, // show first page
     count: 10          // count per page
     }, {
     counts: [], // length of data
     getData: function ($defer, params) {
     if (ctrl.isEmpty($scope.currentSource)) {
     for (var key in ctrl.dataGroupes) {
     for (var i = 0; i < $scope.sources.length; i++) {
     if ($scope.sources[i].key === key) {
     $scope.currentSource = $scope.sources[i];
     }
     }
     break;
     }
     }
     
     var data = ctrl.dataGroupes[$scope.currentSource.key];
     $scope.tableData = data;
     params.total(data.length);
     $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
     }
     });
     })
     };
     
     ctrl.select = function (item) {
     console.log($scope.selected);
     console.log(item);
     if ($scope.selected[item.ID]) {
     delete $scope.selected[item.ID]
     } else {
     $scope.selected[item.ID] = true;
     }
     };
     ctrl.isEmpty = function (selected) {
     return angular.equals(selected, {})
     }
     ctrl.preunific = function () {
     $scope.exporting = true;
     var data = [];
     var selectedIds = Object.keys($scope.selected);
     for (var property in ctrl.dataGroupes) {
     if (ctrl.dataGroupes.hasOwnProperty(property)) {
     var dataToAdd = ctrl.dataGroupes[property].filter(function (element) {
     console.log(element);
     return selectedIds.indexOf(element.ID.toString()) !== -1;
     });
     data = data.concat(dataToAdd);
     }
     }
     
     EST.exportToWord({data: data, filters: $scope.sendedFilters}).then(function (response) {
     ctrl.clearData();
     SweetAlert.swal({
     title: "Completado",
     text: "El proceso para generar su word ha concluido!<br/> <a href='" + response.data.path + "' target='_blank'>Para descargarlo presione aqu√≠</a>",
     html: true,
     type: "success",
     showCancelButton: false,
     confirmButtonText: "OK"
     });
     }, function () {
     $scope.exporting = false;
     });
     }
     
     ctrl.clearData = function () {
     $scope.resultCount = 0;
     $scope.personsTableParams = {};
     $scope.currentSource = {};
     $scope.filters = {};
     $scope.tableData = [];
     $scope.exporting = false;
     $scope.selected = {};
     $scope.selectAllCheck = [];
     }
     
     ctrl.selectAll = function (element) {
     angular.forEach($scope.tableData, function (dataElement, pos) {
     if (element.selectAllCheck[$scope.currentSource.key]) {
     $scope.selected[dataElement.ID] = true;
     } else {
     delete $scope.selected[dataElement.ID];
     }
     });
     }*/
})();