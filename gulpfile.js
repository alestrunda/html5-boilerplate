"use strict";

const gulp = require("gulp"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  babel = require("gulp-babel"),
  sass = require("gulp-sass"),
  purify = require("gulp-purifycss"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  imagemin = require("gulp-imagemin");

// task sass
gulp.task("sass", function() {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("styles"));
});

// task jsmin
gulp.task("jsmin", function(cb) {
  return gulp
    .src("src/js/custom.js")
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("js"));
});

// task css
gulp.task("css", function() {
  var processors = [autoprefixer(), cssnano()];
  return gulp
    .src("styles/main.min.css")
    .pipe(purify(["*.html", "src/js/*.js"]))
    .pipe(postcss(processors))
    .pipe(gulp.dest("styles"));
});

//task imagemin
gulp.task("css", function() {
  return gulp
    .src("images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("images"));
});

// task run-css
gulp.task("run-css", gulp.series("sass", "css"));

// task watch:js
gulp.task("watch:js", function() {
  gulp.watch("src/js/custom.js", gulp.parallel("jsmin"));
});

// task watch:styles
gulp.task("watch:styles", function() {
  gulp.watch(["*.html", "src/scss/*.scss"], gulp.parallel("run-css"));
});

// task js
gulp.task("js", gulp.series("jsmin", "watch:js"));

// task js
gulp.task("image", gulp.parallel("imagemin"));

//default task
gulp.task("default", gulp.series("run-css", "watch:styles"));
