'use strict';

import gulp from 'gulp';
import config from '../../config';
import copy from 'copy';

export default function () {
    //fonts
    gulp.task('copyfonts', function (cb) {
        copy(config.fontDevPath + '/**/*', config.fontCliPath, cb);
    });
    //js
    gulp.task('copyjs', function (cb) {
        copy(config.jsDevPath + '/vendors/**/*.js', config.jsCliPath + '/vendors/', cb);
    });
    //images
    gulp.task('copyimage', function (cb) {
        copy([
            config.imgDevPath + '/**/*.jpg',
            config.imgDevPath + '/**/*.png',
            config.imgDevPath + '/**/*.jpeg',
            config.imgDevPath + '/**/*.gif',
            config.imgDevPath + '/**/*.pdf',
            config.imgDevPath + '/**/*.svg'
        ],
            config.imgCliPath + '/', cb);
    });
    //videos
    gulp.task('copyvideo', function (cb) {
        copy(config.videoDevPath + '/**/*.mp4', config.videoCliPath, cb);
    });
}