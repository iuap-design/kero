/**
 * Module : kero DataTable getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-30 14:34:01
 */

/**
 * 获取DataTable的数据信息
 * @memberof DataTable
 * @return {array} 数据信息对应的数组，每项对应一条数据
 * @example
 * datatable.getData()
 */
var getData = function getData() {
    var datas = [],
        rows = this.rows();
    for (var i = 0; i < rows.length; i++) {
        datas.push(rows[i].getData());
    }
    return datas;
};

// 将page转为row对象格式
var page2data = function page2data(page, pageIndex) {
    var data = {};
    data.focus = page.focus;
    data.index = pageIndex;
    data.select = page.selectedIndices;
    return data;
};

/**
 * 按照特定规则获取数据
 * @memberof DataTable
 * @param  {string} rule
 * DataTable.SUBMIT.current('current') ：当前选中行
 * DataTable.SUBMIT.focus('focus') ：当前focus行
 * DataTable.SUBMIT.all('all') ：所有行
 * DataTable.SUBMIT.select('select') ：当前页选中行
 * DataTable.SUBMIT.change('change') ：发生改变的行
 * DataTable.SUBMIT.empty('empty') ：不获取数据，返回空数组
 * DataTable.SUBMIT.allSelect('allSelect') ：所有页选中行
 * DataTable.SUBMIT.allPages('allPages') ：所有页的数据
 * @return {array}      按照规则获取到的数据信息
 * @example
 * datatable.getDataByRule(‘all’)
 */

var getDataByRule = function getDataByRule(rule) {
    var returnData = {},
        datas = null,
        rows;
    returnData.meta = this.meta;
    returnData.params = this.params;
    rule = rule || DataTable.SUBMIT.current;
    // 存在多页及不存在多页分开处理
    if (this.pageCache) {
        var pages = this.getPages();
        if (rule == DataTable.SUBMIT.current || rule == DataTable.SUBMIT.focus) {
            datas = [];
            var pageIndex = this.pageIndex();
            var currPage = pages[pageIndex];
            if (currPage) {
                var currIndex = this.focusIndex();
                if (rule == DataTable.SUBMIT.current) {
                    if (currIndex == -1) currIndex = this.getSelectedIndex();
                }
                var data = page2data(currPage, pageIndex);
                data.rows = [];
                for (var i = 0, count = currPage.rows.length; i < count; i++) {
                    var row = currPage.rows[i].getData();
                    if (i != currIndex) row.data = {};
                    data.rows.push(row);
                }
                datas.push(data);
            }
        } else if (rule == DataTable.SUBMIT.all || rule == DataTable.SUBMIT.allPages) {
            datas = [];
            for (var i = 0; i < pages.length; i++) {
                var currPage = pages[i];
                var data = page2data(currPage, i);
                data.rows = [];
                for (var i = 0; i < currPage.rows.length; i++) {
                    data.rows.push(currPage.rows[i].getData());
                }
                datas.push(data);
            }
        } else if (rule == DataTable.SUBMIT.select) {
            datas = [];
            var pageIndex = this.pageIndex();
            var currPage = pages[pageIndex];
            if (currPage) {
                var data = page2data(currPage, pageIndex);
                data.rows = [];
                for (var i = 0, count = currPage.rows.length; i < count; i++) {
                    var row = currPage.rows[i].getData();
                    if (data.select.indexOf(i) < 0) row.data = {};
                    data.rows.push(row);
                }
                datas.push(data);
            }
        } else if (rule == DataTable.SUBMIT.allSelect) {
            datas = [];
            for (var i = 0; i < pages.length; i++) {
                var currPage = pages[i];
                var data = page2data(currPage, i);
                data.rows = [];
                for (var j = 0, count = currPage.rows.length; j < count; j++) {
                    var row = currPage.rows[j].getData();
                    if (data.select.indexOf(j) < 0) row.data = {};
                    data.rows.push(row);
                }
                datas.push(data);
            }
        } else if (rule == DataTable.SUBMIT.change) {
            datas = [];
            for (var i = 0; i < pages.length; i++) {
                var currPage = pages[i];
                var data = page2data(currPage, i);
                data.rows = [];
                for (var j = 0, count = currPage.rows.length; j < count; j++) {
                    var row = currPage.rows[j].getData();
                    if (row.status == Row.STATUS.NORMAL) {
                        row.data = {};
                    }
                    data.rows.push(row);
                }
                datas.push(data);
            }
        } else if (rule === DataTable.SUBMIT.empty) {
            datas = [];
        }
        if (pages.length < 1 || !pages[this.pageIndex()]) {
            datas = [{
                index: this.pageIndex(),
                select: [],
                focus: -1,
                rows: []
            }];
        }
        returnData.pages = datas;
    } else {
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

/**
 * 根据索引获取指定行数据信息
 * @memberof DataTable
 * @param  {number} index 需要获取的数据信息的索引
 * @return {object}      获取到的指定行数据信息
 * @example
 * datatable.getRow(1)
 */
var getRow = function getRow(index) {
    //return this.rows()[index]   //modify by licza.   improve performance
    return this.rows.peek()[index];
};

// 获取子表的数据行
var getChildRow = function getChildRow(obj) {
    var fullField = obj.fullField,
        index = obj.index,
        row = null;
    if (parseInt(index) > -1) {
        if ((index + '').indexOf('.') > 0) {
            var fieldArr = fullField.split('.');
            var indexArr = index.split('.');
            var nowDataTable = this;
            var nowRow = null;
            for (var i = 0; i < indexArr.length; i++) {
                nowRow = nowDataTable.getRow(indexArr[i]);
                if (i < indexArr.length - 1) {
                    if (nowRow) {
                        nowDataTable = nowRow.getValue(fieldArr[i]);
                    } else {
                        nowRow = null;
                        break;
                    }
                }
            }
            row = nowRow;
        } else {
            row = this.getRow(index);
        }
    }
    return row;
};

/**
 * 根据rowid获取Row对象
 * @memberof DataTable
 * @param {string} rowid 需要获取的Row对应的rowid
 * @returns {Row}
 * @example
 * datatable.getRowByRowId('rowid')
 */
var getRowByRowId = function getRowByRowId(rowid) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowid) return rows[i];
    }
    return null;
};

/**
 * 获取Row对象对应的索引
 * @memberof DataTable
 * @param {u.Row} 需要获取索引的row对象
 * @returns {*}
 * @example
 * var row = datatable.getRow(1)
 * datatable.getRowIndex(row) // 1
 */
var getRowIndex = function getRowIndex(row) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId === row.rowId) return i;
    }
    return -1;
};

/**
 * 根据字段及字段值获取所有数据行
 * @memberof DataTable
 * @param  {string} field 需要获取行的对应字段
 * @param  {string} value 需要获取行的对应字段值
 * @return {array}      根据字段及字段值获取的所有数据行
 * @example
 * datatable.getRowsByField('field1','value1')
 */
var getRowsByField = function getRowsByField(field, value) {
    var rows = this.rows.peek();
    var returnRows = new Array();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value) returnRows.push(rows[i]);
    }
    return returnRows;
};

/**
 * 根据多个字段及字段值获取所有数据行
 * @memberof DataTable
 * @param  {string} fields 需要获取行的对应字段及对应值数组
 * @return {array}      根据字段及字段值获取的所有数据行
 * @example
 * datatable.getRowsByFields([{field:'field1',value:'value1'},{field:'field2',value:'value2'}])
 */
var getRowsByFields = function getRowsByFields(fileds) {
    var rows = this.rows.peek();
    var returnRows = new Array();
    if (fileds && fileds.length > 0) {
        for (var i = 0, count = rows.length; i < count; i++) {
            var matchCount = 0;
            var l = fileds.length;
            for (var j = 0; j < l; j++) {
                if (rows[i].getValue(fileds[j]['field']) === fileds[j]['value']) matchCount++;
            }
            if (matchCount == l) returnRows.push(rows[i]);
        }
    }
    return returnRows;
};

/**
 * 根据字段及字段值获取第一条数据行
 * @memberof DataTable
 * @param  {string} field 需要获取行的对应字段
 * @param  {string} value 需要获取行的对应字段值
 * @return {u.Row}      根据字段及字段值获取第一条数据行
 * @example
 * datatable.getRowByField('field1','value1')
 */
var getRowByField = function getRowByField(field, value) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value) return rows[i];
    }
    return null;
};

/**
 * 获取当前页的所有数据行
 * @memberof DataTable
 * @return {array} 获取到的数据行
 * @example
 * datatable.getAllRows()
 */
var getAllRows = function getAllRows() {
    return this.rows.peek();
};

/**
 * 获取所有页的所有数据行
 * @memberof DataTable
 * @return {array} 获取到的数据行
 * @example
 * datatable.getAllPageRows()
 */
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
 * 获取发生变化的数据信息
 * @memberof DataTable
 * @param  {boolean} withEmptyRow=false 未发生变化的数据是否使用空行代替，true表示以空行代替未发生变化行，false相反
 * @return {array}            发生变化的数据信息
 * @example
 * datatable.getChangedDatas()
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
 * 获取发生改变的Row对象
 * @memberof DataTable
 * @return {array} 发生改变的Row对象
 * @example
 * datatable.getChangedRows()
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

var getDeleteRows = function getDeleteRows() {
    var deleteRows = [],
        rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status == Row.STATUS.FALSE_DELETE) {
            deleteRows.push(rows[i]);
        }
    }
    return deleteRows;
};

/**
 * 根据字段获取对应Row对象的字段值
 * @memberof DataTable
 * @param  {string} fieldName 需要获取的值对应的字段
 * @param  {u.Row} [row=默认为当前行]     对应的数据行
 * @return {string}     获取到的字段值
 * @example
 * datatable.getValue('field1')
 * var row = datatable.getRow(1)
 * datatable.getValue('field1',row)
 */
var getValue = function getValue(fieldName, row) {
    row = row || this.getCurrentRow();
    if (row) return row.getValue(fieldName);else return '';
};

/**
 * 根据行号获取行索引
 * @memberof DataTable
 * @param {String} rowId
 * @example
 * datatable.getIndexByRowId('rowid')
 */
var getIndexByRowId = function getIndexByRowId(rowId) {
    var rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowId) return i;
    }
    return -1;
};

/**
 * 获取所有行数据信息
 * @memberof DataTable
 * @return {array} 所有行数据信息
 * @example
 * datatable.getAllDatas()
 */
var getAllDatas = function getAllDatas() {
    var rows = this.getAllRows();
    var datas = [];
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i]) datas.push(rows[i].getData());
    }return datas;
};

/**
 * 根据索引获取rowid
 * @memberof DataTable
 * @param  {array} indices 需要获取rowid的索引值
 * @return {array}         获取到的rowid
 * @example
 * datatable.getRowIdsByIndices([1,2,5])
 */
var getRowIdsByIndices = function getRowIdsByIndices(indices) {
    var rowIds = [];
    for (var i = 0; i < indices.length; i++) {
        if (this.getRow(indices[i])) rowIds.push(this.getRow(indices[i]).rowId);
    }
    return rowIds;
};
/**
 * 根据索引获取row
 * @memberof DataTable
 * @param  {array} indices 需要获取rowid的索引值
 * @return {array}         获取到的row
 * @example
 * datatable.getRowIdsByIndices([1,2,5])
 */
var getRowsByIndices = function getRowsByIndices(indices) {
    var rows = [];
    for (var i = 0; i < indices.length; i++) {
        rows.push(this.getRow(indices[i]));
    }
    return rows;
};

export var getDataFunObj = {
    getData: getData,
    getDataByRule: getDataByRule,
    getRow: getRow,
    getChildRow: getChildRow,
    getRowByRowId: getRowByRowId,
    getRowIndex: getRowIndex,
    getRowsByField: getRowsByField,
    getRowByField: getRowByField,
    getAllRows: getAllRows,
    getAllPageRows: getAllPageRows,
    getChangedDatas: getChangedDatas,
    getChangedRows: getChangedRows,
    getDeleteRows: getDeleteRows,
    getValue: getValue,
    getIndexByRowId: getIndexByRowId,
    getAllDatas: getAllDatas,
    getRowIdsByIndices: getRowIdsByIndices,
    getRowsByIndices: getRowsByIndices,
    getRowsByFields: getRowsByFields
};