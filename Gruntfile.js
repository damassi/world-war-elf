/**
 * Development tasks
 *
 * @author  Christopher Pappas
 * @date    11.18.13
 *
 * Primary Tasks:
 *   run    :  Development mode, file-watcher
 */


module.exports = function( grunt ) {

  var handleify = require('handleify');
  var uglify    = require("uglify-js");


  grunt.initConfig({


    // + ---------------------------------------------


    basePath : '.',
    sources  : '<%= basePath %>',
    frontend : '<%= basePath %>/client-side',
    output   : '<%= basePath %>/.tmp/public',
    dist     : '<%= basePath %>/www',
    port     : 3001,


    // + ---------------------------------------


    //
    // Compile JavaScript using browserify
    //

    'browserify2': {

      compile: {
        entry: [ '<%= frontend %>/javascripts/initialize.js'],
        compile: '<%= output %>/assets/javascripts/app.js',

        beforeHook: function( bundle ) {
          bundle.transform( handleify )
        },

        debug: true
      },

      mobile: {
        entry: [ '<%= frontend %>/javascripts/mobile/initialize.js'],
        compile: '<%= output %>/assets/javascripts/mobile.js',

        beforeHook: function( bundle ) {
          bundle.transform( handleify )
        },

        debug: true
      },

      dist: {
        entry: [ '<%= frontend %>/javascripts/initialize.js'],
        compile: '<%= output %>/assets/javascripts/app.js',
        debug: false,

        beforeHook: function( bundle ) {
          bundle.transform( handleify )
        },

        afterHook: function(src){
          var result = uglify.minify(src, {fromString: true});
          return result.code;
        }
      },

      dist_mobile: {
        entry: [ '<%= frontend %>/javascripts/mobile/initialize.js'],
        compile: '<%= output %>/assets/javascripts/mobile.js',
        debug: false,

        beforeHook: function( bundle ) {
          bundle.transform( handleify )
        },

        afterHook: function(src){
          var result = uglify.minify(src, {fromString: true});
          return result.code;
        }
      },
    },


    //
    // Concatinate all vendor files into a single source
    //

    'concat': {

      options: {
        separator: ';'
      },

      vendor: {
        src: [
          '<%= frontend %>/vendor/scripts/jquery-2.0.3.js',
          '<%= frontend %>/vendor/scripts/lodash.js',
          '<%= frontend %>/vendor/scripts/backbone.js',
          '<%= frontend %>/vendor/scripts/backbone.mods.js',
          '<%= frontend %>/vendor/scripts/createjs-2013.09.25.min.js',
          '<%= frontend %>/vendor/scripts/jquery.qrcode.min.js',
          '<%= frontend %>/vendor/scripts/greensock/TweenMax.js',
          '<%= frontend %>/vendor/scripts/greensock/easing/EasePack.js',
          '<%= frontend %>/vendor/scripts/greensock/plugins/GreenProp.js',
          '<%= frontend %>/vendor/scripts/greensock/plugins/CSSPlugin.js',
          '<%= frontend %>/vendor/scripts/greensock/plugins/EaselPlugin.js',
          '<%= frontend %>/vendor/scripts/greensock/plugins/BezierPlugin.js',
          '<%= frontend %>/vendor/scripts/greensock/plugins/ThrowPropsPlugin.min.js',
          '<%= frontend %>/vendor/scripts/greensock/utils/Draggable.js',
        ],

        dest: '<%= output %>/assets/javascripts/vendor.js'
      }
    },


    //
    // Launch server watcher as well as client-side watchers
    //

    'concurrent': {
      dev: {
        tasks: [
          'nodemon',
          'default'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },



    //
    // Copy asset and vendor files to public
    //

    'copy': {

      images: {
        files: [
          {
            expand: true,
            cwd: '<%= frontend %>/',
            src: ['favicon.ico'],
            dest: '<%= output %>/assets/'
          },
          {
            expand: true,
            cwd: '<%= frontend %>/images/',
            src: [
              '**'
            ],
            dest: '<%= output %>/assets/images/'
          }
        ]
      },

      audio: {
        files: [
          {
            expand: true,
            cwd: '<%= frontend %>/audio/',
            src: ['**'],
            dest: '<%= output %>/assets/audio/'
          }
        ]
      },

      sails: {
        files: [{
          expand: true,
          cwd: '<%= frontend %>/vendor/scripts/sails',
          src: ['**'],
          dest: '<%= output %>/assets/javascripts/'
        }]
      },

      webfonts: {
        files: [
          {
            expand: true,
            cwd: '<%= frontend %>/webfonts/',
            src: ['**'],
            dest: '<%= output %>/assets/webfonts/'
          }
        ]
      },

      dist: {
        files:[{
          expand: true,
          cwd: '<%= output %>',
          src:['**'],
          dest: '<%= dist %>'
        }]
      }
    },



    //
    // Clean client-facing directories
    //

    'clean': {

      output: {
        files: [{
          expand: true,
          cwd: '<%= output %>/',
          src: ['**']
        }]
      },

      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= dist %>',
            src: ['**']
          }
        ]
      }
    },



    //
    // Add the livereload server
    //

    'livereload': {
      port: 35727
    },



    //
    // Automatically restart server on source changes
    //

    'nodemon': {
      dev: {
        options: {
          file: '<%= sources %>/app.js',
          //args: ['production'],
          //nodeArgs: ['--debug-brk'],
          ignoredFiles: [
            'README.md',
            'node_modules/*',
            'client-side/*',
            'views/*',
            '/.tmp/*',
            '/.git/*',
            '/.tmp/*',
            '/.sass-cache/*',
            '/.tmpassets/*'
          ],
          watchedExtensions: ['js'],
          delayTime: .5,
          env: {
            PORT: '3000'
          }
        }
      }
    },



    //
    // Compile sass files to css
    //

    'sass': {

      compile: {
        options: {
          compass: false,
          style: "expanded",
          debugInfo: true
        },

        files: [{
          src: [
            '<%= frontend %>/styles/app.scss'
          ],
          dest: '<%= output %>/assets/styles/app.css'
        }]
      },

      vendor: {
        options: {
          compass: false,
          style: "expanded",
          debugInfo: false
        },

        files: [{
          src: [

          ],
          dest: '<%= output %>/assets/styles/vendor.css'
        }]
      },

      dist: {
        options: {
          debugInfo: false,
          style: "compressed",
        },

        files: [{
          src: '<%= sources %>/styles/app.sass',
          dest: '<%= output %>/assets/styles/app.css'
        }]
      }
    },


    //
    // Watch server files and tests
    //

    'watch': {
      options: {
        livereload: '<%= port %>'
      },

      tests: {
        files: [ 'test/**' ],
        tasks: [ 'tests' ]
      },

      images: {
        files: '<%= frontend %>/images/**',
        tasks: ['copy:images']
      },

      audio: {
        files: '<%= frontend %>/audio/**',
        tasks: ['copy:audio']
      },

      javascripts: {
        files: '<%= frontend %>/javascripts/**/*',
        tasks: ['browserify2:compile', 'browserify2:mobile']
      },

      styles: {
        files: '<%= frontend %>/styles/**/*',
        tasks: ['sass:compile']
      },

      vendor: {
        files: '<%= frontend %>/vendor/**/*.js',
        tasks: ['concat:vendor']
      }
    },


    //
    // Compress and minify files
    //

    'uglify': {

      vendor: {
        src: '<%= output %>/assets/javascripts/vendor.js',
        dest: '<%= output %>/assets/javascripts/vendor.js'
      }
    }


  })


  // + ---------------------------------------


  grunt.registerTask( 'run', [
    'concurrent'
  ])

  grunt.registerTask( 'default', [
    'compileAssets',
    'watch'
  ])

  grunt.registerTask( 'compileAssets', [
    'clean:output',
    'copy:images',
    'copy:audio',
    'copy:sails',
    'copy:webfonts',
    'browserify2:compile',
    'browserify2:mobile',
    'sass:compile',
    'concat:vendor'
  ])

  grunt.registerTask( 'build', [
    'clean:output',
    'copy:images',
    'copy:audio',
    'copy:sails',
    'copy:webfonts',
    'browserify2:dist',
    'browserify2:dist_mobile',
    'sass:dist',
    'concat:vendor',
    'uglify'
  ])


  // + ---------------------------------------


  // Load task dependencies via 'load-grunt-tasks'
  require('load-grunt-tasks')( grunt )


  // + ---------------------------------------


  grunt.option( 'stack', true );
  grunt.option( 'force', true );


}
