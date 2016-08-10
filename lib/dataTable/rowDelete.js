'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setRowsDelete = exports.setAllRowsDelete = exports.setRowDelete = undefined;

var _util = require('./util');

/**
 * 设置行删除
 * @param {Object} index
 */
var setRowDelete = function setRowDelete(index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
    }
    this.setRowsDelete([index]);
};

/**
 * 设置所有行删除
 */
/**
 * Module : kero dataTable rowDelete
 * Desc: 不建议使用此库方法
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */
var setAllRowsDelete = function setAllRowsDelete() {
    var indices = new Array(this.rows().length);
    for (var i = 0; i < indices.length; i++) {
        indices[i] = i;
    }
    this.setRowsDelete(indices);
};

/**
 * 设置行删除
 * @param {Array} indices
 */
var setRowsDelete = function setRowsDelete(indices) {
    indices = (0, _util._formatToIndicesArray)(indices);
    for (var i = 0; i < indices.length; i++) {
        var row = this.getRow(indices[i]);
        if (row.status == Row.STATUS.NEW) {
            this.rows(this.rows().splice(indices[i], 1));
            this.updateSelectedIndices(indices[i], '-');
            this.updateFocusIndex(index, '-');
        } else {
            row.status = Row.STATUS.FALSE_DELETE;
        }
    }
    var rowIds = this.getRowIdsByIndices(indices);
    this.trigger(DataTable.ON_ROW_DELETE, {
        falseDelete: true,
        indices: indices,
        rowIds: rowIds
    });
};

exports.setRowDelete = setRowDelete;
exports.setAllRowsDelete = setAllRowsDelete;
exports.setRowsDelete = setRowsDelete;