var bootstrap = function(module) {
    return function($http, $q) {
        //$q.all({
        //    date: $http.get('/api/date.json'),
        //    config: $http.get('/api/config.json'),
        //    user: $http.get('/api/user.json', { cache: true})
        //}).then(function(responses) {
        //    var today = dateUtils.toUTCDate(new Date(sessionStorage.dateOverride ? sessionStorage.dateOverride : responses.date.data.date));
        //    var User = responses.user.data;
        //    User.userID = User["user-id"].split('@')[0];
            window.loaded = {};

            angular.element(document).ready(function() {
                angular.module(module)
                    //.constant('today', today)
                    //.constant('User', User)
                    //.constant('piwikHost', responses.config.data['piwik-host'])
                    //.constant('enabledFeatures', responses.config.data['toggled-features'])
                    //.constant('salesFunnelUrl', responses.config.data['sales-funnel-url'] + 'opportunity-details/');
                angular.bootstrap(document, [module]);
            });
        //});
    };
};

var common = angular.module('gofigure-common', []);

common.directive('gofigureHeader', function() {
    return {
        templateUrl: '/angular-htmls/header.html',
        link: function(scope,element,attrs) {
            console.log("What the hell");
        }
    };
});
