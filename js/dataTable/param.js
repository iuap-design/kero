/**
 * Module : kero dataTable param
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */


var addParam = function (key, value) {
    this.params[key] = value
}

var addParams = function (params) {
    for (var key in params) {
        this.params[key] = params[key]
    }
}

var getParam = function (key) {
    return this.params[key]
}

export {
	addParam,
	addParams,
	getParam
}