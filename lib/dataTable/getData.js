'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-30 14:34:01
 */

/**
 * 获取当前页数据
 */
var getData = function getData() {
    var datas = [],
        rows = this.rows();
    for (var i = 0; i < rows.length; i++) {
        datas.push(rows[i].getData());
    }
    return datas;
};

var getDataByRule = function getDataByRule(rule) {
    var returnData = {},
        datas = null,
        rows;
    returnData.meta = this.meta;
    returnData.params = this.params;
    rule = rule || DataTable.SUBMIT.current;
    if (rule == DataTable.SUBMIT.current) {
        datas = [];
        var currIndex = this.focusIndex();
        if (currIndex == -1) currIndex = this.getSelectedIndex();
        rows = this.rows();
        for (var i = 0, count = rows.length; i < count; i++) {
            if (i == currIndex) datas.push(rows[i].getData());else datas.push(rows[i].getEmptyData());
        }
    } else if (rule == DataTable.SUBMIT.focus) {
        datas = [];
        rows = this.rows();
        for (var i = 0, count = rows.length; i < count; i++) {
            if (i == this.focusIndex()) datas.push(rows[i].getData());else datas.push(rows[i].getEmptyData());
        }
    } else if (rule == DataTable.SUBMIT.all) {
        datas = this.getData();
    } else if (rule == DataTable.SUBMIT.select) {
        datas = this.getSelectedDatas(true);
    } else if (rule == DataTable.SUBMIT.change) {
        datas = this.getChangedDatas();
    } else if (rule === DataTable.SUBMIT.empty) {
        datas = [];
    }
    if (this.pageCache && datas != null) {
        datas = [{ index: this.pageIndex(), select: this.getSelectedIndexs(), focus: this.focusIndex(), rows: datas }];
    }
    if (rule == DataTable.SUBMIT.allSelect) {
        datas = [];
        var totalPages = this.totalPages();
        //缓存页数据
        for (var i = 0; i < totalPages; i++) {
            if (i == this.pageIndex()) {
                //当前页数据
                datas.push({
                    index: this.pageIndex(),
                    select: this.getSelectedIndexs(),
                    focus: this.focusIndex(),
                    rows: this.getSelectedDatas()
                });
            } else {
                var page = this.cachedPages[i];
                if (page) {
                    datas.push({
                        index: i,
                        select: page.selectedIndices,
                        focus: page.focus,
                        rows: page.getSelectDatas()
                    });
                }
            }
        }
    } else if (rule == DataTable.SUBMIT.allPages) {
        datas = [];
        var totalPages = this.totalPages();
        //缓存页数据
        for (var i = 0; i < totalPages; i++) {
            if (i == this.pageIndex()) {
                //当前页数据
                datas.push({
                    index: this.pageIndex(),
                    select: this.getSelectedIndexs(),
                    focus: this.focusIndex(),
                    rows: this.getData()
                });
            } else {
                var page = this.cachedPages[i];
                if (page) {
                    datas.push({ index: i, select: page.selectedIndices, focus: page.focus, rows: page.getData() });
                }
            }
        }
    }
    if (this.pageCache) {
        returnData.pages = datas;
    } else {
        returnData.rows = datas;
        returnData.select = this.getSelectedIndexs();
        returnData.focus = this.getFocusIndex();
    }

    returnData.pageSize = this.pageSize();
    returnData.pageIndex = this.pageIndex();
    returnData.isChanged = this.isChanged();
    returnData.master = this.master;
    returnData.pageCache = this.pageCache;
    return returnData;
};

var getRow = function getRow(index) {
    //return this.rows()[index]   //modify by licza.   improve performance
    return this.rows.peek()[index];
};

/**
 * 根据rowid取row对象
 * @param rowid
 * @returns {*}
 */
var getRowByRowId = function getRowByRowId(rowid) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowid) return rows[i];
    }
    return null;
};

/**
 * 取行索引
 * @param row
 * @returns {*}
 */
var getRowIndex = function getRowIndex(row) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId === row.rowId) return i;
    }
    return -1;
};

var getRowsByField = function getRowsByField(field, value) {
    var rows = this.rows.peek();
    var returnRows = new Array();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value) returnRows.push(rows[i]);
    }
    return returnRows;
};

var getRowByField = function getRowByField(field, value) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value) return rows[i];
    }
    return null;
};

var getAllRows = function getAllRows() {
    return this.rows.peek();
};

var getAllPageRows = function getAllPageRows() {
    var datas = [],
        rows;
    for (var i = 0; i < this.totalPages(); i++) {
        rows = [];
        if (i == this.pageIndex()) {
            rows = this.getData();
        } else {
            var page = this.cachedPages[i];
            if (page) {
                rows = page.getData();
            }
        }
        for (var j = 0; j < rows.length; j++) {
            datas.push(rows[j]);
        }
    }
    return datas;
};

/**
 * 获取变动的数据(新增、修改)
 */
var getChangedDatas = function getChangedDatas(withEmptyRow) {
    var datas = [],
        rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            datas.push(rows[i].getData());
        } else if (withEmptyRow == true) {
            datas.push(rows[i].getEmptyData());
        }
    }
    return datas;
};

/**
 * 取改变的行
 */
var getChangedRows = function getChangedRows() {
    var changedRows = [],
        rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            changedRows.push(rows[i]);
        }
    }
    return changedRows;
};

var getValue = function getValue(fieldName, row) {
    row = row || this.getCurrentRow();
    if (row) return row.getValue(fieldName);else return '';
};

/**
 * 根据行号获取行索引
 * @param {String} rowId
 */
var getIndexByRowId = function getIndexByRowId(rowId) {
    var rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowId) return i;
    }
    return -1;
};

/**
 * 获取所有行数据
 */
var getAllDatas = function getAllDatas() {
    var rows = this.getAllRows();
    var datas = [];
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i]) datas.push(rows[i].getData());
    }return datas;
};

/**
 * 根据索引取rowid
 * @param {Object} indices
 */
var getRowIdsByIndices = function getRowIdsByIndices(indices) {
    var rowIds = [];
    for (var i = 0; i < indices.length; i++) {
        rowIds.push(this.getRow(indices[i]).rowId);
    }
    return rowIds;
};

exports.getData = getData;
exports.getDataByRule = getDataByRule;
exports.getRow = getRow;
exports.getRowByRowId = getRowByRowId;
exports.getRowIndex = getRowIndex;
exports.getRowsByField = getRowsByField;
exports.getRowByField = getRowByField;
exports.getAllRows = getAllRows;
exports.getAllPageRows = getAllPageRows;
exports.getChangedDatas = getChangedDatas;
exports.getChangedRows = getChangedRows;
exports.getValue = getValue;
exports.getIndexByRowId = getIndexByRowId;
exports.getAllDatas = getAllDatas;
exports.getRowIdsByIndices = getRowIdsByIndices;