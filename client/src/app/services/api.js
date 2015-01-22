/**
* api.js
* ---------
* simple factory to get data from the server API
*
*/
angular.module('Instagram')
  .factory('API', function( $http, appConfig ) {

    return {
      getFeed: function() {
        return $http.get( appConfig.env.server + '/api/feed' );
      },
      getMediaById: function( id ) {
        return $http.get( appConfig.env.server + '/api/media/' + id );
      },
      likeMedia: function( id ) {
        return $http.post( appConfig.env.server + '/api/like', { mediaId: id } );
      }
    };

  });