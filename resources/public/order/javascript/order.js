var app = angular.module('order', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'order/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true,
            resolve: {
                allProducts: function (nhProduct) {
                    return nhProduct.getProduct().$promise;
                }
            }
        });
}]);

angular.bootstrap().invoke(bootstrap('order'));

app.controller('dashboardController', function($scope, allProducts) {
    $scope.order = 'order/partials/order.html';
    $scope.products = allProducts;

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
});

app.controller('OrderController', ['$scope', function($scope) {
    $scope.showDialog = false;
    $scope.toggleContactDialog = function(){
        $scope.showDialog = !$scope.showDialog;
    };
}]);

app.directive('userContact', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'order/partials/contact.html',
        scope: {
            productId: '=',
            flip: '&',
            flipBack: '&'
        },

        link: function(scope, element, attrs) {
            scope.onCloseBtnClicked = function(){
                scope.$parent.toggleContactDialog();
            };

            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            scope.dialog = {
                width: '690px',
                top: '40px',
                left: (windowWidth - 690) / 2 + 'px'
            };
            scope.dialogMask = {
                width: windowWidth + 'px',
                height: windowHeight + 100 + 'px'
            };
        }
    };
});

