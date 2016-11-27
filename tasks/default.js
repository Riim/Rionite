var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(done) {
	runSequence('fix-global', 'fix-default', 'polyfills', 'minify', 'sizereport', done);
});
