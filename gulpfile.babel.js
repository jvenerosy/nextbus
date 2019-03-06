'use strict';

/*IMPORTS*/
//modules gulp
import gulp from 'gulp';
import clean from 'gulp-clean';
import runSequence from 'run-sequence';

//fonctions gulp
import server from './private/tasks/server';
import html from './private/tasks/html';
import styles from './private/tasks/styles';
import javascript from './private/tasks/javascript';
import copy from './private/tasks/copy';
import browserSync from 'browser-sync';
import optimage from './private/tasks/optimage';

/*TASKS*/

//html
html();
//styles
styles();
//js
javascript();
//optimage
optimage();
//copy
copy();
//server
server();

gulp.task('clean', function (cb) {
    return gulp.src('./dist', {read: false})
        .pipe(clean());

    cb(err);
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('work', function (cb) {
    runSequence(
        'clean',
        [
            'copyfonts',
            'copyjs',
            'copyimage',
            'copyvideo',
            'html',
            'styles:dev',
            'javascript:dev',
        ],
        'connect',
        cb
    );
});

gulp.task('default', ['work']);

gulp.task('compile', function (cb) {
    runSequence(
        'clean',
        [
            'copyfonts',
            'copyjs',
            'optimage',
            'copyvideo',
            'html:prod',
            'styles:prod',
            'javascript:prod'
        ],
        cb
    );
});

gulp.task('compile:nocompress', [
    'copyfonts',
    'copyjs',
    'copyimage',
    'copyvideo',
    'html',
    'styles:dev',
    'javascript:prod'
]);
