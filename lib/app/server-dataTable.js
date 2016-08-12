'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateDataTables = exports.addAllDataTables = exports.addDataTables = exports.addDataTable = undefined;

var _util = require('neoui-sparrow/js/util');

var addDataTable = function addDataTable(dataTableId, rule) {
    var dataTable = this.app.getDataTable(dataTableId);
    this.datas[dataTableId] = dataTable.getDataByRule(rule);
    return this;
};

/**
 *
 * @param {Object} dataTabels
 * 格式1: ['dt1',{'dt2':'all'}]，格式2：['dt1', 'dt2']，格式3: ['dt1', 'dt2'], 'all'
 */
/**
 * Module : kero app serverEvent dataTable
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-29 09:34:01
 */
var addDataTables = function addDataTables(dataTables) {
    if (arguments.length == 2) {
        for (var i = 0; i < dataTables.length; i++) {
            var rule;
            if (typeof arguments[1] == 'string') {
                rule = arguments[1];
            } else if ((0, _util.isArray)(arguments[1])) {
                rule = arguments[1][i];
            }
            this.addDataTable(dataTables[i], rule);
        }
    } else {
        for (var i = 0; i < dataTables.length; i++) {
            var dt = dataTables[i];
            if (typeof dt == 'string') this.addDataTable(dt);else {
                for (key in dt) {
                    this.addDataTable(key, dt[key]);
                }
            }
        }
    }

    return this;
};

var addAllDataTables = function addAllDataTables(rule) {
    var dts = this.app.dataTables;
    for (var i = 0; i < dts.length; i++) {
        this.addDataTable(dts[i].id, rule);
    }
};

var updateDataTables = function updateDataTables(dataTables, deferred) {
    for (var key in dataTables) {
        var dt = this.app.getDataTable(key);
        if (dt) {
            dt.setData(dataTables[key]);
            dt.updateMeta(dataTables[key].meta);
        }
    }
};

exports.addDataTable = addDataTable;
exports.addDataTables = addDataTables;
exports.addAllDataTables = addAllDataTables;
exports.updateDataTables = updateDataTables;