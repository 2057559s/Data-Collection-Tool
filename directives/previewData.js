/**
 * Created by nicholassaunderson on 09/08/2016.
 */
(function(){
    var app = angular.module("myApp");
    
    app.directive('previewData', function(){
        return {
            restrict: "EA",
            templateUrl: 'templates/previewData.html',
            controller: function($element, $scope) {
                $scope.previewData = function(i) {
                    //The first 5 objects within the current data set
                    $scope.preview = $scope.dataset.slice(0,20); //$scope.datasets[i].slice(0-5);

                    console.log($scope.preview[0])

                    $($element.eq(0)).find('.modal').show(); //.css({'display':'block'});
                };

                $scope.closeModal = function() {
                    $($element.eq(0)).find('.modal').hide();
                };
            }
        }
    });

})();