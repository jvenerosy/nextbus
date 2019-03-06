'use strict';

import gulp from 'gulp';
import config from '../../config';
import imagemin from 'gulp-imagemin';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import imageminPngquant from 'imagemin-pngquant';

export default function () {
    gulp.task('optimage', function (cb) {
        gulp.src(config.imgDevPath + '/**/*')
            .pipe(imagemin(
                imageminJpegRecompress({
                    loops: 4,
                    min: 80,
                    max: 85,
                    quality: 'high'
                })
            ))
            .pipe(imagemin(
                imageminPngquant({
                    quality: '75-90'
                })
            ))
            .pipe(gulp.dest(config.imgCliPath + '/', cb))
    });
}
