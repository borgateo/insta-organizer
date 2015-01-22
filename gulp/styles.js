'use strict';

var gulp  = require('gulp');
var paths = gulp.paths;
var $     = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src([paths.bower +'/bootstrap-css-only/css/bootstrap.css', paths.src + '/assets/stylesheets/*.scss'])
    .pipe($.sass({
      includePaths: require('node-bourbon').includePaths,
      errLogToConsole: true,
    }))
    .pipe(gulp.dest(paths.tmp + '/css'));
});
