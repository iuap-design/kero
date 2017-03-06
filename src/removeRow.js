/**
 * Module : kero dataTable removeRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */
import {_formatToIndicesArray} from './util';

/**
 * 根据rowId删除指定行
 * @memberof DataTable
 * @param  {string} rowId 需要删除行的rowId
 * @example
 * datatable.removeRowByRowId('rowid1')
 */
const removeRowByRowId = function (rowId) {
    var index = this.getIndexByRowId(rowId)
    if (index != -1)
        this.removeRow(index)
}

/**
 *根据索引删除指定行
 * @memberof DataTable
 * @param  {number} index 需要删除行的索引
 * @example
 * datatable.removeRow(1)
 */
const removeRow = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.removeRows([index]);
}

/**
 * 删除所有行
 * @memberof DataTable
 * @example
 * datatable.removeAllRows();
 */
const removeAllRows = function () {
    this.rows([])
    this.selectedIndices([])
    this.focusIndex(-1)
    this.trigger(DataTable.ON_DELETE_ALL)
    this.updateCurrIndex();
}

/**
 * 根据索引数据删除多条数据行
 * @memberof DataTable
 * @param  {array} indices 需要删除的数据行对应索引数组
 * @example
 * datatable.removeRows([1,2])
 */
const removeRows = function (indices) {
    indices = _formatToIndicesArray(this, indices)
    indices = indices.sort(function(a,b){
        return a-b;
    });
    var rowIds = [], rows = this.rows(), deleteRows = [];
    for (var i = indices.length - 1; i >= 0; i--) {
        var index = indices[i]
        var delRow = rows[index];
        if (delRow == null) {
            continue;
        }
        rowIds.push(delRow.rowId)
        var deleteRow = rows.splice(index, 1);
        deleteRows.push(deleteRow[0]);
        this.updateSelectedIndices(index, '-')
        this.updateFocusIndex(index, '-')
    }
    this.rows(rows)
    this.deleteRows = deleteRows;
    this.trigger(DataTable.ON_DELETE, {
        indices: indices,
        rowIds: rowIds,
        deleteRows: deleteRows
    })

    this.updateCurrIndex();
}


/**
 * 清空datatable的所有数据以及分页数据以及index
 * @memberof DataTable
 * @example
 * datatable.clear()
 */
const clear = function () {
    this.removeAllRows();
    this.cachedPages = [];
    this.totalPages(1);
    this.pageIndex(0);
    this.focusIndex(-1);
    this.selectedIndices([]);
}

export {
    removeRowByRowId,
    removeRow,
    removeAllRows,
    removeRows,
    clear
}
