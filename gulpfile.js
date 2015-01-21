/**
* gulpfile.js
* -----------
* main file
*/

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.paths = {
  src:    'client/src',
  dist:   'client/dist',
  tmp:    '.tmp',
  bower:  'bower_components',
  node:   'node_modules',
  e2e:    'e2e'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
