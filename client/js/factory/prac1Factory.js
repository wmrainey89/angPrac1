angular.module("app")

.factory("prac1Factory", prac1Factory);

prac1Factory.$inject = ["$resource"];

function prac1Factory($resource) {
    return $resource("http://localhost3000/api/two/:id");
}