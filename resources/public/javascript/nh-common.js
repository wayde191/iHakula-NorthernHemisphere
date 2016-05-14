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

var common = angular.module('nh-common', []);

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
                if (newVal !== undefined) {
                    scope.amount = newVal;
                    $('#shopping-amount').animateCss('tada');
                    $('#shopping-cart').animateCss('tada');
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
