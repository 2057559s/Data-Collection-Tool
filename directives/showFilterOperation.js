/**
 * Created by nicholassaunderson on 15/08/2016.
 */
/**
 * Created by nicholassaunderson on 09/08/2016.
 */
(function(){
    var app = angular.module("myApp");
    app.directive('showFilterOperation', function() {
        return {
            restrict: "EA",
            scope: {
                operation: "=operation",
                dataset: "=dataset"
            },
            templateUrl: 'templates/showFilterOperation.html',
            controller: function($scope, ndms) {



                $scope.deleteOperation = function() {
                    console.log('delete operation');
                    ndms.deleteOperation($scope.operation);
                };

                $scope.form = {component:""};
                $scope.components = [];

                //$scope.TYPE = "";

                $scope.$watch('dataset', function(dataset) {
                    if (dataset===undefined) {
                        return;
                    }


                    $scope.components.splice(0);
                    for(comp in $scope.dataset[0]) {
                        $scope.components.push(comp);
                    }
                });

               







            }
        }
    });
})();
