"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable page meta
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

var setRowMeta = function setRowMeta(rowIndex, fieldName, metaName, value) {
    var row = this.rows[rowIndex];
    if (row) {
        var meta = row[fieldName].meta;
        if (!meta) meta = row[fieldName].meta = {};
        meta[metaName] = value;
        if (row.status != Row.STATUS.NEW) row.status = Row.STATUS.UPDATE;
    }
};

exports.setRowMeta = setRowMeta;