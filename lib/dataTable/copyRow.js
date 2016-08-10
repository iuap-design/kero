"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable copyRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

var copyRow = function copyRow(index, row) {
    this.copyRows(index, [row]);
};

var copyRows = function copyRows(index, rows) {
    for (var i = 0; i < rows.length; i++) {
        var newRow = new Row({ parent: this });
        if (rows[i]) {
            newRow.setData(rows[i].getData());
        }
        this.insertRows(index === undefined ? this.rows().length : index, [newRow]);
    }
};

exports.copyRow = copyRow;
exports.copyRows = copyRows;