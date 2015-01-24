angular.module('Instagram')
  .controller('HomeCtrl', 
    function( $rootScope, $scope, $window, $auth, apiSrv, wallMdl ) {

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.linkInstagram = function() {
      $auth.link('instagram')
        .then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser           = JSON.parse($window.localStorage.currentUser);
          apiSrv.getFeed().success(function(data) {
            $scope.photos = data;
          });
        });
    };

    var initialize = function() {
      if ( !$auth.isAuthenticated() || !$rootScope.currentUser  ) {
        return;
      }
      apiSrv.getFeed().success(function( data ) {
        $scope.photos = data;
      });
    }

    initialize();
  });
  