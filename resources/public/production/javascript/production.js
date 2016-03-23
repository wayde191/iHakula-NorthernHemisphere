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

app.controller('dashboardController', function() {

    console.log("hahahahah");
});

