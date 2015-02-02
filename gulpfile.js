var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglifyjs'),
    templateCache = require('gulp-angular-templatecache'),
    config = require('./config/config.js');

// vendor scripts
gulp.task('vendor', function() {
    return gulp.src(config.assets.lib.js)
        .pipe(uglify('vendor.min.js'))
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
        .pipe(uglify('application.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('public/js'));
});

// partials
gulp.task('templates', function() {
    return gulp.src(config.assets.views)
        .pipe(templateCache({ module: 'buoyApp' }))
        .pipe(gulp.dest('public/js'));
});

// images
gulp.task('images', function() {
    return gulp.src(config.assets.img)
    .pipe(gulp.dest('public/img'));
});

// build
gulp.task('build', ['clean', 'vendor', 'styles', 'templates', 'scripts', 'images']);

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
	nodemon({ 
	    script: 'server.js',
        watch: 'server/*',
		env: {NODE_ENV: 'development', DEBUG: true}
	});
});