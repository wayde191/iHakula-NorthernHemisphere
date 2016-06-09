var app = angular.module('order');

app.factory('Contact', ['$resource', function($resource) {
    return $resource('/api/:id/contact.json', {}, {
        getContact: {
            method: 'GET',
            params: {},
            isArray: true
        }
    });
}
]);