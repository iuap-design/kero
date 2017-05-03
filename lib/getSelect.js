/**
 * Module : kero dataTable getSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */

/**
 * 获取选中行索引，多选时，只返回第一个行索引
 * @memberof DataTable
 * @return {number} 选中行索引
 * @example
 * datatable.getSelectedIndex()
 */
var getSelectedIndex = function getSelectedIndex() {
    var selectedIndices = this.selectedIndices();
    if (selectedIndices == null || selectedIndices.length == 0) return -1;
    return selectedIndices[0];
};

/**
 * 获取选中的所有行索引数组
 * @memberof DataTable
 * @return {array} 所有行索引数组
 * @example
 * datatable.getSelectedIndices()
 */
var getSelectedIndices = function getSelectedIndices() {
    var selectedIndices = this.selectedIndices();
    if (selectedIndices == null || selectedIndices.length == 0) return [];
    return selectedIndices;
};

// 兼容保留，不要用
var getSelectedIndexs = function getSelectedIndexs() {
    return this.getSelectedIndices();
};

/**
 * 获取选中行的数据信息
 * @memberof DataTable
 * @param  {boolean} [withEmptyRow=false] 未选中的数据是否使用空行代替，true表示以空行代替未选中行，false相反
 * @return {array}            发生变化的数据信息
 * @example
 * datatable.getSelectedDatas()
 * datatable.getSelectedDatas(true)
 */
var getSelectedDatas = function getSelectedDatas(withEmptyRow) {
    var selectedIndices = this.selectedIndices();
    var datas = [];
    var sIndices = [];
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        sIndices.push(selectedIndices[i]);
    }
    var rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (sIndices.indexOf(i) != -1) datas.push(rows[i].getData());else if (withEmptyRow == true) datas.push(rows[i].getEmptyData());
    }
    return datas;
};

/**
 * 获取选中的Row对象
 * @memberof DataTable
 * @return {array} 选中的Row对象
 * @example
 * datatable.getSelectedRows()
 */
var getSelectedRows = function getSelectedRows() {
    var selectedIndices = this.selectedIndices();
    var selectRows = [];
    var rows = this.rows.peek();
    var sIndices = [];
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        sIndices.push(selectedIndices[i]);
    }
    for (var i = 0, count = rows.length; i < count; i++) {
        if (sIndices.indexOf(i) != -1) selectRows.push(rows[i]);
    }
    return selectRows;
};

export var getSelectFunObj = {
    getSelectedIndex: getSelectedIndex,
    getSelectedIndices: getSelectedIndices,
    getSelectedIndexs: getSelectedIndexs,
    getSelectedDatas: getSelectedDatas,
    getSelectedRows: getSelectedRows
};