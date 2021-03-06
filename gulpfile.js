var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    bower = require('bower'),
    config = require('./config/config.js');

// vendor scripts
gulp.task('vendor', function() {
    return gulp.src(config.assets.lib.js)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

// styles
gulp.task('styles', ['fonts'], function () {
    return gulp.src(config.assets.css)
        .pipe(concat('styles.css'))
		.pipe(gulp.dest('public/css'));
});

// fonts
gulp.task('fonts', function () {
    return gulp.src(config.assets.fonts)
		.pipe(gulp.dest('public/fonts'));
});

// client scripts
gulp.task('scripts', function() {
    return gulp.src(config.assets.js)
        .pipe(sourcemaps.init())
        .pipe(concat('application.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
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
gulp.task('build', ['clean', 'bower'], function(){
	return gulp.start('vendor', 'styles', 'templates', 'scripts', 'images');
});

// watch
gulp.task('watch', function() {
    gulp.watch('client/assets/css/*.css', ['styles']);
    gulp.watch('client/**/*.js', ['scripts']);
    gulp.watch('client/**/*.html', ['templates']);
});

// clean assets
gulp.task('clean', function(cb) {
    return del(['public/css', 'public/js'], cb);
});

// bower
gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb();
    });
});

// default development
gulp.task('default', ['build', 'watch'], function(){
	nodemon({ 
	    script: 'server.js',
        watch: 'server/*',
		env: {NODE_ENV: 'development', DEBUG: true}
	});
});
