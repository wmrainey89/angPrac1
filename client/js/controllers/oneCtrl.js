angular.module("app")

.controller("oneCtrl", oneController);

oneController.$inject = ["$scope", "$location", "prac1Factory"];

function oneController($scope, $location, prac1Factory){
    $scope.one = function(){
        $location.path("/four");
    }
}