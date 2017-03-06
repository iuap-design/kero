/**
 * Module : kero dataTable row ref
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
import {getJSObject} from 'tinper-sparrow/src/util';
import {date} from 'tinper-sparrow/src/util/dateUtils';
import {_getField} from './row-util';

/**
 * 为某个字段绑定监听，当字段发生改变时触发对应方法
 * @memberof Row
 * @param {string} fieldName 绑定的字段名
 * @example
 * row.ref('field1').subscribe(function(){})
 */
const ref = function (fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            return this.getChildValue(fieldName)
            //var value = this._getField(fieldName)['value'];
            //return value;
        },
        write: function (value) {
            this.setChildValue(fieldName, value);
            //this.setValue(fieldName, value)
        },
        owner: this
    })
}


/**
 * 绑定字段属性，当字段属性发生改变时触发对应方法
 * @memberof Row
 * @param {string} fieldName 绑定的字段名
 * @param {string} key 绑定的属性key
 * @example
 * row.refMeta('field1','type').subscribe(function(){})
 */
const refMeta = function (fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.metaChange[fieldName + '.' + key]()
            return this.getMeta(fieldName, key)
        },
        write: function (value) {
            this.setMeta(fieldName, key, value)
        },
        owner: this
    })
}

/**
 * 为某个字段绑定监听，当字段发生改变时触发对应方法，针对下拉字段根据key转化为对应的value
 * @memberof Row
 * @param {string} fieldName 绑定的字段名
 * @param {string} datasource 下拉数据源变量名
 * @example
 * row.refCombo('field1','source1').subscribe(function(){})
 */
const refCombo = function (fieldName, datasource) {
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            var ds = getJSObject(this.parent.parent, datasource)
            if (_getField(this, fieldName)['value'] === undefined || _getField(this, fieldName)['value'] === "") return "";
            var v = _getField(this, fieldName)['value'];
            var valArr = typeof v === 'string' ? v.split(',') : [v];

            var nameArr = []

            for (var i = 0, length = ds.length; i < length; i++) {
                for (var j = 0; j < valArr.length; j++) {
                    var value = ds[i]['pk'] || ds[i]['value'] || '';
                    if (value == valArr[j]) {
                        nameArr.push(ds[i].name)
                    }
                }
            }

            return nameArr.toString();
        },
        write: function (value) {

            this.setValue(fieldName, value)
        },
        owner: this
    })
}

/**
 * 为某个字段绑定监听，当字段发生改变时触发对应方法，针对日期字段进行格式化
 * @memberof Row
 * @param {string} fieldName 绑定的字段名
 * @param {string} format 格式化规则
 * @example
 * row.refDate('field1','YYYY-MM-DD').subscribe(function(){})
 */
const refDate = function (fieldName, format) {
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!_getField(this, fieldName)['value']) return "";
            var valArr = _getField(this, fieldName)['value']
            if (!valArr) return "";
            valArr = date.format(valArr, format); //moment(valArr).format(format)
            return valArr;
        },
        write: function (value) {

            this.setValue(fieldName, value)
        },
        owner: this
    })
}

// 针对boolean类型进行转化，项目个性化代码，刘云燕提交
const refEnum = function (fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!_getField(this, fieldName)['value']) return "";
            var valArr = _getField(this, fieldName)['value']
            if (!valArr) return "";
            if(valArr == "N")
                valArr = "否";
            else if(valArr == "Y")
                valArr = "是";
            return valArr;
        },
        write: function (value) {

            this.setValue(fieldName, value)
        },
        owner: this
    })
}

export {
	ref,
	refMeta,
	refCombo,
	refDate,
	refEnum
}
