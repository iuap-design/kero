/**
 * Module : kero app iwebCore
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-29 09:34:01
 */


const getEnvironment = function () {
    return window.iweb.Core.collectEnvironment()
}

const setClientAttribute = function (k, v) {
    window.iweb.Core.setClientAttribute(k, v)
}

const getClientAttribute = function (k) {
    return window.iweb.Core.getClientAttributes()[k]
}

export {
	getEnvironment,
	setClientAttribute,
	getClientAttribute
}