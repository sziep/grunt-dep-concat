// grunt-dep-concat
// https://github.com/tJener/grunt-dep-concat
//
// Copyright (c) 2013 Eric Li
// Licensed under the MIT license.

'use strict';

module.exports = function( grunt ) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    depconcat: {
      dist: {
        src: [ 'test/fixtures/*.js' ],
        dest: 'tmp/test.js',
        options: {
          basePath: 'test/fixtures/'
        }
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Unit tests.
    nodeunit: {
      tests: [ 'test/*_test.js' ]
    }
  });

  // Load local tasks.
  grunt.loadTasks( 'tasks' );

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask( 'test', [ 'clean', 'depconcat', 'nodeunit' ]);

  // By default, lint and run all tests.
  grunt.registerTask( 'default', [ 'jshint', 'test' ]);

};
