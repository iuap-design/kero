/**
 * Module : kero dataTable ref
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */

const refSelectedRows = function () {
    return ko.pureComputed({
        read: function () {
            var ins = this.selectedIndices() || []
            var rs = this.rows()
            var selectedRows = []
            for (var i = 0; i < ins.length; i++) {
                selectedRows.push(rs[i])
            }
            return selectedRows
        }, owner: this
    })
}


/**
 * 绑定字段值
 * @param {Object} fieldName
 */
const ref = function (fieldName) {
    this.createField(fieldName);
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            var row = this.getCurrentRow()
            if (row) {
                return row.getChildValue(fieldName)
            }
            else
                return ''
        },
        write: function (value) {
            var row = this.getCurrentRow()
            if (row)
                row.setChildValue(fieldName, value);
        },
        owner: this
    })
}

const refByRow = function(obj){
    var fieldName = obj.fieldName,
    fullField = obj.fullField;
    this.createField(fieldName);
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            var row,index = obj.index + '';
            var childRowObj = {
                fullField: fullField,
                index: index
            }
            row = this.getChildRow(childRowObj);
            
            if (row) {
                return row.getChildValue(fieldName)
            }
            else
                return ''
        },
        write: function (value) {
            var row;
            if(obj.index > -1)
                row = this.getRow(obj.index)
            if (row)
                row.setChildValue(fieldName, value);
        },
        owner: this
    })
}
/**
 * 绑定字段属性
 * @param {Object} fieldName
 * @param {Object} key
 */
const refMeta = function (fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.metaChange[fieldName + '.' + key]();
            this.currentRowChange();
            return this.getMeta(fieldName, key)
        },
        write: function (value) {
            this.setMeta(fieldName, key, value)
        },
        owner: this
    })
}

const refRowMeta = function (fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.metaChange[fieldName + '.' + key]();
            this.currentRowChange();
            var row = this.getCurrentRow()
            if (row)
                return row.getMeta(fieldName, key)
            else
                return this.getMeta(fieldName, key)
        },
        write: function (value) {
            var row = this.getCurrentRow()
            if (row)
                row.setMeta(fieldName, value)
        },
        owner: this
    })
}


const refEnable = function (fieldName) {
    return ko.pureComputed({
        //enable优先级： dataTable.enable >  row上的enable >  field中的enable定义
        read: function () {
            this.enableChange();
            if (!fieldName)
                return this.enable;
            var fieldEnable = this.getRowMeta(fieldName, 'enable')
            if (typeof fieldEnable == 'undefined' || fieldEnable == null)
                fieldEnable = true;
            return fieldEnable && this.enable
        },
        owner: this
    })
}

export {
    refSelectedRows,
    ref,
    refMeta,
    refRowMeta,
    refEnable,
    refByRow,
}