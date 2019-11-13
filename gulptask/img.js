'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const using = require('gulp-using');
const cache = require('gulp-cached');
const imagemin = require('gulp-imagemin');
const dest = {
  root: 'dest/',
  html: 'dit/**/*.html',
  css: 'dest/**/*.css',
  js: 'dest/**/*.js',
  img: 'dest/**/*.+(gif|png|jpg|svg)'
}
const src = {
  root: 'src/',
  html: 'src/**/*.html',
  css: 'src/**/*.scss',
  js: 'src/**/*.js',
  img: 'src/**/*.+(gif|png|jpg|svg)'
}
const plumberWithNotify = () => plumber({ errorHandler: notify.onError('<%= error.message %>') });

function img() {

  return gulp
    .src(src.img)
    .pipe(plumberWithNotify())
    .pipe(cache('img'))
    .pipe(using())
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        optimizationLevel: 5
      })
    )
    .pipe(gulp.dest(dest.root))
    .pipe(notify('Images optimize complete'));
}

exports.img = img;