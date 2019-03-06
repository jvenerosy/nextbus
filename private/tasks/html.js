'use strict';

import gulp from "gulp";
import browserSync from 'browser-sync';
import twig from "gulp-twig";
import config from "../../config";
import dest from "gulp-dest";
import rename from "gulp-rename";
import fs from 'fs';


export default function () {

    gulp.task('html', function () {

        delete require.cache[require.resolve("../data/config")];
        delete require.cache[require.resolve("../data/trad")];

        var configSite = require("../data/config");
        var trad = require("../data/trad");

        var isMulti = (Object.keys(trad).length > 1);

        Object.keys(trad, configSite).map(lang => {


            const translations = trad[lang];
            var conf = configSite[lang];


            fs.readdir(config.htmlDevPath + '/template/', function (err, files) {

                files.map(function (file) {
                    let fileWithoutExtension = file.split('.')[0];
                    let filename = (isMulti) ? `${fileWithoutExtension}_${lang}` : file;

                    gulp.src(config.htmlDevPath + '/template/' + file)
                        .pipe(twig({
                            data: {
                                lang: lang,
                                trad: translations,
                                config: conf,
                                isMulti: isMulti
                            },
                            filters: [
                                {
                                    name: 'day5', func: (i, divider = 5) => {
                                    return Math.ceil(i / divider) - 1;
                                }
                                },
                            ]
                        }))
                        .pipe(rename(filename))
                        .pipe(dest('.', {ext: 'html'}))
                        .pipe(gulp.dest('./dist'))
                        .pipe(browserSync.stream());
                    ;
                })
            })
        });

    })

    gulp.task('html:prod', function () {

        delete require.cache[require.resolve("../data/config")];
        delete require.cache[require.resolve("../data/trad")];

        var configSite = require("../data/config");
        var trad = require("../data/trad");

        var isMulti = (Object.keys(trad).length > 1);

        Object.keys(trad, configSite).map(lang => {


            const translations = trad[lang];
            var conf = configSite[lang];


            fs.readdir(config.htmlDevPath + '/template/', function (err, files) {

                files.map(function (file) {
                    let fileWithoutExtension = file.split('.')[0];

                    // Do not compile unnecessary files when in production environment (example.html, iframe.html, source maps, ...)
                     if (fileWithoutExtension == "iframe" || fileWithoutExtension=="test") return ;

                    let filename = (isMulti) ? `${fileWithoutExtension}_${lang}` : file;

                    gulp.src(config.htmlDevPath + '/template/' + file)
                        .pipe(twig({
                            data: {
                                lang: lang,
                                trad: translations,
                                config: conf,
                                isMulti: isMulti
                            },
                            filters: [
                                {
                                    name: 'day5', func: (i, divider = 5) => {
                                        return Math.ceil(i / divider) - 1;
                                    }
                                },
                            ]
                        }))
                        .pipe(rename(filename))
                        .pipe(dest('.', {ext: 'html'}))
                        .pipe(gulp.dest('./dist'))
                        .pipe(browserSync.stream());
                    ;
                })
            })
        });

    })
}