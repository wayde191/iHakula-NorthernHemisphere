var app = angular.module('joke');

app.factory('Joke', ['$resource', function($resource) {
    return $resource('/api/products.json', {}, {
        getProduct: {
            method: 'GET',
            params: {},
            isArray: true
        }
    });
}
]);