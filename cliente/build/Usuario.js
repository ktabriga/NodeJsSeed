var UserCtrl = function(UserModel,Notification) {
  var self = this;

  self.master = {};
  
  UserModel.findAll();

  // Event Listener
  Notification.addEventListener('user:find_all_success', function(event, data) { _findAll.success(data);  });
  Notification.addEventListener('user:find_all_error', function(event, data) { _findAll.error(data); });
  Notification.addEventListener('user:find_success', function(event, data) { _find.success(data);  });
  Notification.addEventListener('user:find_error', function(event, data) { _find.error(data); });
  Notification.addEventListener('user:create_success', function(event, data) { _create.success(data);  });
  Notification.addEventListener('user:create_error', function(event, data) { _create.error(data); });
  Notification.addEventListener('user:update_success', function(event, data) { _update.success(data);  });
  Notification.addEventListener('user:update_error', function(event, data) { _update.error(data); });
  Notification.addEventListener('user:remove_success', function(event, data) { _remove.success(data);  });
  Notification.addEventListener('user:remove_error', function(event, data) { _remove.error(data); });

  // List
  self.edit = function(user) {
    delete user.pass;
    self.user = angular.copy(user);
  }
  self.remove = function(user) {
    if (confirm('Tem certeza que deseja remover o usuário '+user.name+'?')) {
      UserModel.remove(user.id);
    }
  }

  // Form
  self.roles = [
    {label: 'Colaborador', value: 'contributor'},
    {label: 'Comissão', value: 'committee'},
    {label: 'Diretoria', value: 'directorship'}
  ];
  self.submit = function() {
    self.master = angular.copy(self.user);
    if (self.master.hasOwnProperty('id')) {
      UserModel.update(self.master);
    } else {
      UserModel.create(self.master);
    }
  }
  self.reset = function() {
    self.user = angular.copy(self.master);
  }
  self.reset();

  // Event listener functions
  _findAll = {
    success: function(data) {
      console.log(data);
      self.users = data;
    },
    error: function(data) {
      console.warn(data);
    }
  }

  _find = {
    success: function(data) {
      self.user = data;
    },
    error: function(data) {
      console.warn(data);
    }
  }
  
  _create = {
    success: function(data) {
      self.message = 'Usuário criado com sucesso';
      self.users.push(data);
      self.user = {};
    },
    error: function(data) {
      self.message = data.message;
      console.warn(data);
    }
  }

  _update = {
    success: function(data) {
      self.message = 'Usuário alterado com sucesso';
      UserModel.findAll();
      self.user = {};
    },
    error: function(data) {
      self.message = data.message;
      console.warn(data);
    }
  }

  _remove = {
    success: function(data) {
      self.message = 'Usuário deletado com sucesso';
      UserModel.findAll();
    },
    error: function(data) {
      self.message = data.message;
      console.warn(data);
    }
  }

  // Event destroy
  Notification.removeEventListener('user:find_all_success', function(event, data) { _findAll.success(data);  });
  Notification.removeEventListener('user:find_all_error', function(event, data) { _findAll.error(data); });
  Notification.removeEventListener('user:find_success', function(event, data) { _find.success(data);  });
  Notification.removeEventListener('user:find_error', function(event, data) { _find.error(data); });
  Notification.removeEventListener('user:create_success', function(event, data) { _create.success(data);  });
  Notification.removeEventListener('user:create_error', function(event, data) { _create.error(data); });
  Notification.removeEventListener('user:update_success', function(event, data) { _update.success(data);  });
  Notification.removeEventListener('user:update_error', function(event, data) { _update.error(data); });
  Notification.removeEventListener('user:remove_success', function(event, data) { _remove.success(data);  });
  Notification.removeEventListener('user:remove_error', function(event, data) { _remove.error(data); });

}
angular.module('app').controller('UserCtrl',['UserModel','Notification',UserCtrl])
angular.module('app').factory('UserModel', ['UserService','Notification', function(UserService,Notification) {
  return {
    // Find all
    findAll:function() {
      UserService.findAll().then(this._handleFindAllSuccess.bind(this),this._handleFindAllError.bind(this));
    },
    _handleFindAllSuccess:function(result){
      Notification.notify('user:find_all_success', result.data);
    },
    _handleFindAllError:function(error){
      Notification.notify('user:find_all_error', error.data);
      console.error('UserModel : User find all error')
    },

    // Find
    find:function(id) {
      UserService.find(id).then(this._handleFindSuccess.bind(this),this._handleFindError.bind(this));
    },
    _handleFindSuccess:function(result){
      Notification.notify('user:find_success', result.data);
    },
    _handleFindError:function(error){
      Notification.notify('user:find_error', error.data);
      console.error('UserModel : User find error')
    },

    // Create
    create:function(data) {
      UserService.create(data).then(this._handleCreateSuccess.bind(this),this._handleCreateError.bind(this));
    },
    _handleCreateSuccess:function(result){
      Notification.notify('user:create_success', result.data);
    },
    _handleCreateError:function(error){
      Notification.notify('user:create_error', error.data);
      console.error('UserModel : User create error')
    },

    // Update
    update:function(data) {
      UserService.update(data).then(this._handleUpdateSuccess.bind(this),this._handleUpdateError.bind(this));
    },
    _handleUpdateSuccess:function(result){
      Notification.notify('user:update_success', result.data);
    },
    _handleUpdateError:function(error){
      Notification.notify('user:update_error', error.data);
      console.error('UserModel : User update error')
    },

    // Remove
    remove:function(id) {
      UserService.remove(id).then(this._handleRemoveSuccess.bind(this),this._handleRemoveError.bind(this));
    },
    _handleRemoveSuccess:function(result){
      Notification.notify('user:remove_success', result.data);
    },
    _handleRemoveError:function(error){
      Notification.notify('user:remove_error', error.data);
      console.error('UserModel : User remove error')
    },
    
    // Error callback
    errorCallback: function(response){
      console.error(response);
    }
  };
}]);

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
