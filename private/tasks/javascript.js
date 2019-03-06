'use strict';

import gulp from 'gulp';
import config from '../../config';
import plumber from 'gulp-plumber';
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import browserSync from 'browser-sync';

export default function () {
    gulp.task('javascript:dev', function () {
        gulp.src(config.jsDevPath + '/app.js')
            .pipe(plumber())

            .pipe(webpack({
                output: {
                    path: __dirname + '/dist/js/',
                    filename: "app.js"
                },
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            loader: 'babel-loader',
                            query: {
                                presets: ['es2015'],
                                compact: false
                            }
                        },
                        {
                            test: /\.json$/,
                            loader: "json-loader"
                        }
                    ],
                },

            }))
            .pipe(gulp.dest(config.jsCliPath))
            .pipe(browserSync.stream());
    });

    gulp.task('javascript:prod', function () {
        gulp.src(config.jsDevPath + '/app.js')
            .pipe(plumber())

            .pipe(webpack({
                output: {
                    path: __dirname + '/dist/js/',
                    filename: "app.js"
                },
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            loader: 'babel-loader',
                            query: {
                                presets: ['es2015'],
                                compact: false
                            }
                        },
                        {
                            test: /\.json$/,
                            loader: "json-loader"
                        }
                    ],
                },

            }))
            .pipe(jshint())
            .pipe(uglify())
            .pipe(gulp.dest(config.jsCliPath))
            .pipe(browserSync.stream());
    });
}
