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
        global.ref = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Module : kero dataTable ref
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-01 14:34:01
     */

    /**
     * 为选中行绑定监听，当选中行发生改变时触发对应方法
     * @memberof DataTable
     * @param {string} fieldName 绑定的字段名
     * @example
     * datatable.refSelectedRows().subscribe(function(){})
     */
    var refSelectedRows = function refSelectedRows() {
        return ko.pureComputed({
            read: function read() {
                var ins = this.selectedIndices() || [];
                var rs = this.rows();
                var selectedRows = [];
                for (var i = 0; i < ins.length; i++) {
                    selectedRows.push(rs[i]);
                }
                return selectedRows;
            },
            owner: this
        });
    };

    /**
     * 为某个字段绑定监听，当字段发生改变时触发对应方法
     * @memberof DataTable
     * @param {string} fieldName 绑定的字段名
     * @example
     * datatable.ref('field1').subscribe(function(){})
     */
    var ref = function ref(fieldName) {
        this.createField(fieldName);
        if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
        return ko.pureComputed({
            read: function read() {
                this.valueChange[fieldName]();
                this.currentRowChange();
                var row = this.getCurrentRow();
                if (row) {
                    return row.getChildValue(fieldName);
                } else return '';
            },
            write: function write(value) {
                var row = this.getCurrentRow();
                if (row) row.setChildValue(fieldName, value);
            },
            owner: this
        });
    };

    /**
     * 绑定字段属性，当字段属性发生改变时触发对应方法
     * @memberof DataTable
     * @param {string} fieldName 绑定的字段名
     * @param {string} key 绑定的属性key
     * @example
     * datatable.refMeta('field1','type').subscribe(function(){})
     */
    var refMeta = function refMeta(fieldName, key) {
        if (!this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key] = ko.observable(1);
        return ko.pureComputed({
            read: function read() {
                this.metaChange[fieldName + '.' + key]();
                this.currentRowChange();
                return this.getMeta(fieldName, key);
            },
            write: function write(value) {
                this.setMeta(fieldName, key, value);
            },
            owner: this
        });
    };

    /**
     * 绑定当前行的字段属性，当字段属性发生改变时触发对应方法
     * @memberof DataTable
     * @param {string} fieldName 绑定的字段名
     * @param {string} key 绑定的属性key
     * @example
     * datatable.refRowMeta('field1','type').subscribe(function(){})
     */
    var refRowMeta = function refRowMeta(fieldName, key) {
        if (!this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key] = ko.observable(1);
        return ko.pureComputed({
            read: function read() {
                this.metaChange[fieldName + '.' + key]();
                this.currentRowChange();
                var row = this.getCurrentRow();
                if (row) return row.getMeta(fieldName, key);else return this.getMeta(fieldName, key);
            },
            write: function write(value) {
                var row = this.getCurrentRow();
                if (row) row.setMeta(fieldName, value);
            },
            owner: this
        });
    };

    /**
     * 绑定字段是否可修改属性，当字段可修改属性发生改变时触发对应方法
     * @memberof DataTable
     * @param {string} fieldName 绑定的字段名
     * @example
     * datatable.refEnable('field1').subscribe(function(){})
     */
    var refEnable = function refEnable(fieldName) {
        return ko.pureComputed({
            //enable优先级： dataTable.enable >  row上的enable >  field中的enable定义
            read: function read() {
                this.enableChange();
                if (!fieldName) return this.enable;
                var fieldEnable = this.getRowMeta(fieldName, 'enable');
                if (typeof fieldEnable == 'undefined' || fieldEnable == null) fieldEnable = true;
                return fieldEnable && this.enable;
            },
            owner: this
        });
    };

    var refFunObj = exports.refFunObj = {
        refSelectedRows: refSelectedRows,
        ref: ref,
        refMeta: refMeta,
        refRowMeta: refRowMeta,
        refEnable: refEnable
    };
});