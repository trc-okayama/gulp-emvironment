'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const using = require('gulp-using');
const cache = require('gulp-cached');

const eslint = require('gulp-eslint');

const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
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

function lint() {
  return gulp.src(src.js)
    .pipe(plumberWithNotify())
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function bundle() {
  return webpackStream(webpackConfig, webpack)
    .pipe(plumberWithNotify())
    .pipe(cache('bundle'))
    .pipe(using())
    .pipe(gulp.dest(dest.root))
    .pipe(notify('JS task complete'));

}
function js(done){
  lint()
  bundle()
  done();
}
exports.lint = lint;
exports.bundle = bundle;
exports.js = js;