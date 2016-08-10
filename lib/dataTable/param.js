"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable param
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

var addParam = function addParam(key, value) {
    this.params[key] = value;
};

var addParams = function addParams(params) {
    for (var key in params) {
        this.params[key] = params[key];
    }
};

exports.addParam = addParam;
exports.addParams = addParams;