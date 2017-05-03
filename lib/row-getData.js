/**
 * Module : kero dataTable row getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
import { rowUtilFunObj } from './row-util';
/**
 * 获取row中某一字段的值
 * @memberof Row
 * @param  {string} fieldName 字段名
 * @return {string}           字段值
 * @example
 * row.getValue('field1')
 */
var getValue = function getValue(fieldName) {
    return rowUtilFunObj._getField(this, fieldName)['value'];
};

//获取子表值 ，如果fieldName对应了一个子表，返回该子表的行数组
var getChildValue = function getChildValue(fieldName) {
    var nameArr = fieldName.split('.');
    var _name = nameArr[0];
    for (var i = 0, count = nameArr.length; i < count; i++) {
        var _value = this.getValue(_name);
        //最后一级
        if (i == count - 1) {
            if (_value instanceof u.DataTable) {
                return _value.rows.peek();
            } else {
                return _value;
            }
        } else {
            if (_value instanceof u.DataTable) {
                _value = _value.getCurrentRow();
                if (!_value) return '';else return _value.getChildValue(fieldName.replace(_name + '.', ''));
            } else {
                _name = _name + '.' + nameArr[i + 1];
            }
        }
    }
    return '';
};

/**
 * 获取数据信息
 * @memberof Row
 * @return {object} 格式如下：{'id': this.rowId, 'status': this.status, data: data}
 * @example
 * row.getData()
 */
var getData = function getData() {
    var data = ko.toJS(this.data);
    var meta = this.parent.getMeta();
    for (var key in meta) {
        if (meta[key] && meta[key].type) {
            if (meta[key].type == 'date' || meta[key].type == 'datetime') {
                if (key.indexOf('.') > 0) {
                    //大于0说明是多级json
                    var keys = key.split('.');
                    var _keyValue = data;
                    for (var i = 0, count = keys.length; i < count; i++) {
                        _keyValue = _keyValue[keys[i]];
                    }
                    _keyValue.value = rowUtilFunObj._dateToUTCString(_keyValue.value);
                } else {
                    data[key].value = rowUtilFunObj._dateToUTCString(data[key].value);
                }
            } else if (meta[key].type == 'child') {
                var chiddt = this.getValue(key),
                    rs = chiddt.rows(),
                    cds = [];
                for (var i = 0; i < rs.length; i++) {
                    cds.push(rs[i].getData());
                }
                data[key].value = JSON.stringify(cds);
            }
        }
    }
    return {
        'id': this.rowId,
        'status': this.status,
        data: data
    };
};

// 获取空数据
var getEmptyData = function getEmptyData() {
    return {
        'id': this.rowId,
        'status': this.status,
        data: {}
    };
};

export var rowGetDataFunObj = {
    getValue: getValue,
    getChildValue: getChildValue,
    getData: getData,
    getEmptyData: getEmptyData
};