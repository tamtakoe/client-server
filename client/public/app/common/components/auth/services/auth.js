define([

    'app'

], function(app) {
    "use strict";

    app.service('auth', function($rootScope, OAuthToken, accessToken) {
        return {
            login: function(login, password) {
                var token = OAuthToken.getUserToken({ username: login, password: password });

                return accessToken.$populate(token).then(function() {
                    $rootScope.$broadcast('auth:login', accessToken);
                });
            },
            logout: function() {
                accessToken.$clean();
                $rootScope.$broadcast('auth:logout', accessToken);
            }
        };
    });
});