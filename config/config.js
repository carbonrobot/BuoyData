'use strict';

module.exports = {
    port: 3000,
    googleApiKey: 'AIzaSyAy3EHc_GtzX-rnGjjEKixCrRAJGwQlVHQ',
    assets: {
        lib: {
            js: [
                'client/assets/lib/jquery/dist/jquery.js',
                'client/assets/lib/angular/angular.js',
                'client/assets/lib/angular-resource/angular-resource.js',
                'client/assets/lib/angular-animate/angular-animate.js',
                'client/assets/lib/angular-ui-router/release/angular-ui-router.js',
                'client/assets/lib/bootstrap/dist/js/bootstrap.js',
                'client/assets/lib/lodash/lodash.js'
            ]
        },
        css: [
            'client/assets/lib/bootstrap/dist/css/bootstrap.css',
            'client/assets/lib/bootstrap/dist/css/bootstrap-theme.css',
            'client/assets/css/*.css'
        ],
        fonts: [
            'client/assets/lib/bootstrap/dist/fonts/*'
        ],
        js: [
            'client/app/app.js',
            'client/app/app.routes.js',
            'client/app/*/*.js'
        ],
        views: 'client/app/views/*.html',
        img: 'client/assets/img/**/*',
        tests: [
            'client/lib/angular-mocks/angular-mocks.js',
            'client/app/tests/*.js'
        ]
    }
};
