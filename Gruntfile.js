module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  var path = 'src/invenio-trends-ui/';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      options: {
        watch: false,
        browserifyOptions: {
          debug: true
        },
        transform: [
          [
            "babelify",
            {
              presets: ['es2015'],
              plugins: [
                "transform-async-to-generator",
                "syntax-async-functions"
              ]
            }
          ]
        ]
      },
      dist: {
        files: {
          'dist/bundle.js': path + '*.js'
        }
      }
    },
    ngtemplates: {
      options: {
        htmlmin:  '<%= htmlmin.dist %>',
        module: 'invenio-trends'
      },
      app: {
        cwd: path + 'templates/',
        src: '**/*.html',
        dest: 'dist/templates.js'
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/bundle.css': [
            'node_modules/bootstrap-css/lib/*.css',
            'node_modules/nvd3/build/nv.d3.min.css',
            path + 'app.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': path + 'index.html'
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/bootstrap/dist/',
            src: 'fonts/*',
            dest: 'dist/'
          }
        ]
      },
    },
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      js: {
        files: path + '**/*.js',
        tasks: 'browserify'
      },
      css: {
        files: path + '**/*.css',
        tasks: 'cssmin'
      },
      html: {
        files: path + '*.html',
        tasks: 'htmlmin'
      },
      templates: {
        files: path + 'templates/**/*.html',
        tasks: 'ngtemplates'
      }/*,
       files: {
       files: ['fonts/*', 'img/*'],
       tasks: ['copy']
       }*/
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist'
        }
      }
    },
    clean: ['dist']
  });

  grunt.registerTask('default', ['clean', 'browserify', 'ngtemplates', 'cssmin', 'htmlmin', 'copy']);
  grunt.registerTask('dev', ['default', 'connect', 'watch']);

};
