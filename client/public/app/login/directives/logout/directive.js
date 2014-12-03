define([

    'app'

], function(app) {
    'use strict';

    app.directive('appLogout', function(auth, User) {
        return {
            templateUrl: '/app/login/directives/logout/template.html',
            link: function(scope) {
                var user = User.get({id: 123});

                scope.logout = auth.logout;

                scope.remove = user.remove;
            }
        };
    });

});