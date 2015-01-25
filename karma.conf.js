module.exports = function(config) {
  config.set({
    basePath: '',

    files: [
      'node_modules/underscore/underscore.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'client/src/assets/javascripts/satellizer.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/src/app/**/*.js',
      'test/unit/*.js'
    ],

    autoWatch: true,

    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs) 
    colors: true,

    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ],

    singleRun: true
  });
};