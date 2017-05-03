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
var getParam = function getParam(key) {
  return this.params[key];
};

export var getParamFunObj = {
  getParam: getParam
};