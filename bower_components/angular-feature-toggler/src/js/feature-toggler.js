var app = angular.module('feature-toggler', []);

app.constant('enabledFeatures', []);

app.service('featureToggleService', ['enabledFeatures', '$window', function(enabledFeatures, $window) {
    var self = this;

    var localFeatures = function() {
        return sessionStorage.featuresOverride ?
            JSON.parse(sessionStorage.featuresOverride) :
            [];
    };

    var hasLocal = function() {
        return sessionStorage.featuresOverride;
    };

    var updateLocalStorage = function() {
        sessionStorage.featuresOverride = angular.toJson(features);
    };

    var addFeature = function(name, status) {
        if(name && name.length > 0) {
            features.push({name: name, status: status});
        }
    };

    var features = localFeatures();

    if(!hasLocal()) {
        features = enabledFeatures.map(function(name){
            return {
                name: name,
                status: true
            };
        });
    }

    var endsWith = function(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    return {
        features: features,
        isDevMode: function() {
            return endsWith($window.location.hash, "dev");
        },
        toggle: function(feature) {
            feature.status = !feature.status;
        },
        clear: function() {
            delete sessionStorage.featuresOverride;
            $window.location.reload();
        },
        save: function() {
            updateLocalStorage();
            $window.location.reload();
        },
        hasLocal: hasLocal,
        isEnabled: function(name) {
            for(var i=0; i< features.length; i++) {
                var feature = features[i];

                if (feature.name === name) {
                    return feature.status;
                }

            };

            addFeature(name, false);
            return false;
        }
    };
}]);

app.directive('featureToggler', ['featureToggleService', function(featureToggleService) {
    return {
        restrict: 'E',
        link: function(scope) {
            scope.show = featureToggleService.isDevMode();
            scope.features = featureToggleService.features;
            scope.showFeatures = false;
            scope.toggle = featureToggleService.toggle;
            scope.clear = featureToggleService.clear;
            scope.save = featureToggleService.save;
            scope.showClear = featureToggleService.hasLocal();
            scope.toggleFeaturesPanel = function() {
                scope.showFeatures = !scope.showFeatures;
            };
        },

        template: '<div id="feature-toggler" ng-if="show">' +
            '<ul ng-if="showFeatures">' +
            '<li>' +
            '<button ng-if="showClear" ng-click="clear()">Clear Local</button>' +
            '<button ng-click="save()">Save</button>' +
            '</li>' +
            '<li ng-repeat="f in features" ng-click="toggle(f)">' +
            '<span ng-class="{selected: f.status}"></span>' +
            '{{f.name}}' +
            '</li>' +
            '</ul>' +
            '<span ng-click="toggleFeaturesPanel()">' +
            'Feature Toggles' +
            '</span>' +
            '</div>'
    };
}]);

app.directive('toggleIf', ['featureToggleService','ngIfDirective', function(featureToggleService, ngIfDirective) {
    var ngIf = ngIfDirective[0];
    return {
        transclude: ngIf.transclude,
        priority: ngIf.priority,
        terminal: ngIf.terminal,
        restrict: ngIf.restrict,

        link: function($scope, $element, $attr) {
            var value = featureToggleService.isEnabled($attr['toggleIf']);
            $attr.ngIf = function() {
                return value;
            };

            ngIf.link.apply(ngIf, arguments);
        }
    };
}]);
