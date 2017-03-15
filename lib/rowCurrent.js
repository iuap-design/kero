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
        global.rowCurrent = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /***
     * Module : kero dataTable rowCurrent
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-08 09:59:01
     */

    // 更新当前行对应索引
    const updateCurrIndex = function () {
        var currentIndex = this.focusIndex() != -1 ? this.focusIndex() : this.getSelectedIndex();
        if (this._oldCurrentIndex != currentIndex) {
            this._oldCurrentIndex = currentIndex;
            this.trigger(DataTable.ON_CURRENT_ROW_CHANGE);
            this.currentRowChange(-this.currentRowChange());
            if (this.ns) {
                if (this.root.valueChange[this.ns]) this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
            }
        }
    };

    const rowCurrentFunObj = exports.rowCurrentFunObj = {
        updateCurrIndex: updateCurrIndex
    };
});