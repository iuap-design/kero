(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.getParam = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Module : kero dataTable getParam
   * Author : liuyk(liuyk@yonyou.com)
   * Date	  : 2016-07-30 14:34:01
   */

  /**
   * 获取Param参数值
   * @memberof DataTable
   * @param  {string} key Param对应的key
   * @return {*}     Param参数值
   * @example
   * datatable.getParam('param1')
   */
  const getParam = function (key) {
    return this.params[key];
  };

  const getParamFunObj = exports.getParamFunObj = {
    getParam: getParam
  };
});