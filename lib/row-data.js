(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './row-util', 'tinper-sparrow/src/util'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./row-util'), require('tinper-sparrow/src/util'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.rowUtil, global.util);
        global.rowData = mod.exports;
    }
})(this, function (exports, _rowUtil, _util) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.rowDataFunObj = undefined;


    /**
     * 设置对应字段的值
     * @memberof Row
     * @param {string} fieldName 需要设置的字段
     * @param {string} value     需要设置的值
     * @param {*} [ctx]        自定义属性，在valuechange监听传入对象中可通过ctx获取此处设置
     * @example
     * row.setValue('filed1','value1') // 设置字段值
     * row.setValue('filed1','value1','ctx') //设置字段值，同时传入自定义数据
     */
    /**
     * Module : kero dataTable row getData
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-08 13:54:01
     */
    const setValue = function (fieldName, value, ctx, options) {

        if (arguments.length === 1) {
            value = fieldName;
            fieldName = '$data';
        }
        var oldValue = this.getValue(fieldName);
        if (typeof oldValue == 'undefined' || oldValue === null) oldValue = '';
        if (_rowUtil.rowUtilFunObj.eq(oldValue, value)) return;
        var event = {
            eventType: 'dataTableEvent',
            dataTable: this.parent.id,
            rowId: this.rowId,
            field: fieldName,
            oldValue: oldValue,
            newValue: value,
            ctx: ctx || ""
        };
        var flag = this.parent.triggerReturn(DataTable.ON_BEFORE_VALUE_CHANGE, event);
        if (!flag) {
            _rowUtil.rowUtilFunObj._triggerChange(this, fieldName, oldValue, ctx);
            return;
        }
        _rowUtil.rowUtilFunObj._getField(this, fieldName)['value'] = value;
        _rowUtil.rowUtilFunObj._triggerChange(this, fieldName, oldValue, ctx);
    };

    // 设置字表值，fieldName通过.分隔
    const setChildValue = function (fieldName, value) {
        var nameArr = fieldName.split('.');
        var _name = nameArr[0];
        var _field = this.data[_name]; //_field保存当前_name对应的数据
        for (var i = 0, count = nameArr.length; i < count; i++) {
            //最后一级
            if (i == count - 1) {
                if (_field['value'] instanceof u.DataTable) {
                    //暂不处理
                } else {
                    this.setValue(fieldName, value);
                }
            } else {
                if (_field && _field['value'] instanceof u.DataTable) {
                    var row = _field['value'].getCurrentRow();
                    if (row) row.setChildValue(fieldName.replace(_name + '.', ''), value);
                } else {
                    _name = nameArr[i + 1];
                    _field = _field[_name]; //多层嵌套时_field取子项对应的数据
                }
            }
        }
    };

    // 通过rowid设置字表数据信息
    const setChildSimpleDataByRowId = function (rowId, data) {
        var rowIdArr = rowId.split('.');
        var rowIdLength = rowIdArr.length;
        if (rowIdLength > 1) {
            var _childField = rowIdArr[0]; //子表字段
            var _childObj = this.data[_childField]; // 子表字段存放的obj
            if (_childObj && _childObj['value'] instanceof u.DataTable) {
                var rowId = rowIdArr[1];
                var row = null;
                if (rowId) row = _childObj['value'].getRowByRowId(rowId);
                if (row) {
                    if (rowIdArr.length == 2) {
                        row.setSimpleData(data);
                    } else {
                        row.setChildSimpleDataByRowId(fieldName.replace(_childField + '.' + rowId + '.', ''), data);
                    }
                }
            }
        }
    };

    /***
     * 设置数据的核心方法
     * @param {u.Row} rowObj     Row对象
     * @param {object} sourceData 源对象
     * @param {object} targetData 目标对象
     * @param {boolean} subscribe  是否触发监听，true表示触发监听
     * @param {string} parentKey  datatable的id
     * @param {object} options    设置数据信息是的配置参数
     * @param {boolean} options.fieldFlag   未设置的meta是否进行存储，如果为true则未设置的meta也进行存储
     */
    const _setData = function (rowObj, sourceData, targetData, subscribe, parentKey, options) {
        for (var key in sourceData) {

            // 判断是否要放到dataTable中
            if (options && !options.fieldFlag) {
                if (!rowObj.parent.getMeta(key)) {
                    continue;
                }
            }
            var _parentKey = parentKey || null;
            //if (targetData[key]) {
            targetData[key] = targetData[key] || {};
            var valueObj = sourceData[key];

            // if (typeof valueObj != 'object'){
            //     if(typeof options == 'object'){
            //         if(options.fieldFlag) {
            //             rowObj.parent.createField(key);
            //         }
            //     }
            // }

            //if (typeof this.parent.meta[key] === 'undefined') continue;
            if (valueObj == null || typeof valueObj != 'object') {
                // 子表的话只有valueObj为datatable的时候才赋值
                if (!targetData[key].isChild) {
                    targetData[key]['value'] = rowObj.formatValue(key, valueObj);
                }
                if (subscribe === true && oldValue !== targetData[key]['value']) {
                    _rowUtil.rowUtilFunObj._triggerChange(rowObj, key, oldValue);
                }
            } else {
                if (valueObj.error) {
                    if (u.showMessageDialog) u.showMessageDialog({
                        title: "警告",
                        msg: valueObj.error,
                        backdrop: true
                    });else alert(valueObj.error);
                } else if (valueObj.value || valueObj.value === null || valueObj.meta || valueObj.value === '' || valueObj.value === '0' || valueObj.value === 0) {
                    var oldValue = targetData[key]['value'];
                    targetData[key]['value'] = rowObj.formatValue(key, valueObj.value);
                    if (subscribe === true && oldValue !== targetData[key]['value']) {
                        _rowUtil.rowUtilFunObj._triggerChange(rowObj, key, oldValue);
                    }
                    for (var k in valueObj.meta) {
                        rowObj.setMeta(key, k, valueObj.meta[k]);
                    }
                } else if ((0, _util.isArray)(valueObj)) {
                    targetData[key].isChild = true;
                    //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
                    var _key = _parentKey == null ? key : _parentKey + '.' + key;
                    var ns = rowObj.parent.ns === '' ? key : rowObj.parent.ns + '.' + _key;
                    if (rowObj.parent.meta[_key]) {
                        var meta = rowObj.parent.meta[_key]['meta'];
                        targetData[key].value = new u.DataTable({
                            root: rowObj.parent.root,
                            ns: ns,
                            meta: meta
                        });
                        targetData[key].value.setSimpleData(valueObj);
                    }
                } else {
                    _parentKey = _parentKey == null ? key : _parentKey + '.' + key;
                    _setData(rowObj, valueObj, targetData[key], null, _parentKey, options);
                }
            }
            //}
        }
    };

    /**
     * 设置row的数据信息
     * @memberof Row
     * @param {object} data      需要设置的配置信息
     * @param {boolean} [subscribe] 是否触发监听，true表示触发监听
     * @param {object} [options]   设置数据信息是的配置参数
     * @param {boolean} [options.fieldFlag]   未设置的meta是否进行存储，如果为true则未设置的meta也进行存储
     * @example
     * var data = {
     *   filed1:'value1',
     *   field2:'value2'
     * }
     * row.setData(data)
     * row.setData(data,false)
     * row.setData(data),false,{fieldFlag:true})
     */
    const setData = function (data, subscribe, options) {
        var sourceData = data.data,
            targetData = this.data;
        if (this.parent.root.strict != true) {
            _setData(this, sourceData, targetData, subscribe, null, options);
            this.setStatus(data.status);
            return;
        }

        // strict 为true 时 ，定义dataTable的时候必须定义所有字段信息才能设置数据。
        var meta = this.parent.meta;
        for (var key in meta) {
            var oldValue = newValue = null;
            //子数据
            if (meta[key]['type'] && meta[key]['type'] === 'child') {
                targetData[key].isChild = true;
                //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
                var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key;
                var meta = this.parent.meta[key]['meta'];
                targetData[key].value = new u.DataTable({
                    root: this.parent.root,
                    ns: ns,
                    meta: meta
                });
                if (typeof sourceData[key] === 'object') targetData[key].value.setSimpleData(sourceData[key]);
            }
            //存在多级关系
            else if (key.indexOf('.') != -1) {
                    var keys = key.split('.');
                    var _fieldValue = sourceData;
                    var _targetField = targetData;
                    for (var i = 0; i < keys.length; i++) {
                        _fieldValue = _fieldValue || {};
                        _fieldValue = _fieldValue[keys[i]];
                        _targetField = _targetField[keys[i]];
                    }
                    oldValue = _targetField['value'];
                    _targetField['value'] = this.formatValue(key, _fieldValue);
                    newValue = _targetField['value'];
                }
                // 通过 setSimpleData 设置的数据
                else if (sourceData[key] == null || typeof sourceData[key] != 'object') {
                        oldValue = targetData[key]['value'];
                        targetData[key]['value'] = this.formatValue(key, sourceData[key]);
                        newValue = targetData[key]['value'];
                    } else {
                        var valueObj = sourceData[key];
                        if (valueObj.error) {
                            if (u.showMessageDialog) u.showMessageDialog({
                                title: "警告",
                                msg: valueObj.error,
                                backdrop: true
                            });else alert(valueObj.error);
                        } else if (valueObj.value || valueObj.value === null || valueObj.meta) {
                            oldValue = targetData[key]['value'];
                            targetData[key]['value'] = this.formatValue(key, valueObj.value);
                            newValue = targetData[key]['value'];
                            for (var k in valueObj.meta) {
                                this.setMeta(key, k, valueObj.meta[k]);
                            }
                        }
                    }
            if (subscribe === true && oldValue !== newValue) {
                _rowUtil.rowUtilFunObj._triggerChange(this, key, oldValue);
            }
        }
    };

    // 效果同setData
    const updateRow = function (row) {
        this.setData(row);
    };

    /**
     * 设置row的status属性
     * @memberof Row
     * @param {string} status      需要设置的status
     * @example
     * row.setStatus(Row.STATUS.NORMAL)
     */
    const setStatus = function (status) {
        this.status = status;
        if (status == Row.STATUS.NORMAL) {
            // 保存baseValue，用于重置
            var data = this.data;
            for (var field in data) {
                var value = data[field].value;
                data[field].baseValue = value;
            }
        }
    };

    /**
     * 重置数据至nrm状态时的数据
     * @example
     * row.resetValue()
     */
    const resetValue = function () {
        var data = this.data;
        for (var field in data) {
            var value = data[field].baseValue;
            this.setValue(field, value);
        }
    };

    const rowDataFunObj = exports.rowDataFunObj = {
        setValue: setValue,
        setChildValue: setChildValue,
        setChildSimpleDataByRowId: setChildSimpleDataByRowId,
        setData: setData,
        updateRow: updateRow,
        setStatus: setStatus,
        resetValue: resetValue
    };
});