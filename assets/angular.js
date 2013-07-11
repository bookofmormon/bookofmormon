
var routes = {}
  , settings = require('angular-settings')
  , request = require('superagent');

var app = module.exports = angular.module('bookofmormon', ['settings'])
  .config(['$routeProvider', '$locationProvider', function(route, location) {
    Object.keys(routes).forEach(function (path) {
      route.when(path, routes[path]);
    });
    route.otherwise({redirectTo: '/'});
    location.html5Mode(false);
  }]).run(function($location) {
    if (location.pathname !== '/')
      $location.path(location.pathname);
  });

app.addRoute = function (path, tpl, ctrl) {
  routes[path] = {
    templateUrl: tpl,
    controller: ctrl
  };
};

