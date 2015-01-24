

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

        if( typeof LastArgument === "function" ) {
            areEqualFunction = LastArgument;
            ArrayCount--;
        }

        for ( var i = 1; i < ArrayCount ; i++ ) {
            var array = arguments[i];
            Results = intersectionObjects2(Results, array, areEqualFunction);
            if ( Results.length === 0 ) break;
        }
        return Results;
      }

      var relationshipsMdl = function() {
        this.flush();
      };

      relationshipsMdl.prototype.flush = function() {
        this.follows          = [];
        this.followedBy       = [];
        this.followingBack    = [];  // I follow them, they follow me
        this.youNotFollowingBack = [];  // I don't follow them
        this.theyNotFollowingBack = [];  // they don't me follow me
        return this;
      };

      relationshipsMdl.prototype.updateYouNotFollowingBack = function() {
        if ( !this.follows.length || !this.followedBy.length ) {
          return;
        }
        var bIds = {}
        this.follows.forEach(function(obj){
            bIds[obj.id] = obj;
        });

        // Return all elements in A, unless in B
        this.youNotFollowingBack = this.followedBy.filter(function(obj){
            return !(obj.id in bIds);
        });
      };

      relationshipsMdl.prototype.updateTheyNotFollowingBack = function() {
        if ( !this.follows.length || !this.followedBy.length ) {
          return;
        }
        var bIds = {}
        this.followedBy.forEach(function(obj){
            bIds[obj.id] = obj;
        });

        // Return all elements in A, unless in B
        this.theyNotFollowingBack = this.follows.filter(function(obj){
            return !(obj.id in bIds);
        });
      };


      relationshipsMdl.prototype.updateFollowingBack = function() {
        if ( !this.follows.length || !this.followedBy.length ) {
          return;
        }
        // calculate the intersection
        this.followingBack = intersectionObjects(
          this.follows, 
          this.followedBy, 
          function( item1, item2 ) {
            return item1.id === item2.id;
          }
        );
      };

      relationshipsMdl.prototype.updateFollows = function( data ) {
        this.follows.length = 0;
        this.follows        = data;

        this.updateFollowingBack();
        this.updateYouNotFollowingBack();
        this.updateTheyNotFollowingBack();
        return this;
      };

      relationshipsMdl.prototype.updateFollowedBy = function( data ) {
        this.followedBy.length = 0;
        this.followedBy        = data;

        this.updateFollowingBack();
        this.updateYouNotFollowingBack();
        this.updateTheyNotFollowingBack();
        return this;
      };

      return new relationshipsMdl();
    }
  );