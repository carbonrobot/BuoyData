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
	styles: {
		source: 'vendor/bootstrap/dist/css/bootstrap.css',
		dest: 'public/dist/css'
	}
};

// client vendor scripts
gulp.task('vendor', ['clean'], function(){
	return gulp.src(paths.vendor.source)
		.pipe(gulp.dest(paths.vendor.dest));
});

// client vendor styles
gulp.task('styles', ['clean'], function(){
	return gulp.src(paths.styles.source)
		.pipe(gulp.dest(paths.styles.dest));
});

// clean assets
gulp.task('clean', function(cb) {
    del([paths.vendor.dest, paths.styles.dest], cb)
});

// default development
gulp.task('default', ['vendor', 'styles'], function(){
	nodemon({ 
		script: 'server.js',
		env: {NODE_ENV: 'development', DEBUG: true}
	});
});