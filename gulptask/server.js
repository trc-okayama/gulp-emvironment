'use strict';
const gulp = require('gulp');
const browserSync = require('browser-sync');

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
function server(done) {
  browserSync.init({
    server: {
      baseDir: dest.root,
      directory: true
    },
    ghostMode: false,
    open: 'external',
    notify: false,
    startPath: './index.html'
  });
  gulp.watch([src.js, src.html, src.css]).on('change', browserSync.reload);
  done();
}
exports.server = server;
