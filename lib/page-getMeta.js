(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.pageGetMeta = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Module : kero dataTable page getMeta
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-08 09:59:01
     */

    /**
     * 获取指定行的meta信息
     * @param  {number} rowIndex  行索引
     * @param  {string} fieldName 需要获取的字段
     * @param  {string} key       需要获取的字段指定meta信息
     * @return {object}           meta信息
     * @example
     * page.getRowMeta(1,'field1','type')
     */
    var getRowMeta = function getRowMeta(rowIndex, fieldName, metaName) {
        var row = this.rows[rowIndex];
        if (row) {
            var meta = row[fieldName].meta;
            if (!meta) return null;else return meta[metaName];
        }
        return null;
    };

    var rowGetMetaFunObj = exports.rowGetMetaFunObj = {
        getRowMeta: getRowMeta
    };
});