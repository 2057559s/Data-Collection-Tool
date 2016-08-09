/**
 * Created by nicholassaunderson on 09/08/2016.
 */
(function(){
    var app = angular.module("myApp");
    app.directive('addOperation', function() {
        return {
            restrict: "EA",
            scope: {},
            templateUrl: 'templates/addOperation.html',
            
            

            controller: function($scope, ndms) {
                $scope.optionIN = "map";
                $scope.code = "";
                $scope.add = function() {
                    var f = compileCode($scope.code);
                    if (f !== undefined) {
                        ndms.addDataOperation({
                            name: $scope.nameIN,
                            type: $scope.optionIN,
                            f: f,
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