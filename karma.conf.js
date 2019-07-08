// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', 'karma-typescript'],
      files: [
        "src/**/*.ts"
    ],
      preprocessors: {
          "src/**/*.ts": "karma-typescript"
      },
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage-istanbul-reporter'),
        require('karma-typescript')
      ],
      client: {
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      karmaTypescriptConfig: {
        compilerOptions: {
            target: "ES2015",
            lib: ["es5", "es6", "es2015", "dom"]
        }
    },
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, './coverage/projects'),
        reports: ['text-summary'], // 'html', 'lcovonly', 
        fixWebpackSourcePaths: true,
        thresholds: {
          statements: 80,
          lines: 80,
          branches: 80,
          functions:80
        }
      },
      reporters: ['progress', 'kjhtml', 'coverage-istanbul'], // 'karma-coverage-istanbul-reporter'
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      customLaunchers: {
        ChromeNoSandbox: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      },
      singleRun: false,
      restartOnFileChange: true
    });
  };
  