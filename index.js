/*jshint -W030 */
(function(){
  "use strict";

  var _ = require("underscore"),
  path = require("path"),
  fs = require("fs"),
  Promise = require("bluebird"),
  snippets = require("./snippets");

  var Hook = function(){};
  var hook = new Hook();

  Hook.prototype.suggestRouter = function(content,bower_object){
    content = content.split("/** OR */");
    if(bower_object.dependencies["angular-route"]){
      return content[0];
    }else if(bower_object.dependencies["angular-ui-router"]){
      return content[0];
    }
  },

  Hook.prototype.setBootRouter = function(content,bower_object){
    if(bower_object.dependencies["angular-route"]){
      content = content.replace("{{router}}","angular-route");
      content = content.replace("{{modules}}","ngRoute");
    }else if(bower_object.dependencies["angular-ui-router"]){
      content = content.replace("{{router}}","angular-ui-router");
      content = content.replace("{{modules}}","ui.router");
    }
    return content;
  },

  Hook.prototype.writeFiles = function(project_path,config){
    var defer = Promise.defer();
    var x = 0;
    var bower_object = config.get("bower_dependencies");
    _.each(snippets,function(content,filePath){
      filePath = filePath.replace("snippets/","");
      var fullPath = path.join(project_path,filePath);

      if(filePath === "app/hooks/config.js"){
        content = hook.suggestRouter(content,bower_object);
      }
      if(filePath === "core/boot.js"){
        content = hook.setBootRouter(content,bower_object);
      }

      fs.writeFile(fullPath,content,function(err){
        if(err){
          defer.reject(err);
        }else{
          x++;
          if(_.size(snippets) === x){
            defer.resolve("Created js scaffolding");
          }
        }
      });
    });
    return defer.promise;
  },

  Hook.prototype.init = function(output,ngconfig,args,config){
    var project_config = config.get("ngconfig");
    var defer = Promise.defer();
    if(args.command){
      if(project_config && _.size(project_config) > 0){
        if(project_config.preffered_coding_style.toLowerCase().replace(" ","") === "javascript"){
          var project_path = path.join(process.cwd(),args.command);

          hook.writeFiles(project_path,config)
          .then(function(success){
            defer.resolve(success);
          }).catch(function(err){
            defer.resolve(err);
          });
        }else{
          defer.resolve("Skipping js scaffolding as it is a coffeescript project");
        }
      }else{
        defer.reject("Unable to get project config, make sure you have initiated your project correctly.");
      }
    }else{
      defer.reject("Specify project name");
    }
    return defer.promise;
  };
  module.exports = hook;
}).call(this);
