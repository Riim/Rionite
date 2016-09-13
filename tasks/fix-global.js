var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('fix-global', function() {
	return gulp.src('dist/Rionite.js')
		.pipe(replace(
			'(global.Rionite = factory(global.cellx));',
			'(global.Rionite = global.rionite = factory(global.cellx));'
		))
		.pipe(gulp.dest('dist'));
});
