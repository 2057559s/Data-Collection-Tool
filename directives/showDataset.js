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

                $scope.formatValue = function(value, component) {
                    if (component==='timestamp') {
                        return formatTimeStamp(value);
                    }
                    return value;
                };

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

                $scope.deleteComponent = function deleteComponent(component) {
                    ndms.addDataOperation({
                        operationType: "generic-code",
                        name: "Drop " + component.key,
                        type: "map",
                        createF: function() {
                            return compileCode(this.code);
                        },
                        code: "var d2 = Object.assign({}, d); delete d2[\"" + component.key + "\"]; return d2;",
                    });

                    function compileCode(code) {
                        var f;
                        try {
                            f = eval("(function(d, i) {" + code + "})");
                        } catch (error) {
                            $scope.error = error;
                        }
                        return f;
                    }

                };

                $scope.extractObject = function(component){
                    ndms.addDataOperation({
                        operationType: "generic-code",
                        name: "Extract " + component.key,
                        type: "map",
                        createF: function() {
                            return compileCode(this.code);
                        },
                        code: "var d2 = Object.assign({}, d); for(key in d." + component.key + ") { d2[\"" + component.key + "."+ "\" + key] = d." + component.key +"[key]; } delete d2." +
                        component.key + "; return d2;",
                    });

                    function compileCode(code) {
                        var f;
                        try {
                            f = eval("(function(d, i) {" + code + "})");
                        } catch (error) {
                            $scope.error = error;
                        }
                        return f;
                    }


                };


                // var d2 = Object.assign({}, d);
                // for(key in d.device) {
                //     d2["device." + key] = d.device[key];
                // }
                // delete d2.device;
                //
                // return d2;

                // var d2 = Object.assign({}, d);
                // for(key in d.device) {
                //     d2["device"] = d.device[key];
                // } delete d2.device;
                // return d2;



                //used to get the number of objects to show within the dataset
                $scope.numberToSHow = 2;
                $scope.expand = expand;
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
                    
                    return year + "-" + pad(month) + "-"+ pad(day) + " " +
                        pad(hours) +  ":" + pad(minutes) + ":" + pad(seconds);
                

                }
            }
        }


    });
})();
