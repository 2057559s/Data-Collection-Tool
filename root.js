/**
 * Created by nicholassaunderson on 01/08/2016.
 */
var app = angular.module("myApp", []);

app.service('ndms', function() {

    var datasets = [];
    var operations = [];

    return {
        getDataSets: function() {
            return datasets;
        },

        getOperations: function(){
            return operations;
        },

        setInitialDataSet: function(dataset) {
            datasets.splice(0);
            datasets.push(dataset);
            console.log(datasets);
        },
        addDataOperation: function(operation) {
            operations.push(operation);
            var dataset = datasets[datasets.length-1];
            var newDataset = dataset[operation.type](operation.f);
            //console.log("new dataset: " + newDataset);
            datasets.push(newDataset);
        },
        rerunOperations: function() {
            datasets.splice(1);
            operations.forEach(function(operation) {
                var dataset = datasets[datasets.length-1];
                var newDataset = dataset[operation.type](operation.f);
                datasets.push(newDataset);
            });
        },
    };
});



app.controller("myCtrl", function($scope, ndms){

    $scope.datasets = ndms.getDataSets();
    $scope.operations = ndms.getOperations();

    $scope.$watch('operations', function() {
        ndms.rerunOperations();
    }, true);

});

app.directive("dsImport", function() {
    return {
        restrict: "EA",
        templateUrl: 'templates/dsImport.html',
        controller: function($scope, ndms) {
            $scope.add = function(){
                var parsedInput = JSON.parse($scope.textIN);
                ndms.setInitialDataSet(parsedInput);
            };
        }
    };
});

app.directive("showComponents", function(){
    return{
        restrict: "EA",
        scope: {
            dataSet: '=dataset',
        },
        templateUrl: 'templates/showComponents.html',
        controller: function($scope) {
            $scope.$watch('dataSet', function(dataset) {
                if (dataset===undefined) {
                    return;
                }

                if (typeof $scope.dataSet[0] === "object") {
                    $scope.components = [];
                    for (key in $scope.dataSet[0]) {
                        $scope.components.push({
                            key: key,
                            type: evaluateComponentType(key),
                        });
                    }
                }

                $scope.numberOfObjects = $scope.dataSet.length;

                function evaluateComponentType(key) {
                    return typeof $scope.dataSet[0][key];
                }
            });
        }
    }


});

app.directive('addOperation', function() {
    return {
        restrict: "EA",
        scope: {},
        templateUrl: 'templates/addOperation.html',

        controller: function($scope, ndms) {
            $scope.code = "";
            $scope.add = function() {
                var f;
                try {
                    f = eval("(function(d, i) {" + $scope.code + "})");
                } catch (error) {
                    $scope.error = error;
                }
                ndms.addDataOperation({
                    name: $scope.nameIN,
                    type: $scope.optionIN,
                    f: f,
                });
            };

        },
    };
});

app.directive('showOperation', function() {
    return{
        restrict: "EA",
        scope: {
            operation: "=operation"
        },
        templateUrl: 'templates/showOperation.html'
    }
});

app.directive('previewData', function(){
    return{
        restrict: "EA",
        templateUrl: 'templates/previewData.html',
        controller: function($scope){
            $scope.previewData = function(i){
                //The first 5 objects within the current dataset
                $scope.preview = $scope.datasets[i].slice(0-5);

            };
            $scope.hide = function(){
                $scope.preview = "";
            }
        }
    }
});
