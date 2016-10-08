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
    }).
    when('/page/:name/:id', {
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
    $scope.ids = $routeParams.id || '-1';
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

app.controller('ContentController', function ($rootScope, $scope, $sce, $q, $location, Bing) {
    $rootScope.dataLoaded = false;
    $scope.dataLoaded = false;
    $scope.tops = [];
    $scope.postsList = [];
    $scope.selectedPost = null;
    $scope.selectedComments = [];

    function setupContentType(posts){
        _.each(posts, function(post){
            if(_.contains(post.tags, 16)){
                post.contentType = 'text';
            } else if (_.contains(post.tags, 17)){
                post.contentType = 'image';
            } else {
                post.contentType = 'text';
            }
        });
    }

    var currentPageNumber = 1;
    $q.all({
        post: Bing.PostPagination.getPost({page: currentPageNumber}).$promise,
        top: Bing.PostCategoryFilter.getPost({category: "tag", filter: "delay"}).$promise,
        postCount: Bing.PostCounter.getPostCount().$promise
    }).then(function(responses) {
        setupContentType(responses.top);
        setupContentType(responses.post);

        $scope.tops = responses.top;
        $scope.postsList = responses.post;

        var total = parseInt(responses.postCount.total);
        var page = parseInt(responses.postCount.page);
        var count = parseInt(total / page) + (total % page > 0 ? 1 : 0);
        $scope.postCount = _.range(1, count + 1);

        $rootScope.dataLoaded = true;
        $scope.dataLoaded = true;

        setTimeout(setPage.bind(this), 300);
    });

    function setPage(){
        $('.pagination li').removeClass('active');
        $('[data-type=' + currentPageNumber + ']').addClass('active');
    };
    $scope.pageSelected = function(page){
        currentPageNumber = page;
        setPage();
        $scope.postsList = [];
        $rootScope.dataLoaded = false;
        Bing.PostPagination.getPost({page: currentPageNumber}).$promise.then(
            function (data) {
                $scope.postsList = data;
                $rootScope.dataLoaded = true;
            }
        );
    };

    function getSelectedCommentIds(){
        return _.map($scope.selectedPost, function(post){
            return post.id;
        }).join(',');
    }

    function jumpToDetailPage(){
        var ids = getSelectedCommentIds();
        window.location.href = '/bing.html#/page/detail/' + ids;
    }

    $scope.listClicked = function(post){
        $scope.selectedPost = [post];
        jumpToDetailPage();
    };

    $scope.topClicked = function(){
        $scope.selectedPost = $scope.tops;
        jumpToDetailPage();
    };

    $scope.renderHtml = function(html_code){
        return $sce.trustAsHtml(html_code);
    };

    $scope.getAvatar = function(post){
        var imgPath = "img/profile-pics/";
        var tag = post.tags.length > 0 ? (100 + parseInt(post.tags[0])) : '000';
        return imgPath + tag + '.jpg';
    };
});

app.controller('DetailController', function ($rootScope, $scope, Bing, $sce, $q) {
    $scope.selectedComments = [];
    $rootScope.dataLoaded = false;

    $scope.renderHtml = function(html_code){
        return $sce.trustAsHtml(html_code);
    };
    $scope.commentsLoaded = false;

    $scope.selectedPost = [];
    $scope.thePostIDs = $scope.ids !== '-1' ? $scope.ids.split(',') : [];

    function setupContentType(posts){
        _.each(posts, function(post){
            if(_.contains(post.tags, 16)){
                post.contentType = 'text';
            } else if (_.contains(post.tags, 17)){
                post.contentType = 'image';
            } else {
                post.contentType = 'text';
            }
        });
    }

    var promiseArray = [];
    _.each($scope.thePostIDs, function(post){
        var promise = Bing.PostID.getPost({id: post}).$promise;
        promiseArray.push(promise);
    });
    _.each($scope.thePostIDs, function(post){
        var promise = Bing.Comment.getComments({postId: post}).$promise;
        promiseArray.push(promise);
    });
    $q.all(promiseArray).then(function(dataArray) {
        $rootScope.dataLoaded = true;

        var groups = _.partition(dataArray, function(obj, index){
            return index < $scope.thePostIDs.length;
        });
        $scope.selectedPost = groups[0];
        setupContentType($scope.selectedPost);

        var theComments = groups[1];

        _.each(theComments, function(data){
            var comments = data;

            _.each(comments, function(comment){
                comment.children = [];
                comment.content.html = $scope.renderHtml(comment.content.rendered);
            });
            var firstComments = _.filter(comments, function(comment){
                return 0 === comment.parent;
            });
            var childComments = _.filter(comments, function(comment){
                return 0 !== comment.parent;
            });

            function getChildren(comment){
                var nodes = _.filter(childComments, function(node){
                    return node.parent === comment.id;
                });
                if(0 === nodes.length){
                    return;
                } else {
                    comment.children = _.union(comment.children, nodes);
                    childComments = _.difference(childComments, nodes);
                    _.each(nodes, function (node) {
                        getChildren(node);
                    });
                }

            };
            _.each(firstComments, function(comment, index){
                getChildren(comment);
            });

            $scope.selectedComments = _.union($scope.selectedComments, firstComments);
            $scope.commentsLoaded = true;
        });
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

app.directive("comment", function(RecursionHelper) {
    return {
        restrict: "E",
        scope: {family: '='},
        template:
        '<div class="media">' +
            '<div class="pull-left" >' +
                '<a class="tvh-user pull-left">' +
                    '<img class="media-object" ng-src={{family["author_avatar_urls"]["48"]}} alt="">' +
                '</a>' +
            '</div>' +
            '<div class="media-body">' +
                '<a class="tvc-more pull-right" ng-href={{family.link}}><i class="md md-comment"></i>回复</a>' +
                '<strong class="d-block">{{family["author_name"]}}</strong>' +
                '<small class="c-gray">{{family["date"] | date:"yyyy/MM/dd @ h:mma"}}</small>' +
                '<div class="m-t-10" ng-bind-html="family.content.html"></div>' +
                '<div ng-repeat="child in family.children">' +
                    '<comment family="child"></comment>' +
                '</div>' +
            '</div>' +
        '</div>',
        compile: function(element) {
            return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){
            });
        }
    };
});

