// use h5bp not grunt

var fs = require('fs'),
  path = require('path'),
  hljs = require('highlight.js');

/*global module:false*/
module.exports = function(grunt) {


  grunt.initConfig({
    // pkg: grunt.file.readJSON('package.json'),
    css: {
      'css/styles.css': ['css/all.css']
    },
    rev: {
      css: 'css/styles.css'
    },
    usemin: {
      html: ['*.html', 'articles/**/*.html']
    },
    jquerytransform: {
      files: ['*.html', 'articles/**/*.html'],
      transform: function($) {
        // For styling bullet separate from text
        $('.content li').wrapInner('<span />');

        // Make headings be link-targetable
        $('.content h1, .content h2, .content h3, .content h4, .content h5, .content h6')
          .wrapInner(function() {
            return '<a name="' + $(this).text() + '" />';
          });

        // Syntax highlighting
        $('.codelisting pre code').replaceWith(function() {
          var language = $(this).attr('class'),
            // Sad hack to prevent highlight.js double-encoding entities
            code = $(this).html().replace(/&amp;/gm, '&').replace(/&lt;/gm, '<').replace(/&gt;/gm, '>');

          return '<code class="' + language + '">' + hljs.highlight(language, code).value + '</code>';
        });
      }
    }
  });

  grunt.loadNpmTasks('grunt-jquerytransform');
  grunt.loadTasks('grunt-tasks');

  grunt.registerTask('default', ['css', 'rev', 'usemin', 'jquerytransform']);
};