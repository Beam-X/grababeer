var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jade = require('gulp-jade');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');

var paths = {
  sass: ['./scss/**/*.scss'],
  jade: ['./jade/**/*.jade'],
  js: ['./js/**/*.js']
};

gulp.task('default', ['sass', 'jade', 'babel']);

function handleError(err){
  gutil.beep();
  console.log(err);
  this.emit('end');
}

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('jade', function (done) {
  gulp.src(paths.jade)
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(jade({locals: {}}))
    .pipe(gulp.dest('./www/templates/'))
    .on('end', done);
});

gulp.task('babel', function(done) {
  gulp.src(paths.js)
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./www/js/'))
    .on('end', done)
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.js, ['babel']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
