/**
 * Module : kero dataTable getCurrent
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */


/**
 * 获取当前操作行
 * 规则： focus 行优先，没有focus行时，取第一选中行
 */
const getCurrentRow = function () {
    if (this.focusIndex() != -1)
        return this.getFocusRow()
    var index = this.getSelectedIndex()
    if (index == -1)
        return null
    else
        return this.getRow(index)
}

const getCurrentIndex = function () {
    if (this.focusIndex() != -1)
        return this.focusIndex()
    var index = this.getSelectedIndex()
    if (index == -1)
        return -1
    else
        return index
}

export{
	getCurrentRow,
	getCurrentIndex
}