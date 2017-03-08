(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.getMeta = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Module : kero dataTable getMete
     * Author : liuyk(liuyk@yonyou.com)
     * Date	  : 2016-07-30 14:34:01
     */

    /**
     * 获取meta信息
     * @memberof DataTable
     * @param  {string} [fieldName] 需要获取的字段
     * @param  {string} [key]       需要获取的字段指定meta信息
     * @return {object}           meta信息
     * @example
     * datatable.getMeta() // 获取所有meta信息
     * datatable.getMeta('field1') // 获取field1所有meta信息
     * datatable.getMeta('field1','type') // 获取field1的key信息
     */
    var getMeta = function getMeta(fieldName, key) {
        if (arguments.length === 0) return this.meta;else if (arguments.length === 1) return this.meta[fieldName];

        if (this.meta[fieldName] && typeof this.meta[fieldName][key] !== 'undefined') {
            return this.meta[fieldName][key];
        } else {
            return null;
        }
    };

    /**
     * 获取当前行的meta信息，如果不存在当前行则获取DataTable的meta信息
     * @memberof DataTable
     * @param  {string} [fieldName] 需要获取的字段
     * @param  {string} [key]       需要获取的字段指定meta信息
     * @return {object}           meta信息
     * @example
     * datatable.getRowMeta() // 获取当前行所有meta信息
     * datatable.getRowMeta('field1') // 获取当前行field1所有meta信息
     * datatable.getRowMeta('field1','type') // 获取当前行field1的key信息
     */
    var getRowMeta = function getRowMeta(fieldName, key) {
        var row = this.getCurrentRow();
        if (row) return row.getMeta(fieldName, key);else return this.getMeta(fieldName, key);
    };

    var getMetaFunObj = exports.getMetaFunObj = {
        getMeta: getMeta,
        getRowMeta: getRowMeta
    };
});