'use strict';
const gulp = require('gulp');
const del = require('del');
const { html } = require('./gulptask/html.js')
const { css } = require('./gulptask/css.js')
const { bundle } = require('./gulptask/js.js')
const { js } = require('./gulptask/js.js')
const { img } = require('./gulptask/img.js')
const { server } = require('./gulptask/server.js')

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
const events = ['add', 'addDir', 'change', 'unlink', 'unlinkDir']

function clear(done) {
  del(dest.root)
  done();
}

function copy() {
  return gulp.src([
    // src.root + '**/shared*/**',
    src.root + '**/*.+(min.js|json|xml|ico|pdf|xls|ppt|doc|xlsx|pptx|docx|zip)',
    src.root + '**/*-min.js'
  ])
    .pipe(gulp.dest(dest.root))
}

function watch() {
  gulp.watch(src.html, { events }, html)
  gulp.watch(src.css, { events }, css)
  gulp.watch(src.js, { events }, js)
  gulp.watch(src.img, { events }, img)

}
exports.default = gulp.series(
  gulp.parallel(html, css, bundle, img, copy),
  gulp.parallel(server, watch)
)
exports.build = gulp.series(
  gulp.parallel(html, css, bundle, img, copy)
)
exports.watch = watch;
exports.clear = clear;
exports.copy = copy;