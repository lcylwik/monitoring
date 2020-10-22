(function () {
    'use strict';
    angular.module('EST.controllers')
        .controller('ErrorController', function ($scope, error) {
                var ctrl = this;

                $scope.error = error;
            }
        );
})();
