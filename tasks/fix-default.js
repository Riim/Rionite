var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('fix-default', function() {
	return gulp.src('dist/Rionite.js')
		.pipe(replace(
			/Object\.defineProperty\(exports, "__esModule", \{ value: true \}\);\s+exports\.default = Rionite;/,
			'Rionite.__esModule = true;\nmodule.exports = Rionite.default = Rionite;'
		))
		.pipe(gulp.dest('dist'));
});
