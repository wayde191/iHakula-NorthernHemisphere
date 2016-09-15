var app = angular.module('joke', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'joke/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true
        }).otherwise({redirectTo:'/'});
}]);

angular.bootstrap().invoke(bootstrap('joke'));

app.controller('dashboardController', function($scope) {
    $scope.sidebar = 'joke/partials/sidebar.html';
    $scope.content = 'joke/partials/content.html';
});

app.controller('SidebarController', function($scope, Joke) {
    //$scope.dataLoaded = false;
    //Joke.getProduct().$promise.then(
    //    function(data) {
    //        $scope.dataLoaded = true;
    //        $scope.products = data;
    //        window.localStorage['productions'] = JSON.stringify(data);
    //    }
    //);
});

app.controller('ContentController', function($scope, Joke) {
    $scope.dataLoaded = false;
    //Joke.getJoke({number: 1}).$promise.then(
    //    function(data) {
    //        $scope.dataLoaded = true;
    //        $scope.jokes = data;
    //        console.log($scope.jokes);
    //    }
    //);

    //$scope.jokes = [{
    //    "title": "这是一个大笑话",
    //    "subTitle": "你懂的",
    //    "pics": [{
    //        "url": "http://n.sinaimg.cn/default/transform/20160905/bKR8-fxvqqsk4771771.jpg",
    //        "desc": "img1"
    //    }, {
    //        "url": "http://n.sinaimg.cn/default/transform/20160905/5f_S-fxvqcts9514821.jpg",
    //        "desc": "img12"
    //    }]
    //}, {
    //    "title": "b title",
    //    "subTitle": "b desc",
    //    "pics": [{
    //        "url": "http://n.sinaimg.cn/default/transform/20160905/bKR8-fxvqqsk4771771.jpg",
    //        "desc": "img1"
    //    }]
    //}];


});

//app.directive('tiles',
//    function() {
//        return {
//            restrict: 'E',
//            transclude: true,
//            replace: true,
//            templateUrl: 'production/partials/tiles.html',
//
//            link: function(scope, element, attrs) {
//                scope.name = "xt-tea";
//                scope.show = true;
//            }
//        };
//    });
//
//app.directive('teaTile', function() {
//    return {
//        restrict: 'E',
//        replace: true,
//        templateUrl: 'production/partials/tea.html',
//        scope: {
//            productId: '=',
//            flip: '&',
//            flipBack: '&'
//        },
//
//        link: function(scope, element, attrs) {
//            var prod = scope.$parent.products[scope.productId - 1];
//
//            scope.id = prod.id;
//            scope.coverImageUrl = '/images/' + prod.image_url;
//            scope.name = prod.name;
//            scope.price = prod.sale_price;
//
//            scope.counter = window.localStorage[scope.productId] || 1;
//            scope.reduce = function(){
//                scope.counter--;
//            };
//            scope.increase = function(){
//                scope.counter++;
//            };
//
//            function updateTeaAmount(){
//                var amount = 0;
//                for (var i = 1; i < 7; i++){
//                    var no = parseInt(window.localStorage[i]);
//                    if(no) {
//                        amount += no;
//                    }
//                }
//
//                window.localStorage.teaAmount = amount;
//            }
//            scope.shopping = function(){
//                window.localStorage[scope.id] = scope.counter;
//                updateTeaAmount();
//            };
//            scope.$watch('counter', function(counter){
//                console.log(counter);
//            });
//        }
//    };
//});

