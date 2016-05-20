var app = angular.module('cart');

app.factory('Cart', ['$resource', function($resource) {
    return $resource('/api/products.json', {}, {
        getProduct: {
            method: 'GET',
            params: {},
            isArray: true
        }
    });
}
]);