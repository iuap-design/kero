'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable getSimpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

/**
 * 获取数据,只取字段名与字段值
 */
var getSimpleData = function getSimpleData(options) {
    options = options || {};
    var rows,
        _rowData = [],
        type = options['type'] || 'all',
        fields = options['fields'] || null;

    if (type === 'all') {
        rows = this.rows.peek();
    } else if (type === 'current') {
        var currRow = this.getCurrentRow();
        rows = currRow == null ? [] : [currRow];
    } else if (type === 'focus') {
        var focusRow = this.getFocusRow();
        rows = focusRow == null ? [] : [focusRow];
    } else if (type === 'select') {
        rows = this.getSelectedRows();
    } else if (type === 'change') {
        rows = this.getChangedRows();
    }

    for (var i = 0; i < rows.length; i++) {
        _rowData.push(rows[i].getSimpleData({ fields: fields }));
    }
    return _rowData;
};

exports.getSimpleData = getSimpleData;