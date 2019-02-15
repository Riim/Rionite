const gulp = require('gulp');

require('./polyfills');

gulp.task('default', gulp.series('polyfills'));
