'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const using = require('gulp-using');
const cache = require('gulp-cached');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssDeclarationSorter = require('css-declaration-sorter');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

const plumberWithNotify = () => plumber({ errorHandler: notify.onError('<%= error.message %>') });

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

function css() {
  const plugins = [
    autoprefixer(),
    cssDeclarationSorter({
      order: 'concentric-css'
    }),
    mqpacker(),
    cssnano()
  ];

  return (
    gulp
      .src(src.css)
      .pipe(plumberWithNotify())
      .pipe(cache('css'))
      .pipe(using())
      // .pipe(sourcemaps.init())
      // .pipe(sourcemaps.write('.'))
      .pipe(
        rename(path => {
          path.dirname = path.dirname.replace('scss', 'css');
        })
      )
      .pipe(sass())
      .pipe(postcss(plugins))
      .pipe(gulp.dest(dest.root))
      .pipe(notify('CSS task complete'))
  );
}
exports.css = css;
