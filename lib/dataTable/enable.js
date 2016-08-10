'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable enable
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

var isEnable = function isEnable(fieldName) {
    var fieldEnable = this.getMeta(fieldName, 'enable');
    if (typeof fieldEnable == 'undefined' || fieldEnable == null) fieldEnable = true;
    return fieldEnable && this.enable;
};

var setEnable = function setEnable(enable) {
    if (this.enable == enable) return;
    //当传入的参数不为false时，默认enable为true
    if (enable === false) {
        enable = false;
    } else {
        enable = true;
    }
    this.enable = enable;
    this.enableChange(-this.enableChange());
    this.trigger(DataTable.ON_ENABLE_CHANGE, {
        enable: this.enable
    });
};

exports.isEnable = isEnable;
exports.setEnable = setEnable;