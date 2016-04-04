angular.module("app")

.controller("threeCtrl", threeController);

threeController.$inject = ["$scope", "$location", "prac1Factory"];

function threeController($scope, $location, prac1Factory) {
    $scope.three = function() {
        $location.path("/two");
    }
}