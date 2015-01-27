var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    nodemon = require('gulp-nodemon');

// paths
var paths = {
	vendor: {
		source: [
			'vendor/jquery/dist/jquery.js',
			'vendor/bootstrap/dist/js/bootstrap.js',
			'vendor/angular/angular.js'
		],
		dest: 'public/dist/js'
	},
	scripts: {
	    source: [
            'public/*.js',
            'public/modules/**/*.js',
            'public/modules/**/scripts/*.js',
            'public/modules/**/scripts/config/*.js',
            'public/modules/**/scripts/controllers/*.js',
            'public/modules/**/scripts/directives/*.js',
            'public/modules/**/scripts/services/*.js'
	    ],
        dest: 'public/dist/js'
	},
	styles: {
		source: 'vendor/bootstrap/dist/css/bootstrap.css',
		dest: 'public/dist/css'
	}
};

// vendor scripts
gulp.task('vendor', ['clean'], function(){
	return gulp.src(paths.vendor.source)
		.pipe(gulp.dest(paths.vendor.dest));
});

// vendor styles
gulp.task('styles', ['clean'], function () {
    return gulp.src(paths.styles.source)
		.pipe(gulp.dest(paths.styles.dest));
});

// client scripts
gulp.task('scripts', ['clean'], function () {
    return gulp.src(paths.scripts.source)
		.pipe(gulp.dest(paths.scripts.dest));
});

// build
gulp.task('build', ['clean', 'vendor', 'styles', 'scripts']);

// clean assets
gulp.task('clean', function(cb) {
    del([paths.vendor.dest, paths.styles.dest], cb);
});

// default development
gulp.task('default', ['build'], function(){
	nodemon({ 
		script: 'server.js',
		env: {NODE_ENV: 'development', DEBUG: true}
	});
});