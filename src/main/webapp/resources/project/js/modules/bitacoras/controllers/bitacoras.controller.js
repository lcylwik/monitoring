
(function () {
    angular.module('MDM.controllers')
        .controller('BitacorasController', function ($scope, Bitacora, Util, SweetAlert, ngTableParams, $state, Auth, $filter) {
            var ctrl = this;
            $scope.filters = {};
            $scope.bitacorasTableParams = null;

            ctrl.filter = function () {
                if ($scope.filters.created_atDate !== null && $scope.filters.created_atDate !== undefined) {
                    $scope.filters.created_at = moment($scope.filters.created_atDate).format("YYYY-MM-D");
                }
                delete $scope.filters.created_atDate;

                if ($scope.filters.USER_ID === "-1" || $scope.filters.USER_ID === null) {
                    delete $scope.filters.USER_ID;
                }
                if (angular.equals($scope.filters, {})) {
                    SweetAlert.swal('Error', 'You must select at least one filter', 'warning');
                    return;
                }
                $scope.isSearched = true;

                if ($state.current.name === 'home.myBitacoras') {
                    Bitacora.filterMyBitacoras($scope.filters).then(afterSearch)
                } else {
                    Bitacora.filterBitacoras($scope.filters).then(afterSearch)
                }
                function afterSearch(data) {
                    if($scope.filters.created_at){
                        $scope.filters.created_atDate = moment($scope.filters.created_at, "YYYY-MM-D").toDate();
                    }
                    delete $scope.filters.created_at;
                    $scope.resultCount = data.data.data.length;
                    data.data.data = ctrl.PrepareFilterBeforeShow(data.data.data);
                    $scope.bitacorasTableParams = ctrl.generateBitacoraTable(data.data.data);

                }
            }

            if ($state.current.name === 'home.myBitacoras') {
               /* $scope.bitacorasTableParams = Bitacora.getMyBitacoras().then(function (data) {
                    data.data.data = ctrl.PrepareFilterBeforeShow(data.data.data);
                    $scope.resultCount = data.data.data.length;
                    $scope.bitacorasTableParams = ctrl.generateBitacoraTable(data.data.data);
                });*/
            } else if ($state.current.name === 'home.adminBitacoras') {
                Auth.getUsers().then(function (data) {
                    $scope.users = data.data.data;
                });
                $scope.showUserFilter = true;
            }
            ctrl.getObject = function (string) {
                var rtn = JSON.parse(string);
                var columns = [];
                for (var key in rtn) {
                    if (rtn.hasOwnProperty(key)) {
                        columns.push({id: columns.length + 1, key: key, value: rtn[key]});
                    }
                }
                return columns;
            }
            ctrl.PrepareFilterBeforeShow = function (data) {
                angular.forEach(data, function (element, pos) {
                    data[pos].FILTRO = ctrl.getObject(element.FILTRO);
                });
                return data;
            }

            ctrl.generateBitacoraTable = function (data){
                return new ngTableParams({
                    page: 1,            // show first page
                    count: 10,        // count per page
                    sorting: {
                        created_at: 'desc'
                    }
                }, {
                    counts: [], // length of data
                    getData: function ($defer, params) {
                        var result = params.sorting() ? $filter('orderBy')(data, params.orderBy()): data;
                        params.total(result.length);
                        $defer.resolve(result.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            }
        });
})();