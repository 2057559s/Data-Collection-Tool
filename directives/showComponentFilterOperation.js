/**
 * Created by nicholassaunderson on 15/08/2016.
 */
/**
 * Created by nicholassaunderson on 09/08/2016.
 */
(function(){
    var app = angular.module("myApp");
    app.directive('showComponentFilterOperation', function() {
        return {
            restrict: "EA",
            scope: {
                operation: "=operation",
                dataset: "=dataset"
            },
            templateUrl: 'templates/showComponentFilterOperation.html',
            controller: function($scope, ndms) {

                $scope.deleteOperation = function() {
                    console.log('delete operation');
                    ndms.deleteOperation($scope.operation);
                };

                $scope.components = [];
                for(comp in $scope.dataset[0]) {
                    $scope.components.push(comp);
                }

                $scope.componentValues = getComponentValues($scope.operation.filter.form.component);

                $scope.$watch('operation.filter.form.component', function(component) {
                    console.log('form.component change', component);
                    $scope.operation.filter.componentType = typeof $scope.dataset[0][component];
                    $scope.componentValues = getComponentValues(component);
                });

                function getComponentValues(component) {
                    var components =
                        $scope.dataset.map(
                            d => d[component]
                    ).reduce((uniques, d) => {
                            if (uniques.indexOf(d)==-1) uniques.push(d); return uniques;
                    }, []);
                    return components;
                }

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
                        
                    }
                }

                $scope.togglePanel = togglePanel;
                function togglePanel() {
                    $scope.expanded = !$scope.expanded;
                }

            }
        }
    });
})();
