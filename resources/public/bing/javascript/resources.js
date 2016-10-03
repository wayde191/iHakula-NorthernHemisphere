var app = angular.module('bing');

app.factory('Bing', ['$resource', function ($resource) {
    return $resource('/api/:category/:filter/post.json', {}, {
        getPost: {
            method: 'GET',
            params: {},
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            isArray: true
        }
    });
}]);

app.factory('Post', ['$resource', function ($resource) {
    return $resource('/api/:page/post.json', {}, {
        getPost: {
            method: 'GET',
            params: {},
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            isArray: true
        }
    });
}]);

app.factory('Comment', ['$resource', function ($resource) {
    return $resource('/api/:postId/comment.json', {}, {
        getComments: {
            method: 'GET',
            params: {},
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            isArray: true
        }
    });
}]);

app.factory('Message', ['$resource', function ($resource) {
    return $resource('/api/message.json', {}, {
        send2Me: {
            method: 'POST',
            params: {},
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            isArray: false
        }
    });
}]);

app.service('messageService', function () {
    function notify(message, type) {
        $.growl({
            message: message
        }, {
            type: type,
            allow_dismiss: false,
            label: 'Cancel',
            className: 'btn-xs btn-inverse',
            placement: {
                from: 'top',
                align: 'right'
            },
            delay: 2500,
            animate: {
                enter: 'animated bounceIn',
                exit: 'animated bounceOut'
            },
            offset: {
                x: 20,
                y: 85
            }
        });
    };

    function showMessage(message) {
        if (!$('.login-content')[0]) {
            notify(message, 'inverse');
        }
        ;
    };

    return {
        showMessage: showMessage
    };
});

app.service('storageService', function () {
    var getUnreadPageNumber = function () {
        var minReadId = parseInt(localStorage.jokeMinId);
        var maxReadId = parseInt(localStorage.jokeMaxId);
        var recordsNum = maxReadId - minReadId;
        var jokesPerPage = 20;
        return Math.ceil(recordsNum / jokesPerPage) + ((recordsNum % 20) > 0 ? 1 : 0);
    };

    var updateEdgeNumber = function (data) {
        var ids = _.map(data, function (item) {
            return item.joke.id;
        });
        var minId = _.min(ids);
        var maxId = _.max(ids);

        if (undefined === localStorage.jokeMinId) {
            localStorage.jokeMinId = 1000000;
        }
        if (undefined === localStorage.jokeMaxId) {
            localStorage.jokeMaxId = 0;
        }
        if (minId < parseInt(localStorage.jokeMinId)) {
            localStorage.jokeMinId = minId;
        }
        if (maxId > parseInt(localStorage.jokeMaxId)) {
            localStorage.jokeMaxId = maxId;
        }
    };

    return {
        getUnreadPageNumber: getUnreadPageNumber,
        updateEdgeNumber: updateEdgeNumber
    };
});

app.service('pageScrollService', function () {
    function setupScrollUp() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('.totop button').fadeIn();
            } else {
                $('.totop button').fadeOut();
            }
        });
    };

    return {
        setupScrollUp: setupScrollUp
    };
});

app.service('RecursionHelper', []).factory('RecursionHelper', ['$compile', function($compile){
    return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
        compile: function(element, link){
            // Normalize the link parameter
            if(angular.isFunction(link)){
                link = { post: link };
            }

            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                post: function(scope, element){
                    // Compile the contents
                    if(!compiledContents){
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function(clone){
                        element.append(clone);
                    });

                    // Call the post-linking function, if any
                    if(link && link.post){
                        link.post.apply(null, arguments);
                    }
                }
            };
        }
    };
}]);