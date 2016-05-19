var app = angular.module('cart', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'cart/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true
        });
}]);

angular.bootstrap().invoke(bootstrap('cart'));

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
    $scope.items = [{"id":"03"}, {"id":"04"},{"id":"05"}];
}]);

