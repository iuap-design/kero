'use strict';

var gulp = require('gulp');
var path = require('path');
var envPath = process.cwd();
const fs = require('fs');
const jsdoc2md = require('jsdoc-to-markdown');
/**
 * 根据源文件地址数组、输出目录产出最终api
 * @param  {array} sourceArr 文件地址
 * @param  {string} rsPath   输出目录地址
 */
function produceAPI(sourceArr, rsPath) {
    var apidocsPath = path.join(envPath, 'docs');
    const output = jsdoc2md.renderSync({ files: sourceArr })
    var isexist = fs.existsSync(apidocsPath);
    if (!isexist) {
        fs.mkdirSync(apidocsPath);
    }
    fs.writeFileSync(path.join(apidocsPath, rsPath), output)
}

gulp.task('docs', function() {
    //dataTable 源文件 
    var dtSrcPath = ['indexDataTable.js', 'copyRow.js', 'data.js','enable.js','getCurrent.js','getData.js','getFocus.js','getMeta.js','getParam.js','getSelect.js','getSimpleData.js','meta.js','param.js','ref.js','removeRow.js','row.js','rowDelete.js','rowSelect.js','rowFocus.js','simpleData.js','events.js'];
    
    var rowSrcPath = ['indexRow.js','row-data.js','row-getData.js','row-getSimpleData.js','row-simpleData.js','row-rowSelect.js','row-getMeta.js','row-meta.js','row-ref.js'];
    //dataTable和row 源文件绝对路径地址
    var dtAbsolutePath = [],rowAbsolutePath = [];
    for (var i = 0; i < dtSrcPath.length; i++) {
        dtAbsolutePath.push(path.join(envPath, 'src/' + dtSrcPath[i]));
        // console.log("dataTable--"+dtAbsolutePath[i]);
    }

    for (var i = 0; i < rowSrcPath.length; i++) {
        rowAbsolutePath.push(path.join(envPath, 'src/' + rowSrcPath[i]));
        // console.log("row-----"+rowAbsolutePath[i]);
    }

    produceAPI(dtAbsolutePath, 'udatatable.md');
    produceAPI(rowAbsolutePath,'row.md');
})
