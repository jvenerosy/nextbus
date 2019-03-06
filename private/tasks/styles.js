'use strict';

import gulp from 'gulp';
import config from '../../config';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import postcss from 'gulp-postcss';
import plumber from 'gulp-plumber';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';



export default function () {

    gulp.task('styles:dev', function () {

        gulp.src(config.styleDevPath + '/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(sass())
            .pipe(postcss([autoprefixer({browsers: ['last 4 versions']})]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.styleCliPath))
            .pipe(browserSync.stream())
    });

    gulp.task('styles:prod', function () {

        gulp.src(config.styleDevPath + '/**/*.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(postcss([autoprefixer({browsers: ['last 4 versions']})]))
            .pipe(cleanCSS())
            .pipe(gulp.dest(config.styleCliPath))
            .pipe(browserSync.stream())
    });
}
