'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var webpack = require('webpack-stream');

gulp.task('build', function() {
    return gulp.src("src/*.js")
        .pipe(webpack({
            externals: {
                "vkapi": "VK",
                "jquery": "jQuery"
            }
        }))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
    return gulp.src('style/*.less')
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch(["*.js", "src/*.js", "style/*.less"], ['build', 'less']);
});
