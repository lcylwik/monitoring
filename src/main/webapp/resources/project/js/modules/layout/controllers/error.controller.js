(function () {
    'use strict';
    angular.module('MDM.controllers')
        .controller('ErrorController', function ($scope, error) {
                var ctrl = this;

                $scope.error = error;
            }
        );
})();
