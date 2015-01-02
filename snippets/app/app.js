/*
  Extends boot.js file inside core directory and initiates angular app
  --------------------------------------------------------------------
                            NOTICE
  --------------------------------------------------------------------
  To keep this file clean make sure you do not write any code inside
  it , and use it your imports only

  Extend your manual dependencies inside this file.

  For example :-
    require("angular-animate");
    require("some-other-module");
    boot(["angular-animate","some-other-module"]);
*/


var boot;

boot = require("../core/boot");

boot();


/*
   * Uncomment when you create validations
  require("./validations");
 */


/*
   * Uncomment when you create filters
  require("./filters");
 */


/*
   * Uncomment when you create factory
  require("./factories");
 */


/*
   * Uncomment when you write services
  require("./store");
 */


/*
   * Uncomment when you create directives
  require("./directives");
 */

require("./templates");

require("./controllers");
