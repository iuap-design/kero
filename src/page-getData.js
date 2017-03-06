/**
 * Module : kero dataTable page getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 获取Page的数据信息
 * @memberof Page
 * @return {array} 数据信息对应的数组，每项对应一条数据
 * @example
 * page.getData()
 */
const getData = function () {
    var datas = [], row, meta;
    meta = this.parent.getMeta()
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({'id': row.rowId, 'status': row.status, data: row.data});
    }
    return datas
}


/**
 * 获取Page的选中行数据信息
 * @memberof Page
 * @return {array} 数据信息对应的数组，每项对应一条数据
 * @example
 * page.getSelectDatas()
 */
const getSelectDatas = function () {
    var datas = [], row;
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({'id': row.rowId, 'status': row.status, data: row.data});
    }
    for (var i = 0; i < this.selectedIndices.length; i++) {
        row = this.rows[this.selectedIndices[i]];
        datas.push({'id': row.rowId, 'status': row.status, data: row.data});
    }
    return datas
}


/**
 * 获取Page的选中Row对象
 * @memberof Page
 * @return {array} Row对象对应的数组，每项对应一条数据
 * @example
 * page.getSelectRows()
 */
const getSelectRows = function () {
    var rows = [];
    for (var i = 0; i < this.selectedIndices.length; i++) {
        rows.push(this.rows[this.selectedIndices[i]])
    }
    return rows
}

/**
 * 根据rowid获取Row对象
 * @memberof Page
 * @param {string} rowid 需要获取的Row对应的rowid
 * @returns {Row} Row对象
 * @example
 * page.getRowByRowId('rowid')
 */
const getRowByRowId = function (rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows[i].rowId == rowid)
            return this.rows[i]
    }
    return null
}

/**
 * 根据行索引获取对应行的字段值
 * @memberof Page
 * @param {number} rowIndex 行索引
 * @param {string} fieldName 字段名
 * @returns {sting} 字段值
 * @example
 * page.getRowValue(1,'field1')
 */
const getRowValue = function (rowIndex, fieldName) {
    var row = this.rows[rowIndex]
    if (row) {
        return row.data[fieldName]['value']
    }
    return null
}

export {
	getData,
	getSelectDatas,
	getSelectRows,
	getRowByRowId,
	getRowValue
}
