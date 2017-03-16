(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.pageData = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Module : kero dataTable page data
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-08 09:59:01
     */

    /**
     * 根据行序号设置字段值
     * @memberof Page
     * @param {number} rowIndex  行序号
     * @param {string} fieldName 字段名称
     * @param {string} value     字段值
     * @example
     * page.setRowValue(1,'field1','value1')
     */
    const setRowValue = function (rowIndex, fieldName, value) {
        var row = this.rows[rowIndex];
        if (row) {
            row.data[fieldName]['value'] = value;
            if (row.status != Row.STATUS.NEW) row.setStatus(Row.STATUS.UPDATE);
        }
    };

    // 通过row对象更新row对象，不建议次方法
    const updateRow = function (originRow, newRow) {
        // originRow.status = originRow.status
        //this.rowId = data.rowId
        if (!newRow.data) return;
        for (var key in newRow.data) {
            if (originRow.data[key]) {
                var valueObj = newRow.data[key];
                if (typeof valueObj == 'string' || typeof valueObj == 'number' || valueObj === null) originRow.data[key]['value'] = valueObj;
                //this.setValue(key, this.formatValue(key, valueObj))
                else {
                        //					this.setValue(key, valueObj.value)

                        if (valueObj.error) {
                            if (u.showMessageDialog) u.showMessageDialog({
                                title: "警告",
                                msg: valueObj.error,
                                backdrop: true
                            });else alert(valueObj.error);
                        } else {
                            //this.setValue(key, this.formatValue(key, valueObj.value), null)
                            originRow.data[key]['value'] = valueObj.value;
                            for (var k in valueObj.meta) {
                                originRow.data[key]['meta'] = originRow.data[key]['meta'] || {};
                                originRow.data[key]['meta'][k] = valueObj.meta[k];
                            }
                        }
                    }
            }
        }
    };

    const pageDataFunObj = exports.pageDataFunObj = {
        setRowValue: setRowValue,
        updateRow: updateRow
    };
});