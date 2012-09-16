/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    min: {
      'js/scripts.js': ['js/*.js']
    },
    css: {
      'css/styles.css': ['css/all.css']
    },
    uglify: {},
    rev: {
      js: 'js/scripts.js',
      css: 'css/styles.css'
    },
    usemin: {
      html: '**/*.html'
    }
  });

  // Default task.
  grunt.registerTask('default', 'min css rev usemin');

};
