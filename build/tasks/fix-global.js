var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('fix-global', function() {
	return gulp.src('dist/rionite.js')
		.pipe(replace(
			'root["rionite"] = factory(',
			'root["Rionite"] = root["rionite"] = factory('
		))
		.pipe(gulp.dest('dist'));
});
