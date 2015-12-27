'use strict';

var gulp = require('gulp');

var assign = Object.assign || require('object.assign')
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var del = require('del');
var jsmin = require('gulp-uglify');
var lint = require('gulp-eslint');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var vinylPaths = require('vinyl-paths');

var babelOptions = {
  modules: 'es6',
  moduleIds: false,
  comments: false,
  compact: false,
  stage: 2
};

var devDependencies = {
  js: [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/dist/js/bootstrap.js',
    './bower_components/angular/angular.js',
    './bower_compontents/underscore/underscore.js'
  ],
  css: [
    './bower_components/bootstrap/dist/css/bootstrap.css'
  ],
  fonts: [
    './bower_components/bootstrap/dist/fonts/*.*'
  ]
};

gulp.task('dependencies', function() {
  var js = gulp.src(devDependencies.js)
    .pipe(gulp.dest('./client/js/vendor'));
    
  var css = gulp.src(devDependencies.css)
    .pipe(gulp.dest('./client/css/vendor'));
    
  var font = gulp.src(devDependencies.fonts)
    .pipe(gulp.dest('./client/css/fonts'));
  
  return merge(js, css, font);
});

gulp.task('clean', function() {
  return gulp.src('./client/dist/')
    .pipe(vinylPaths(del));
});

gulp.task('build', function() {
  return gulp.src(['./client/js/app.js', './client/js/services/*.js', './client/js/directives/*.js'])
    .pipe(concat('app.js'))
    //.pipe(babel(assign({}, babelOptions, { modules: 'common' })))
    .pipe(gulp.dest('./client/dist/'));
});

gulp.task('lint', function() {
  return gulp.src('./client/dist/*.js')
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failOnError());
});

gulp.task('minify-js', function() {
  return gulp.src('./dist/*.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-css', function() {
  return gulp.src('./dist/*.css')
    .pipe(cssmin({ keepSpecialComments: 0 }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', function(callback) {
  return runSequence(
    'dependencies',
    'clean',
    'build',
    'lint',
    //'sass',
    callback
  );
});

gulp.task('production', function(callback) {
  return runSequence(
    'clean',
    'build',
    //'sass',
    ['minify-js', 'minify-css'],
    callback
  );
});
