angular.module("app")

.controller("twoCtrl", twoController);

twoController.$inject = ["$scope", "$location", "prac1Factory"];

function twoController($scope, $location, prac1Factory) {
    $scope.two = function(){
        $location.path("/");
    }
}