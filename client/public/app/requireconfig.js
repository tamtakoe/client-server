require.config({
    baseUrl: '/app/',
    paths: {
        angular: '../vendor/angular/angular',
        angularResource: '../vendor/angular-resource/angular-resource',
        uiRouter: '../vendor/angular-ui-router/release/angular-ui-router'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        uiRouter: ['angular'],
        angularResource: ['angular']
    },
    deps: ['bootstrap']
});
