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
        global.param = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
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
    var addParam = function addParam(key, value) {
        this.params[key] = value;
    };

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
    var addParams = function addParams(params) {
        for (var key in params) {
            this.params[key] = params[key];
        }
    };

    var paramFunObj = exports.paramFunObj = {
        addParam: addParam,
        addParams: addParams
    };
});