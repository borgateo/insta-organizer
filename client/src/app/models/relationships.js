

angular.module('Instagram')
  .factory('relationshipsMdl', 
    function( $rootScope ) {

      var intersectionObjects2 = function(a, b, areEqualFunction) {
          var Result = [];

          for(var i = 0; i < a.length; i++) {
              var aElement = a[i];
              var existsInB = _.any(b, function(bElement) { return areEqualFunction(bElement, aElement); });
              if(existsInB) {
                  Result.push(aElement);
              }
          }

          return Result;
      }

      var intersectionObjects = function() {
        var Results = arguments[0];
        var LastArgument = arguments[arguments.length - 1];
        var ArrayCount = arguments.length;
        var areEqualFunction = _.isEqual;

        if(typeof LastArgument === "function") {
            areEqualFunction = LastArgument;
            ArrayCount--;
        }

        for(var i = 1; i < ArrayCount ; i++) {
            var array = arguments[i];
            Results = intersectionObjects2(Results, array, areEqualFunction);
            if(Results.length === 0) break;
        }
        return Results;
      }

      var relationshipsMdl = function() {
        this.flush();
      };

      relationshipsMdl.prototype.flush = function() {
        this.follows          = [];
        this.followedBy       = [];
        this.notFollowingBack = [];  // I follow them, they don't me
        this.notFollowing     = [];  // I don't follow them, they do me
        return this;
      };

      relationshipsMdl.prototype.updateNotFollowingBack = function() {
        if ( this.follows.length && this.followedBy.length ) {
          // calculate the intersection
          this.notFollowingBack = intersectionObjects(this.follows, this.followedBy, function( item1, item2 ) {
            return item1.id === item2.id;
          });
        }
      }

      relationshipsMdl.prototype.updateFollows = function( data ) {
        this.follows.length = 0;
        this.follows        = data;

        this.updateNotFollowingBack();
        return this;
      };

      relationshipsMdl.prototype.updateFollowedBy = function( data ) {
        this.followedBy.length = 0;
        this.followedBy        = data;

        this.updateNotFollowingBack();
        return this;
      };

      return new relationshipsMdl();
    }
  );