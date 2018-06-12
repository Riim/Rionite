const gulp = require('gulp');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');

gulp.task('polyfills', done => {
	runSequence('_polyfills', '_polyfills-es6', done);
});

gulp.task('_polyfills', () => {
	return gulp
		.src([
			'polyfills/document-register-element.max.js',
			'polyfills/template-tag.js',
			'dist/rionite.js'
		])
		.pipe(concat('rionite.polyfills.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('_polyfills-es6', () => {
	return gulp
		.src([
			'polyfills/document-register-element.max.js',
			'polyfills/template-tag.js',
			'dist/rionite.es6.js'
		])
		.pipe(concat('rionite.polyfills.es6.js'))
		.pipe(gulp.dest('dist'));
});
