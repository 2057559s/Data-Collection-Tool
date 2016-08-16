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

        deleteOperation: function(operation){
            var i = operations.indexOf(operation);
            operations.splice(i, 1);
        },

        setInitialDataSet: function(dataset) {
            datasets.splice(0);
            datasets.push(dataset);
            console.log(datasets);
        },
        addDataOperation: function(operation) {
            operations.push(operation);
            var dataset = datasets[datasets.length-1];
//            var newDataset = dataset[operation.type](operation.f);
            var newDataset = dataset[operation.type](operation.createF());
            //console.log("new dataset: " + newDataset);
            datasets.push(newDataset);
        },
        rerunOperations: function() {
            console.log('rerunning operations');
            datasets.splice(1);
            operations.forEach(function(operation) {
                var dataset = datasets[datasets.length-1];
//                var newDataset = dataset[operation.type](operation.f);
                var newDataset = dataset[operation.type](operation.createF());
                datasets.push(newDataset);
            });
        },
    };
});



app.controller("myCtrl", function($scope, ndms){

    $scope.datasets = ndms.getDataSets();
    $scope.operations = ndms.getOperations();

    $scope.isCodeOperation = function(operation){
        return operation.operationType==="generic-code";
    };

    $scope.isFilterOperation = function(operation){
        return operation.operationType==="component-filter";
    };

    $scope.$watch('operations', function() {
        try {
            ndms.rerunOperations();
        } catch (e) {
            console.log("ERRRRRRRO");
            console.log(e);
        }
    }, true);

});

app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|data):/);
}]);