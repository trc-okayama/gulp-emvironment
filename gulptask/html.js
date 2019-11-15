'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const using = require('gulp-using');
const cache = require('gulp-cached');
const htmlmin = require('gulp-htmlmin');
const dest = {
  root: 'dest/',
  html: 'dit/**/*.html',
  css: 'dest/**/*.css',
  js: 'dest/**/*.js',
  img: 'dest/**/*.+(gif|png|jpg|svg)'
}
const src = {
  root: 'src/',
  html: ['src/**/*.html', 'src/**/*.pug'],
  css: 'src/**/*.scss',
  js: 'src/**/*.js',
  img: 'src/**/*.+(gif|png|jpg|svg)'
}
const plumberWithNotify = () => plumber({ errorHandler: notify.onError('<%= error.message %>') });

function html() {
  return gulp
    .src(src.html)
    .pipe(plumberWithNotify())
    .pipe(cache('html'))
    .pipe(using())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        preserveLineBreaks: true
      })
    )
    .pipe(gulp.dest(dest.root))
    .pipe(notify('HTML task complete'))
}
exports.html = html;