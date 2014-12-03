define([

    'app'

], function(app) {
    "use strict";

    app.factory('User', function($resource) {
        return $resource('http://localhost:5000/v1/users/:id', { id: '@id' }, {
            create: {
                method: 'POST'
            },
            current: {
                url: 'http://localhost:5000/v1/users/current',
                method: 'GET',
                accessToken: true
            }
        });
    });
});