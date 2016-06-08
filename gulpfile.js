'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var util = require('gulp-util');

/**
 * 公共错误处理函数
 * 使用示例：
 *  .pipe(uglify())
 .on('error', errHandle)
 .pipe(rename('u.min.js'))
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function errHandle(err) {
    util.log(err.fileName + '文件编译出错，出错行数为' + err.lineNumber + '，具体错误信息为：' + err.message);
    this.end();
};


var globs = {
    js: {
        js:[
            'js/app.js',
            'js/dataTable.js'
        ],
        dtJs:[
            'dist/js/model.js',
            'js/dtJs/**.js',
            'js/dtJs/extend/**.js'
        ]
    }
};

gulp.task('Js', function() {
    return gulp.src(globs.js.js)
        .pipe(concat('model.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(rename('model.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('uJs', ['Js'], function(){
    return gulp.src(globs.js.dtJs)
        .pipe(concat('u-model.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(rename('u-model.min.js'))
        .pipe(gulp.dest('dist/js'));
})

gulp.task('dist', ['uJs'], function(){
});
