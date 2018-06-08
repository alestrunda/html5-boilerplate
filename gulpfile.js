"use strict";

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


/*
 * sass task
 * run: sass
 */
gulp.task('sass', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('styles'));
});


/*
 * js min
 * reun uglify
 */
gulp.task('jsmin', function (cb) {
	return gulp.src('src/js/custom.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
        .pipe(gulp.dest('js'));
});


/*
 * css task
 * run: autoprefixer, cssnano
 */
gulp.task('css', function() {
	var processors = [
        autoprefixer({browsers: ['last 5 versions']}),
		cssnano()
    ];
	return gulp.src('styles/main.min.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('styles'));
});


/*
 * run-css task
 * run: sass and css
 */
gulp.task('run-css', gulp.series('sass', 'css'));


/*
 * watch task
 * run: watch
 */
gulp.task('watch:styles', function() {
	gulp.watch('src/scss/*.scss', gulp.parallel('run-css'));
});


//default task
gulp.task('default', gulp.series('run-css', 'watch:styles'));
