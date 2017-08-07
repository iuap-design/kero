/**
 * Module : kero dataTable removeRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */
import { utilFunObj } from './util';

/**
 * 根据rowId删除指定行
 * @memberof DataTable
 * @param  {string} rowId 需要删除行的rowId
 * @example
 * datatable.removeRowByRowId('rowid1')
 */
var removeRowByRowId = function removeRowByRowId(rowId) {
    var index = this.getIndexByRowId(rowId);
    if (index != -1) this.removeRow(index);
};

/**
 *根据索引删除指定行
 * @memberof DataTable
 * @param  {number} index 需要删除行的索引
 * @example
 * datatable.removeRow(1)
 */
var removeRow = function removeRow(index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
    }
    this.removeRows([index]);
};

/**
 * 删除所有行
 * @memberof DataTable
 * @example
 * datatable.removeAllRows();
 */
var removeAllRows = function removeAllRows() {
    this.rows([]);
    this.selectedIndices([]);
    this.focusIndex(-1);
    this.trigger(DataTable.ON_DELETE_ALL);
    this.updateCurrIndex();
};

/**
 * 根据索引数据删除多条数据行
 * @memberof DataTable
 * @param  {array} indices 需要删除的数据行对应数组，数组中既可以是索引也可以是row对象
 * @example
 * datatable.removeRows([1,2])
 * datatable.removeRows([row1,row2])
 */
var removeRows = function removeRows(indices, obj) {
    this.setRowsDelete(indices, obj);
};

/**
 * 清空datatable的所有数据以及分页数据以及index
 * @memberof DataTable
 * @example
 * datatable.clear()
 */
var clear = function clear() {
    this.removeAllRows();
    this.cachedPages = [];
    this.totalPages(1);
    this.pageIndex(0);
    this.focusIndex(-1);
    this.selectedIndices([]);
};

export var removeRowFunObj = {
    removeRowByRowId: removeRowByRowId,
    removeRow: removeRow,
    removeAllRows: removeAllRows,
    removeRows: removeRows,
    clear: clear
};