var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('fix-global', function() {
	return gulp.src('dist/bundle.js')
		.pipe(replace(
			'root["rionite"] = factory(root["cellx"]);',
			'root["Rionite"] = root["rionite"] = factory(root["cellx"]);'
		))
		.pipe(gulp.dest('dist'));
});
