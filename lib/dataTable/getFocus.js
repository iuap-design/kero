"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Module : kero dataTable getFocus
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 获取焦点行
 */
var getFocusRow = function getFocusRow() {
  if (this.focusIndex() != -1) return this.getRow(this.focusIndex());else return null;
};

/**
 * 获取焦点行
 */
var getFocusIndex = function getFocusIndex() {
  return this.focusIndex();
};

exports.getFocusRow = getFocusRow;
exports.getFocusIndex = getFocusIndex;