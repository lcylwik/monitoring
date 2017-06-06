
(function () {
    angular.module('EST.controllers')
        .controller('ESTMultipleLoadController', function ($scope, EST, Util, SweetAlert, ngTableParams, $filter) {
            var ctrl = this;

            ctrl.recursiveMaxSearchs = 5;
            $scope.recursive = {};

            $scope.header = {
                text: "Procesando",
                loading: true
            };

            $scope.rows = [];

            ctrl.readUrl = function (input) {

                console.log(input);
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    console.log(reader);
                }
            }
            ctrl.upload = function () {
                var fd = new FormData();
                var fileBlob = Util.dataURItoBlob($scope.csv);
                fd.append('csv', fileBlob);
                fd.append('csvName', $scope.csvName);

                EST.multipleLoad(fd).then(
                    function (response) {
                        ctrl.clearData();
                        SweetAlert.swal({
                            title: "Completado",
                            text: "El proceso para generar sus resultados ha concluido!<br/> <a href='" + response.data.path + "' target='_blank'>Para descargarlos presione aquí</a>",
                            html: true,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonText: "OK"
                        });
                    }
                );
            }

            $scope.wordsTableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10          // count per page
            }, {
                counts: [], // length of data
                getData: function ($defer, params) {

                    var result = params.sorting() ? $filter('orderBy')($scope.rows, params.orderBy()): $scope.rows;
                    params.total(result.length);
                    $defer.resolve(result.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

            ctrl.getCsvData = function () {
				var separador = ';';                
				if($scope.csv.result[0]['0'].split(separador)[0] === $scope.csv.result[0]['0']){
				    separador = ',';
					if($scope.csv.result[0]['0'].split(separador)[0] === $scope.csv.result[0]['0']){
						SweetAlert.swal({
                        title: "Error",
                        text: "El archivo cargado no tiene un formato correcto.",
                        html: true,
                        type: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK"
                    });
						return;
					}
				}
				var headers = $scope.csv.result[0]['0'].split(separador);
                for (var i = 1; i < $scope.csv.result.length - 1; i++) {
                    var rowColumns = $scope.csv.result[i]['0'].split(separador);
                    var obj = {};
                    var columns = [];
                    angular.forEach(headers, function (filtro, pos) {
                        obj[filtro] = rowColumns[pos];
                        columns.push({id: columns.length + 1, key: filtro, value: obj[filtro]});
                    });

                    var row = {id: $scope.rows.length, FILTRO: columns, obj: obj, status: 'Pendiente'};

                    $scope.rows.push(row);
                    ctrl.searchRecursiveData(obj, row.id);
                }
            };

            ctrl.searchRecursiveData = function (filters, index) {
                EST.searchMultiplePeople({filters: filters, index: index}).then(function (response) {
                    $scope.rows[response.data.index].status = response.data.status;
                    $scope.rows[response.data.index].path = response.data.path ? response.data.path : '';
                    if ($scope.rows[response.data.index].status === 'Error' &&
                        (!$scope.recursive[response.data.index] ||
                        ($scope.recursive[response.data.index] && $scope.recursive[response.data.index] < ctrl.recursiveMaxSearchs))) {

                        $scope.rows[response.data.index].status = 'Pendiente';
                        $scope.recursive[response.data.index] = $scope.recursive[response.data.index] ? $scope.recursive[response.data.index] + 1 : 1;
                        ctrl.searchRecursiveData($scope.rows[response.data.index].obj, response.data.index);
                    }
                    $scope.wordsTableParams.reload();
                    $scope.allReady = ctrl.checkAllReady();
                })
            }
            ctrl.checkAllReady = function () {
                var availables = 0;
                var errors = 0;
                var paths = [];
                for (var i = 0; i < $scope.rows.length; i++) {
                    if ($scope.rows[i].status === 'Disponible') {
                        availables++;
                        paths.push($scope.rows[i].path);
                    } else if ($scope.rows[i].status === 'Error') {
                        errors++;
                    } else if ($scope.rows[i].status === 'Pendiente') {
                        return false;
                    }
                }
                $scope.header = {
                    text: "Generando Compactado",
                    loading: true,
                    available: availables,
                    errors: errors,
                    total: $scope.rows.length

                };
                EST.generateZip({paths: paths}).then(function(response){
                    $scope.header.text = "Completado";
                    $scope.header.loading = false;
                    var text = response.data.status === 'error' ? response.data.message :
                    "El proceso para generar todos los words ha concluido!<br/> <a href='" + response.data.path + "' target='_blank'>Para descargar el .zip presione aquí</a>";

                    SweetAlert.swal({
                        title: "Completado",
                        text: text,
                        html: true,
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK"
                    });
                })

                return true;
            }

            ctrl.clearData = function () {
                // $scope.csv = null;
                // $scope.csvName = "";
            }
        });
})();