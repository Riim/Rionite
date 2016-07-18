var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('polyfills', function() {
	return gulp.src([
		'polyfills/document-register-element.max.js',
		'polyfills/template-tag.js',
		'dist/Rionite.js'
	])
		.pipe(concat('Rionite-with-polyfills.js'))
		.pipe(gulp.dest('dist'));
});
