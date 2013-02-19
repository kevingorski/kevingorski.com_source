var fs = require('fs'),
  path = require('path'),
  cleanCSS = require('clean-css'),
  rjs = require('requirejs'),
  crypto = require('crypto'),
  lib = require('grunt-lib-contrib');

module.exports = function(grunt) {
  // **css* task works pretty much the same as grunt's min task. The task
  // target is the destination, data is an array of glob patterns. These
  // files are concataned and run through requirejs optimizer to handle
  // @import inlines in CSS files.
  grunt.task.registerMultiTask('css', 'Concats, replaces @imports and minifies the CSS files', function() {
    // css files for this subtarget destination
    var files = this.data;

    // subtarget name is the output destination
    var target = this.target;

    // async task
    var cb = this.async();

    // write the destination css, a simple concat of the original files
    // without compression
    grunt.file.write(target, mincss(files, {
      nocompress: true
    }));

    // replace @import statements
    //
    // XXX no error handling in this helper so far..
    // Check that rjs returns an error when something wrong (if it throws...)
    // if it is bubble the error back here
    rjsOptimizeCss(target, function() {
      // do the minification once inline imports are done
      grunt.log.write('Writing css files to ' + target + '...');
      grunt.file.write(target, mincss(target));
      grunt.log.ok();
      cb();
    });
  });

  //
  // **mincss** basic utility to concat CSS files and run them through
  // [cleanCSS](https://github.com/GoalSmashers/clean-css), might opt to use
  // [https://github.com/jzaefferer/grunt-css] plugin.
  //
  function mincss(files, o) {
    o = o || {};
    files = grunt.file.expand({ filter: '' }, files);
    return files.map(function(filepath) {
      var content = grunt.file.read(filepath);
      return o.nocompress ? content : cleanCSS.process(content);
    }).join('');
  };

  // **rjs:optimize:css** is an helper using rjs to optimize a single file,
  // mainly to properly import multi-level of @import statements, which can be
  // tricky with all the url rewrites.
  //
  // file     - Path to the css file to optimize
  // options  - (optional) rjs configuration
  // cb       - callback function to call on completion
  function rjsOptimizeCss(file, options, cb) {
    if(!cb) { cb = options; options = {}; }
    options.cssIn = file;
    options.out = options.out || file;
    options.optimizeCss = 'standard.keepComments.keepLines';
    var before = grunt.file.read(file);
    rjs.optimize(options, function() {
      cb();
    });
  };



  // rev task - reving is done in the `output/` directory
  grunt.registerMultiTask('rev', 'Automate the hash renames of assets filename', function() {
    hash(this.data);
  });

  // **hash** helper takes care of files revving, by renaming any files
  // in the given `files` pattern(s), with passed in `options`.
  //
  // - files      - String or Array of glob pattern
  // - options    - (optional) An Hash object where:
  //    - cwd     - Base directory to work from, glob patterns are
  //                prepended to this path.
  //
  function hash(files, opts) {
    opts = opts || {};

    files = Array.isArray(files) ? files : [files];
    grunt.file.expand(files).forEach(function(f) {
      var md5 = md5Helper(f),
        renamed = [md5.slice(0, 8), path.basename(f)].join('.');

      grunt.verbose.ok().ok(md5);
      // create the new file
      fs.renameSync(f, path.resolve(path.dirname(f), renamed));
      grunt.log.write(f + ' ').ok(renamed);
    });
  };


  // **md5** helper is a basic wrapper around crypto.createHash, with
  // given `algorithm` and `encoding`. Both are optional and defaults to
  // `md5` and `hex` values.
  function md5Helper(filepath, algorithm, encoding) {
    algorithm = algorithm || 'md5';
    encoding = encoding || 'hex';
    var hash = crypto.createHash(algorithm);
    hash.update(grunt.file.read(filepath));
    grunt.log.verbose.write('Hashing ' + filepath + '...');
    return hash.digest(encoding);
  };



//
// ### Usemin Task
//
// Replaces references ton non-optimized scripts / stylesheets into a
// set of html files (or any template / views).
//
// Right now the replacement is based on the filename parsed from
// content and the files present in accoding dir (eg. looking up
// matching revved filename into `intermediate/` dir to know the sha
// generated).
//
// Todo: Use a file dictionary during build process and rev task to
// store each optimized assets and their associated sha1.
//
// Thx to @krzychukula for the new, super handy replace helper.
//


  var linefeed = grunt.util.linefeed,
    usemin = {
      helper: function(content, block, target, type) {
        target = target || 'replace';
        return usemin[type](content, block, target);
      },

      css: function(content, block, target) {
        var indent = (block.split(linefeed)[0].match(/^\s*/) || [])[0];
        return content.replace(block, indent + '<link rel="stylesheet" href="' + target + '">');
      },

      js: function(content, block, target) {
        var indent = (block.split(linefeed)[0].match(/^\s*/) || [])[0];
        return content.replace(block, indent + '<script src="' + target + '"></script>');
      },

      pre: {
        // usemin:pre:* are used to preprocess files with the blocks and directives
        // before going through the global replace
        html: function(content) {
          // XXX extension-specific for get blocks too.
          //
          // Eg. for each predefined extensions directives may vary. eg <!--
          // directive --> for html, /** directive **/ for css
          var blocks = getBlocks(content);

          // handle blocks
          Object.keys(blocks).forEach(function(key) {
            var block = blocks[key].join(linefeed),
              parts = key.split(':'),
              type = parts[0],
              target = parts[1];

            content = usemin.helper(content, block, target, type);
          });

          return content;
        }
      },
      post: {
        css: function(content) {
          grunt.log.writeln('Update the CSS with new img filenames');
          content = replace(content, /url\(\s*['"]([^"']+)["']\s*\)/gm);

          grunt.log.verbose.writeln('Update the CSS with background imgs, case there is some inline style');
          content = replace(content, /url\(\s*['"]?([^'"\)]+)['"]?\s*\)/gm);

          return content;
        },
        html: function(content) {
          grunt.log.verbose.writeln('Update the HTML to reference our concat/min/revved script files');
          content = replace(content, /<script.+src=['"](.+)["'][\/>]?><[\\]?\/script>/gm);
          content = replace(content, /<script.+data-main=['"](.+)["'].*src=.*[\/>]?><[\\]?\/script>/gm);

          if (grunt.config('rjs.almond')) {
            content = content.replace(/<script.+data-main=['"](.+)["'].*src=.*[\/>]?><[\\]?\/script>/gm, function(match, src) {
              var res = match.replace(/\s*src=['"].*["']/gm, '').replace('data-main', 'src');
              grunt.log.ok('almond')
                .writeln('was ' + match)
                .writeln('now ' + res);
              return res;
            });
          }

          grunt.log.verbose.writeln('Update the HTML with the new css filenames');
          content = replace(content, /<link rel=["']?stylesheet["']?\shref=['"](.+)["']\s*>/gm);

          grunt.log.verbose.writeln('Update the HTML with the new img filenames');
          content = replace(content, /<img[^\>]+src=['"]([^"']+)["']/gm);

          grunt.log.verbose.writeln('Update the HTML with background imgs, case there is some inline style');
          content = replace(content, /url\(\s*['"]([^"']+)["']\s*\)/gm);

          return content;
        }

      }
    };

  grunt.registerMultiTask('usemin', 'Replaces references to non-minified scripts / stylesheets', function() {

    var name = this.target,
      data = this.data,
      files = grunt.file.expand(data);

    files.map(grunt.file.read).forEach(function(content, i) {
      var p = files[i];

      grunt.log.subhead('usemin - ' + p);

      // make sure to convert back into utf8, `file.read` when used as a
      // forEach handler will take additional arguments, and thus trigger the
      // raw buffer read
      content = content.toString();

      // ext-specific directives handling and replacement of blocks
      if(!!usemin.pre[name]) {
        content = usemin.pre[name](content);
      }

      // actual replacement of revved assets
      if(!!usemin.post[name]) {
        content = usemin.post[name](content);
      }

      // write the new content to disk
      grunt.file.write(p, content);
    });

  });




  //
  // global replace handler, takes a file content a regexp to macth with. The
  // regexp should capture the assets relative filepath, it is then compared to
  // the list of files on the filesystem to guess the actual revision of a file
  //
  function replace(content, regexp) {
    return content.replace(regexp, function(match, src) {
      //do not touch external files
      if(src.match(/\/\//)) return match;
      var basename = path.basename(src);
      var dirname = path.dirname(src);

      // XXX files won't change, the filepath should filter the original list
      // of cached files.
      var filepath = grunt.file.expand(path.join('**/*') + basename)[0];

      // not a file in intermediate, skip it
      if(!filepath) return match;
      var filename = path.basename(filepath);
      // handle the relative prefix (with always unix like path even on win32)
      filename = [dirname, filename].join('/');

      // if file not exists probaly was concatenated into another file so skip it
      if(!filename) return '';

      var res = match.replace(src, filename);
      // output some verbose info on what get replaced
      grunt.log
        .ok(src)
        .writeln('was ' + match)
        .writeln('now ' + res);

      return res;
    });
  };

  // start build pattern --> <!-- build:[target] output -->
  var regbuild = /<!--\s*build:(\w+)\s*(.+)\s*-->/;

  // end build pattern -- <!-- endbuild -->
  var regend = /<!--\s*endbuild\s*-->/;


  //
  // Returns an hash object of all the directives for the given html. Results is
  // of the following form:
  //
  //     {
  //        'css/site.css ':[
  //          '  <!-- build:css css/site.css -->',
  //          '  <link rel="stylesheet" href="css/style.css">',
  //          '  <!-- endbuild -->'
  //        ],
  //        'js/head.js ': [
  //          '  <!-- build:js js/head.js -->',
  //          '  <script src="js/libs/modernizr-2.5.3.min.js"></script>',
  //          '  <!-- endbuild -->'
  //        ],
  //        'js/site.js ': [
  //          '  <!-- build:js js/site.js -->',
  //          '  <script src="js/plugins.js"></script>',
  //          '  <script src="js/script.js"></script>',
  //          '  <!-- endbuild -->'
  //        ]
  //     }
  //
  function getBlocks(body) {
    var lines = body.replace(/\r\n/g, '\n').split(/\n/),
      block = false,
      sections = {},
      last;

    lines.forEach(function(l) {
      var build = l.match(regbuild),
        endbuild = regend.test(l);

      if(build) {
        block = true;
        sections[[build[1], build[2].trim()].join(':')] = last = [];
      }

      // switch back block flag when endbuild
      if(block && endbuild) {
        last.push(l);
        block = false;
      }

      if(block && last) {
        last.push(l);
      }
    });

    return sections;
  }
}