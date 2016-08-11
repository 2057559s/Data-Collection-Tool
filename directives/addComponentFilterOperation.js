/**
 * Created by nicholassaunderson on 09/08/2016.
 */
(function(){
    var app = angular.module("myApp");
    app.directive('addComponentFilterOperation', function() {
        return {
            restrict: "EA",
            scope: {
                dataset: "=dataset"
            },
            templateUrl: 'templates/addComponentFilterOperation.html',

            controller: function($scope, ndms) {
                $scope.form = {component:""};
                $scope.components = [];

                $scope.TYPE = "";

                $scope.$watch('dataset', function(dataset) {
                    if (dataset===undefined) {
                        return;
                    }

                    $scope.components.splice(0);
                    for(comp in $scope.dataset[0]) {
                        $scope.components.push(comp);
//                        $scope.TYPE = typeof $scope.dataset[0][comp]
                    }
                });

                $scope.$watch('form.component', function(component) {
                    $scope.TYPE = typeof $scope.dataset[0][component]
                });

                $scope.add = function() {
                    var form = JSON.parse(JSON.stringify($scope.form));
                    var f = createFunction(form);
                    if (f !== undefined) {
                        ndms.addDataOperation({
                            name: $scope.nameIN,
                            type: "filter",
                            f: f,

                            // add what ever stff you need to be able to show this operation in order to modify it
                        });
                    }
                };

                function createFunction(form) {
                    switch($scope.TYPE) {
                        case "string":
                            return function(d) {
                                return form.text === d[form.component];
                            };
                        case "number":
                            return function(d) {
                                return form.start <= d[form.component] &&
                                    d[form.component] <= form.end;
                            };
                    }
                }
            },
        };
    });

})();