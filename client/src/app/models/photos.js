

angular.module('Instagram')
  .factory('photosMdl', 
    function( $rootScope ) {

      var PhotosMdl = function() {
        this.flush();
      };

      PhotosMdl.prototype.flush = function() {
        this.photos = [];
        return this;
      };

      PhotosMdl.prototype.update = function (data) {
        this.flush();
        this.photos = data.photos;
        return this;
      };

      return new PhotosMdl();
    }
  );