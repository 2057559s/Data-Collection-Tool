/**
 * Created by nicholassaunderson on 09/08/2016.
 */
(function(){
    var app = angular.module("myApp");
    

    /*
        an operation is an object with the following keys
        {
            name: "name of operation set by user",
            type: "map" | "filter",
            f: function that should run on each item in the data set
            code: "the code of the function body for function(d) {}."
        }

        <show-operation operation="myOperation"></show-operation>
     */
    app.directive('showCodeOperation', function() {
        return{
            restrict: "EA",
            scope: {
                operation: "=operation"
            },
            templateUrl: 'templates/showCodeOperation.html',
            controller: function($scope, ndms) {
                $scope.editor = {
                    code : $scope.operation.code
                };

                $scope.deleteOperation = function() {
                    console.log('delete operation');
                    ndms.deleteOperation($scope.operation);
                };

                $scope.runCode = runCode;

                function runCode() {
                    var f = compileCode($scope.editor.code);
                    if (f) {
                        $scope.operation.code = $scope.editor.code;
                        $scope.operation.f = f;
                    }
                }


                function compileCode(code) {
                    var f;
                    try {
                        f = eval("(function(d, i) {" + code + "})");
                    } catch (error) {
                        $scope.editor.error = error;
                        window.alert(error);
                    }
                    return f;
                }
            }
        }
    });
})();