var bootstrap = function(module) {
    return function($http, $q) {
        $q.all({
            date: $http.get('/api/date.json')
        }).then(function(responses) {
            var today = dateUtils.toUTCDate(new Date(sessionStorage.dateOverride ? sessionStorage.dateOverride : responses.date.data.date));

            window.localStorage.teaAmount = window.localStorage.teaAmount || 0;
            window.nh = {};
            window.nh.userInfo = {};
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

common.directive('nhHeader', function(nhUser, sessionStorageService, userService) {
    return {
        templateUrl: '/angular-htmls/header.html',
        link: function(scope, element, attrs) {

            scope.myOrderLink = '/order.html';
            scope.loginLink = 'http://localhost/sso/login.html?redirect=http://localhost:3000/productions.html';
            scope.cartLink = '/carts.html';
            scope.amount = 0;
            scope.showAmount = scope.amount > 0 ? true : false;

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

            scope.userInfo = "请登录";
            nhUser.isUserLoggedIn({username: sessionStorageService.getUserId(), token: sessionStorageService.getToken()})
                .$promise.then(function (response) {
                    if(response.status === 1){
                        userService.getUserInfo();
                    } else {
                        sessionStorageService.restoreUser();
                    }
                });

            scope.$watch(function () {
                return sessionStorage.isUserLoggedIn;
            }, function (newVal, oldVal) {
                if (newVal !== undefined && newVal === "true") {

                    scope.userInfo = sessionStorageService.getUsername();
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
        return sessionStorage.token ? sessionStorage.token : 'fake-token';
    };

    var getUserId = function(){
        return sessionStorage.userId ? sessionStorage.userId : '999999';
    };

    var getUsername = function(){
        return sessionStorage.username ? sessionStorage.username : 'fake-username';
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

    var isUserLoggedIn = function(){
      return sessionStorage.isUserLoggedIn === 'true' ? true : false;
    };

    var setUserLoggedIn = function(){
        sessionStorage.isUserLoggedIn = true;
    };

    var restoreUser = function(){
        sessionStorage.isUserLoggedIn = false;
        sessionStorage.userId = '999999';
        sessionStorage.token = 'fake-token';
        sessionStorage.username = 'fake-username';
    };

    return {
        getToken : getToken,
        getUserId : getUserId,
        setToken: setToken,
        setUserId: setUserId,
        getUsername: getUsername,
        setUsername: setUsername,
        isUserLoggedIn: isUserLoggedIn,
        setUserLoggedIn: setUserLoggedIn,
        restoreUser: restoreUser
    };
});

common.factory('nhUser', ['$resource', function($resource) {
    return $resource('/api/:username/:token/:type', {}, {
        getUserInfo: {
            method: 'GET',
            params: {
                type: 'user.json'
            },
            isArray: false,
            cache: true
        },
        isUserLoggedIn: {
            method: 'GET',
            params: {
                type: 'isUserLoggedIn.json'
            },
            isArray: false,
            cache: true
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

common.service('userService',function(sessionStorageService, nhUser, $window){
    var isUserLoggedIn = function(){
        return sessionStorageService.isUserLoggedIn();
    };

    var getUserInfo = function(){
        var username = sessionStorageService.getUsername();
        var token = sessionStorageService.getToken();
        nhUser.getUserInfo({username: username, token: token}).$promise
            .then(function (data) {
                window.nh.userInfo = data.user;
                sessionStorageService.setUserLoggedIn();
                sessionStorageService.setUserId(nh.userInfo.id);
                sessionStorageService.setUsername(nh.userInfo.phone);
                sessionStorageService.setToken(nh.userInfo.token);
            });
    };

    var getCallBackLink = function(){
        var loginUri = $window.location.protocol
            + '//' + $window.location.hostname
            + '/sso/login.html';
        var callbackUri = $window.location.origin + $window.location.pathname;
        return loginUri + '?redirect=' + callbackUri;
    };

    return {
        getUserInfo : getUserInfo,
        isUserLoggedIn: isUserLoggedIn,
        getCallBackLink: getCallBackLink
    };
});

common.controller('AuthCtrl', function($scope, $rootScope, $window, sessionStorageService, userService) {
    $scope.viewMenu = false;

    $scope.showMenu = function(){
        if(userService.isUserLoggedIn()){
            userService.getUserInfo();
        } else {
            $window.location.href = userService.getCallBackLink();
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
