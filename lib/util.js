/**
 * Module : kero dataTable util
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */
import { isArray } from 'tinper-sparrow/src/util';

// 判断DataTable对象是否发生了改变
var isChanged = function isChanged() {
    var rows = this.getAllRows();
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != Row.STATUS.NORMAL) return true;
    }
    return false;
};

// 将Row对象转为索引数组或者将Row对象数组转为索引数组
var _formatToIndicesArray = function _formatToIndicesArray(dataTableObj, indices) {
    if (typeof indices == 'string' || typeof indices == 'number') {
        indices = [indices];
    } else if (indices instanceof Row) {
        indices = [dataTableObj.getIndexByRowId(indices.rowId)];
    } else if (isArray(indices) && indices.length > 0 && indices[0] instanceof Row) {
        for (var i = 0; i < indices.length; i++) {
            indices[i] = dataTableObj.getIndexByRowId(indices[i].rowId);
        }
    }
    return indices;
};

export var utilFunObj = {
    isChanged: isChanged,
    _formatToIndicesArray: _formatToIndicesArray

};