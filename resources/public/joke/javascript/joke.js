var app = angular.module('joke', ['ngRoute', 'ngResource', 'nh-common']);

app.config(['$routeProvider', function($routeProvider) {
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
        .otherwise({redirectTo:'/'});
}]);

angular.bootstrap().invoke(bootstrap('joke'));

app.controller('dashboardController', function($scope, $routeParams) {
    $scope.sidebar = 'joke/partials/sidebar.html';
    $scope.content = 'joke/partials/content.html';
    $scope.page = $routeParams.name;
    $scope.pageUrl = 'joke/partials/' + $scope.page + '.html';

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

app.service('storageService',function(){
    var getUnreadPageNumber = function(){
        var minReadId = parseInt(localStorage.jokeMinId);
        var maxReadId = parseInt(localStorage.jokeMaxId);
        var recordsNum = maxReadId - minReadId;
        var jokesPerPage = 20;
        return Math.ceil(recordsNum / jokesPerPage) + ((recordsNum % 20) > 0 ? 1 : 0);
    };

    var updateEdgeNumber = function(data){
        var ids = _.map(data, function(item){
            return item.joke.id;
        });
        var minId = _.min(ids);
        var maxId = _.max(ids);

        if (undefined === localStorage.jokeMinId){
            localStorage.jokeMinId = 1000000;
        }
        if (undefined === localStorage.jokeMaxId){
            localStorage.jokeMaxId = 0;
        }
        if (minId < parseInt(localStorage.jokeMinId)) {
            localStorage.jokeMinId =  minId;
        }
        if (maxId > parseInt(localStorage.jokeMaxId)) {
            localStorage.jokeMaxId =  maxId;
        }
    };

    return {
        getUnreadPageNumber : getUnreadPageNumber,
        updateEdgeNumber: updateEdgeNumber
    };
});

app.controller('ContentController', function($scope, Joke, storageService) {
    $scope.dataLoaded = false;
    $scope.jokes = [];
    var firstTimeLoaded = false;
    var loadingMore = false;

    var pageNumber = 1;
    function getJokes(){
        if(firstTimeLoaded && !loadingMore){
            pageNumber = storageService.getUnreadPageNumber();
        }
        Joke.getJoke({number: pageNumber}).$promise.then(
            function(data) {
                $scope.dataLoaded = true;
                $scope.jokes = _.union($scope.jokes, data);
                storageService.updateEdgeNumber(data);
                if(!firstTimeLoaded){
                    firstTimeLoaded = true;
                }
                requestDone();
            }
        );
    };

    $scope.loadingMoreText = "点击加载更多";
    $scope.loadMore = function(){
        pageNumber++;
        loadingMore = true;
        $scope.loadingMoreText = "加载中...";
        getJokes();
    };

    function requestDone(){
        hideLoading();
        loadingMore = false;
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

app.controller('AboutMeController', function($scope, Joke) {
});

app.controller('PrivacyController', function($scope, Joke) {
});

app.controller('FeedbackController', function($scope, Joke) {
});

