(function () {
    'use strict';
    angular.module('MDM.controllers')
        .controller('MenuController', function ($scope, $state, $http) {
                var ctrl = this;
                $http.get('js/modules/layout/json/menu.json').success(function (data) {
                    $scope.mainMenu = data;
                    console.log($scope.mainMenu);
                });

                ctrl.stateInclude = function (submenus, level) {
                    if (!submenus){
                        if($state.current.name === "home.myBitacoras"){
                            return true;
                        }
                        return false;
                    }

                    if (level && level == "sub") {
                        return $state.current.name.indexOf(submenus.link) != -1;
                    } else {
                        var rtn = false;
                        angular.forEach(submenus, function (element) {
                            if ($state.current.name.indexOf(element.link) != -1) {
                                rtn = true;
                            }
                        });
                        return rtn;
                    }
                }

                ctrl.link = function (event, link) {
                    event.preventDefault();
                    $state.go(link);
                };

                ctrl.optionsMenu = function (event) {
                    if (event.target.parentNode.classList.contains('active')) {
                        event.target.parentNode.classList.remove('active');
                    } else {
                        var a = document.getElementsByTagName('li');
                        for (var i = 0; i < a.length; i++) {
                            a[i].classList.remove('active');
                        }
                        event.target.parentNode.classList.add('active');
                    }
                };

                // if ($sessionStorage.token === undefined) {
                //   $location.path('/login');
                // }

            }
        );
})();
