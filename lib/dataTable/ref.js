'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable ref
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
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
        }, owner: this
    });
};

/**
 * 绑定字段值
 * @param {Object} fieldName
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
 * 绑定字段属性
 * @param {Object} fieldName
 * @param {Object} key
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

exports.refSelectedRows = refSelectedRows;
exports.ref = ref;
exports.refMeta = refMeta;
exports.refRowMeta = refRowMeta;
exports.refEnable = refEnable;