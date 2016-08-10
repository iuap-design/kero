"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero app iwebCore
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-29 09:34:01
 */

var getEnvironment = function getEnvironment() {
    return window.iweb.Core.collectEnvironment();
};

var setClientAttribute = function setClientAttribute(k, v) {
    window.iweb.Core.setClientAttribute(k, v);
};

var getClientAttribute = function getClientAttribute(k) {
    return window.iweb.Core.getClientAttributes()[k];
};

exports.getEnvironment = getEnvironment;
exports.setClientAttribute = setClientAttribute;
exports.getClientAttribute = getClientAttribute;