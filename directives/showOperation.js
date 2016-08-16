/**
 * Created by nicholassaunderson on 16/08/2016.
 */
app.directive('showOperation', function() {
    return {
        restrict: "EA",
        scope: {
            operation: "=operation",
            dataset: "=dataset",
        },
        templateUrl: 'templates/showOperation.html',
        controller: function ($scope) {
            $scope.isCodeOperation = function() {
                return $scope.operation.operationType==='generic-code';
            };

            $scope.isComponentFilterOperation = function() {
                return $scope.operation.operationType==='component-filter';
            };
        }
    }
});
