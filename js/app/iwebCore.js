/**
 * Module : kero app iwebCore
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-29 09:34:01
 */


var getEnvironment = function () {
    return window.iweb.Core.collectEnvironment()
}

var setClientAttribute = function (k, v) {
    window.iweb.Core.setClientAttribute(k, v)
}

var getClientAttribute = function (k) {
    return window.iweb.Core.getClientAttributes()[k]
}

export {
	getEnvironment,
	setClientAttribute,
	getClientAttribute
}