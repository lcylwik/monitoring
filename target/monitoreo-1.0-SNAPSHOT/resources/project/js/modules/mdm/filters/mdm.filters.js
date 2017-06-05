(function () {
    angular.module("MDM.directives", [])
        .filter('mongoDate', function (API, $rootScope, $sessionStorage, $state, $http) {
            return function(input){
                if(input !== null && typeof input === 'object' && input['$date'] !== undefined && typeof input['$date'] === 'object' && input['$date']['$numberLong'] !== undefined ){
                        return moment(input['$date']['$numberLong'], "x").format('YYYY-MM-D');
                }else{
                    return input;
                }
            }
        })
})();