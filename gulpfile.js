// 'use strict';

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var clean = require('gulp-clean');

// gulp.task('minify-css', () => {
//   return gulp.src('public/css/*.css')
//     // .pipe(cleanCSS())
//     .pipe(gulp.dest('build'));
// });

// var browsers = { browsers: ['> 1%', 'last 20 versions', 'ie >= 9'], cascade: false };

gulp.task('clean', function () {
  del.sync(['./build/**']);
});

gulp.task('copy-main-files', function () {
  return gulp.src(['public/**/*', '!public/css/*.css', '!public/fonts/*', '!public/img/*'])
    .pipe(gulp.dest('build/'));
});

gulp.task('make-css', function () {
  return gulp.src('public/css/*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('copy-fonts', function () {
  return gulp.src(['public/fonts/*'])
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('copy-images', function () {
  return gulp.src(['public/img/**/*'])
    .pipe(gulp.dest('build/img/'));
});

gulp.task('build', ['clean', 'copy-main-files', 'make-css', 'copy-fonts', 'copy-images'], function () {
});