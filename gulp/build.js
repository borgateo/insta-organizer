'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

var banner = ['/**',
  ' * instaOrganizer',
  ' * (c) 2015 ~ Matt Borgato',
  ' * License: MIT',
  ' * Last Updated: <%= new Date().toUTCString() %>',
  ' */'
].join('\n');


gulp.task('minify-js', ['partials'], function() {
  return gulp.src([
    paths.bower + '/angular/angular.js',
    paths.bower + '/angular-route/angular-route.js',
    paths.bower + '/angular-messages/angular-messages.js',
    paths.src + '/assets/javascripts/satellizer.js',
    // 'client/app/libs/sweet-alert.js',
    paths.src + '/app/app.js',
    paths.tmp + '/partials/templateCacheHtml.js',
    paths.src + '/app/controllers/*.js',
    paths.src + '/app/services/*.js',
    paths.src + '/app/javascripts/directives/*.js'
  ])
  .pipe($.concat('app.min.js'))
  .pipe($.ngAnnotate())
  //.pipe($.uglify())
  .pipe($.header( banner ))
  .pipe(gulp.dest( paths.dist ));
});

gulp.task('minify-css', ['styles'], function() {
  return gulp.src(paths.tmp + '/**/*.css')
    .pipe($.concat('styles.min.css'))
    //.pipe($.csso())
    .pipe(gulp.dest( paths.dist ));
});

gulp.task('misc', function () {
  return gulp.src(paths.src + '/*.html')
    .pipe(gulp.dest(paths.dist + '/'));
});


// gulp.task('images', function () {
//   return gulp.src(paths.src + '/assets/images/**/*')
//     .pipe(gulp.dest(paths.dist + '/assets/images/'));
// });

// gulp.task('fonts', function () {
//   return gulp.src($.mainBowerFiles())
//     .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
//     .pipe($.flatten())
//     .pipe(gulp.dest(paths.dist + '/fonts/'));
// });

// gulp.task('misc', function () {
//   return gulp.src(paths.src + '/**/*.ico')
//     .pipe(gulp.dest(paths.dist + '/'));
// });

gulp.task('build', ['minify-js', 'minify-css', 'misc']);
