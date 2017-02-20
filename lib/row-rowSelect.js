'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable row rowSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */

var toggleSelect = function toggleSelect(type) {
    var index = this.parent.getRowIndex(this);
    var selectindices = this.parent.getSelectedIndices();
    if (selectindices.indexOf(index) != -1) {
        this.parent.setRowUnSelect(index);
    } else {
        if (type === 'single') this.parent.setRowSelect(index);else this.parent.addRowSelect(index);
    }
};

/**
 * 行点击事件
 */
var singleSelect = function singleSelect() {
    this.toggleSelect('single');
};

var multiSelect = function multiSelect() {
    this.toggleSelect('multi');
};

exports.toggleSelect = toggleSelect;
exports.singleSelect = singleSelect;
exports.multiSelect = multiSelect;