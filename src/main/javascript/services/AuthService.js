angular.module('library.services')

.factory('authService', function($http) {
  var currentUser = null;
  return {
    login: function(user, password) { 
      currentUser = user; 
      $http.defaults.headers.common['Authorization'] 
        = this.createAuthHeader(currentUser.email, password);
    },
    
    isLoggedIn: function() { 
      return currentUser !== null; 
    },
    
    isAdmin: function() { 
      return this.isLoggedIn() && currentUser.role == 'ADMINISTRATOR'; 
    },
    
    getFullName: function() { 
      return this.isLoggedIn() ? currentUser.name : null; 
    },
    
    logout: function() { 
      currentUser = null; 
      delete $http.defaults.headers.common['Authorization'];
    },
    
    createAuthHeader: function(username, password) {
      return 'Basic ' + Base64.encode(username + ':' + password);
    }
  
  };

});

