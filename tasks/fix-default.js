var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('fix-default', function() {
	return gulp.src('dist/Rionite.js')
		.pipe(replace(
			'exports.default = Rionite;',
			'module.exports = Rionite.default = Rionite;'
		))
		.pipe(gulp.dest('dist'));
});
