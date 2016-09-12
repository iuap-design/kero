/**
 * Module : kero dataTable rowDelete
 * Desc: 不建议使用此库方法
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */
import {_formatToIndicesArray} from './util';

/**
 * 设置行删除
 * @param {Object} index
 */
const setRowDelete = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.setRowsDelete([index])
}

/**
 * 设置所有行删除
 */
const setAllRowsDelete = function () {
    var indices = new Array(this.rows().length)
    for (var i = 0; i < indices.length; i++) {
        indices[i] = i
    }
    this.setRowsDelete(indices)
}

/**
 * 设置行删除
 * @param {Array} indices
 */
const setRowsDelete = function (indices) {
    indices = _formatToIndicesArray(this, indices)
    var rowIds = this.getRowIdsByIndices(indices)
    this.trigger(DataTable.ON_DELETE, {
            falseDelete: true,
            indices: indices,
            rowIds: rowIds
    })
    for (var i = 0; i < indices.length; i++) {
        var row = this.getRow(indices[i])
        if (row.status == Row.STATUS.NEW) {
            this.rows().splice(indices[i], 1);
            this.updateSelectedIndices(indices[i], '-')
            this.updateFocusIndex(index, '-')
        }
        else {
            row.status = Row.STATUS.FALSE_DELETE
            var temprows = this.rows().splice(indices[i], 1)
            this.rows().push(temprows[0]);
        }
    }
}

export {
	setRowDelete,
	setAllRowsDelete,
	setRowsDelete
}