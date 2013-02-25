var fs = require('fs'),
  path = require('path'),
  url = require('url'),
  hljs = require('highlight.js'),
  marked = require('marked'),
  moment = require('moment'),
  yaml = require('js-yaml');

/*global module:false*/
module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json'),
    oldOutputLink = marked.InlineLexer.prototype.outputLink,
    baseUrl = pkg.url,
    markedLexer;

  marked.setOptions({
    gfm: true,
    breaks: false
  });

  marked.InlineLexer.prototype.outputLink = function(cap, link) {
    link.href = formatUrl(link.href);

    return oldOutputLink.call(this, cap, link);
  }

  markedLexer = new marked.Lexer();

  function formatUrl(uri) {
    return (url.parse(uri).protocol == undefined)
      ? url.resolve(baseUrl, uri)
      : uri;
  }

  function translateMarkdown(md, base) {
    baseUrl = base || pkg.url;

    var tokens = markedLexer.lex(md);

    return marked.parser(tokens);
  }


  function labotomize(content) {
    var result = content.match(/^-{3,}\s([\s\S]*?)-{3,}(\s[\s\S]*|\s?)$/),
      metadata = {},
      markdown;

    if(result && result.length === 3) {
      metadata = yaml.load(result[1]);
      markdown = result[2];
    } else {
      markdown = content;
    }

    return {
      metadata: metadata,
      markdown: markdown
    };
  }

  var _ = grunt.util._,
    topLevelPages = _(grunt.file.expand({ cwd: 'contents', filter: 'isFile' }, '*.md'))
      .map(function (topLevelPage) {
        var content = grunt.file.read(path.resolve('./contents/') + '/' + topLevelPage),
          doc = labotomize(content);

        return _.extend(doc.metadata, {
          name: path.basename(topLevelPage, '.md'),
          path: topLevelPage,
          page: {
            html: translateMarkdown(doc.markdown)
          }
        });
      }),
    articles = _(grunt.file.expand({ cwd: 'contents/articles', filter: 'isDirectory'}, '*'))
      .chain()
      .map(function (articleDirectory) {
        var content = grunt.file.read(path.resolve('./contents/articles', articleDirectory) + '/index.md'),
          doc = labotomize(content),
          date = new Date(doc.metadata.date),
          relativeUrl = '/articles/' + articleDirectory + '/',
          fullUrl = url.resolve(pkg.url, relativeUrl),
          html = translateMarkdown(doc.markdown, fullUrl),
          breakpoint = html.indexOf('<span class="more') || html.indexOf('<h2') || html.indexOf('<hr'),
          intro = html,
          hasMore = false;

          if(breakpoint !== -1) {
            intro = html.substr(0, breakpoint);
            hasMore = true;
          }

        return _.extend(doc.metadata, {
          date: date,
          path: articleDirectory,
          intro: intro,
          hasMore: hasMore,
          page: {
            html: html,
            title: doc.metadata.title
          },
          url: relativeUrl,
          fullUrl: fullUrl
        });
      })
      .sortBy(function(item) {
        return -item.date
      })
      .value();


  var jadeTarget = {};

  _.forEach(topLevelPages, function(page) {
    var files = {};

    files['build/' + page.name + '.html'] = ['templates/' + page.template ];

    _.defaults(page,
      pkg,
      {
        articles: articles,
        _: _,
        moment: moment
      });

    jadeTarget[page.name] = {
      options: {
        pretty: true,
        data: page
      },
      files: files
    };
  });

  _.forEach(articles, function(article) {
    var files = {};

    files['build/articles/' + article.path + '/index.html'] = ['templates/' + article.template ];

    _.defaults(article,
      pkg,
      {
        _: _,
        moment: moment,
        listArticles: function() {
          return articles;
        }
      });

    jadeTarget[article.path] = {
      options: {
        pretty: true,
        data: article
      },
      files: files
    };
  });

  _.forEach(grunt.file.expand({ cwd: 'contents', filter: 'isFile' }, '*.json'), function(jsonFile) {
    var obj = grunt.file.readJSON(path.resolve('./contents') + '/' + jsonFile),
      files = {},
      jsonPage = _.defaults({
          articles: articles,
          _: _,
          moment: moment
        },
        pkg);

    files['build/' + obj.filename ] = ['templates/' + obj.template ];

    jadeTarget[jsonFile] = {
      options: {
        pretty: true,
        data: jsonPage
      },
      files: files
    };
  });

  grunt.initConfig({
    pkg: pkg,
    clean: {
      default: ['build/*', '!build/.git']
    },
    copy: {
      default: {
        files: [
          { expand: true, cwd: 'contents/', src: ['CNAME', '**/*.pdf', '**/*.jpg', '**/*.png'], dest: 'build/' },
          { expand: true, cwd: 'contents/js/', src: ['**'], dest: 'build/js/' }
        ]
      }
    },
    jade: jadeTarget,
    stylus: {
      compile: {
        options: {
          compress: true,
          paths: ['contents/css']
        },
        files: {
          'build/css/all.css': [
            'contents/css/normalize.css',
            'contents/css/H5BP.css',
            'contents/css/all.styl']
        }
      }
    },
    jquerytransform: {
      files: ['build/**/*.html'],
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
          var $this = $(this),
            language = $this.attr('class'),
            // Sad hack to prevent highlight.js double-encoding entities
            code = $this.html().replace(/&amp;/gm, '&').replace(/&lt;/gm, '<').replace(/&gt;/gm, '>');

          return '<code class="' + language + '">' + hljs.highlight(language, code).value + '</code>';
        });
      }
    },

    // Prod-ifying
    hashres: {
      options: {
        fileNameFormat: '${name}.${ext}?${hash}',
        renameFiles: false
      },
      prod: {
        src: ['build/css/all.css'],
        dest: 'build/**/*.html'
      }
    },

    // Meta
    regarde: {
      contents: {
        files: 'contents/**',
        events: false,
        spawn: true,
        tasks: [ 'default' ]
      }, 
      jadeTemplates: {
        files: 'templates/*.jade',
        events: false,
        spawn: true,
        tasks: [ 'jade' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-jquerytransform');
  grunt.loadNpmTasks('grunt-regarde');

  grunt.registerTask('default', ['clean', 'copy', 'jade', 'stylus', 'hashres', 'jquerytransform']);
  grunt.registerTask('dev', ['default', 'regarde']);
};