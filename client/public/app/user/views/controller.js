define([

    'app'

], function(app) {
    'use strict';

    app.controller('User', function($scope) {

        $scope.$on('auth:login', function() {
            $scope.authorized = true;
        });

        $scope.$on('auth:logout', function() {
            $scope.authorized = false;
        });
    });

});