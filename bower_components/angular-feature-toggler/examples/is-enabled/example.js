var app = angular.module('example', ["feature-toggler"]);

app.controller('exampleController', function($scope, featureToggleService) {
    $scope.isDevMode = featureToggleService.isDevMode();
    $scope.currentUrl = window.location.href;
    $scope.check1 = featureToggleService.isEnabled("enable-check-1");
    $scope.check2 = featureToggleService.isEnabled("enable-check-2");
    $scope.check3 = featureToggleService.isEnabled("enable-check-3");
});
