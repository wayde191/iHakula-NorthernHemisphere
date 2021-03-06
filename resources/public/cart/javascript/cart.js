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
        })
        .when('/callback/:token/:username/:uid', {
            templateUrl: 'cart/partials/index.html',
            controller: 'dashboardCallbackController',
            reloadOnSearch: true,
            resolve: {
                allProducts: function (nhProduct) {
                    return nhProduct.getProduct().$promise;
                }
            }
        }).otherwise({redirectTo: '/'});
}]);

angular.bootstrap().invoke(bootstrap('cart'));

app.controller('dashboardCallbackController', function($scope, allProducts, $routeParams, sessionStorageService, userService) {
    $scope.cart = 'cart/partials/cart.html';
    $scope.products = allProducts;

    sessionStorageService.setToken($routeParams.token);
    sessionStorageService.setUserId($routeParams.uid);
    sessionStorageService.setUsername($routeParams.username);

    userService.getUserInfo();

});

app.controller('dashboardController', function($scope, allProducts) {
    $scope.cart = 'cart/partials/cart.html';
    $scope.products = allProducts;
});

app.controller('CartController', ['$scope', 'userService', function($scope, userService) {
    function restore() {
        $scope.amount = 0;
        $scope.sumPrice = 0;
        $scope.items = [];
    }

    function getItemInCart(){
        var amount = 0;
        for (var i = 0; i < $scope.products.length; i++){
            var productId = $scope.products[i].id;
            amount = parseInt(window.localStorage[productId]);
            if(amount) {
                $scope.amount += amount;
                $scope.products[i].amount = amount;
                $scope.products[i].sum = amount * $scope.products[i].sale_price;
                $scope.sumPrice += $scope.products[i].sum;
                $scope.items.push($scope.products[i]);
            }
        }
        $scope.discount = $scope.sumPrice * 0.05;
        $scope.sumPrice *= 0.95;
    }

    restore();
    getItemInCart();

    $scope.remove = function(productionId, index){
        window.localStorage.removeItem(productionId);
        var item = $scope.items[index];
        window.localStorage.teaAmount = $scope.amount - item.amount;
        restore();
        getItemInCart();
    };

    $scope.order = function(){
        if (userService.isUserLoggedIn()){
            window.location.href = '/order.html';
        } else {
            window.location.href = userService.getLoginCallBackLink();
        }
    };
}]);

