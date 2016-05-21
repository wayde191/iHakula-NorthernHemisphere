var app = angular.module('cart', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'cart/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true,
            resolve: {
                allProducts: function (nhProduct) {
                    return nhProduct.getProduct().$promise;
                }
            }
        });
}]);

angular.bootstrap().invoke(bootstrap('cart'));

app.controller('dashboardController', function($scope, allProducts) {
    $scope.cart = 'cart/partials/cart.html';
    $scope.products = allProducts;
    $scope.items = [];

    function getItemInCart(){
        var amount = 0;
        for (var i = 0; i < $scope.products.length; i++){
            var productId = $scope.products[i].id;
            var amount = parseInt(window.localStorage[productId]);
            if(amount) {
                $scope.products[i].amount = amount;
                $scope.items.push($scope.products[i]);
            }
        }
    }
    getItemInCart();

    console.log($scope.items);
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

