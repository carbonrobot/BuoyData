var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify'),
    templateCache = require('gulp-angular-templatecache'),
    config = require('./config/config.js');

// vendor scripts
gulp.task('vendor', function() {
    return gulp.src(config.assets.lib.js)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

// styles
gulp.task('styles', function () {
    return gulp.src(config.assets.css)
        .pipe(concat('styles.css'))
		.pipe(gulp.dest('public/css'));
});

// client scripts
gulp.task('scripts', function() {
    return gulp.src(config.assets.js)
        .pipe(concat('application.min.js'))
        .pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

// partials
gulp.task('templates', function() {
    return gulp.src(config.assets.views)
        .pipe(templateCache({ module: 'buoyApp' }))
        .pipe(gulp.dest('public/js'));
});

// build
gulp.task('build', ['clean', 'vendor', 'styles', 'templates', 'scripts']);

// watch
gulp.task('watch', function() {
    gulp.watch('client/assets/css/*.css', ['styles']);
    gulp.watch('client/**/*.js', ['scripts']);
    gulp.watch('client/**/*.html', ['templates']);
});

// clean assets
gulp.task('clean', function() {
    del(['public/css', 'public/js']);
});

// default development
gulp.task('default', ['build', 'watch'], function(){
	//nodemon({ 
	//	script: 'server.js',
	//	env: {NODE_ENV: 'development', DEBUG: true}
	//});
});