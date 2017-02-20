/**
 * Module : kero dataTable param
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */


const addParam = function (key, value) {
    this.params[key] = value
}

const addParams = function (params) {
    for (var key in params) {
        this.params[key] = params[key]
    }
}


export {
	addParam,
	addParams
}