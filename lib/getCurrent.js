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
        global.getCurrent = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Module : kero DataTable getCurrent
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-08 09:59:01
     */

    /**
     * 获取DataTable对象的当前行
     * @memberof DataTable
     * @return {null|u.Row} DataTable对象的当前行
     * @example
     * datatable.getCurrentRow()
     */
    var getCurrentRow = function getCurrentRow() {
        if (this.focusIndex() != -1) return this.getFocusRow();
        var index = this.getSelectedIndex();
        if (index == -1) return null;else return this.getRow(index);
    };
    /**
     * 获取DataTable对象的当前行对应的index
     * @memberof DataTable
     * @return {number} DataTable对象的当前行对应的index
     * @example
     * datatable.getCurrentIndex()
     */
    var getCurrentIndex = function getCurrentIndex() {
        if (this.focusIndex() != -1) return this.focusIndex();
        var index = this.getSelectedIndex();
        if (index == -1) return -1;else return index;
    };

    var getCurrentFunObj = exports.getCurrentFunObj = {
        getCurrentRow: getCurrentRow,
        getCurrentIndex: getCurrentIndex
    };
});