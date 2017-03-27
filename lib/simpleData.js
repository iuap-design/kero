(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'tinper-sparrow/src/util'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('tinper-sparrow/src/util'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.util);
        global.simpleData = mod.exports;
    }
})(this, function (exports, _util) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.simpleDataFunObj = undefined;


    /**
     * 设置数据, 只设置字段值
     * @memberof DataTable
     * @param {array} data 数据信息
     * @param {boject} [options] 可配置参数
     * @param {boject} [options.unSelect=false] 是否默认选中第一行，如果为true则不选中第一行，否则选中第一行
     * @example
     * var data = [{
     *   filed1:'value1',
     *   field2:'value2'
     * },{
     *   filed1:'value11',
     *   field2:'value21'
     * }]
     * datatable.setSimpleData(data)
     * datatable.setSimpleData(data,{unSelect:true})
     */
    const setSimpleData = function (data, options) {
        this.removeAllRows();
        this.cachedPages = [];
        this.focusIndex(-1);
        this.selectedIndices([]);

        this.setSimpleDataReal = [];
        if (!data) {
            this.setSimpleDataReal = data;
            // throw new Error("dataTable.setSimpleData param can't be null!");
            return;
        }

        var rows = [];
        if (!(0, _util.isArray)(data)) data = [data];
        for (var i = 0; i < data.length; i++) {
            var _data = data[i];
            /* 判断data中的字段在datatable中是否存在，如果不存在则创建 */
            // for(var f in _data){
            //     this.createField(f)
            // }
            if (typeof data[i] !== 'object') _data = { $data: data[i] };
            rows.push({
                status: Row.STATUS.NORMAL,
                data: _data
            });
        }
        var _data = {
            rows: rows
        };
        if (options) {
            if (typeof options.fieldFlag == 'undefined') {
                options.fieldFlag = true;
            }
        }
        this.setData(_data, options);
    };

    /**
     * 追加数据, 只设置字段值
     * @memberof DataTable
     * @param {array} data 数据信息
     * @param {string} [status=nrm] 追加数据信息的状态，参照Row对象的状态介绍
     * @param {boject} [options] 可配置参数
     * @param {boject} [options.unSelect=false] 是否默认选中第一行，如果为true则不选中第一行，否则选中第一行
     * @example
     * var data = [{
     *   filed1:'value1',
     *   field2:'value2'
     * },{
     *   filed1:'value11',
     *   field2:'value21'
     * }]
     * datatable.addSimpleData(data,Row.STATUS.NEW)
     * datatable.addSimpleData(data, null, {unSelect:true})
     */
    /**
     * Module : kero dataTable simpleData
     * Author : liuyk(liuyk@yonyou.com)
     * Date	  : 2016-08-01 14:34:01
     */
    const addSimpleData = function (data, status, options) {
        if (!data) {
            throw new Error("dataTable.addSimpleData param can't be null!");
        }
        if (!(0, _util.isArray)(data)) data = [data];
        for (var i = 0; i < data.length; i++) {
            var r = this.createEmptyRow(options);
            r.setSimpleData(data[i], status);
        }
    };

    const simpleDataFunObj = exports.simpleDataFunObj = {
        setSimpleData: setSimpleData,
        addSimpleData: addSimpleData
    };
});