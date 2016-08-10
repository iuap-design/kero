'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.refEnum = exports.refDate = exports.refCombo = exports.refMeta = exports.ref = undefined;

var _util = require('neoui-sparrow/lib/util');

var _dateUtils = require('neoui-sparrow/lib/util/dateUtils');

var _util2 = require('./util');

var ref = function ref(fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.valueChange[fieldName]();
            this.currentRowChange();
            return this.getChildValue(fieldName);
            //var value = this._getField(fieldName)['value'];
            //return value;
        },
        write: function write(value) {
            this.setChildValue(fieldName, value);
            //this.setValue(fieldName, value)
        },
        owner: this
    });
}; /**
    * Module : kero dataTable row ref
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-08-08 13:54:01
    */


var refMeta = function refMeta(fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.metaChange[fieldName + '.' + key]();
            return this.getMeta(fieldName, key);
        },
        write: function write(value) {
            this.setMeta(fieldName, key, value);
        },
        owner: this
    });
};
var refCombo = function refCombo(fieldName, datasource) {
    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.valueChange[fieldName]();
            this.currentRowChange();
            var ds = (0, _util.getJSObject)(this.parent.parent, datasource);
            if ((0, _util2._getField)(fieldName)['value'] === undefined || (0, _util2._getField)(fieldName)['value'] === "") return "";
            var v = (0, _util2._getField)(fieldName)['value'];
            var valArr = typeof v === 'string' ? v.split(',') : [v];

            var nameArr = [];

            for (var i = 0, length = ds.length; i < length; i++) {
                for (var j = 0; j < valArr.length; j++) {
                    var value = ds[i]['pk'] || ds[i]['value'] || '';
                    if (value == valArr[j]) {
                        nameArr.push(ds[i].name);
                    }
                }
            }

            return nameArr.toString();
        },
        write: function write(value) {

            this.setValue(fieldName, value);
        },
        owner: this
    });
};
var refDate = function refDate(fieldName, format) {
    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!(0, _util2._getField)(fieldName)['value']) return "";
            var valArr = (0, _util2._getField)(fieldName)['value'];
            if (!valArr) return "";
            valArr = _dateUtils.date.format(valArr, format); //moment(valArr).format(format)
            return valArr;
        },
        write: function write(value) {

            this.setValue(fieldName, value);
        },
        owner: this
    });
};

// 刘云燕提交
var refEnum = function refEnum(fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!(0, _util2._getField)(fieldName)['value']) return "";
            var valArr = (0, _util2._getField)(fieldName)['value'];
            if (!valArr) return "";
            if (valArr == "N") valArr = "否";else if (valArr == "Y") valArr = "是";
            return valArr;
        },
        write: function write(value) {

            this.setValue(fieldName, value);
        },
        owner: this
    });
};

exports.ref = ref;
exports.refMeta = refMeta;
exports.refCombo = refCombo;
exports.refDate = refDate;
exports.refEnum = refEnum;