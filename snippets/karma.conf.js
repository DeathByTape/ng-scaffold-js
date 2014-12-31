module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine','browserify'],
    files: [
    'bower_components/angular/angular.js',
    'app/app.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'tests/**/*.js'
    ],
    preprocessors: {
      'tests/**/*.js':['browserify'],
      'app/app.js': ['browserify']
    },
    plugins:[
    'karma-mocha-reporter',
    'karma-jasmine',
    'karma-browserify',
    'karma-chrome-launcher'
    ],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    browserify: {
      debug: true,
      transform:['debowerify','bulkify','deamdify','ng-browserify-transform']
    },
    singleRun: false
  });
};
