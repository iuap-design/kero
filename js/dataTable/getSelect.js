/**
 * Module : kero dataTable getSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */


/**
 * 获取选中行索引，多选时，只返回第一个行索引
 */
const getSelectedIndex = function () {
    var selectedIndices = this.selectedIndices()
    if (selectedIndices == null || selectedIndices.length == 0)
        return -1
    return selectedIndices[0]
};

/**
 *获取选中的所有行索引数组索引
 */
const getSelectedIndices = function () {
    var selectedIndices = this.selectedIndices()
    if (selectedIndices == null || selectedIndices.length == 0)
        return []
    return selectedIndices
};

/**
 * 兼容保留，不要用
 */
const getSelectedIndexs = function () {
    return this.getSelectedIndices();
}

/**
 * 获取选中行数据
 */
const getSelectedDatas = function (withEmptyRow) {
    var selectedIndices = this.selectedIndices()
    var datas = []
    var sIndices = []
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        sIndices.push(selectedIndices[i])
    }
    var rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (sIndices.indexOf(i) != -1)
            datas.push(rows[i].getData())
        else if (withEmptyRow == true)
            datas.push(rows[i].getEmptyData())
    }
    return datas
};

/**
 * 取选中行
 */
const getSelectedRows = function (){
    var selectedIndices = this.selectedIndices();
    var selectRows = [];
    var rows = this.rows.peek();
    var sIndices = []
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        sIndices.push(selectedIndices[i])
    }
    for (var i = 0, count = rows.length; i < count; i++) {
        if (sIndices.indexOf(i) != -1)
            selectRows.push(rows[i])
    }
    return selectRows
}

export {
	getSelectedIndex,
	getSelectedIndices,
	getSelectedIndexs,
    getSelectedDatas,
    getSelectedRows
}