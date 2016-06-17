var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('polyfills', function() {
	return gulp.src(['node_modules/document-register-element/build/document-register-element.max.js', 'dist/Rista.js'])
		.pipe(concat('Rista-with-polyfills.js'))
		.pipe(gulp.dest('dist'));
});
