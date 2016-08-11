/**
 * Module : kero dataTable page data
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

import {showMessageDialog} from 'neoui/js/neoui-message';

const setRowValue = function (rowIndex, fieldName, value) {
    var row = this.rows[rowIndex]
    if (row) {
        row.data[fieldName]['value'] = value
        if (row.status != Row.STATUS.NEW)
            row.status = Row.STATUS.UPDATE
    }
}




const updateRow = function (originRow, newRow) {
    originRow.status = originRow.status
    //this.rowId = data.rowId
    if (!newRow.data) return;
    for (var key in newRow.data) {
        if (originRow.data[key]) {
            var valueObj = newRow.data[key]
            if (typeof valueObj == 'string' || typeof valueObj == 'number' || valueObj === null)
                originRow.data[key]['value'] = valueObj
            //this.setValue(key, this.formatValue(key, valueObj))
            else {
//					this.setValue(key, valueObj.value)

                if (valueObj.error) {
                    showMessageDialog({title: "警告", msg: valueObj.error, backdrop: true});
                } else {
                    //this.setValue(key, this.formatValue(key, valueObj.value), null)
                    originRow.data[key]['value'] = valueObj.value
                    for (var k in valueObj.meta) {
                        originRow.data[key]['meta'] = originRow.data[key]['meta'] || {}
                        originRow.data[key]['meta'][k] = valueObj.meta[k]
                    }
                }
            }
        }
    }
}

export {
	setRowValue,
	updateRow
}