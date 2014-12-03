define([

    'app',

    'common/components/auth/resources/oAuthToken',

    'common/components/auth/services/auth',
    'common/components/auth/services/accessToken',
    'common/components/auth/services/accessTokenInterceptor',
    'common/components/auth/services/transformRequestAsFormPost'

], function(app) {
    "use strict";

    app.config(function($httpProvider) {
        $httpProvider.interceptors.push('accessTokenInterceptor');
    });

    app.run(function($rootScope, auth) {
        $rootScope.$on('auth:invalidToken', function() {
            auth.logout();
        });
    });
});