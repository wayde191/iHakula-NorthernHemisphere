var app = angular.module('bing', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'bing/partials/index.html',
        controller: 'dashboardController',
        reloadOnSearch: true
    }).
        when('/page/:name', {
            templateUrl: 'bing/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true
        })
        .otherwise({redirectTo: '/'});
}]);

angular.bootstrap().invoke(bootstrap('bing'));

app.controller('dashboardController', function ($scope, $routeParams, pageScrollService) {
    $scope.sidebar = 'bing/partials/sidebar.html';
    $scope.content = 'bing/partials/content.html';
    $scope.page = $routeParams.name || 'home';
    $scope.pageUrl = 'bing/partials/' + $scope.page + '.html';

    $scope.backToTop = function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
    };

    $scope.$on('$includeContentLoaded', function (event) {
        pageScrollService.setupScrollUp();
    });

});

app.controller('SidebarController', function ($scope) {

    $scope.$on('$includeContentLoaded', function (event) {
        $('.main-menu li').removeClass('active');

        $('[data-type=' + $scope.page + ']').addClass('active');

        $elem = '#sidebar';
        $elem2 = '#menu-trigger';
        $($elem2).removeClass('open');

        $('#menu-trigger').unbind('click');
        $('#menu-trigger').click(function (e) {
            e.preventDefault();
            var x = $(this).data('trigger');

            $(x).toggleClass('toggled');
            $(this).toggleClass('open');
            $('body').toggleClass('modal-open');

            if (x == '#sidebar') {
                $('#header').toggleClass('sidebar-toggled');
            }

            if ($('#header').hasClass('sidebar-toggled')) {
                $(document).on('click', function (e) {
                    if (($(e.target).closest($elem).length === 0) && ($(e.target).closest($elem2).length === 0)) {
                        setTimeout(function () {
                            $('body').removeClass('modal-open');
                            $($elem).removeClass('toggled');
                            $('#header').removeClass('sidebar-toggled');
                            $($elem2).removeClass('open');
                        });
                    }
                });
            }
        });
    });
});

app.controller('ContentController', function ($rootScope, $scope, Bing, storageService) {
    $rootScope.dataLoaded = false;

    Bing.getPost({category: "tag", filter: "top"}).$promise.then(
        function (data) {
            console.log(data);
            $rootScope.dataLoaded = true;
        }
    );
});

app.controller('AboutMeController', function ($scope, Message, messageService) {
    messageService.showMessage('没错，这就是我');
    $scope.totalMessageNumber = 1563;
    $scope.message = '';
    $scope.send = function () {
        if ($scope.message === ''){
            messageService.showMessage('发送消息不能为空，请确认再发');
        } else {
            $scope.totalMessageNumber++;
            messageService.showMessage('消息已发送');
            Message.send2Me({message: $scope.message}).$promise.then(
                function (data) {
                    console.log(data);
                }
            );
        }
    };
});

app.controller('PrivacyController', function ($scope) {
});

app.controller('FeedbackController', function ($scope) {
});

app.controller('CalculatorController', function ($scope) {
    $scope.price = 800000;
    $scope.rate = 0.00017;
    $scope.oldRate = 0.00001;
    $scope.startDate = "2016/05/31";
    $scope.endDate = "2016/11/28";
    $scope.days = 0;
    $scope.pay = 0;
    $scope.oldPay = 0;

    $scope.go = function(){
        var startDate = moment($scope.startDate, 'YYYY/MM/DD');
        var endDate = moment($scope.endDate, 'YYYY/MM/DD');
        $scope.days = endDate.diff(startDate, 'days');

        $scope.pay = (parseFloat($scope.price) * parseFloat($scope.days) * parseFloat($scope.rate)).toFixed(3);
        $scope.oldPay = (parseFloat($scope.price) * parseFloat($scope.days) * parseFloat($scope.oldRate)).toFixed(3);
    };

    $scope.go();
});

