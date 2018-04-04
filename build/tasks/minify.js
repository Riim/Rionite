const pump = require('pump');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('minify', done => {
	pump(
		[
			gulp.src(['dist/rionite.js', 'dist/rionite.polyfills.js']),
			uglify(),
			rename({ suffix: '.min' }),
			gulp.dest('dist')
		],
		done
	);
});
