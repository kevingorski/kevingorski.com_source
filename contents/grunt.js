// use h5bp not grunt

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    'min': {
      'js/scripts.js': ['js/*.js']
    },
    'css': {
      'css/styles.css': ['css/all.css']
    },
    'uglify': {},
    'rev': {
      js: 'js/scripts.js',
      css: 'css/styles.css'
    },
    'usemin': {
      html: ['*.html', 'articles/**/*.html']
    },
    'jquerytransform': {
      files: ['*.html', 'articles/**/*.html'],
      transform: function($) {
        // For styling bullet separate from text
        $('.content li').wrapInner('<span />');

        // Make headings be link-targetable
        $('.content h1, .content h2, .content h3, .content h4, .content h5, .content h6')
          .wrapInner(function() {
            return '<a name="' + $(this).text() + '" />';
          }).append(function() {
            return '<a class="section" href="#' + $(this).text() + '">&sect;</a>';
          });
      }
    }
  });

  grunt.loadNpmTasks('grunt-jquerytransform');

  // Default task.
  grunt.registerTask('default', 'min css rev usemin jquerytransform');
};
