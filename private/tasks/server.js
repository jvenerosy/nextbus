'use strict';

import gulp from 'gulp';
import config from '../../config.json';
import browserSync from 'browser-sync';

export default function () {

    var trad = require("../data/trad");
    var isMulti = (Object.keys(trad).length > 1);
    var lang = Object.keys(trad)[0];

    // use default task to launch Browsersync and watch JS files
    gulp.task('connect', function () {

        // Serve files from the root of this project
        browserSync.init({
            open: 'external',
            server: {
                baseDir: "./dist",
                index: isMulti ? `index_${lang}.html` : 'index.html'
            },
            logLevel: "info",
            port: 9740,
            ui: {
                port: 9720,
                weinre: {
                    port: 9730
                }
            },

        });

        // add browserSync.reload to the tasks array to make
        // all browsers reload after tasks are complete.
        gulp.watch([config.htmlDevPath + '/**/*.twig', config.htmlDevPath + '/**/*.html'], ['html']);
        gulp.watch([config.dataDevPath + '/**/*.js'], ['html', 'javascript:dev']);
        gulp.watch([config.imgDevPath + '**/*.png', config.imgDevPath + '/**/*.jpg', config.imgDevPath + '/**/*.svg'], ['copyimage']);
        gulp.watch([config.styleDevPath + '/**/*.scss'], ['styles:dev']);
        gulp.watch([config.jsDevPath + '/vendors/**/*.js'], ['copyjs']);
        gulp.watch([config.jsDevPath + '/**/*.js'], ['javascript:dev']);
    });
}
