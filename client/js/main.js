angular.module("app", ["ngRoute", "ngResource"])

.config(["$routeProvider", function($routeProvider){
    
    $routeProvider
    
    .when("/", {
        templateUrl: "client/views/one.html",
        controller: "oneCtrl"
    })
    
    .when("/two", {
        templateUrl: "views/two.html",
        controller: "twoCtrl"
    })
    
    .when("/three", {
        templateUrl: "views/three.html",
        controller: "threeCtrl"
    })
    
    .when("/four", {
        templateUrl: "client/views/four.html",
        controller: "fourCtrl"
    })
    
    .otherwise({
        redirectTo: "/"
    })
}]);