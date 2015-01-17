angular.module('app',[
  'ui.router',
  'ui.bootstrap',
])
.config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "modules/home/index.html"
    })
    .state('user', {
      url: "/user",
      templateUrl: "modules/user/views/index.html"
    })
    .state('cycle', {
      url: "/cycle",
      templateUrl: "modules/cycle/views/index.html"
    })
    .state('idea', {
      url: "/idea",
      templateUrl: "modules/idea/views/index.html"
    })
    .state('acceptance', {
      url: "/acceptance/:idea",
      templateUrl: "modules/acceptance/views/index.html"
    })
    .state('acceptanceIdeas', {
      url: "/acceptance",
      templateUrl: "modules/acceptance/views/ideas.html"
    });
}])
.run(['$http',function($http) {
  $http.defaults.headers.common['X-Token'] = 'ee977806d7286510da8b9a7492ba58e2484c0ecc';
}])