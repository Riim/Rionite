const gulp = require('gulp');

require('./polyfills');
require('./minify');

gulp.task('default', gulp.series('polyfills', 'minify'));
