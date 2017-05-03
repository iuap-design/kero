/**
 * Module : kero dataTable rowFocus
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */
import { isNumber } from 'tinper-sparrow/src/util';

/**
 * 设置焦点行
 * @memberof DataTable
 * @param {number|u.Row} index 行对象或者行index
 * @param {boolean} [quiet] 如果为true则不触发事件，否则触发事件
 * @param {boolean} [force] 如果为true当index行与已focus的行相等时，仍然触发事件，否则不触发事件
 * @example
 * datatable.setRowFocus(1) // 设置第二行为焦点行
 * datatable.setRowFocus(1,true) // 设置第二行为焦点行，不触发事件
 * datatable.setRowFocus(1,false,true) // 设置第二行为焦点行，如果当前焦点行为第二行，仍旧触发事件
 */
var setRowFocus = function setRowFocus(index, quiet, force) {
    var rowId = null;
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
        rowId = index.rowId;
    }
    if (index === -1 || index === this.focusIndex() && !force) {
        return;
    }
    this.focusIndex(index);
    if (quiet) {
        return;
    }
    this.currentRowChange(-this.currentRowChange());
    if (!rowId) {
        rowId = this.getRow(index).rowId;
    }
    this.trigger(DataTable.ON_ROW_FOCUS, {
        index: index,
        rowId: rowId
    });
    this.updateCurrIndex();
};

/**
 * 焦点行反选
 * @memberof DataTable
 * @example
 * datatable.setRowUnFocus()
 */
var setRowUnFocus = function setRowUnFocus() {
    this.currentRowChange(-this.currentRowChange());
    var indx = this.focusIndex(),
        rowId = null;
    if (indx !== -1) {
        rowId = this.getRow(indx).rowId;
    }
    this.trigger(DataTable.ON_ROW_UNFOCUS, {
        index: indx,
        rowId: rowId
    });
    this.focusIndex(-1);
    this.updateCurrIndex();
};

/***
 * 数据行发生改变时更新focusindex
 * @memberof DataTable
 * @param  {number} opIndex 发生改变的数据行位置
 * @param  {string} opType  +表示新增行，-表示减少行
 * @param  {number} num     新增/减少的行数
 *
 */
var updateFocusIndex = function updateFocusIndex(opIndex, opType, num) {
    if (!isNumber(num)) {
        num = 1;
    }
    if (opIndex <= this.focusIndex() && this.focusIndex() != -1) {
        if (opType === '+') {
            this.focusIndex(this.focusIndex() + num);
        } else if (opType === '-') {
            if (this.focusIndex() >= opIndex && this.focusIndex() <= opIndex + num - 1) {
                this.focusIndex(-1);
            } else if (this.focusIndex() > opIndex + num - 1) {
                this.focusIndex(this.focusIndex() - num);
            }
        }
    }
};

export var rowFocusFunObj = {
    setRowFocus: setRowFocus,
    setRowUnFocus: setRowUnFocus,
    updateFocusIndex: updateFocusIndex
};