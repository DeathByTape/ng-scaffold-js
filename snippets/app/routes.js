/*
  ----------------------------------------------------------------------
                            ROUTES
  ----------------------------------------------------------------------
  1. Define your routes here.
  2. If your app does not have routes , simple export an empty object
      @example
        module.exports = {}
 */
var routeMap;

routeMap = [
  {
    url: '/',
    templateUrl: "welcome.html",
    controller: 'welcomeCtrl'
  }
];

module.exports = routeMap;
