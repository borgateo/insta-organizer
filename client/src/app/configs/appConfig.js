/**
* appConfig.js
* ---------------
* constants used in the app
*/
angular.module('Instagram')
  .constant('appConfig', (function() {

    // TODO: create a gulp task to build for prod or dev
    var isDev      = true;  // false;
    var enviroment = {};

    if ( isDev ) {
      // === Development ===
      enviroment = {
        server: 'http://localhost:3000',
        client: 'http://localhost:8000',
        instClientId: '9cb61c4da8334f4ba6ce4e823414a6a4'
      };
    } else {
      // === Production ===
      enviroment = {
        server: 'https://insta-organizer.herokuapp.com',
        client: 'http://development.insta-organizer.divshot.io',
        instClientId: 'dfce040bd3e74f08a7dd4c7c32680d60'
      };
    }

    return {
      env: enviroment
    };

  })());
