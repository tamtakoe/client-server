define([

    'angular',
    'angularResource',
    'uiRouter'

], function(angular) {
    'use strict';

    return angular.module('app', ['ui.router', 'ngResource']);
});