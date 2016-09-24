var app = angular.module('joke', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'joke/partials/index.html',
        controller: 'dashboardController',
        reloadOnSearch: true
    }).
        when('/page/:name', {
            templateUrl: 'joke/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true
        })
        .otherwise({redirectTo: '/'});
}]);

angular.bootstrap().invoke(bootstrap('joke'));

app.controller('dashboardController', function ($scope, $routeParams, dropdownService, pageScrollService) {
    dropdownService.init();

    $scope.sidebar = 'joke/partials/sidebar.html';
    $scope.content = 'joke/partials/content.html';
    $scope.page = $routeParams.name || 'home';
    $scope.pageUrl = 'joke/partials/' + $scope.page + '.html';

    $scope.backToTop = function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
    };

    $scope.$on('$includeContentLoaded', function (event) {
        pageScrollService.setupScrollUp();
    });

});

app.controller('SidebarController', function ($scope, Joke) {

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

app.controller('ContentController', function ($scope, Joke, storageService) {
    $scope.dataLoaded = false;
    $scope.jokes = [];
    var firstTimeLoaded = false;
    var loadingMore = false;

    var pageNumber = 1;

    function getJokes() {
        if (firstTimeLoaded && !loadingMore) {
            pageNumber = storageService.getUnreadPageNumber();
        }
        Joke.getJoke({number: pageNumber}).$promise.then(
            function (data) {
                $scope.dataLoaded = true;
                $scope.jokes = _.union($scope.jokes, data);
                storageService.updateEdgeNumber(data);
                if (!firstTimeLoaded) {
                    firstTimeLoaded = true;
                }
                requestDone();
            }
        );
    };

    $scope.loadingMoreText = "点击加载更多";
    $scope.loadMore = function () {
        pageNumber++;
        loadingMore = true;
        $scope.loadingMoreText = "加载中...";
        getJokes();
    };

    function requestDone() {
        hideLoading();
        loadingMore = false;
        $scope.loadingMoreText = "点击加载更多";
    };

    function restore() {
        $scope.dataLoaded = false;
        pageNumber = 1;
        $scope.jokes = [];
    };

    var mySwiper = null;

    function showLoading() {
        mySwiper.setWrapperTranslate(0, 100, 0);
        mySwiper.params.onlyExternal = true;
        $('.preloader').addClass('visible');
        $('.pull-refresh-label').addClass('invisible');
    };
    function hideLoading() {
        mySwiper.setWrapperTranslate(0, 0, 0)
        mySwiper.params.onlyExternal = false;
        mySwiper.updateActiveSlide(0)
        $('.preloader').removeClass('visible');
        $('.pull-refresh-label').removeClass('invisible');
    };

    function initSwiper() {
        var holdPosition = 0;
        mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            mode: 'vertical',
            watchActiveIndex: true,
            onTouchStart: function () {
                holdPosition = 0;
            },
            onResistanceBefore: function (s, pos) {
                holdPosition = pos;
            },
            onTouchEnd: function () {
                if (holdPosition > 100) {
                    restore();
                    showLoading();
                    getJokes();
                }
            }
        });
    };

    $(document).ready(function () {
        initSwiper();
        setTimeout(function () {
            restore();
            showLoading();
            getJokes();
        }, 1000);
    });
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

app.controller('PrivacyController', function ($scope, Joke) {
});

app.controller('FeedbackController', function ($scope, Joke) {
});

