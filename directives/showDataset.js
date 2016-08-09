/**
 * Created by nicholassaunderson on 09/08/2016.
 */
(function(){
    var app = angular.module("myApp");
    app.directive("showDataset", function(){
        return{
            restrict: "EA",
            scope: {
                dataset: '=dataset',
            },
            templateUrl: 'templates/showDataset.html',
            controller: function($scope, ndms) {
                $scope.$watch('dataset', function(dataset) {
                    if (dataset===undefined) {
                        return;
                    }

                    if (typeof $scope.dataset[0] === "object") {
                        $scope.components = [];
                        for (key in $scope.dataset[0]) {
                            $scope.components.push({
                                key: key,
                                type: evaluateComponentType(key),
                            });
                        }
                    }

                    $scope.numberOfObjects = $scope.dataset.length;

                    function evaluateComponentType(key) {
                        return typeof $scope.dataset[0][key];
                    }
                    
                   // ndms.deleteDataset();
                    
                    
                });
            }
        }


    });
})();
