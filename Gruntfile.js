module.exports = function(grunt) {

  var appConfig = {
    sass: "assets/sass",
    images: "assets/images",
    dist: {
      css: "public/css",
      js: "public/js"
    },
    dev: {
      css: "public/css/dev",
      js: "public/js"
    }
  };


  grunt.initConfig({
    conf: appConfig,
    compass: {
      dist: {
        options: {
          config: "compass-config.rb",
          sassDir: "<%= conf.sass %>",
          cssDir: "<%= conf.dist.css %>",
          imagesDir: "<%= conf.images %>",
          relativeAssets: false,
          outputStyle: "compressed",
          environment: "production"
        }
      },
      dev: {
        options: {
          config: "compass-config.rb",
          sassDir: "<%= conf.sass %>",
          cssDir: "<%= conf.dev.css %>",
          imagesDir: "<%= conf.images %>",
          relativeAssets: false,
          outputStyle: "expanded",
          debugInfo: true
        }
      }
    },
    browserify: {
      dev: {
        src: ["./js/**.js"],
        dest: "public/js/app.js",
        options: {
          transform: ["reactify", "aliasify", "envify"],
          watch: true,
          keepAlive: true

        }
      },
      dist: {
        src: ["./js/**.js"],
        dest: "public/js/app.js",
        options: {
          transform: ["reactify", "aliasify", "envify"],
          watch: false,
          keepAlive: false
        }
      }
    },
    uglify: {
      options: {
        mangle:true,
        beautify:false,
        screwIE8: true,
        compress: {
          dead_code: true,
          drop_console: true
        }
      },
      dist: {
        files: {
          "<%= conf.dist.js %>/app.min.js":
          [
            "<%= conf.dist.js %>/app.js"
          ]
        }
      }
    },
    watch: {
      css: {
        files: ["**/*.scss"],
        tasks: ["compass:dev"]
      },
      livereload: {
        files: ["public/css/dev/*.css", "public/js/app.js", "public/js/bundle.js"],
        tasks: [],
        options: {
          livereload: true
        }
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ["watch", "browserify:dev"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-browserify");

  // Default task(s).
  grunt.registerTask("default", ["concurrent:dev"]);
  grunt.registerTask("dev", ["compass:dev", "browserify:dist"]);
  grunt.registerTask("dist", ["compass:dist", "browserify:dist", "uglify:dist"]);
};
