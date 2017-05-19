var rimraf = require('rimraf');
var gulp = require('gulp');

gulp.task('clear', function(done) {
	rimraf('dist', done);
});
