var routeMap;

routeMap = require('../routes.js');

module.exports = /* @ngInject */ function($routeProvider, $locationProvider) {
  angular.forEach(routeMap, function(route) {
    var url;
    if (typeof route.otherwise !== "undefined") {
      $routeProvider.otherwise({
        redirectTo: route.otherwise
      });
    } else {
      url = route.url;
      delete route.url;
      $routeProvider.when(url, route);
    }
  });
};

/** OR */

routeMap = require('../routes.js');

module.exports = /* @ngInject */ function($stateProvider, $urlRouterProvider) {
  angular.forEach(routeMap, function(route) {
    var state;
    if (typeof route.otherwise !== "undefined") {
      $urlRouterProvider.otherwise(route.otherwise);
    }
    state = route.url;
    if (route.state) {
      state = route.state;
      delete route.state;
    }
    $stateProvider.state(state, route);
  });
};
