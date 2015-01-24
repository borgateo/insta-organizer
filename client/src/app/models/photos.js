

angular.module('Instagram')
  .factory('photosMdl', 
    function( $rootScope ) {

      var WallMdl = function() {
        this.flush();
      };

      WallMdl.prototype.flush = function() {
        this.photos = [];
        return this;
      };

      WallMdl.prototype.update = function (data) {
        this.flush();
        this.photos = data.photos;
        return this;
      };

      return new WallMdl();
    }
  );