'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable page getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

var getData = function getData() {
    var datas = [],
        row,
        meta;
    meta = this.parent.getMeta();
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({ 'id': row.rowId, 'status': row.status, data: row.data });
    }
    return datas;
};

var getSelectDatas = function getSelectDatas() {
    var datas = [],
        row;
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({ 'id': row.rowId, 'status': row.status, data: row.data });
    }
    for (var i = 0; i < this.selectedIndices.length; i++) {
        row = this.rows[this.selectedIndices[i]];
        datas.push({ 'id': row.rowId, 'status': row.status, data: row.data });
    }
    return datas;
};

var getSelectRows = function getSelectRows() {
    var rows = [];
    for (var i = 0; i < this.selectedIndices.length; i++) {
        rows.push(this.rows[this.selectedIndices[i]]);
    }
    return rows;
};

var getRowByRowId = function getRowByRowId(rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows.rowId == rowid) return this.rows[i];
    }
    return null;
};

var getRowValue = function getRowValue(rowIndex, fieldName) {
    var row = this.rows[rowIndex];
    if (row) {
        return row.data[fieldName]['value'];
    }
    return null;
};

exports.getData = getData;
exports.getSelectDatas = getSelectDatas;
exports.getSelectRows = getSelectRows;
exports.getRowByRowId = getRowByRowId;
exports.getRowValue = getRowValue;