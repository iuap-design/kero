'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSimpleData = undefined;

var _util = require('./util');

var _util2 = require('neoui-sparrow/lib/util');

/**
 * Module : kero dataTable row getSimpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
var _getSimpleData = function _getSimpleData(data) {
    var _data = {};
    var meta = this.parent.getMeta() || {};
    for (var key in data) {
        if (key === 'meta' || (0, _util2.isEmptyObject)(data[key])) {
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
                if (meta[key].type == 'date' || meta[key].type == 'datetime') {

                    _data[key] = (0, _util._dateToUTCString)(data[key].value);
                }
            }
        } else {
            _data[key] = this._getSimpleData(data[key]);
        }
    }
    return _data;
};

var getSimpleData = function getSimpleData(options) {
    options = options || {};
    var fields = options['fields'] || null;
    var meta = this.parent.getMeta();
    var data = this.data;
    var _data = this._getSimpleData(data); //{};
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

exports.getSimpleData = getSimpleData;