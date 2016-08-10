/**
 * Created by nicholassaunderson on 10/08/2016.
 */
(function (){
    var app = angular.module("myApp");
    app.directive("dsExport", function(){
        return {
            restrict: "EA",
            templateUrl: 'templates/dsExport.html',

        };
    })

})();