'use strict';

module.exports = {
    assets: {
        lib: {
            js: [
                'client/assets/lib/jquery/dist/jquery.js',
                'client/assets/lib/angular/angular.js',
                'client/assets/lib/angular-resource/angular-resource.js',
                'client/assets/lib/angular-animate/angular-animate.js',
                'client/assets/lib/angular-ui-router/release/angular-ui-router.js',
                'client/assets/lib/bootstrap/dist/js/bootstrap.js'
            ]
        },
        css: [
            'client/assets/lib/bootstrap/dist/css/bootstrap.css',
            'client/assets/lib/bootstrap/dist/css/bootstrap-theme.css',
            'client/assets/css/*.css'
        ],
        js: [
            'client/app/app.js',
            'client/app/app.routes.js',
            'client/app/*/*.js'
        ],
        views: 'client/app/views/*.html',
        tests: [
            'client/lib/angular-mocks/angular-mocks.js',
            'client/app/tests/*.js'
        ]
    }
};
