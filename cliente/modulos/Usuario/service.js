angular.module('app').factory('UserService', ['$http', function($http) {
  return {
    API_ROUTE: 'http://localhost:8888/api/user',
    findAll:function(){
      return $http.get(this.API_ROUTE).
        error(this.errorCallback.bind(this));
    },
    findByRole:function(role){
      return $http.post(this.API_ROUTE.concat('/role')).
        error(this.errorCallback.bind(this));
    },
    find:function(id){
      return $http.get(this.API_ROUTE.concat('/').concat(id)).
        error(this.errorCallback.bind(this));
    },
    create:function(data){
      return $http.post(this.API_ROUTE, data).
        error(this.errorCallback.bind(this));
    },
    update:function(data){
      return $http.put(this.API_ROUTE.concat('/').concat(data.id), data).
        error(this.errorCallback.bind(this));
    },
    remove:function(id){
      return $http.delete(this.API_ROUTE.concat('/').concat(id)).
        error(this.errorCallback.bind(this));
    },
    unique:function(data){
      return $http.post(this.API_ROUTE.concat('/unique'), data).
        error(this.errorCallback.bind(this));
    },
    errorCallback: function(error){
      console.error(error);
    }
  };
}]);
