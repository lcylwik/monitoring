(function () {
    angular.module("EST.services", [])
            .service('Auth', function (API, $rootScope, $sessionStorage, $state, $http) {
                function urlBase64Decode(str) {
                    var output = str.replace('-', '+').replace('_', '/');
                    switch (output.length % 4) {
                        case 0:
                            break;
                        case 2:
                            output += '==';
                            break;
                        case 3:
                            output += '=';
                            break;
                        default:
                            throw 'Illegal base64url string!';
                    }
                    return window.atob(output);
                }

                function getClaimsFromToken() {
                    var token = $sessionStorage.Auth.token;
                    var user = {};
                    if (typeof token !== 'undefined') {
                        var encoded = token.split('.')[1];
                        user = JSON.parse(urlBase64Decode(encoded));
                    }
                    return user;
                }

                return {
                    login: function (credentials) {
                        return $http.post('http://localhost:8084/auth/authenticate', credentials, {headers: {'Content-Type': 'application/json'}});
                    },
                    logout: function () {
                        // return $http.post('http://localhost:8081/auth/logout').then(function (data) {
                        delete $sessionStorage.Auth;
                        $state.go('login');
                        //  });
                    },
                    userPermissions: function () {
                        return $http.get(API + '/resources/perm');
                    },

                    getUser: getClaimsFromToken,

                    registerUser: function (data) {
                        return $http.post(API + '/users', data, {headers: {'Content-Type': 'application/json'}});
                    },
                    getUsers: function () {
                        return $http.get(API + '/users');
                    },
                    editUser: function (item) {
                        return $http.put(API + '/users/', item, {headers: {'Content-Type': 'application/json'}});
                    },
                    removeUser: function (item) {
                        return $http.delete(API + '/users/' + item.id);
                    },
                    getUserById: function (id) {
                        return $http.get(API + '/users/' + id);
                    },
                    updatePassword: function (id, passwords) {
                        return $http.post(API + '/user/updatePassword/' + id, passwords, {headers: {'Content-Type': 'application/json'}});
                    },
                    isLoggedIn: function () {
                        return $sessionStorage.Auth ? true : false;
                    }
                }
            })
            .service('Crud', function (API, $http) {
                return {
                    getAll: function (url) {
                        return $http.get(API + '/resources' + url);
                    },
                    get: function (url, id) {
                        return $http.get(API + '/resources' + url + '/' + id);
                    },
                    update: function (url, item) {
                        return $http.put(API + '/resources' + url + '/' + item.id, item, {headers: {'Content-Type': 'application/json'}});
                    },
                    create: function (url, item) {
                        return $http.post(API + '/resources' + url, item, {headers: {'Content-Type': 'application/json'}});
                    },
                    delete: function (url, item) {
                        return $http.delete(API + '/resources' + url + '/' + item.id);
                    }
                }
            })
            // =========================================================================
            // Transacciones y estadistico
            // =========================================================================
            .service('TXN', function (API, $http) {
                return {
                    getService: function (from,to) {
                        return $http.get(API + '/rest/txnByDate/' + from + '/' + to);
                    },
                }
            })
            
             // =========================================================================
            //  add and get Config
            // =========================================================================
            .service('Config', function (API, $http) {
                return {
                    updateOrCreate: function (data,id) {
                        return $http.put(API + '/rest/config/'+ id,data);
                    },
                    getConfigID: function (id) {
                        return $http.get(API +'/rest/config/'+ id);
                        
                    },
                    getConfig: function () {
                        return $http.get(API +'/rest/config/');
                    }
                }
            })

            .factory('Util', function (ngTableParams) {
                return {
                    generateTableParams: function (data, $scope) {
                        return new ngTableParams({
                            page: 1, // show first page
                            count: 10          // count per page
                        }, {
                            counts: [], // length of data
                            getData: function ($defer, params) {
                                if ($scope && $scope.cajaBusqueda) {
                                    data = $filter('filter')(data, $scope.cajaBusqueda);
                                }
                                params.total(data.length);
                                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        });
                    },
                    dataURItoBlob: function (dataURI) {
                        var binary = atob(dataURI.split(',')[1]);
                        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                        var array = [];
                        for (var i = 0; i < binary.length; i++) {
                            array.push(binary.charCodeAt(i));
                        }
                        return new Blob([new Uint8Array(array)], {
                            type: mimeString
                        });
                    },
                    getElementById: function (id, dataset) {
                        var rtn = dataset.filter(function (el) {
                            return el.id == id;
                        });
                        return rtn[0];
                    }
                };
            })
            .service('EST', function (API, $rootScope, $sessionStorage, $state, $http) {
                return {
                    getAll: function () {
                        return $http.get(API + '/est/all');
                    },
                    filter: function (query) {
                        return $http.post(API + '/est/filter', query, {headers: {'Content-Type': 'application/json'}});
                    },
                    exportToWord: function (data) {
                        return $http.post(API + '/est/exportToWord', data, {headers: {'Content-Type': 'application/json'}});
                    },
                    searchMultiplePeople: function (data) {
                        return $http.post(API + '/est/searchMultiplePeople', data, {headers: {'Content-Type': 'application/json', 'noLoader': true}});
                    },
                    generateZip: function (data) {
                        return $http.post(API + '/est/generateZip', data, {headers: {'Content-Type': 'application/json', 'noLoader': true}});
                    },
                    multipleLoad: function (formData) {
                        return $http.post(API + '/est/multipleLoad', formData, {
                            transformRequest: angular.identity,
                            headers: {
                                'Content-Type': undefined
                            }
                        });
                    }
                }
            })


            /*Boostrap-growl Notificaciones */

            .service('growlService', function () {
                var gs = {};
                gs.growl = function (message, type) {
                    $.growl({
                        message: message
                    }, {
                        type: type,
                        allow_dismiss: false,
                        label: 'Cancel',
                        className: 'btn-xs btn-inverse',
                        placement: {
                            from: 'top',
                            align: 'right'
                        },
                        delay: 2500,
                        animate: {
                            enter: 'animated bounceIn',
                            exit: 'animated bounceOut'
                        },
                        offset: {
                            x: 20,
                            y: 50
                        }
                    });
                }

                return gs;
            })

})();