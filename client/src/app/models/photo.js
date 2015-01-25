/**
* models/photo.js
*/
'use strict';

angular.module('instaOrganizer')
  .factory('Photo', 
    function() {

      var Photo = function() {
        this.flush();
      };

      Photo.prototype.flush = function() {
        this.photos = [];
        return this;
      };

      Photo.prototype.update = function( data ) {
        this.flush();
        this.photos = data.photos;
        return this;
      };

      return new Photo();
    }
  );