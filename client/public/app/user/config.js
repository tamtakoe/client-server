define([

    'app',

    'user/resources/user',

    'user/views/controller',
    'user/views/login/controller',
    'user/views/logout/controller',
    'user/views/registration/controller'

], function(app) {
    'use strict';

    app.config(function($stateProvider) {
        $stateProvider
            .state('user', {
                parent: 'body',
                url: '/user',
                views: {
                    'main': 'user',
                    'login@user': 'user/login',
                    'logout@user': 'user/logout',
                    'registration@user': 'user/registration'
                }
            });
    });

});