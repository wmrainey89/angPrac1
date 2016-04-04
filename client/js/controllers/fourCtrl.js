angular.module("app")

.controller("fourCtrl", fourController);

fourController.$inject = ["$scope", "$location", "prac1Factory"];

function fourController($scope, $location, prac1Factory) {
    $scope.four = function(){
        $location.path("/three");
    }    
}