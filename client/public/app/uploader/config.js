define([

    'app',

    'uploader/views/controller'

], function(app) {
    'use strict';

    app.config(function($stateProvider) {
        $stateProvider
            .state('uploader', {
                parent: 'body',
                url: '/uploader',
                views: {
                    'main': 'uploader'
                }
            });
    });

});