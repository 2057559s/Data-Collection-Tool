/**
 * Created by nicholassaunderson on 09/08/2016.
 */
(function(){
    var app = angular.module("myApp");
    app.directive('addCodeOperation', function() {
        return {
            restrict: "EA",
            scope: {},
            templateUrl: 'templates/addCodeOperation.html',
            
            

            controller: function($scope, ndms) {
                $scope.optionIN = "map";
                $scope.code = "";
                $scope.add = function() {
                    var f = compileCode($scope.code);
                    if (f !== undefined) {
                        ndms.addDataOperation({
                            operationType: "generic-code",
                            name: $scope.nameIN,
                            type: $scope.optionIN,
//                            f: f,
                            createF: function() {
                                return compileCode(this.code);
                            },
                            code: $scope.code,
                        });
                    }
                };
                
                

                function compileCode(code) {
                    var f;
                    try {
                        f = eval("(function(d, i) {" + code + "})");
                    } catch (error) {
                        $scope.error = error;
                    }
                    return f;
                }
            },
        };
    });

})();