var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('lint', function() {
	return gulp.src(['build/**/*.js', 'src/**/*.js'])
		.pipe($.jscs())
		.pipe($.jscs.reporter())
		.pipe($.eslint())
		.pipe($.eslint.format());
});
