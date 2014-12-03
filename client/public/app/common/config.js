define([

    'app',

    'common/components/auth/config',

    'common/services/stateViews',

    'common/views/controller'

], function(app) {
    'use strict';

    app.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    });

    app.config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/uploader');
    });

    app.config(function($stateProvider, stateViews) {
        $stateProvider.decorator('views', stateViews.shorten);

        $stateProvider
            .state('body', {
                abstract: true,
                views: {
                    body: 'common'
                }
            });
    });
//
//    app.run(function($rootScope, currentUser, currentCity, accessToken, currentUserRoles) {
//        $rootScope.$on('auth:login', function () {
//            currentUser.$get();
//            if (currentCity.$resolved) {
//                currentUserRoles.$get();
//            }
//        });
//    })

});