module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'dist/bundle.js': ['js/modernizr.custom.js', 'js/jquery.min.js', 'js/*.js']
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/bundle.css': ['css/*.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyURLs: true,
          minifyJS: true
        },
        files: {
          'dist/index.html': './index.html',
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          src: ['fonts/*', 'php/*', 'img/*'],
          dest: 'dist'
        }],
      },
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['css/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['index.html'],
        tasks: ['htmlmin'],
        options: {
          spawn: false
        }
      },
      files: {
        files: ['fonts/*', 'php/*', 'img/*'],
        tasks: ['copy'],
        options: {
          spawn: false
        }
      }
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

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'htmlmin', 'copy']);
  grunt.registerTask('dev', ['default', 'connect', 'watch']);

};
