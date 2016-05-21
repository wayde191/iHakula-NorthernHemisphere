var bootstrap = function(module) {
    return function($http, $q) {
        $q.all({
            date: $http.get('/api/date.json')
        }).then(function(responses) {
            var today = dateUtils.toUTCDate(new Date(sessionStorage.dateOverride ? sessionStorage.dateOverride : responses.date.data.date));

            window.localStorage.teaAmount = window.localStorage.teaAmount || 0;
            window.userInfo = {};
            window.loaded = {};

            angular.element(document).ready(function() {
                $.fn.extend({
                    animateCss: function (animationName) {
                        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                            $(this).removeClass('animated ' + animationName);
                        });
                    }
                });

                angular.module(module)
                    .constant('today', today);
                angular.bootstrap(document, [module]);
            });
        });
    };
};

var common = angular.module('nh-common', []);

common.directive('nhHeader', function() {
    return {
        templateUrl: '/angular-htmls/header.html',
        link: function(scope, element, attrs) {

            scope.myOrderLink = '/order.html';
            scope.loginLink = 'http://localhost/sso/login.html?redirect=http://localhost:3000/productions.html';
            scope.cartLink = '/carts.html'
            scope.amount = 0;
            scope.showAmount = scope.amount > 0 ? true : false;
            scope.userInfo = "请登录";

            scope.showCart = function(){
                window.location.href = '/cart.html';
            };

            scope.$watch('amount', function (newValue) {
                scope.showAmount = newValue > 0;
            });
            scope.$watch(function () {
                return window.localStorage.teaAmount;
            }, function (newVal, oldVal) {
                if (newVal !== undefined) {
                    scope.amount = newVal;
                    $('#shopping-amount').animateCss('tada');
                    $('#shopping-cart').animateCss('tada');
                }
            });

            scope.$watch(function () {
                return window.localStorage.phone;
            }, function (newVal, oldVal) {
                if (newVal !== undefined) {
                    scope.userInfo = newVal;
                }
            });
        }
    };
});

common.directive('spinner', function() {
    //var onbrandSpinner = '<span class="overlay"></span> <img class="glyph-spinner" src="/images/spinner.png">';
    var defaultSpinner = '<span class="overlay"></span><span class="spinner"></span>';
    var spinner = defaultSpinner;

    return {
        restrict: 'E',
        template: spinner,
        scope: {
            loading: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch(attrs.loading, function(loading) {
                if(!loading) {
                    element.children().hide();
                } else {
                    element.children().show();
                }
            });
        }
    };
});

common.service('sessionStorageService',function(){
    var getToken = function(){
        return sessionStorage.token ? sessionStorage.token : '';
    };

    var getUserId = function(){
        return sessionStorage.userId ? sessionStorage.userId : '';
    };

    var getUsername = function(){
        return sessionStorage.username ? sessionStorage.username : '';
    };

    var setToken = function(token){
        sessionStorage.token = token;
    };

    var setUserId = function(userId){
        sessionStorage.userId = userId;
    };

    var setUsername = function(username){
        sessionStorage.username = username;
    };

    return {
        getToken : getToken,
        getUserId : getUserId,
        setToken: setToken,
        setUserId: setUserId,
        getUsername: getUsername,
        setUsername: setUsername
    };
});

common.service('userService',function(sessionStorageService){
    var isUserLoggedIn = function(){
        var userId = sessionStorageService.getUserId();
        var token = sessionStorageService.getToken();

        if(userId === '' || token === ''){
            return false;
        } else {
            return true;
        }
    };

    var getUserInfo = function(){
        if(!isUserLoggedIn()){
            return null;
        }

        var userId = sessionStorageService.getUserId();
        var token = sessionStorageService.getToken();
        $http.get('/api/' + userId + '/' + token + '/user.json', {}).then(function(response) {
            return response.data;
        });
    };

    return {
        getUserInfo : getUserInfo,
        isUserLoggedIn: isUserLoggedIn
    };
});

common.factory('nhUser', ['$resource', function($resource) {
    return $resource('/api/:username/:token/user.json', {}, {
        getUserInfo: {
            method: 'GET',
            isArray: false,
            cache: true,
            params: {
            }
        }
    });
}]);

common.factory('nhProduct', ['$resource', function($resource) {
    return $resource('/api/products.json', {}, {
        getProduct: {
            method: 'GET',
            params: {},
            isArray: true
        }
    });
}
]);

common.controller('AuthCtrl', function($scope, $rootScope, $window, userService, nhUser) {
    $scope.viewMenu = false;

    $scope.showMenu = function(){
        if(userService.isUserLoggedIn()){
            nhUser.getUserInfo({username: userService.getUsername(), token: userService.getToken()}).$promise
                .then(function (data) {
                    window.userInfo = data.user;
                    window.localStorage.phone = '';
                    window.localStorage.phone = window.userInfo.phone;
                });
        } else {
            $window.location.href = 'http://localhost/sso/login.html?redirect=http://localhost:3000/productions.html';
        }
    };

    $(document).on('click', function(e) {
        // use $emit so the event stays inside $rootScope
        $rootScope.$emit('click', {target: e.target});
    });
    $scope.closeNavDropDown = function(){
        $scope.viewMenu = false;
    };
});
