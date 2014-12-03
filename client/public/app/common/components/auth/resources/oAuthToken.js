define([

    'app'

], function(app) {
    "use strict";

    app.factory('OAuthToken', function($resource, transformRequestAsFormPost) {

        return $resource('http://localhost:4000/token', {}, {
            getUserToken: {
                method: 'POST',
                params: {
                    grant_type: 'password'
                },
                transformRequest: transformRequestAsFormPost,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + btoa('1:secret')
                }
            }
        });
    });
});