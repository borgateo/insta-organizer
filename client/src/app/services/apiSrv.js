/**
* api.js
* ---------
* simple factory to get data from the server API
*
*/
angular.module('Instagram')
  .service('apiSrv', function( 
    $http, 
    appConfig,
    photosMdl,
    usersMdl
  ) {

    var service = {
      getFeed: function() {
        return $http.get( appConfig.env.server + '/api/feed' );
      },
      getFollows: function( id ) {
        $http
          .get( appConfig.env.server + '/api/follows/' + id )
          .success(function( response ) {
            usersMdl.updateFollows( response );
          });
      },
      getFollowedBy: function( id ) {
        $http
          .get( appConfig.env.server + '/api/followed-by/' + id )
          .success(function( response ) {
            usersMdl.updateFollowedBy( response );
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
