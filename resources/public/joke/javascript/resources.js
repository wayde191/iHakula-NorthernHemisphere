var app = angular.module('joke');

app.factory('Joke', ['$resource', function($resource) {
    return $resource('/api/:number/joke.json', {}, {
        getJoke: {
            method: 'GET',
            params: {},
            headers:{'Content-Type':'application/json; charset=utf-8'},
            isArray: true
        }
    });
}
]);

app.service('messageService', function(){
    function notify(message, type){
        $.growl({
            message: message
        },{
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

    function showMessage(message){
        if (!$('.login-content')[0]) {
            notify(message, 'inverse');
        };
    };

    return {
        showMessage: showMessage
    };
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