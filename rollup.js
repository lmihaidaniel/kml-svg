/* globals require */
//build related
var pkg = require('./package.json');
var gulp = require('gulp');
var rollup = require('rollup');
//js related
var babel = require('rollup-plugin-babel');
var uglify = require('uglify-js');
//css related
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var csswring = require('csswring');
var atImport = require('postcss-import');
var postcssFont = require('postcss-font-magician');
var cssnext = require('postcss-cssnext');
var precss = require('precss');
//sytem related
var fs = require('fs');

var config = {
  banner: '/*! ' + pkg.name + ' - v' + pkg.version + ' */',
  compile: {
    moduleName: 'kmlSvg',
    entry: 'lib/index.js', // Entry file
    plugins: [
      babel({
        exclude: 'node_modules/**',
        compact: true,
        presets: ['es2015-rollup'],
        plugins: [
            ['transform-es2015-classes', {
              loose: true
            }]
          ] // needed to add support to classes in <=ie10
      })
    ]
  }
};

var js_minify = function(entry) {
  var result = uglify.minify(entry, {
    fromString: true,
    mangle: true,
    options: {
      banner: '/*! ' + pkg.name + ' - v' + pkg.version + ' */'
    },
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true
    }
  });
  return result.code;
}

gulp.task('css', function() {
  var processors = [
    atImport,
    precss,
    postcssFont,
    //postcssFont({hosted: '../lib/fonts'}),
    cssnext({
      browsers: ['> 5%', 'last 2 versions', 'ie > 8', 'Firefox ESR', 'Opera 12.1']
    }),
    csswring
  ];
  return gulp.src('lib/index.sss')
    .pipe(postcss(processors))
    .pipe(sourcemaps.init())
    .pipe(concat(pkg.name+'.css'))
    .pipe(gulp.dest('./'))
    .pipe(sourcemaps.write())
    .on('end', function() {
      console.log(pkg.name + ' css created');
    });
});


gulp.task('compile', function() {
  rollup.rollup(config.compile)
    .then(function(bundle) {
      // Generate bundle + sourcemap
      let result = bundle.generate({
        // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
        format: 'iife',
        moduleName: config.compile.moduleName,
      });
      bundle.write({
        format: 'iife',
        moduleName: config.compile.moduleName,
        banner: config.banner,
        sourceMap: 'inline',
        sourceMap: true,
        dest: './' + pkg.name + '.js', // Exit file
      });
      fs.writeFileSync('./' + config.compile.moduleName + '.min.js', config.banner + '\n' + js_minify(result.code));
    }).then(function() {
      console.log(pkg.name + ' builded');
    }).catch(function(error) {
      console.log(error);
    });
});

gulp.task('watch', function() {
  gulp.watch('lib/*.sss', ['css']);
  gulp.watch('lib/*.js', ['compile']);
});

gulp.task('default', function() {
  gulp.start('compile');
  gulp.start('css');
  gulp.start('watch');
});

gulp.start('default');