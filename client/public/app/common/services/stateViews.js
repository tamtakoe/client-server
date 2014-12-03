define([

    'app'

], function(app) {
    'use strict';

    function expandView(view) {
        var viewPathParts = view.split('/');
        var config = {};
        var viewPath;

        // Controller name
        if (viewPathParts[1] === 'components') {
            //"/app/modulename/components/componentname/views/viewname/controller.js" -> "ModulenameComponentnameViewname"
            config.controller = viewPathParts.map(function (part) {
                if (part !== 'components') {
                    return part.charAt(0).toUpperCase() + part.slice(1);
                }
            }).join('');

            viewPathParts.splice(3, 0, 'views');
        } else {
            //"/app/modulename/views/viewname/controller.js" -> "ModulenameViewname"
            config.controller = viewPathParts.map(function (part) {
                return part.charAt(0).toUpperCase() + part.slice(1);
            }).join('');

            viewPathParts.splice(1, 0, 'views');
        }

        viewPath = viewPathParts.join('/');

        // Template URL
        // "modulename/viewname" -> "/app/modulename/views/viewname/template.html"
        config.templateUrl = '/app/' + viewPath + '/template.html';

        return config;
    }

    function shortenViews(state, parent) {
        var result = {}, views = parent(state);

        angular.forEach(views, function (config, name) {
            if (angular.isString(config)) {
                config = expandView(config);
            }

            result[name] = config;
        });

        return result;
    }

    app.constant('stateViews', {shorten: shortenViews});

});