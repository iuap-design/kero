/**
 * Module : kero dataTable row
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

/**
 * 设置行数据
 * @param {Object} rows
 */
const setRows = function (rows) {
    var insertRows = [], _id;
    for (var i = 0; i < rows.length; i++) {
        var r = rows[i]
        _id = r.rowId || r.id;
        if (!_id)
            _id = Row.getRandomRowId()
        if (r.status == Row.STATUS.DELETE) {
            this.removeRowByRowId(_id)
        }
        else {
            var row = this.getRowByRowId(_id)
            if (row) {
                row.updateRow(r);
                if (!u.isEmptyObject(r.data)) {
                    this.trigger(DataTable.ON_UPDATE, {
                        index: i,
                        rows: [row]
                    })
                    if (row == this.getCurrentRow()) {
                        this.currentRowChange(-this.currentRowChange())
                        row.currentRowChange(-row.currentRowChange())
                        this.trigger(DataTable.ON_CURRENT_UPDATE, {
                            index: i,
                            rows: [row]
                        })
                    } else {
                        row.currentRowChange(-row.currentRowChange())
                    }
                }

            }
            else {
                row = new Row({parent: this, id: _id})
                row.setData(rows[i])
                insertRows.push(row)
            }
        }
    }
    if (insertRows.length > 0)
        this.addRows(insertRows)
}


/**
 *追加行
 */
const addRow = function (row) {
    this.insertRow(this.rows().length, row)
}

/**
 *追加多行
 */
const addRows = function (rows) {
    this.insertRows(this.rows().length, rows)
}

const insertRow = function (index, row) {
    if (!row) {
        row = new Row({parent: this})
    }
    this.insertRows(index, [row])
}

const insertRows = function (index, rows) {
    var args = [index, 0]
    for (var i = 0; i < rows.length; i++) {
        args.push(rows[i]);
    }
    this.rows.splice.apply(this.rows, args);

    this.updateSelectedIndices(index, '+', rows.length)
    this.updateFocusIndex(index, '+', rows.length)

    this.trigger(DataTable.ON_INSERT, {
        index: index,
        rows: rows
    })
    if (this.ns){
        if (this.root.valueChange[this.ns])
            this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
    }
}

/**
 * 创建空行
 */
const createEmptyRow = function () {
    var r = new Row({parent: this})
    this.addRow(r)
    if (!this.getCurrentRow())
        this.setRowSelect(r);
    return r
}

export {
    setRows,
    addRow,
    addRows,
    insertRow,
    insertRows,
    createEmptyRow
}