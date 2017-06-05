(function () {
    angular.module("MDM.services", [])
        .service('Bitacora', function (API, $rootScope, $sessionStorage, $state, $http) {
            return {
                getMyBitacoras: function () {
                    return $http.get(API + '/bitacora/getMyBitacoras');
                },
                filterMyBitacoras: function (query) {
                    return $http.post(API + '/bitacora/filterMyBitacoras', query, {headers: {'Content-Type': 'application/json'}});
                },
                filterBitacoras: function (query) {
                    return $http.post(API + '/bitacora/admin/filterBitacoras', query, {headers: {'Content-Type': 'application/json'}});
                }
            }
        })

})();