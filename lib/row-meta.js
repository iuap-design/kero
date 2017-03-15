(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './row-util'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./row-util'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.rowUtil);
        global.rowMeta = mod.exports;
    }
})(this, function (exports, _rowUtil) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.rowMetaFunObj = undefined;


    /**
     * 设置meta信息
     * @memberof Row
     * @param {string} fieldName 需要设置meta信息的字段名
     * @param {string} key       meta信息的key
     * @param {string} value     meta信息的值
     * @example
     * row.setMeta('filed1','type','string')
     */
    const setMeta = function (fieldName, key, value) {
        var meta = _rowUtil.rowUtilFunObj._getField(this, fieldName).meta;
        if (!meta) meta = _rowUtil.rowUtilFunObj._getField(this, fieldName).meta = {};
        var oldValue = meta[key];
        if (_rowUtil.rowUtilFunObj.eq(oldValue, value)) return;
        meta[key] = value;
        //this.metaChange(- this.metaChange())
        if (this.metaChange[fieldName + '.' + key]) {
            this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
        }

        if (key == 'enable') this.parent.enableChange(-this.parent.enableChange());
        if (this.parent.getCurrentRow() == this) {
            if (this.parent.metaChange[fieldName + '.' + key]) this.parent.metaChange[fieldName + '.' + key](-this.parent.metaChange[fieldName + '.' + key]());
            this.parent.trigger(fieldName + '.' + key + '.' + DataTable.ON_CURRENT_META_CHANGE, {
                eventType: 'dataTableEvent',
                dataTable: this.parent.id,
                oldValue: oldValue,
                newValue: value
            });
            //this.parent.metaChange(- this.parent.metaChange())
        }
        this.parent.trigger(DataTable.ON_ROW_META_CHANGE, {
            eventType: 'dataTableEvent',
            dataTable: this.parent.id,
            field: fieldName,
            meta: key,
            oldValue: oldValue,
            newValue: value,
            row: this
        });

        this.parent.trigger(fieldName + '.' + key + '.' + DataTable.ON_ROW_META_CHANGE, {
            eventType: 'dataTableEvent',
            dataTable: this.parent.id,
            field: fieldName,
            meta: key,
            oldValue: oldValue,
            newValue: value,
            row: this
        });
    }; /**
        * Module : kero dataTable row meta
        * Author : liuyk(liuyk@yonyou.com)
        * Date   : 2016-08-08 13:54:01
        */
    const rowMetaFunObj = exports.rowMetaFunObj = {
        setMeta: setMeta
    };
});