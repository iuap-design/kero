/**
 * Module : kero dataTable row util
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
import {isNumber} from 'neoui-sparrow/js/util';

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
    if (this.status != Row.STATUS.NEW)
        this.status = Row.STATUS.UPDATE
    if (this.valueChange[fieldName])
        this.valueChange[fieldName](-this.valueChange[fieldName]())
    if (this.parent.getCurrentRow() == this && this.parent.valueChange[fieldName]){
        this.parent.valueChange[fieldName](-this.parent.valueChange[fieldName]());
    }
    if (this.parent.ns){
        var fName = this.parent.ns + '.' + fieldName;
        if (this.parent.root.valueChange[fName])
            this.parent.root.valueChange[fName](-this.parent.root.valueChange[fName]());
    }

    var event = {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        rowId: this.rowId,
        field: fieldName,
        oldValue: oldValue,
        newValue: this.getValue(fieldName),
        ctx: ctx || ""
    }
    this.parent.trigger(DataTable.ON_VALUE_CHANGE, event);
    this.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, event);
    if (this == this.parent.getCurrentRow())
        this.parent.trigger(fieldName + "." + DataTable.ON_CURRENT_VALUE_CHANGE, event);

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