define([

    'app'

], function(app) {
    'use strict';

    app.directive('appRegistration', function(auth, User) {
        return {
            templateUrl: '/app/login/directives/registration/template.html',
            link: function(scope) {
                var fields = {
                    name: '',
                    password: ''
                };

                scope.user = fields;

                var user = new User();


                scope.registration = function() {
                    console.log('register');

                    user.username = fields.name;
                    user.password = fields.password;

                    user.$create().then(function() {
                        auth.login(fields.name, fields.password)
                            .then(function() {
                                console.log('Пользователь залогинен');
                            })
                            .catch(function(error) {
                                console.log('Невозможно залогиниться');
                            });
                    }, function(error) {
                        console.log('Невозможно создать пользователя');
                    });
                };
            }
        };
    });

});