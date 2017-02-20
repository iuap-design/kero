'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._formatToIndicesArray = exports.isChanged = undefined;

var _util = require('tinper-sparrow/src/util');

var isChanged = function isChanged() {
    var rows = this.getAllRows();
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != Row.STATUS.NORMAL) return true;
    }
    return false;
}; /**
    * Module : kero dataTable util
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-08-08 09:59:01
    */


var _formatToIndicesArray = function _formatToIndicesArray(dataTableObj, indices) {
    if (typeof indices == 'string' || typeof indices == 'number') {
        indices = [indices];
    } else if (indices instanceof Row) {
        indices = [dataTableObj.getIndexByRowId(indices.rowId)];
    } else if ((0, _util.isArray)(indices) && indices.length > 0 && indices[0] instanceof Row) {
        for (var i = 0; i < indices.length; i++) {
            indices[i] = dataTableObj.getIndexByRowId(indices[i].rowId);
        }
    }
    return indices;
};

exports.isChanged = isChanged;
exports._formatToIndicesArray = _formatToIndicesArray;