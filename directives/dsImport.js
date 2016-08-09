(function() {
    var app = angular.module("myApp");

    /**
     * Created by nicholassaunderson on 09/08/2016.
     */
    app.directive("dsImport", function () {
        return {
            restrict: "EA",
            templateUrl: 'templates/dsImport.html',
            controller: function ($scope, ndms) {
                $scope.add = function () {
                    var parsedInput = JSON.parse($scope.textIN);
                    ndms.setInitialDataSet(parsedInput);
                };
            }
        };
    });
})();
