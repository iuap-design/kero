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
        global.getFocus = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Module : kero dataTable getFocus
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-08 09:59:01
     */

    /**
     * 获取焦点行
     * @memberof DataTable
     * @return {u.Row} 焦点行
     * @example
     * datatable.getFocusRow()
     */
    var getFocusRow = function getFocusRow() {
        if (this.focusIndex() != -1) return this.getRow(this.focusIndex());else return null;
    };

    /**
     * 获取焦点行索引
     * @memberof DataTable
     * @return {number} 焦点行索引
     * @example
     * datatable.getFocusIndex()
     */
    var getFocusIndex = function getFocusIndex() {
        return this.focusIndex();
    };

    var getFocusFunObj = exports.getFocusFunObj = {
        getFocusRow: getFocusRow,
        getFocusIndex: getFocusIndex
    };
});