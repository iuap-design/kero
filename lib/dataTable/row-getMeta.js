'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMeta = undefined;

var _util = require('./util');

/**
 *获取row中某一列的属性
 */
var getMeta = function getMeta(fieldName, key, fetchParent) {
    if (arguments.length == 0) {
        var mt = {};
        for (var k in this.data) {
            mt[k] = this.data[k].meta ? this.data[k].meta : {};
        }
        return mt;
    }
    var meta = (0, _util._getField)(fieldName).meta;
    if (meta && meta[key] !== undefined && meta[key] !== null && meta[key] !== '') return meta[key];else if (typeof fetchParent == 'undefined' || fetchParent != false) return this.parent.getMeta(fieldName, key);
    return undefined;
}; /**
    * Module : kero dataTable row getMeta
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-08-08 13:54:01
    */

exports.getMeta = getMeta;