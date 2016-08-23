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
                    $scope.TYPE = typeof $scope.dataset[0][component];

                    var components =
                        $scope.dataset.map(
                            d => d[component]
                        ).reduce((uniques, d) => {
                            if (uniques.indexOf(d)==-1) uniques.push(d); return uniques;
                        }, []);
                    $scope.componentValues = components;
                    $scope.form.text = JSON.parse(JSON.stringify(components));
                });


                $scope.add = function() {
                    var form = JSON.parse(JSON.stringify($scope.form));
                    var f = createFunction($scope.TYPE, form);
                    if (f !== undefined) {
                        ndms.addDataOperation({
                            operationType: "component-filter",
                            name: $scope.nameIN,
                            type: "filter",
//                            f: f,
                            createF: function() {
                                return createFunction(
                                    this.filter.componentType,
                                    this.filter.form
                                );
                            },

                            // add what ever stff you need to be able to show this operation in order to modify it
                            filter: {
                                componentType: $scope.TYPE,
                                form: JSON.parse(JSON.stringify($scope.form)),
                            },
                        });
                    }
                };

                function createFunction(type, form) {
                    switch(type) {
                        case "string":
                            return function(d) {
                                return form.text.indexOf(d[form.component])!==-1;
                            };
                        case "number":
                            return function(d) {
                                return form.start <= d[form.component] &&
                                    d[form.component] <= form.end;
                            };
                        case "boolean":
                            return function(d){
                                return form.bool.toString() === d[form.component].toString();
                            };

                    }
                }
            },
        };
    });

})();