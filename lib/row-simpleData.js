(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.rowSimpleData = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Module : kero dataTable row simpleData
   * Author : liuyk(liuyk@yonyou.com)
   * Date   : 2016-08-08 13:54:01
   */

  /**
   * 设置数据, 只设置字段值
   * @memberof Row
   * @param {object} data 数据信息
   * @param {boject} [status=nrm] 数据行状态
   * @example
   * var data = {
   *   filed1:'value1',
   *   field2:'value2'
   * }
   * datatable.setSimpleData(data)
   * datatable.setSimpleData(data,'upd')
   */
  var setSimpleData = function setSimpleData(data, status) {
    var allData = {};
    allData.data = data;
    allData.status = status || 'nrm';
    this.setData(allData, true);
    this.currentRowChange(-this.currentRowChange());
  };

  var rowSimpleDataFunObj = exports.rowSimpleDataFunObj = {
    setSimpleData: setSimpleData
  };
});