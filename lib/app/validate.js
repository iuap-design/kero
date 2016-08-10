'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Module : kero app validate
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */

/**
 * 控件数据校验
 * @param {Object} element
 */
var compsValidate = function compsValidate(element, retUnpass) {
    var comps = this.getComps(element),
        passed = true,
        unpassed = [];
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].doValidate) {
            var result = comps[i].doValidate({ trueValue: true, showMsg: true });
            result = (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' ? result['passed'] : result;
            passed = result && passed;
            if (!result) unpassed.push(comps[i]);
        }
    }
    if (retUnpass) return unpassed;
    return passed;
};

var compsValidateMultiParam = function compsValidateMultiParam(options) {
    var element = options.element,
        comps = this.getComps(element),
        passed = true,
        showMsg = options.showMsg,
        notPassedArr = new Array();
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].doValidate) {
            result = comps[i].doValidate({ trueValue: true, showMsg: showMsg });
            passed = result.passed && passed;
            if (!result.passed) {
                notPassedArr.push(result);
            }
        }
    }
    return { passed: passed,
        notPassedArr: notPassedArr };
};

exports.compsValidate = compsValidate;
exports.compsValidateMultiParam = compsValidateMultiParam;