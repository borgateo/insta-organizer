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
    relationshipsMdl
  ) {

    var service = {
      getFeed: function() {
        return $http.get( appConfig.env.server + '/api/feed' );
      },
      getFollows: function( id ) {
        $http
          .get( appConfig.env.server + '/api/follows/' + id )
          .success(function( response ) {
            relationshipsMdl.updateFollows( response );
          });
      },
      getFollowedBy: function( id ) {
        $http
          .get( appConfig.env.server + '/api/followed-by/' + id )
          .success(function( response ) {
            relationshipsMdl.updateFollowedBy( response );
          });
      },
      getMediaById: function( id ) {
        return $http.get( appConfig.env.server + '/api/media/' + id );
      },
      likeMedia: function( id ) {
        return $http.post( appConfig.env.server + '/api/like', { mediaId: id } );
      }
    };

    return service;

  });
