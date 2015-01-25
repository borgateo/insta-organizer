/*
* model/user.js
* -------------
* Instagram user model
*
*/
'use strict';

angular.module('instaOrganizer')
  .factory('User', 
    function( helpers ) {

      var User = function() {
        this.flush();
      };

      User.prototype.flush = function() {
        this.follows              = [];
        this.followedBy           = [];
        this.followingBack        = [];  // I follow them, they follow me
        this.youNotFollowingBack  = [];  // I don't follow them
        this.theyNotFollowingBack = [];  // they don't me follow me
        return this;
      };

       User.prototype.updateFollows = function( data ) {
        this.follows.length = 0;
        this.follows        = data;

        this.updateFollowingBack();
        this.updateYouNotFollowingBack();
        this.updateTheyNotFollowingBack();
        return this;
      };

      User.prototype.updateFollowedBy = function( data ) {
        this.followedBy.length = 0;
        this.followedBy        = data;

        this.updateFollowingBack();
        this.updateYouNotFollowingBack();
        this.updateTheyNotFollowingBack();
        return this;
      };


      User.prototype.updateYouNotFollowingBack = function() {
        if ( !this.follows.length || !this.followedBy.length ) {
          return;
        }
        var bIds = {};
        this.follows.forEach(function( obj ){
            bIds[ obj.id ] = obj;
        });

        // Return all elements in A, unless in B
        this.youNotFollowingBack = this.followedBy.filter(function(obj){
            return !(obj.id in bIds);
        });
      };

      User.prototype.updateTheyNotFollowingBack = function() {
        if ( !this.follows.length || !this.followedBy.length ) {
          return;
        }
        var bIds = {};
        this.followedBy.forEach(function(obj){
            bIds[obj.id] = obj;
        });

        // Return all elements in A, unless in B
        this.theyNotFollowingBack = this.follows.filter(function(obj){
            return !(obj.id in bIds);
        });
      };


      User.prototype.updateFollowingBack = function() {
        if ( !this.follows.length || !this.followedBy.length ) {
          return;
        }
        // calculate the intersection
        this.followingBack = helpers.intersectionObjects(
          this.follows, 
          this.followedBy, 
          function( item1, item2 ) {
            return item1.id === item2.id;
          }
        );
      };

      User.prototype.unfollowUser = function( userId ) {
        var idx;
        _.find( this.follows, function( item, followIdx ){ 
          if ( item.id == userId ) { 
            idx = followIdx; 
            return true;
          }
        });
        this.follows.splice( idx, 1 );
        this.updateFollowingBack();
        this.updateYouNotFollowingBack();
        this.updateTheyNotFollowingBack();
      };

      User.prototype.followUser = function( userId ) {
        var idx;
        _.find( this.follows, function( item, followIdx ){ 
          if ( item.id == userId ) { 
            idx = followIdx;
            return true;
          }
        });
        this.updateFollowingBack();
        this.updateYouNotFollowingBack();
        this.updateTheyNotFollowingBack();
      };


      return new User();
    }
  );