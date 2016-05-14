var app = angular.module('product', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'production/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true
        });
}]);

angular.bootstrap().invoke(bootstrap('product'));

app.controller('dashboardController', function($scope) {
    $scope.productions = 'production/partials/xt-tea.html';
});

app.controller('ProductionController', function($scope, Product) {
    $scope.dataLoaded = false;
    Product.getProduct().$promise.then(
        function(data) {
            $scope.dataLoaded = true;
            $scope.products = data;
        }
    );
});

app.directive('tiles',
    function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'production/partials/tiles.html',

            link: function(scope, element, attrs) {
                scope.name = "xt-tea";
                scope.show = true;

                //console.log(scope.products[0]);

                scope.counter = 1;
                scope.reduce = function(){
                    scope.counter--;
                };
                scope.increase = function(){
                    scope.counter++;
                };

                function updateTeaAmount(){
                    var amount = 0;
                    for (var i = 1; i < 7; i++){
                        var no = parseInt(window.localStorage[i]);
                        if(no) {
                            amount += no;
                        }
                    }

                    window.localStorage.teaAmount = amount;
                }
                scope.shopping = function(productId){
                    window.localStorage[productId] = scope.counter;
                    updateTeaAmount();
                };
                scope.$watch('counter', function(counter){
                    console.log(counter);
                });
            }
        };
    });

app.directive('teaTile', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'production/partials/tea.html',
        scope: {
            productId: '=',
            flip: '&',
            flipBack: '&'
        },

        link: function(scope, element, attrs) {
            var prod = window.xtTeaProductions[attrs.productId - 1];

            scope.id = prod.id;
            scope.coverImageUrl = prod.image;
            scope.name = prod.name;
            scope.price = prod.price;

            scope.counter = 1;
            scope.reduce = function(){
                scope.counter--;
            };
            scope.increase = function(){
                scope.counter++;
            };

            function updateTeaAmount(){
                var amount = 0;
                for (var i = 1; i < 7; i++){
                    var no = parseInt(window.localStorage[i]);
                    if(no) {
                        amount += no;
                    }
                }

                window.localStorage.teaAmount = amount;
            }
            scope.shopping = function(){
                window.localStorage[scope.id] = scope.counter;
                updateTeaAmount();
            };
            scope.$watch('counter', function(counter){
                console.log(counter);
            });
        }
    };
});

app.directive('tile',
    function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'production/partials/tile.html',
            scope: true,
            compile: function(tE, tA, transcludeFn) {
                return function (scope, elem, attrs) {
                    scope.name = attrs.name;
                    scope.show = true;

                    if(scope.show) {
                        elem.append(transcludeFn(scope)[1]);
                        scope.$emit('start');
                    }
                };
            },

            controller: function($scope, $rootScope) {
                $scope.$on('start', function () {
                    $scope.showSpinner = true;
                    $rootScope.hidePageSpinner = true;
                });

                $scope.$on('end', function () {
                    $scope.showSpinner = false;
                });

                $scope.flipped = {};
                $scope.flip = function(name) {
                    $scope.flipped[name] = true;
                };

                $scope.flipBack = function(name) {
                    $scope.flipped[name] = false;
                };
            },
        };
    }
);

