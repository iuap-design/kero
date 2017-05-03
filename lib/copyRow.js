/**
 * Module : kero DataTable copyRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

/**
 * 在指定index位置插入单条数据行
 * @memberof DataTable
 * @param  {number} index 数据行插入之后的位置
 * @param  {object} row   数据行信息
 * @example
 * var row = {
 *    field1:'value1'
 * }
 * datatable.copyRow(1,row)
 */
var copyRow = function copyRow(index, row) {
    this.copyRows(index, [row]);
};

/**
 * 在指定index位置插入多条数据行
 * @memberof DataTable
 * @param  {number} index 数据行插入之后的位置
 * @param  {array} rows   存储数据行信息的数组
 * @example
 * var row1 = {
 *    field1:'value1'
 * }
 * var row2 = {
 *    field1:'value1'
 * }
 * datatable.copyRow(1,[row1,row2])
 */
var copyRows = function copyRows(index, rows) {
    for (var i = 0; i < rows.length; i++) {
        var newRow = new Row({
            parent: this
        });
        if (rows[i]) {
            newRow.setData(rows[i].getData());
        }
        this.insertRows(index === undefined ? this.rows().length : index, [newRow]);
    }
};

export var copyRowFunObj = {
    copyRow: copyRow,
    copyRows: copyRows
};