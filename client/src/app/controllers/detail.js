/**
* controllers/detail.js
*/
'use strict';

angular.module('instaOrganizer')
  .controller('DetailCtrl', function( 
    $scope, 
    $rootScope, 
    $location, 
    apiService 
  ) {

    var mediaId = $location.path().split('/').pop();

    apiService
      .getMediaById( mediaId )
      .success(function(media) {
        $scope.photo = media;
        $scope.hasLiked = media.user_has_liked;
      });

    $scope.like = function() {
      $scope.hasLiked = true;
      apiService
        .likeMedia( mediaId ).error(function( data ) {
        $scope.alerts.push(
          {
            type: 'danger', 
            msg: 'Woops! ' + data.message
          }
        );
      });
    };
  });