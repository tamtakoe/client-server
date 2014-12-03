define([

    'app'

], function(app) {
    'use strict';

    app.controller('Common', function($scope) {

        var uploader = {
            title: 'Загрузчик',
            state: 'uploader'
        };
        var user = {
            title: 'Пользователь',
            state: 'user'
        };

        $scope.menu = [uploader, user];
    });

});