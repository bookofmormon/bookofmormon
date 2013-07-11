
// main client-side script

var request = require('superagent')
  , angular = require('angularjs')
  , settings = require('settings')('bookofmormon')
  , angularSettings = require('angular-settings')
  // , breadcrumb = require('breadcrumb')
  , dialog = require('dialog')

  , defaultSettings = require('./settings')
  , app = require('./angular')
  , pages = require('./pages');
  // , oauth = require('./oauth');

settings.config(defaultSettings);

function showError(err) {
  console.error(err);
  dialog('Page Error', 'Sorry, an error occurred on the page. Please refresh.')
    .addClass('error-modal')
    .modal()
    .show();
}

function toCamelCase(title) {
  return title[0].toLowerCase() + title.slice(1);
}

app.controller('NavController', function ($scope, $location) {
  $scope.activeItem = function (item) {
    var path = $location.path();
    if (item.path === path) return true;
    if (item.match && path.indexOf(item.path) === 0) {
      return true;
    }
    return false;
  };
  $scope.subNav = pages.subNav;
});

app.filter('eq', function () {
  return function (input, one, two) {
    var good = [];
    for (var i=0; i<input.length; i++) {
      if (input[i][one] == two) good.push(input[i]);
    }
    return good;
  };
});

var lanes = [{
      id: 0, title: 'Prophet'
    }, {
      id: 1, title: 'Event'
    }, {
      id: 2, title: 'Writer'
    }, {
      id: 3, title: 'Reference'
    }, {
      id: 4, title: 'Date'
    }, {
      id: 5, title: 'Place'
    }];

var laneNames = [];
for (var i=0; i<lanes.length; i++) {
  laneNames.push(lanes[i].title);
}

var mainControllers = {

  Author: function ($scope) {
    $scope.scopes = ['all', 'book', 'chapter', 'verse'];
    $scope.lanes = lanes;
    $scope.laneNames = laneNames;
    $scope.items = [];

    request.get('/api/list', function (err, res) {
      if (err) return showError('Failed to get items');
      if (res.body.error) return showError(res.body.error);
      $scope.items = res.body.items;
      $scope.$digest();
    });
      
    // new item
    clear();

    $scope.add = function () {
      var attrs = ['start', 'end', 'title', 'description', 'lane', 'scope'];
      var item = {};
      for (var i=0; i<attrs.length; i++) {
        item[attrs[i]] = $scope[attrs[i]];
      }
      request.post('/api/add').send(item).end(function (err, res) {
        if (err) return showError('Failed add: ' + err);
        if (res.body.error) return showError('Failed to add: ' + res.body.error);
        $scope.items.push(res.body.item);
        clear();
        $scope.$digest();
      });
    };
    $scope.ref = function (id) {
      if (!id) return '[no ref]';
    };
    function clear() {
      $scope.start = null;
      $scope.end = null;
      $scope.title = '';
      $scope.description = '';
      $scope.lane = 0;
      $scope.scope = $scope.scopes[0];
    }
  }

};

for (var key in pages.routes) {
  app.addRoute(key,
               toCamelCase(pages.routes[key]) + '.html',
               mainControllers[pages.routes[key]]);
}

app.run(function () {
});

