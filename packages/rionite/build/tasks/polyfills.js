const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('polyfills', () => {
	return gulp
		.src([
			'node_modules/document-register-element/build/document-register-element.max.js',
			'polyfills/innerHTML.max.js',
			'polyfills/template-tag.js',
			'dist/rionite.js'
		])
		.pipe(concat('rionite.polyfills.js'))
		.pipe(gulp.dest('dist'));
});
