"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable page getMeta
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

var getRowMeta = function getRowMeta(rowIndex, fieldName, metaName) {
    var row = this.rows[rowIndex];
    if (row) {
        var meta = row[fieldName].meta;
        if (!meta) return null;else return meta[metaName];
    }
    return null;
};

exports.getRowMeta = getRowMeta;