describe('User', function() {

  // Arrange
  var User;
  beforeEach( module('instaOrganizer') );
  beforeEach( module(function( $provide ) { 
    people = {}; 
    $provide.value( 'people', people ); 
  }));
  beforeEach( inject(function( _User_ ) { 
    User = _User_;
  }));

  // Assume
  describe('Constructor', function() {
    it('set up empty arrays', function() {
      // Assert
      expect( User.follows.length ).toBe(0);
      expect( User.followedBy.length ).toBe(0);
      expect( User.followingBack.length ).toBe(0);
      expect( User.youNotFollowingBack.length ).toBe(0);
      expect( User.theyNotFollowingBack.length ).toBe(0);
    }); 
  });

  describe('Update', function() {
    it('follows should add obj to follows', function() {
      // Act
      people.follows = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
      // Assert
      User.updateFollows( people.follows );
      expect( User.follows.length ).toBe(4);
    });
    it('followedBy should add obj to followedBy', function() {
      // Act
      people.followedBy = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
      User.updateFollowedBy( people.followedBy );
      expect( User.followedBy.length ).toBe(4);
    });
    it('FollowingBack should have elements follows U followedBy', function() {
      // Act
      people.follows = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
      User.updateFollows( people.follows );
      people.followedBy = [{id: 3}, {id: 4}, {id: 1}, {id: 2}];
      User.updateFollowedBy( people.followedBy );
      // Assert
      expect( User.followingBack.length ).toBe(4);
    });
    it('TheyNotFollowingBack should have elements follows ∩ followedBy', function() {
      // Act
      people.follows = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
      User.updateFollows( people.follows );
      people.followedBy = [{id: 1}, {id: 3}, {id: 4}];
      User.updateFollowedBy( people.followedBy );
      // Assert
      expect( User.theyNotFollowingBack.length ).toBe(2);
    });
    it('YouNotFollowingBack should have elements followedBy ∩ follows', function() {
      // Act
      people.follows = [{id: 1}, {id: 3}, {id: 4}];
      User.updateFollows( people.follows );
      people.followedBy = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
      User.updateFollowedBy( people.followedBy );
      // Assert
      expect( User.youNotFollowingBack.length ).toBe(2);
    });

  });
});

