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
            controller: function($scope, $element, ndms) {
                $scope.expanded = false;

                $scope.$watch('dataset', function(dataset) {
                    if (dataset===undefined) {
                        return;
                    }

                    $scope.dataType = typeof $scope.dataset[0];

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
                    
                    
                    
                });

                //used to get the number of objects to show within the dataset
                $scope.expand = expand;
                $scope.numberToSHow = 2;
                function expand() {
                    $scope.numberToSHow += 2;
                }
                
                $scope.showAll = showAll;
                function showAll(){
                    $scope.numberToSHow = $scope.dataset.length;
                }
                
                $scope.hideAll = hideAll;
                function hideAll(){
                    $scope.numberToSHow = 2;
                }
                
                $scope.getNum = getNum;
                function getNum(){
                    return $scope.numberToSHow;
                }
                

                $scope.togglePanel = togglePanel;

                function togglePanel() {
                    $scope.expanded = !$scope.expanded;
                }

                $scope.getDate = getDate;
                function getDate(x){
                    $scope.date = new Date(Math.round(Number(x)));
                    // $scope.formattedDate = $scope.date.getUTCFullYear() + '-' + ($scope.date.getUTCMonth() + 1)+ '-' + $scope.date.getUTCDay() +
                    //                       '-' + $scope.date.getUTCSeconds() + '-' + $scope.date.getUTCMinutes() + '-' + $scope.date.getUTCHours();

                    $scope.isoDate = $scope.date.toISOString();
                    return $scope.isoDate;

                }
            }
        }


    });
})();
