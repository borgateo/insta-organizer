/**
* controllers/home.js
*/
'use strict';

angular.module('instaOrganizer')
  .controller('HomeCtrl', 
    function( 
      $rootScope, 
      $scope, 
      $window, 
      $auth, 
      apiService,
      Photo
    ) {

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.linkInstagram = function() {
      $auth.link('instagram')
        .then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser           = JSON.parse($window.localStorage.currentUser);
          apiService.getFeed().success(function(data) {
            $scope.photos = data;
          });
        });
    };

    var initialize = function() {
      if ( !$auth.isAuthenticated() || !$rootScope.currentUser  ) {
        return;
      }
      apiService.getFeed();
      $scope.photos = Photo;
    };

    initialize();
  });
