/**
 * Module : kero dataTable rowSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */
import {isArray, isNumber} from 'neoui-sparrow/js/util';
import {_formatToIndicesArray} from './util';
const setAllRowsSelect = function () {
    var indices = new Array(this.rows().length)
    for (var i = 0; i < indices.length; i++) {
        indices[i] = i
    }
    this.setRowsSelect(indices);
    this.allSelected(true);
    this.trigger(DataTable.ON_ROW_ALLSELECT, {})
}

/**
 * 设置选中行，清空之前已选中的所有行
 */
const setRowSelect = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.setRowsSelect([index])
    this.setRowFocus(this.getSelectedIndex())
}

const setRowsSelect = function (indices) {
    indices = indices || -1;
    if (indices == -1) {
        this.setAllRowsUnSelect({quiet: true})
        return;
    }
    indices = _formatToIndicesArray(indices);
    var sIns = this.selectedIndices();
    if (isArray(indices) && isArray(sIns) && indices.join() == sIns.join()) {
        // 避免与控件循环触发
        return;
    }
    this.setAllRowsUnSelect({quiet: true});
    try{
        this.selectedIndices(indices);
    }catch(e){
        
    }
    
    var rowIds = this.getRowIdsByIndices(indices);
    this.currentRowChange(-this.currentRowChange());
    this.trigger(DataTable.ON_ROW_SELECT, {
        indices: indices,
        rowIds: rowIds
    })
    this.updateCurrIndex();
}


/**
 * 添加选中行，不会清空之前已选中的行
 */
const addRowSelect = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.addRowsSelect([index])
}

/**
 * 添加选中行，不会清空之前已选中的行
 */
const addRowsSelect = function (indices) {
    indices = _formatToIndicesArray(indices)
    var selectedIndices = this.selectedIndices().slice()
    for (var i = 0; i < indices.length; i++) {
        var ind = indices[i], toAdd = true
        for (var j = 0; j < selectedIndices.length; j++) {
            if (selectedIndices[j] == ind) {
                toAdd = false
            }
        }
        if (toAdd) {
            selectedIndices.push(indices[i])
        }
    }
    this.selectedIndices(selectedIndices)
    var rowIds = this.getRowIdsByIndices(indices)
    this.trigger(DataTable.ON_ROW_SELECT, {
        indices: indices,
        rowIds: rowIds
    })
    this.updateCurrIndex();
}

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
    indices = _formatToIndicesArray(indices)
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


 const toggleAllSelect = function(){
    if (this.allSelected()){
        this.setAllRowsUnSelect();
    }else{
        this.setAllRowsSelect();
    }

};


/**
 *
 * @param {Object} index 要处理的起始行索引
 * @param {Object} type   增加或减少  + -
 */
const updateSelectedIndices = function (index, type, num) {
    if (!isNumber(num)) {
        num = 1
    }
    var selectedIndices = this.selectedIndices().slice()
    if (selectedIndices == null || selectedIndices.length == 0)
        return
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        if (type == '+') {
            if (selectedIndices[i] >= index)
                selectedIndices[i] = parseInt(selectedIndices[i]) + num
        }
        else if (type == '-') {
            if (selectedIndices[i] >= index && selectedIndices[i] <= index + num - 1) {
                selectedIndices.splice(i, 1)
            }
            else if (selectedIndices[i] > index + num - 1)
                selectedIndices[i] = selectedIndices[i] - num
        }
    }
    this.selectedIndices(selectedIndices)
}
export {
	setAllRowsSelect,
	setRowSelect,
	setRowsSelect,
	addRowSelect,
	addRowsSelect,
    setAllRowsUnSelect,
    setRowUnSelect,
    setRowsUnSelect,
    toggleAllSelect,
    updateSelectedIndices
}