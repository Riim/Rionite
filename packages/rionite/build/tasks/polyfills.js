const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('_polyfills', () => {
	return gulp
		.src([
			'polyfills/document-register-element.max.js',
			'polyfills/innerHTML.max.js',
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
			'polyfills/innerHTML.max.js',
			'polyfills/template-tag.js',
			'dist/rionite.es6.js'
		])
		.pipe(concat('rionite.polyfills.es6.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('polyfills', gulp.series('_polyfills', '_polyfills-es6'));
