/**
 * Created by nicholassaunderson on 10/08/2016.
 */
(function (){
    var app = angular.module("myApp");
    app.directive("dsExport", function(){
        return {
            restrict: "EA",
            templateUrl: 'templates/dsExport.html',
            controller: function($scope){

                $scope.name = "Mattias";

                $scope.dataHref = "";

                $scope.exportDataset = function(){
                    console.log("exporting");
                    $scope.exportContents = JSON.stringify($scope.datasets[$scope.datasets.length-1]);
                    console.log($scope.exportContents);

                    $scope.dataHref = "data:text/plain," + JSON.stringify($scope.datasets[$scope.datasets.length-1]);

                    
                    

                }


            }

        };
    })

})();