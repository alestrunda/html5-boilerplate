"use strict";

var gulp = require('gulp');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');


/*
 * sass task
 * run: sass
 */
gulp.task('sass', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('styles'));
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
	return gulp.src('styles/main.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('styles'));
});


/*
 * run-css task
 * run: sass and css
 */
gulp.task('run-css', function() {
	runSequence('sass', 'css');
});


/*
 * watch task
 * run: watch
 */
gulp.task('watch', function() {
	gulp.watch('src/scss/*.scss', ['run-css']);
});


//default task
gulp.task('default', ['run-css', 'watch']);