/**
 * Module : kero dataTable rowUnSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */


/**
 * 全部取消选中
 */
const setAllRowsUnSelect = function (options) {
    this.selectedIndices([])
    if (!(options && options.quiet)) {
        this.trigger(DataTable.ON_ROW_ALLUNSELECT)
    }
    this.updateCurrIndex();
    this.allSelected(false);
}

/**
 * 取消选中
 */
const setRowUnSelect = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.setRowsUnSelect([index])
}

const setRowsUnSelect = function (indices) {
    indices = this._formatToIndicesArray(indices)
    var selectedIndices = this.selectedIndices().slice()

    // 避免与控件循环触发
    if (selectedIndices.indexOf(indices[0]) == -1) return;

    for (var i = 0; i < indices.length; i++) {
        var index = indices[i]
        var pos = selectedIndices.indexOf(index)
        if (pos != -1)
            selectedIndices.splice(pos, 1)
    }
    this.selectedIndices(selectedIndices)
    var rowIds = this.getRowIdsByIndices(indices)
    this.trigger(DataTable.ON_ROW_UNSELECT, {
        indices: indices,
        rowIds: rowIds
    })
    this.updateCurrIndex();
    this.allSelected(false);
}


export {
	setAllRowsUnSelect,
	setRowUnSelect,
	setRowsUnSelect
}