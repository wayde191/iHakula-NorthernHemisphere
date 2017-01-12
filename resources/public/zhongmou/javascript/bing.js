var app = angular.module('bing', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'zhongmou/partials/index.html',
        controller: 'dashboardController',
        reloadOnSearch: true
    })
    .otherwise({redirectTo: '/'});
}]);

angular.bootstrap().invoke(bootstrap('bing'));

app.controller('dashboardController', function ($scope) {
});

app.controller('SidebarController', function ($scope) {
});

