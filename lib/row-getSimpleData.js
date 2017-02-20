'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSimpleData = exports.formatValueFun = undefined;

var _rowUtil = require('./row-util');

var _util = require('tinper-sparrow/src/util');

/**
 * Module : kero dataTable row getSimpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
var _getSimpleData = function _getSimpleData(rowObj, data) {
    var _data = {};
    var meta = rowObj.parent.getMeta() || {};
    for (var key in data) {
        if (key === 'meta' || (0, _util.isEmptyObject)(data[key])) {
            continue;
        } else if (data[key].isChild) {
            _data[key] = data[key].value ? data[key].value.getSimpleData() : {};
        } else if (key === '$data') {
            //处理一维数组： [1,2,3]
            _data = data[key].value;
        } else if (typeof data[key].value !== 'undefined') {
            //如果类型为boolean，无论值为false、true都应该等于他本身
            if (meta[key] && meta[key].type === 'boolean') {
                _data[key] = data[key].value ? true : false; //默认值可能是null
            } else {
                _data[key] = data[key].value;
            }
            if (meta[key] && meta[key].type) {
                var obj = {
                    meta: meta,
                    data: data,
                    key: key
                };
                _data[key] = rowObj.formatValueFun(obj, rowObj.parent.dateNoConvert);
            }
        } else if (!data[key].value) {
            _data[key] = data[key].value;
        } else {
            _data[key] = _getSimpleData(rowObj, data[key]);
        }
    }
    return _data;
};

var formatValueFun = function formatValueFun(obj, isDateNoConvert) {
    var meta = obj.meta,
        data = obj.data,
        key = obj.key;
    if (!isDateNoConvert && (meta[key].type == 'date' || meta[key].type == 'datetime')) {
        return (0, _rowUtil._dateToUTCString)(data[key].value);
    }
    return data[key].value;
};

var getSimpleData = function getSimpleData(options) {
    options = options || {};
    var fields = options['fields'] || null;
    var meta = this.parent.getMeta();
    var data = this.data;
    var _data = _getSimpleData(this, data); //{};
    var _fieldsData = {};
    if (fields) {
        for (var key in _data) {
            if (fields.indexOf(key) != -1) {
                _fieldsData[key] = _data[key];
            }
        }
        return _fieldsData;
    }
    return _data;
};

exports.formatValueFun = formatValueFun;
exports.getSimpleData = getSimpleData;