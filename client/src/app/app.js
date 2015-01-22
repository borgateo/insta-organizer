

angular.module('Instagram', [
  'ngRoute', 
  'ngMessages', 
  'satellizer'
  ])
  .config(function($routeProvider, $authProvider) {
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
      .otherwise('/');
    
    var env = {
      server: 'http://localhost:3000',
      client: 'http://localhost:8000'
    };

    $authProvider.loginUrl  = env.server + '/auth/login';
    $authProvider.signupUrl = env.server + '/auth/signup';
    $authProvider.oauth2({
      name: 'instagram',
      url: env.server + '/auth/instagram',
      redirectUri: env.client,
      clientId: 'dfce040bd3e74f08a7dd4c7c32680d60',
      requiredUrlParams: ['scope'],
      scope: ['likes', 'comments', 'relationships'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });
  })
  .run(function( $rootScope, $window, $auth ) {
    if ( $auth.isAuthenticated() ) {
      $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
    }
  });
