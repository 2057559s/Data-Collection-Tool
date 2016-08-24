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

                    //Loops through dataset components and changes timestamp value using formatTimeStamp function
                    for(item in $scope.dataset){
                        if($scope.dataset[item]['timestamp']) {
                            $scope.dataset[item]['timestamp'] = formatTimeStamp($scope.dataset[item]['timestamp']);
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


                $scope.formatTimeStamp = formatTimeStamp;
                function formatTimeStamp(timestamp) {
                    var d = new Date(timestamp);
                    var year = d.getFullYear();
                    var month = d.getMonth()+1;
                    var day = d.getDate();
                    var hours = d.getHours();
                    var minutes = d.getMinutes();
                    var seconds = d.getSeconds();
                    var pad = function(n) { 
                        return n<10?'0' + n:n; 
                    };
                    
                    return year + "/" + pad(month) + "/" + pad(day) + " " +
                        pad(hours) +  ":" + pad(minutes) + ":" + pad(seconds);
                

                }
            }
        }


    });
})();
