'use strict';

angular.module('instaOrganizer')
  .directive('navbar',
    function( $rootScope, $auth, $window, $location ) {

      return {
        restrict: 'E',
        replace: true,
        scope: { },
        templateUrl: 'views/navbar.html',
        link: function( scope, element, attrs ) {
          
          scope.$location   = $location;
          scope.currentUser = $rootScope.currentUser;

          scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
          };

          scope.logout = function() {
            $auth.logout();
            delete $window.localStorage.currentUser;
          };

        }

      };
    }  
  );
