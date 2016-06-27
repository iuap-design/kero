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
            'js/dtJs/core.js',
            'js/dtJs/mixins/enableMixin.js',
            'js/dtJs/mixins/requiredMixin.js',
            'js/dtJs/mixins/validateMixin.js',
            'js/dtJs/mixins/valueMixin.js',
            'js/dtJs/baseAdapter.js',
            'js/dtJs/integer.js',
            'js/dtJs/float.js',
            'js/dtJs/currency.js',
            'js/dtJs/percent.js',
            'js/dtJs/string.js',
            'js/dtJs/textarea.js',
            'js/dtJs/textfield.js',
            'js/dtJs/checkbox.js',
            'js/dtJs/switch.js',
            'js/dtJs/combobox.js',
            'js/dtJs/radio.js',
            'js/dtJs/native-radio.js',
            'js/dtJs/native-checkbox.js',
            'js/dtJs/pagination.js',
            'js/dtJs/datetime.js',
            'js/dtJs/time.js',
            'js/dtJs/yearmonth.js',
            'js/dtJs/year.js',
            'js/dtJs/month.js',
            'js/dtJs/progress.js',
            'js/dtJs/url.js',
            'js/dtJs/password.js',
            // 'js/dtJs/**.js'
            // core
            'js/core/core.js',
            'js/core/event.js',
            'js/utilities/jsExtensions.js',
            'js/core/ajax.js',
            'js/core/base.js',
            'js/core/compMgr.js',
            'js/utilities/i18n.js',
            'js/utilities/rsautils.js',
            'js/utilities/masker.js',
            'js/utilities/formater.js',
            'js/utilities/dateUtils.js',
            'js/utilities/dataRender.js',
            'js/utilities/hotKeys.js'
        ],
        treeJs:'js/dtJs/tree.js',
        gridJs:'js/dtJs/grid.js'
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
