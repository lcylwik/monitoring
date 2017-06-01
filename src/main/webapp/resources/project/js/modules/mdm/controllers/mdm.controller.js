/**
 * Created by PLANET MEDIA on 5/3/2017.
 */
(function () {
    angular.module('MDM.controllers')
        .controller('MdmController', function($scope, MDM, Util, SweetAlert, ngTableParams, $state, $sessionStorage){
            var ctrl = this;

            $scope.selectAllCheck= [];
            $scope.filters = {};
            $scope.selected = {};
            $scope.sources = [
                {
                    key: 'D',
                    name: 'TITAN'
                },{
                    key: 'X',
                    name: 'SIIE'
                },{
                    key: 'Z',
                    name: 'SUMAJ'
                }
            ];
            $scope.currentSource = {};
            ctrl.selectSource = function(source){
                $scope.currentSource = source;
                $scope.personsTableParams.reload();
            }

            ctrl.filter = function(){
                if(angular.equals($scope.filters, {})){
                    SweetAlert.swal('Error', 'You must select at least one filter', 'warning');
                    return ;
                }
                $scope.isSearched = true;
                if($scope.filters.age !== undefined && $scope.filters.age !== ""){
                    if($scope.filters.age_operator === 'between' && !$scope.filters.ageTo){
                        delete $scope.filters.age;
                        delete $scope.filters.age_operator;
                    }else{
                        $scope.filters.age = parseInt($scope.filters.age);
                        if($scope.filters.ageTo){
                            $scope.filters.ageTo = parseInt($scope.filters.ageTo);
                        }
                    }
                }
                MDM.filter($scope.filters).then(function(data){
                    $scope.resultCount = data.data.data.length;
                    $scope.sendedFilters = $scope.filters;
                    if(data.data.data.length > 0){
                        ctrl.dataGroupes = _.groupBy(data.data.data, function(el){
                            return el.COD_SIST_ORI[0];
                        });
                    }
                    $scope.personsTableParams = new ngTableParams({
                        page: 1,            // show first page
                        count: 10          // count per page
                    }, {
                        counts: [], // length of data
                        getData: function ($defer, params) {
                            if(ctrl.isEmpty($scope.currentSource)){
                                for (var key in ctrl.dataGroupes) {
                                    for(var i = 0; i < $scope.sources.length; i++){
                                        if($scope.sources[i].key === key){
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

            ctrl.select = function(item){
                console.log($scope.selected);
                console.log(item);
                if($scope.selected[item.ID]){
                    delete $scope.selected[item.ID]
                }else{
                    $scope.selected[item.ID] = true;
                }
            };
            ctrl.isEmpty = function(selected){
                return angular.equals(selected, {})
            }
            ctrl.preunific = function(){
				$scope.exporting = true;
                var data = [];
				var selectedIds = Object.keys($scope.selected);
                for (var property in ctrl.dataGroupes) {
                    if (ctrl.dataGroupes.hasOwnProperty(property)) {
                        var dataToAdd = ctrl.dataGroupes[property].filter(function(element){
                            console.log(element);
                            return selectedIds.indexOf(element.ID.toString()) !== -1;
                        });
                        data = data.concat(dataToAdd);
                    }
                }

                MDM.exportToWord({data: data, filters: $scope.sendedFilters}).then(function(response){
                    ctrl.clearData();
                    SweetAlert.swal({
                        title: "Completado",
                        text: "El proceso para generar su word ha concluido!<br/> <a href='" + response.data.path + "' target='_blank'>Para descargarlo presione aquí</a>",
                        html: true,
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK"
                    });
                }, function(){
                    $scope.exporting = false;
                });
            }

            ctrl.clearData = function(){
                $scope.resultCount = 0;
                $scope.personsTableParams = {};
                $scope.currentSource = {};
                $scope.filters = {};
                $scope.tableData = [];
				$scope.exporting = false;
				$scope.selected = {};
                $scope.selectAllCheck= [];
            }

            ctrl.selectAll  = function(element){
                angular.forEach($scope.tableData, function(dataElement, pos){
                    if(element.selectAllCheck[$scope.currentSource.key]) {
                        $scope.selected[dataElement.ID] = true;
                    }else{
                        delete $scope.selected[dataElement.ID];
                    }
                });
            }
        });
})();