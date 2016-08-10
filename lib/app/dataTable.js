"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero app dataTable
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-29 09:34:01
 */

var addDataTable = function addDataTable(dataTable) {
    this.dataTables[dataTable.id] = dataTable;
    return this;
};
var getDataTable = function getDataTable(id) {
    return this.dataTables[id];
};

var getDataTables = function getDataTables() {
    return this.dataTables;
};

exports.addDataTable = addDataTable;
exports.getDataTable = getDataTable;
exports.getDataTables = getDataTables;