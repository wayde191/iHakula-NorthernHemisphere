var app = angular.module('bing', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'zhongmou/partials/index.html',
        controller: 'dashboardController',
        reloadOnSearch: true
    }).
    when('/191054', {
        templateUrl: 'zhongmou/partials/191054.html',
        controller: '191054Controller',
        reloadOnSearch: true
    }).
    otherwise({redirectTo: '/'});
}]);

angular.bootstrap().invoke(bootstrap('bing'));

app.controller('dashboardController', function ($scope) {
});

app.controller('SidebarController', function ($scope) {
});

app.controller('191054Controller', function ($scope) {
    $('#home .navbar').removeClass('navbar-transparent');

    $scope.$on('$includeContentLoaded', function (event) {
    });
});

