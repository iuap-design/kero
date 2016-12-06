/**
 * Module : kero dataTable row util
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
import {isNumber} from 'tinper-sparrow/js/util';

const eq = function (a, b) {
    if ((a === null || a === undefined || a === '') && (b === null || b === undefined || b === '')) return true;
    if (isNumber(a) && isNumber(b) && parseFloat(a) == parseFloat(b)) return true;
    if (a + '' == b + '')  return true;
    return false;
}


const _formatDate = function (value) {
    if (!value) return value
    var date = new Date();
    date.setTime(value);
    //如果不能转为Date 直接返回原值
    if (isNaN(date)){
        return value
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (parseInt(month) < 10) month = "0" + month;
    var day = date.getDate();
    if (parseInt(day) < 10) day = "0" + day;
    var hours = date.getHours();
    if (parseInt(hours) < 10) hours = "0" + hours;
    var minutes = date.getMinutes();
    if (parseInt(minutes) < 10) minutes = "0" + minutes;
    var seconds = date.getSeconds();
    if (parseInt(seconds) < 10) seconds = "0" + seconds;
    var mill = date.getMilliseconds();
    var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds ; //+ "." + mill;
    return formatString;
}

const _dateToUTCString = function (date) {
    if (!date) return ''
    if(typeof date==='number')
        return date
    if (date.indexOf("-") > -1)
        date = date.replace(/\-/g, "/");
    var utcString = Date.parse(date);
    if (isNaN(utcString)) return "";
    return utcString;
}

const _triggerChange = function(rowObj,fieldName, oldValue, ctx){
    _getField(rowObj, fieldName).changed = true
    if (rowObj.status != Row.STATUS.NEW)
        rowObj.status = Row.STATUS.UPDATE
    if (rowObj.valueChange[fieldName])
        rowObj.valueChange[fieldName](-rowObj.valueChange[fieldName]())
    if (rowObj.parent.getCurrentRow() == rowObj && rowObj.parent.valueChange[fieldName]){
        rowObj.parent.valueChange[fieldName](-rowObj.parent.valueChange[fieldName]());
    }
    if (rowObj.parent.ns){
        var fName = rowObj.parent.ns + '.' + fieldName;
        if (rowObj.parent.root.valueChange[fName])
            rowObj.parent.root.valueChange[fName](-rowObj.parent.root.valueChange[fName]());
    }

    var event = {
        eventType: 'dataTableEvent',
        dataTable: rowObj.parent.id,
        rowId: rowObj.rowId,
        field: fieldName,
        oldValue: oldValue,
        newValue: rowObj.getValue(fieldName),
        ctx: ctx || "",
        rowObj: rowObj
    }
    rowObj.parent.trigger(DataTable.ON_VALUE_CHANGE, event);
    rowObj.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, event);
    if (rowObj == rowObj.parent.getCurrentRow())
        rowObj.parent.trigger(fieldName + "." + DataTable.ON_CURRENT_VALUE_CHANGE, event);

    // 对于多级字表需要触发顶层div的valuechange事件
    if (rowObj.parent.ns){
        event.fullField = fName;
        event.ns = rowObj.parent.ns;
        rowObj.parent.root.trigger(DataTable.ON_VALUE_CHANGE, event);
        rowObj.parent.root.trigger(fName + "." + DataTable.ON_VALUE_CHANGE, event);
    }

};

/**
 * 格式化数据值
 * @private
 * @param {Object} field
 * @param {Object} value
 */
const formatValue = function (field, value) {
    var type = this.parent.getMeta(field, 'type')
    if (!type) return value
    if (type == 'date' || type == 'datetime') {
        return _formatDate(value)
    }
    return value
}


const _findField = function(rowObj, fieldName){
    var rat = rowObj.data[fieldName];
    if (!rat) {
        var fnames = fieldName.split('.'); //多级field
        if (fnames.length > 1){
            var tempField = rowObj.data;
            for (var i = 0; i < fnames.length; i++){
                tempField = tempField[fnames[i]];
                if(tempField.value instanceof DataTable){
                    var row = tempField.value.getCurrentRow();
                    if(row){
                        tempField = row.data;
                    }
                }
                if (!tempField){
                    break;
                }
            }
            rat = tempField;
        }
    }
    return rat || null;

}

const _getField = function (rowObj, fieldName) {
    var rat = _findField(rowObj, fieldName);
    if (!rat) {
        var msg = 'field:' + fieldName + ' not exist in dataTable:' + rowObj.parent.root.id + '!'
        console.error(msg);
        throw new Error(msg);
    }
    return rat;
}


export {
	eq,
	_dateToUTCString,
	_triggerChange,
	formatValue, //需要最终产出
	_getField,
    _findField
}