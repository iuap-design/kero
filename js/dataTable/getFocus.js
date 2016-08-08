/**
 * Module : kero dataTable getFocus
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 获取焦点行
 */
const getFocusRow = function () {
    if (this.focusIndex() != -1)
        return this.getRow(this.focusIndex())
    else
        return null
}


/**
 * 获取焦点行
 */
const getFocusIndex = function () {
    return this.focusIndex()
}
