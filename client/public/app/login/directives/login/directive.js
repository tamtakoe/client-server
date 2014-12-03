define([

    'app'

], function(app) {
    'use strict';

    app.directive('appLogin', function(auth, User) {
        return {
            templateUrl: '/app/login/directives/login/template.html',
            link: function(scope) {
                var fields = {
                    name: '',
                    password: ''
                };

                scope.user = fields;

                scope.login = function() {
                    console.log('login');

                    auth.login(fields.name, fields.password)
                        .then(function() {
                            console.log('Успешный вход');
                        })
                        .catch(function(error) {
                            console.log('Неверный логин и пароль');
                        });
                };
            }
        };
    });

});