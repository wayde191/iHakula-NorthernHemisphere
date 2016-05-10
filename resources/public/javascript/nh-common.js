var bootstrap = function(module) {
    return function($http, $q) {

        window.localStorage.teaAmount = window.localStorage.teaAmount || 0;
        window.loaded = {};

        window.xtTeaProductions = [
            {id:'1',name:'明前茶', price:'260元', image:'/images/tea_package_1_icon.png'},
            {id:'2',name:'明前茶', price:'380元', image:'/images/tea_package_2_icon.png'},
            {id:'3',name:'清明茶', price:'260元', image:'/images/tea_package_1_icon.png'},
            {id:'4',name:'清明茶', price:'350元', image:'/images/tea_package_2_icon.png'},
            {id:'5',name:'谷雨茶', price:'260元', image:'/images/tea_package_1_icon.png'},
            {id:'6',name:'谷雨茶', price:'350元', image:'/images/tea_package_2_icon.png'}
        ];

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
                if (newVal !== undefined) {
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
