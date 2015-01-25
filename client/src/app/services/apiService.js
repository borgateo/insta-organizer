/**
* services/apiService.js
* ------------------
* simple service to get data from the server API
*
*/
'use strict';

angular.module('instaOrganizer')
  .factory('apiService', function( 
    $http, 
    appConfig,
    User,
    Photo
  ) {

    var service = {
      getFeed: function() {
        $http
          .get( appConfig.env.server + '/api/feed')
          .success(function( response ) {
            Photo.update( response );
          });
      },
      getFollows: function( id ) {
        $http
          .get( appConfig.env.server + '/api/follows/' + id )
          .success(function( response ) {
            User.updateFollows( response );
          });
      },
      getFollowedBy: function( id ) {
        $http
          .get( appConfig.env.server + '/api/followed-by/' + id )
          .success(function( response ) {
            User.updateFollowedBy( response );
          });
      },
      getMediaById: function( id ) {
        return $http.get( appConfig.env.server + '/api/media/' + id );
      },
      likeMedia: function( id ) {
        return $http.post( appConfig.env.server + '/api/like', { mediaId: id } );
      },
      updateRelationship: function( id, actn ) {
        return $http.post( appConfig.env.server + '/api/relationship', { userId: id, action: actn } );
      }
    };

    return service;
  });
