'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Module : kero dataTable row simpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */

var setSimpleData = function setSimpleData(data, status) {
  var allData = {};
  allData.data = data;
  allData.status = status || 'nrm';
  this.setData(allData, true);
  this.currentRowChange(-this.currentRowChange());
};

exports.setSimpleData = setSimpleData;