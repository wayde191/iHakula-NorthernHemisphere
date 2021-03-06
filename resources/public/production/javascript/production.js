var app = angular.module('product', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'production/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true
        }).
        when('/callback/:token/:username/:uid', {
            templateUrl: 'production/partials/index.html',
            controller: 'dashboardCallbackController',
            reloadOnSearch: true
        }).otherwise({redirectTo:'/'});
}]);

angular.bootstrap().invoke(bootstrap('product'));

app.controller('dashboardController', function($scope) {
    $scope.productions = 'production/partials/xt-tea.html';
});

app.controller('dashboardCallbackController', function($scope, $routeParams, sessionStorageService, userService) {
    $scope.productions = 'production/partials/xt-tea.html';

    sessionStorageService.setToken($routeParams.token);
    sessionStorageService.setUserId($routeParams.uid);
    sessionStorageService.setUsername($routeParams.username);

    userService.getUserInfo();

});

app.controller('ProductionController', function($scope, Product) {
    $scope.dataLoaded = false;
    Product.getProduct().$promise.then(
        function(data) {
            $scope.dataLoaded = true;
            $scope.products = data;
            window.localStorage['productions'] = JSON.stringify(data);
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
            var prod = scope.$parent.products[scope.productId - 1];

            scope.id = prod.id;
            scope.coverImageUrl = '/images/' + prod.image_url;
            scope.name = prod.name;
            scope.price = prod.sale_price;

            scope.counter = window.localStorage[scope.productId] || 1;
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

