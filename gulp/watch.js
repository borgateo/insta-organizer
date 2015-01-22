'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', function() {
  gulp.watch(paths.src + '/assets/**/*.scss', ['minify-css']);
  gulp.watch(paths.src + '/**/*.html', ['partials', 'minify-js']);
  gulp.watch(paths.src + '/*.html', ['misc']);
  gulp.watch(paths.src + '/app/**/*.js', ['minify-js']);
});
