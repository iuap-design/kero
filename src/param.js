/**
 * Module : kero dataTable param
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/**
 * 增加Param参数
 * @memberof DataTable
 * @param {string} key   需要增加的key值
 * @param {*} value 需要增加的具体指
 * @example
 * datatable.addParam('precision','3')
 */
const addParam = function (key, value) {
    this.params[key] = value
}

/**
 * 增加多个Param参数
 * @memberof DataTable
 * @param {object} params 需要增加的Param对象
 * @example
 * var paramsObj = {
 *  'precision':'3',
 *  'default':'1.234'
 * }
 * datatable.addParams(paramsObj)
 */
const addParams = function (params) {
    for (var key in params) {
        this.params[key] = params[key]
    }
}


export {
	addParam,
	addParams
}
