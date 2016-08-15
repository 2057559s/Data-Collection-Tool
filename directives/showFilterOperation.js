/**
 * Created by nicholassaunderson on 15/08/2016.
 */
/**
 * Created by nicholassaunderson on 09/08/2016.
 */
(function(){
    var app = angular.module("myApp");
    app.directive('showFilterOperation', function() {
        return {
            restrict: "EA",
            scope: {
                operation: "=operation"
            },
            templateUrl: 'templates/showFilterOperation.html',
        }
    });
})();
