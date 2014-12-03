define([

    'app'

], function(app) {
    "use strict";

    app.service('accessToken', function() {
        var accessToken = {
            token: null,
            expiresIn: null,
            $promise: null,
            $resolved: false
        };

        accessToken.$populate = function(token) {
            var promise = token.$promise.then(function() {
                accessToken.token = token.access_token;
                accessToken.expiresIn = token.expires_in;
                accessToken.$resolved = token.$resolved;

                return accessToken;
            });

            accessToken.$promise = promise;

            return promise;
        };

        accessToken.$clean = function() {
            accessToken.token = null;
            accessToken.expiresIn = null;
            accessToken.$promise = null;
            accessToken.$resolved = false;
        };

        return accessToken;
    });
});