
(function () {
    angular.module('EST.controllers')
            .controller('ConfigController', function ($scope, EST, Util, TXN, SweetAlert, ngTableParams, $state, $filter, $sessionStorage) {
                var ctrl = this;

                ctrl.visibleNames = {
                    id: "Identificador",
                    prtFilename: "Archivo",
                    prtProcDte: "Fecha",
                    fiidEmisor: "FIID Emisor",
                    fiidAdquiriente: "FIID Adquiriente",
                    redLogicaAdq: "LN Adquiriente",
                    codigoRespuesta: "Codigo de Respuesta",
                    redLogicaEmi: "LN Emisor",
                    producto: "Producto",
                    ambiente: "Codigo de Respuesta",
                    tipoTransaccion: "LN Emisor",
                    tipoMensaje: "Tipo de Mensaje",
                    tipoTerminal: "Tipo de Terminal",
                    tipoCuenta: "Tipo de Cuenta",
                    responder: "Responder",
                    entryMode: "Modo de Entrada",
                    medioAcceso: "Medio Acceso",
                    tokenB4: "Token B4",
                    tokenB0: "Token B0"
                }

                $scope.filtersDate = {
                    firstDate: moment().subtract(15, 'days').toDate(),
                    lastDate: moment().toDate()
                };
                $scope.filters = {};

                $scope.$watch('filtersDate', function () {
                    ctrl.getTXN();
                   
                }, true);

                $scope.$watch('filters', function () {
                    
                }, true);


                //obtener las transacciones
                ctrl.getTXN = function () {
                    $scope.datos = TXN.getService($scope.filtersDate.firstDate, $scope.filtersDate.lastDate).then(function (trans) {
                        $scope.datos = trans.data;
                        angular.forEach($scope.datos, function (field) {
                            field.prtProcDte = moment(field.prtProcDte, "x").format("DD/MM/YYYY");
                        })
                        
                    });
                }

                

              







            });
})();