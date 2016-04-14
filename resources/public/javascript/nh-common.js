var bootstrap = function(module) {
    return function($http, $q) {

        window.localStorage.teaAmount = window.localStorage.teaAmount || 0;
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

            angular.module(module).constant('today', new Date());
            angular.bootstrap(document, [module]);
        });
    };
};

var common = angular.module('gofigure-common', []);

common.directive('gofigureHeader', function() {
    return {
        templateUrl: '/angular-htmls/header.html',
        link: function(scope, element, attrs) {

            scope.amount = 0;
            scope.showAmount = scope.amount > 0 ? true : false;
            scope.$watch('amount', function (newValue) {
                scope.showAmount = newValue > 0;
            });
            scope.$watch(function () {
                return window.localStorage.teaAmount;
            }, function (newVal, oldVal) {
                if (oldVal !== newVal && newVal !== undefined) {
                    scope.amount = newVal;
                    $('#shopping-amount').animateCss('tada');
                    $('#shopping-cart').animateCss('tada');
                }
            });
        }
    };
});

common.controller('AuthCtrl', function($scope, $rootScope) {
    $scope.viewMenu = false;

    $scope.showMenu = function(){
        $scope.viewMenu = !$scope.viewMenu;
    };
    $(document).on('click', function(e) {
        // use $emit so the event stays inside $rootScope
        $rootScope.$emit('click', {target: e.target});
    });
    $scope.closeNavDropDown = function(){
        $scope.viewMenu = false;
    };
});
