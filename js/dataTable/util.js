/**
 * Module : kero dataTable util
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */
import {isArray} from 'tinper-sparrow/js/util';

const isChanged = function () {
    var rows = this.getAllRows()
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != Row.STATUS.NORMAL)
            return true
    }
    return false
}

const _formatToIndicesArray = function (dataTableObj, indices) {
    if (typeof indices == 'string' || typeof indices == 'number') {
        indices = [indices]
    } else if (indices instanceof Row) {
        indices = [dataTableObj.getIndexByRowId(indices.rowId)]
    } else if (isArray(indices) && indices.length > 0 && indices[0] instanceof Row) {
        for (var i = 0; i < indices.length; i++) {
            indices[i] = dataTableObj.getIndexByRowId(indices[i].rowId)
        }
    }
    return indices;
};

export {
	isChanged,
	_formatToIndicesArray
}