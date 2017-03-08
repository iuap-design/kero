/**
 * Module : kero dataTable page removeRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

import {
    isNumber
} from 'tinper-sparrow/src/util';

/**
 * 根据rowid删除行
 * @param  {string} rowid 需要删除行的rowid
 * @example
 * page.removeRowByRowId('rowid1')
 */
const removeRowByRowId = function(rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows[i].rowId == rowid) {
            this.rows.splice(i, 1);
            count--;
            this.updateSelectedIndices(i, '-')
            this.updateFocusIndex(i, '-')
        }
    }
}

// 新增/删除行之后更新选中行的index
const updateSelectedIndices = function(index, type, num) {
    if (!isNumber(num)) {
        num = 1
    }
    var selectedIndices = this.selectedIndices.slice();
    if (selectedIndices == null || selectedIndices.length == 0)
        return
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        if (type == '+') {
            if (selectedIndices[i] >= index)
                selectedIndices[i] = parseInt(selectedIndices[i]) + num
        } else if (type == '-') {
            if (selectedIndices[i] >= index && selectedIndices[i] <= index + num - 1) {
                selectedIndices.splice(i, 1)
            } else if (selectedIndices[i] > index + num - 1)
                selectedIndices[i] = selectedIndices[i] - num
        }
    }
    this.selectedIndices = selectedIndices
}

//新增/删除行之后更新焦点行
const updateFocusIndex = function(opIndex, opType, num) {
    if (!isNumber(num)) {
        num = 1
    }
    if (opIndex <= this.focus && this.focus != -1) {
        if (opType === '+') {
            this.focus = this.focus + num
        } else if (opType === '-') {
            if (this.focus >= opIndex && this.focus <= opIndex + num - 1) {
                this.focus = this.focus - 1
            } else if (this.focus > opIndex + num - 1) {
                this.focus = this.focus - num
            }
        }
    }
}


export const pageRemoveRowFunObj = {
    removeRowByRowId: removeRowByRowId,
    updateSelectedIndices: updateSelectedIndices,
    updateFocusIndex: updateFocusIndex
}
