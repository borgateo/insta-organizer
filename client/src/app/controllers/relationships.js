/**
* controllers/relationships.js
*/
angular.module('Instagram')
  .controller('RelationshipsCtrl', function( 
    $scope, 
    $rootScope, 
    $auth, 
    apiSrv,
    relationshipsMdl
  ) {

    // console.log( 'currentUser', $rootScope.currentUser );
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    // activate the selected tab
    $scope.selectTab = function( index ) {
      for( var i = 0, nodes = $scope.tabs.length; i < nodes; i++ ) {
        $scope.tabs[ i ].active = false;  
      }
      $scope.tabs[ index ].active = true;
    }

    var initialize = function() {
      if ( !$auth.isAuthenticated() || !$rootScope.currentUser  ) {
        return;
      }

      $scope.tabs = [
        { 
          title: 'Following',
          type: 'follows',
          active: true
        },
        { 
          title: 'Followers',
          type: 'followedBy',
          active: false
        },
        { 
          title: 'Not following back',
          type: 'notFollowingBack',
          active: false
        }
      ];
      
      apiSrv.getFollows( $rootScope.currentUser.instagramId );
      apiSrv.getFollowedBy( $rootScope.currentUser.instagramId );

      $scope.relationships = relationshipsMdl;
    }

    initialize();

  });
