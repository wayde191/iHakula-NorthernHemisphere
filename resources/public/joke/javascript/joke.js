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
    $scope.jokes = [{"joke":{"id":2102,"title":"铲屎官差不多行了 主子好累啊","wap_title":"铲屎官差不多行了 主子好累啊","img":"http://k.sinaimg.cn/n/default/20160913/wwvd-fxvuvfp3548769.gif/w120h90l50t1e7e.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhv8293064.d.html?pos=28","intro":"喵星人好可爱啊！回来试试，感觉很好玩的样子！","doc_id":"fxvukhv8293064","date":"2小时前","create_date":"2016-09-16"},"detail":[{"id":7194,"doc_id":"fxvukhv8293064","img":"http://n.sinaimg.cn/default/20160913/wwvd-fxvuvfp3548769.gif","intro":""}]},{"joke":{"id":2101,"title":"盒子到底是打开的还是关上的","wap_title":"盒子到底是打开的还是关上的","img":"http://k.sinaimg.cn/n/default/20160913/TLdk-fxvukhz1686653.png/w120h90l50t1592.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhx5027409.d.html?pos=28","intro":"不是打开就是关上，作为学渣的我认为是打开的！","doc_id":"fxvukhx5027409","date":"今天 11:25","create_date":"2016-09-16"},"detail":[{"id":7193,"doc_id":"fxvukhx5027409","img":"http://n.sinaimg.cn/default/transform/20160913/79mr-fxvuvfp3549475.jpg","intro":""}]},{"joke":{"id":2100,"title":"作为朋友 我都替你不好意思","wap_title":"作为朋友 我都替你不好意思","img":"http://k.sinaimg.cn/n/default/20160913/3nDt-fxvukhz1686861.png/w120h90l50t12fc.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhv8294580.d.html?pos=28","intro":"喵星人一脸生无可恋，跟这种喵做朋友，我好方！","doc_id":"fxvukhv8294580","date":"56分钟前","create_date":"2016-09-16"},"detail":[{"id":7192,"doc_id":"fxvukhv8294580","img":"http://n.sinaimg.cn/default/20160913/9g-T-fxvuvfp3549747.gif","intro":""}]},{"joke":{"id":2099,"title":"鬼知道这辆车经历了什么？","wap_title":"鬼知道这辆车经历了什么？","img":"http://k.sinaimg.cn/n/default/20160913/fwfE-fxvuvfp3550151.png/w120h90l50t1e53.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhx5028320.d.html?pos=28","intro":"老司机经历丰富！说说你开车最怕撞到什么车？","doc_id":"fxvukhx5028320","date":"49分钟前","create_date":"2016-09-16"},"detail":[{"id":7191,"doc_id":"fxvukhx5028320","img":"http://n.sinaimg.cn/default/20160913/9W8D-fxvukhv8295101.gif","intro":""}]},{"joke":{"id":2097,"title":"小哥真有生意头脑.美女已惊呆","wap_title":"小哥真有生意头脑.美女已惊呆","img":"http://k.sinaimg.cn/n/default/20160913/Chnp-fxvuvfp3546784.png/w120h90l50t1206.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhv8290319.d.html?pos=28","intro":"晚上在山上遇到美女，她说：帅哥你可以要你想要的。","doc_id":"fxvukhv8290319","date":"2小时前","create_date":"2016-09-16"},"detail":[{"id":7190,"doc_id":"fxvukhv8290319","img":"http://n.sinaimg.cn/default/transform/20160913/GSk3-fxvukhz1683871.jpg","intro":""}]},{"joke":{"id":2096,"title":"一句话证明你参加过军训","wap_title":"一句话证明你参加过军训","img":"http://k.sinaimg.cn/n/default/20160913/00PC-fxvukhv8292341.png/w120h90l50t1f77.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhv8292354.d.html?pos=28","intro":"当初真的是，鬼知道我们经历了什么？你军训过吗？","doc_id":"fxvukhv8292354","date":"2小时前","create_date":"2016-09-16"},"detail":[{"id":7181,"doc_id":"fxvukhv8292354","img":"http://n.sinaimg.cn/default/transform/20160913/Tp2h-fxvukhz1685206.jpg","intro":""},{"id":7182,"doc_id":"fxvukhv8292354","img":"http://n.sinaimg.cn/default/transform/20160913/HVNO-fxvukhv8292048.jpg","intro":""},{"id":7183,"doc_id":"fxvukhv8292354","img":"http://n.sinaimg.cn/default/transform/20160913/gPB1-fxvukhv8292065.jpg","intro":""},{"id":7184,"doc_id":"fxvukhv8292354","img":"http://n.sinaimg.cn/default/transform/20160913/BACI-fxvuvfp3548130.jpg","intro":""},{"id":7185,"doc_id":"fxvukhv8292354","img":"http://n.sinaimg.cn/default/transform/20160913/3Zyo-fxvukhx5025326.jpg","intro":""},{"id":7186,"doc_id":"fxvukhv8292354","img":"http://n.sinaimg.cn/default/transform/20160913/qGNV-fxvukhx5025338.jpg","intro":""},{"id":7187,"doc_id":"fxvukhv8292354","img":"http://n.sinaimg.cn/default/transform/20160913/XrJd-fxvukhx5025347.jpg","intro":""},{"id":7188,"doc_id":"fxvukhv8292354","img":"http://n.sinaimg.cn/default/transform/20160913/1aDG-fxvuvfp3548173.jpg","intro":""},{"id":7189,"doc_id":"fxvukhv8292354","img":"http://n.sinaimg.cn/default/transform/20160913/gcxK-fxvukhv8292151.jpg","intro":""}]},{"joke":{"id":2095,"title":"海滩上接个吻都不能好好的","wap_title":"海滩上接个吻都不能好好的","img":"http://k.sinaimg.cn/n/default/20160913/UbKC-fxvukhx5021809.png/w120h90l50t194b.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhv8288306.d.html?pos=28","intro":"有没有很惊喜？飘上来一个老爸，简直吓尿啦。","doc_id":"fxvukhv8288306","date":"2小时前","create_date":"2016-09-16"},"detail":[{"id":7180,"doc_id":"fxvukhv8288306","img":"http://n.sinaimg.cn/default/20160913/7_M9-fxvukhz1682596.gif","intro":""}]},{"joke":{"id":2094,"title":"泰迪:我有缓解尴尬的特别方式","wap_title":"泰迪:我有缓解尴尬的特别方式","img":"http://k.sinaimg.cn/n/default/20160913/RpRd-fxvuvfp3545849.png/w120h90l50t123a.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhv8288738.d.html?pos=28","intro":"泰迪被拒绝了也要把戏演完，真是神一般的存在。","doc_id":"fxvukhv8288738","date":"2小时前","create_date":"2016-09-16"},"detail":[{"id":7179,"doc_id":"fxvukhv8288738","img":"http://n.sinaimg.cn/default/20160913/fFkD-fxvukhz1682887.gif","intro":""}]},{"joke":{"id":2093,"title":"别盯着看！5秒后出现恐怖幽灵","wap_title":"别盯着看！5秒后出现恐怖幽灵","img":"http://k.sinaimg.cn/n/default/20160913/cEna-fxvukhv8288978.gif/w120h90l50t117d.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhx5022473.d.html?pos=28","intro":"实在太可怕了！吓得我不知所措，差点儿断气！","doc_id":"fxvukhx5022473","date":"58分钟前","create_date":"2016-09-16"},"detail":[{"id":7178,"doc_id":"fxvukhx5022473","img":"http://n.sinaimg.cn/default/20160913/cEna-fxvukhv8288978.gif","intro":""}]},{"joke":{"id":2092,"title":"熊孩子太贴心了，好感动！","wap_title":"熊孩子太贴心了，好感动！","img":"http://k.sinaimg.cn/n/default/20160913/ke34-fxvukhx5023231.png/w120h90l50t1275.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhv8289823.d.html?pos=28","intro":"熊孩子：爸爸，我要给你唱首歌表达我对你的爱。","doc_id":"fxvukhv8289823","date":"49分钟前","create_date":"2016-09-16"},"detail":[{"id":7177,"doc_id":"fxvukhv8289823","img":"http://n.sinaimg.cn/default/transform/20160913/607A-fxvukhv8289789.jpg","intro":""}]},{"joke":{"id":2091,"title":"GTA警方的办事效率太神速了吧","wap_title":"GTA警方的办事效率太神速了吧","img":"http://k.sinaimg.cn/n/default/20160913/BE09-fxvuvfp3547096.png/w120h90l50t14dd.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhv8290755.d.html?pos=28","intro":"快得就像是设了埋伏一样，这个可以，十分GTA！","doc_id":"fxvukhv8290755","date":"37分钟前","create_date":"2016-09-16"},"detail":[{"id":7176,"doc_id":"fxvukhv8290755","img":"http://n.sinaimg.cn/default/20160913/HvOc-fxvuvfp3547071.gif","intro":""}]},{"joke":{"id":2090,"title":"新技能:如何做出完美的牛排","wap_title":"新技能:如何做出完美的牛排","img":"http://k.sinaimg.cn/n/default/20160913/tmwW-fxvukhz1684968.png/w120h90l50t128a.jpg","link":"http://joke.sina.cn/2016-09-16/joke-ifxvukhx5024964.d.html?pos=28","intro":"主机箱神助攻，一块被电击过的完全没有网瘾的牛排！","doc_id":"fxvukhx5024964","date":"27分钟前","create_date":"2016-09-16"},"detail":[{"id":7175,"doc_id":"fxvukhx5024964","img":"http://n.sinaimg.cn/default/transform/20160913/gnXE-fxvukhz1684900.jpg","intro":""}]},{"joke":{"id":2088,"title":"星座吐槽:做比说更重要的摩羯","wap_title":"星座吐槽:做比说更重要的摩羯","img":"http://k.sinaimg.cn/n/default/20160912/gVDc-fxvukhx4927918.png/w120h90l50t1c59.jpg","link":"http://joke.sina.cn/2016-09-15/joke-ifxvukhv8187460.d.html?pos=28","intro":"初识时少言寡语，熟络后叨逼不停。大摩羯是你吗？","doc_id":"fxvukhv8187460","date":"2小时前","create_date":"2016-09-15"},"detail":[{"id":7166,"doc_id":"fxvukhv8187460","img":"http://n.sinaimg.cn/default/transform/20160912/htOp-fxvukhv8187418.jpg","intro":""},{"id":7167,"doc_id":"fxvukhv8187460","img":"http://n.sinaimg.cn/default/transform/20160912/oEu6-fxvukhv8187426.jpg","intro":""},{"id":7168,"doc_id":"fxvukhv8187460","img":"http://n.sinaimg.cn/default/transform/20160912/0rXM-fxvukhv8187422.jpg","intro":""},{"id":7169,"doc_id":"fxvukhv8187460","img":"http://n.sinaimg.cn/default/transform/20160912/xjbH-fxvukhz1612370.jpg","intro":""},{"id":7170,"doc_id":"fxvukhv8187460","img":"http://n.sinaimg.cn/default/transform/20160912/Gas--fxvukhx4927940.jpg","intro":""},{"id":7171,"doc_id":"fxvukhv8187460","img":"http://n.sinaimg.cn/default/transform/20160912/glsR-fxvukhv8187410.jpg","intro":""},{"id":7172,"doc_id":"fxvukhv8187460","img":"http://n.sinaimg.cn/default/transform/20160912/tMnD-fxvuvfp3475485.jpg","intro":""},{"id":7173,"doc_id":"fxvukhv8187460","img":"http://n.sinaimg.cn/default/transform/20160912/wrFj-fxvukhz1612385.jpg","intro":""},{"id":7174,"doc_id":"fxvukhv8187460","img":"http://n.sinaimg.cn/default/transform/20160912/hWzK-fxvuvfp3475476.jpg","intro":""}]},{"joke":{"id":2087,"title":"那些让你无言以对的段子","wap_title":"那些让你无言以对的段子","img":"http://k.sinaimg.cn/n/default/20160912/rf4x-fxvukhx4928552.png/w120h90l50t167c.jpg","link":"http://joke.sina.cn/2016-09-15/joke-ifxvukhv8188225.d.html?pos=28","intro":"哈哈，这个月就指着这些段子笑了！感觉没毛病！","doc_id":"fxvukhv8188225","date":"2小时前","create_date":"2016-09-15"},"detail":[{"id":7165,"doc_id":"fxvukhv8188225","img":"http://n.sinaimg.cn/default/transform/20160912/SbTT-fxvuvfp3475837.jpg","intro":""}]},{"joke":{"id":2086,"title":"这个奶爸是处女座的吧 好可爱","wap_title":"这个奶爸是处女座的吧 好可爱","img":"http://k.sinaimg.cn/n/default/20160912/PLuG-fxvukhv8185466.png/w120h90l50t1967.jpg","link":"http://joke.sina.cn/2016-09-15/joke-ifxvukhx4926096.d.html?pos=28","intro":"这熊猫宝宝趴得也太可爱了，看着好舒服的样子。","doc_id":"fxvukhx4926096","date":"32分钟前","create_date":"2016-09-15"},"detail":[{"id":7164,"doc_id":"fxvukhx4926096","img":"http://n.sinaimg.cn/default/20160912/WxdB-fxvukhz1610885.gif","intro":""}]},{"joke":{"id":2085,"title":"这个女二套路真的很深唉！","wap_title":"这个女二套路真的很深唉！","img":"http://k.sinaimg.cn/n/default/20160912/liEk-fxvukhz1611333.png/w120h90l50t140a.jpg","link":"http://joke.sina.cn/2016-09-15/joke-ifxvukhv8185871.d.html?pos=28","intro":"实力套路，题明显超纲了！第一次见到这种问话方式。","doc_id":"fxvukhv8185871","date":"28分钟前","create_date":"2016-09-15"},"detail":[{"id":7163,"doc_id":"fxvukhv8185871","img":"http://n.sinaimg.cn/default/transform/20160912/ZGtA-fxvukhx4926453.jpg","intro":""}]}];

    var pageNumber = 1;
    function getJokes(){
        Joke.getJoke({number: pageNumber}).$promise.then(
            function(data) {
                $scope.dataLoaded = true;
                $scope.jokes = data;
                hideLoading();
            }
        );
    };

    $scope.loadMore = function(){
        pageNumber++;
        getJokes();
    };

    function restore(){
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

