/**
----------------------------------------------------------------------
                          NG CLI BOOT APP
----------------------------------------------------------------------

boot.js file will start your angular app.

What's going on ?

Extends your manual dependencies
Resolve initializers
Bootstrap angular app

*/
"use strict";

var boot, bulk, initAngularApp, initializers;

require("angular");

require("{{router}}");

require("angular-deferred-bootstrap");

bulk = require("bulk-require");

initAngularApp = function(hash, dependencies) {
  angular.element(document).ready(function() {
    deferredBootstrapper.bootstrap({
      element: document.body,
      module: "{@= app_name @}",
      injectorModules: dependencies,
      resolve: hash
    });
    return require("../app/hooks");
  });
};

initializers = bulk(__dirname, ["../app/initializers/*.js"]);

boot = function(dependencies) {
  var app, deps, identifier, injectorDependencies, mapHash, name, objectKeys, resolvesList, x;
  deps = ["{{modules}}"];
  if (typeof dependencies === "object") {
    deps = deps.concat(dependencies);
  }
  app = angular.module("{@= app_name @}", deps);
  mapHash = {};
  injectorDependencies = ["{@= app_name @}"];
  if (initializers !== undefined && Object.keys(initializers).length > 0 && typeof initializers[".."] !== "undefined" && typeof initializers[".."].app !== "undefined") {
    resolvesList = initializers[".."].app.initializers;
    objectKeys = Object.keys(resolvesList);
    x = 0;
    while (x < objectKeys.length) {
      identifier = objectKeys[x];
      name = resolvesList[identifier].provider;
      mapHash[name] = resolvesList[identifier].resolve;
      if (typeof resolvesList[identifier].dependencies !== "undefined") {
        injectorDependencies = injectorDependencies.concat(resolvesList[identifier].dependencies);
      }
      x++;
    }
  }
  initAngularApp(mapHash, injectorDependencies);
};

module.exports = boot;
