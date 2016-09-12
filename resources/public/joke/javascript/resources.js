var app = angular.module('product');

app.factory('Product', ['$resource', function($resource) {
    return $resource('/api/products.json', {}, {
        getProduct: {
            method: 'GET',
            params: {},
            isArray: true
        }
    });
}
]);