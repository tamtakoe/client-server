define([

    'app'

], function(app) {
    "use strict";

    app.factory('accessTokenInterceptor', function($q, $rootScope, accessToken) {
        return {
            request: function(config) {
                if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                    angular.extend(config.data, config.params);
                    delete config.params;
                }

                if (!config.accessToken) {
                    return config;
                }

                if (!accessToken.$promise) {
                    if (config.accessTokenRequired === false) {
                        return config;
                    } else {
                        throw new Error('Access token is not set');
                    }
                }

                var promise = accessToken.$promise.then(function() {
                    config.params = config.params || {};
                    config.params.access_token = accessToken.token;

                    return config;
                });

                return promise;
            },
            responseError: function(rejection) {
                // Unauthorized
                if (rejection.config.accessToken && rejection.data.error.code === 26) {
                    $rootScope.$emit('auth:invalidToken');
                }

                return $q.reject(rejection);
            }
        };
    });
});