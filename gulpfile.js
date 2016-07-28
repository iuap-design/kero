'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var util = require('gulp-util');
var makeumd = require('./makeumd.js');

/**
 * 公共错误处理函数
 * 使用示例：
 *  .pipe(uglify().on('error', errHandle))
    .pipe(rename('u.min.js'))
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
var errHandle = function ( err ) {
    // 报错文件名
    var fileName = err.fileName;
    // 报错类型
    var name = err.name;
    // 报错信息
    var message = err.message;
    // 出错代码位置
    // var loc = err.loc;

    // var logInfo = '报错文件：' + fileName + '报错类型：' + name + '出错代码位置：' + loc.line + ',' + loc.column;

    // util.log( logInfo );

    this.end();
}


var globs = {
    js: {
        dtJs:[
            'js/dtJs/core.js',
            'js/app.js',
            'js/dataTable.js',
            'js/dtJs/mixins/enableMixin.js',
            'js/dtJs/mixins/requiredMixin.js',
            'js/dtJs/mixins/validateMixin.js',
            'js/dtJs/mixins/valueMixin.js',
            'js/dtJs/baseAdapter.js',
            'js/dtJs/integer.js',
            'js/dtJs/float.js',
            'js/dtJs/currency.js',
            'js/dtJs/ckeditor.js',
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
        ],
        coreJs:[
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

gulp.task('js-init', function() {
    return gulp.src(globs.js.dtJs)
        .pipe(concat('model.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(rename('model.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js', ['js-init'], function(){
     makeumd.init([
            'dist/js/model.js',
            'dist/js/model.min.js',
        ]);
});

gulp.task('ujs-init', ['js-init'], function(){
    return gulp.src(globs.js.coreJs.concat(globs.js.dtJs))
        .pipe(concat('u-model.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(rename('u-model.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('ujs', ['ujs-init'], function(){
     makeumd.init([
            'dist/js/u-model.js',
            'dist/js/u-model.min.js',
        ]);
});



gulp.task('tree-init', function() {
    return gulp.src(globs.js.treeJs)
        .pipe(rename('tree.kero.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(rename('tree.kero.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('tree', ['tree-init'], function(){
     makeumd.init([
            'dist/js/tree.kero.js',
            'dist/js/tree.kero.min.js',
        ]);
});


gulp.task('grid-init', function() {
    return gulp.src(globs.js.gridJs)
        .pipe(rename('grid.kero.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(rename('grid.kero.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('grid', ['grid-init'], function(){
     makeumd.init([
            'dist/js/grid.kero.js',
            'dist/js/grid.kero.min.js',
        ]);
});

gulp.task('distWatch', function(){
    gulp.watch(globs.js.coreJs.concat(globs.js.dtJs), ['ujs']);
    gulp.watch(globs.js.treeJs, ['tree']);
    gulp.watch(globs.js.gridJs, ['grid']);
})


gulp.task('dev', ['js', 'ujs', 'tree', 'grid'],function(){
    gulp.run('distWatch');
});

gulp.task('dist', ['js', 'ujs', 'tree', 'grid'], function(){
});
