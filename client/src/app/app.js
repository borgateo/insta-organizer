/**
* app.js
* -----------
* Angular app routes
*/
angular.module('Instagram', [
  'ngRoute', 
  'ngMessages', 
  'satellizer',
  'ui.bootstrap'
  ])
  .config(function( $routeProvider, $authProvider, appConfig ) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/photo/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .when('/relationships', {
        templateUrl: 'views/relationships.html',
        controller: 'RelationshipsCtrl'
      })
      .otherwise('/');
    
    $authProvider.loginUrl  = appConfig.env.server + '/auth/login';
    $authProvider.signupUrl = appConfig.env.server + '/auth/signup';
    $authProvider.oauth2({
      name: 'instagram',
      url: appConfig.env.server + '/auth/instagram',
      redirectUri: appConfig.env.client,
      clientId: appConfig.env.instClientId,
      requiredUrlParams: ['scope'],
      scope: ['likes', 'comments', 'relationships'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });
  })
  .run(function( $rootScope, $window, $auth ) {
    if ( $auth.isAuthenticated() ) {
      $rootScope.currentUser = JSON.parse( $window.localStorage.currentUser );
    }
  });
