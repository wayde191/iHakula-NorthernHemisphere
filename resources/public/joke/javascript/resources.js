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