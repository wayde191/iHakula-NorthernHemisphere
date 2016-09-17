var app = angular.module('joke', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'joke/partials/index.html',
            controller: 'dashboardController',
            reloadOnSearch: true
        }).otherwise({redirectTo:'/'});
}]);

angular.bootstrap().invoke(bootstrap('joke'));

app.controller('dashboardController', function($scope) {
    $scope.sidebar = 'joke/partials/sidebar.html';
    $scope.content = 'joke/partials/content.html';

    $scope.backToTop = function(){
        $('body,html').animate({
            scrollTop: 0
        }, 600);
    };

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('.totop button').fadeIn();
            } else {
                $('.totop button').fadeOut();
            }
        });
    });
});

app.controller('SidebarController', function($scope, Joke) {
});

app.controller('ContentController', function($scope, Joke) {
    $scope.dataLoaded = false;
    $scope.jokes = [];

    var pageNumber = 1;
    function getJokes(){
        Joke.getJoke({number: pageNumber}).$promise.then(
            function(data) {
                $scope.dataLoaded = true;
                $scope.jokes = _.union($scope.jokes, data);
                requestDone();
            }
        );
    };

    $scope.loadingMoreText = "点击加载更多";
    $scope.loadMore = function(){
        pageNumber++;
        $scope.loadingMoreText = "加载中...";
        getJokes();
    };

    function requestDone(){
        hideLoading();
        $scope.loadingMoreText = "点击加载更多";
    };

    function restore(){
        $scope.dataLoaded = false;
        pageNumber = 1;
        $scope.jokes = [];
    };

    var mySwiper = null;
    function showLoading(){
        mySwiper.setWrapperTranslate(0,100,0);
        mySwiper.params.onlyExternal=true;
        $('.preloader').addClass('visible');
        $('.pull-refresh-label').addClass('invisible');
    };
    function hideLoading(){
        mySwiper.setWrapperTranslate(0,0,0)
        mySwiper.params.onlyExternal = false;
        mySwiper.updateActiveSlide(0)
        $('.preloader').removeClass('visible');
        $('.pull-refresh-label').removeClass('invisible');
    };

    function initSwiper(){
        var holdPosition = 0;
        mySwiper = new Swiper('.swiper-container',{
            slidesPerView:'auto',
            mode:'vertical',
            watchActiveIndex: true,
            onTouchStart: function() {
                holdPosition = 0;
            },
            onResistanceBefore: function(s, pos){
                holdPosition = pos;
            },
            onTouchEnd: function(){
                if (holdPosition > 100) {
                    restore();
                    showLoading();
                    getJokes();
                }
            }
        });
    };

    $(document).ready(function() {
        initSwiper();
        setTimeout(function(){
            restore();
            showLoading();
            getJokes();
        },1000);
    });
});

