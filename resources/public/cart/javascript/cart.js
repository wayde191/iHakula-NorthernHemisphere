var app = angular.module('p1-scorecard', ['ngRoute', 'ngResource', 'gofigure-common']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'cart/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true
        });
}]);

angular.bootstrap().invoke(bootstrap('p1-scorecard'));

app.controller('dashboardController', function($scope) {
    $scope.cart = 'cart/partials/cart.html';
});

app.controller('CartController', ['$scope', function($scope) {
    $scope.amount = 10;
    $scope.checkboxModel = {
        allChecked : true,
        value2 : 'YES'
    };
    $scope.changed = function(){
        console.log($scope.checkboxModel);
    };
}]);

