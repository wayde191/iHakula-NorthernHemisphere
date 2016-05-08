var app = angular.module('p1-scorecard', ['ngRoute', 'ngResource', 'gofigure-common']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'production/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true
        });
}]);

angular.bootstrap().invoke(bootstrap('p1-scorecard'));

app.controller('dashboardController', function($scope) {
    $scope.productions = 'production/partials/xt-tea.html';
});

app.controller('ProductionController', function($scope) {

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
            console.log(attrs.productId);
            var prod = window.xtTeaProductions[attrs.productId - 1];

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
            scope.shopping = function(){
                window.localStorage.teaAmount = scope.counter;
                console.log(scope.counter);
            };
            scope.$watch('counter', function(counter){
                console.log(counter);
            });
        }
    };
});

app.directive('tiles',
    function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'production/partials/tiles.html',
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

