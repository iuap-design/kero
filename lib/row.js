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
        global.row = mod.exports;
    }
})(this, function (exports, _util) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.rowFunObj = undefined;


    // 添加数据，建议使用setData或者setSimpleData
    const setRows = function (rows, options) {
        var insertRows = [],
            _id;
        for (var i = 0; i < rows.length; i++) {
            var r = rows[i];
            _id = r.rowId || r.id;
            if (!_id) _id = Row.getRandomRowId();
            if (r.status == Row.STATUS.DELETE) {
                this.removeRowByRowId(_id);
            } else {
                var row = this.getRowByRowId(_id);
                if (row) {
                    row.updateRow(r);
                    if (!(0, _util.isEmptyObject)(r.data)) {
                        this.trigger(DataTable.ON_UPDATE, {
                            index: i,
                            rows: [row]
                        });
                        if (row == this.getCurrentRow()) {
                            this.currentRowChange(-this.currentRowChange());
                            row.currentRowChange(-row.currentRowChange());
                            this.trigger(DataTable.ON_CURRENT_UPDATE, {
                                index: i,
                                rows: [row]
                            });
                        } else {
                            row.currentRowChange(-row.currentRowChange());
                        }
                    }
                } else {
                    row = new Row({
                        parent: this,
                        id: _id
                    });
                    row.setData(rows[i], null, options);
                    insertRows.push(row);
                }
                // 如果r对象中存在状态则更新状态为返回的状态
                if (r.status) {
                    row.setStatus(r.status);
                }
            }
        }
        if (insertRows.length > 0) this.addRows(insertRows);
        return insertRows;
    };

    /**
     * 在最后位置添加一条数据行
     * @memberof DataTable
     * @param {u.Row} row 数据行
     * @example
     * var row1 = new Row({parent: datatable})
     * row1.setData({
     *  field1: 'value1',
     *  field2: 'value2'
     * })
     * datatable.addRow(row1)
     */
    /**
     * Module : kero dataTable row
     * Author : liuyk(liuyk@yonyou.com)
     * Date	  : 2016-08-01 14:34:01
     */
    const addRow = function (row) {
        this.insertRow(this.rows().length, row);
        this.resetDelRowEnd();
    };

    const resetDelRowEnd = function () {
        for (var i = 0; i < this.rows().length; i++) {
            var row = this.rows()[i];
            if (row.status == Row.STATUS.DELETE || row.status == Row.STATUS.FALSE_DELETE) {
                this.rows().splice(i, 1);
                this.rows().push(row);
            }
        }
    };

    /**
     * 在最后位置添加多条数据行
     * @memberof DataTable
     * @param {array} rows  数据行数组
     * @example
     * var row1 = new Row({parent: datatable})
     * row1.setData({
     *  field1: 'value1',
     *  field2: 'value2'
     * })
     * var row2 = new Row({parent: datatable})
     * row2.setData({
     *  field1: 'value11',
     *  field2: 'value22'
     * })
     * datatable.addRows([row1,row2])
     */
    const addRows = function (rows) {
        this.insertRows(this.rows().length, rows);
        this.resetDelRowEnd();
    };

    /**
     * 在指定索引位置添加一条数据行
     * @memberof DataTable
     * @param  {number} index 指定索引
     * @param  {u.Row} row   数据行
     * @example
     * var row1 = new Row({parent: datatable})
     * row1.setData({
     *  field1: 'value1',
     *  field2: 'value2'
     * })
     * datatable.insertRow(1,row1)
     */
    const insertRow = function (index, row) {
        if (!row) {
            row = new Row({
                parent: this
            });
        }
        this.insertRows(index, [row]);
    };

    /**
     * 在指定索引位置添加多条数据行
     * @memberof DataTable
     * @param  {number} index 指定索引
     * @param  {array} rows  数据行数组
     * var row1 = new Row({parent: datatable})
     * row1.setData({
     *  field1: 'value1',
     *  field2: 'value2'
     * })
     * var row2 = new Row({parent: datatable})
     * row2.setData({
     *  field1: 'value11',
     *  field2: 'value22'
     * })
     * datatable.insertRows(1,[row1,row2])
     */
    const insertRows = function (index, rows) {
        var args = [index, 0];
        for (var i = 0; i < rows.length; i++) {
            args.push(rows[i]);
        }
        this.rows.splice.apply(this.rows, args);

        this.updateSelectedIndices(index, '+', rows.length);
        this.updateFocusIndex(index, '+', rows.length);
        this.updatePageAll();
        this.trigger(DataTable.ON_INSERT, {
            index: index,
            rows: rows
        });
        if (this.ns) {
            if (this.root.valueChange[this.ns]) this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
        }
    };

    /**
     * 创建空行
     * @memberof DataTable
     * @return {u.Row} 空行对象
     * @example
     * datatable.createEmptyRow();
     */
    const createEmptyRow = function (options) {
        var r = new Row({
            parent: this
        });
        this.addRow(r);
        var unSelect = options ? options.unSelect : false;
        if (!unSelect) {
            if (!this.getCurrentRow()) this.setRowSelect(r);
        }
        return r;
    };

    const rowFunObj = exports.rowFunObj = {
        setRows: setRows,
        addRow: addRow,
        addRows: addRows,
        insertRow: insertRow,
        insertRows: insertRows,
        createEmptyRow: createEmptyRow,
        resetDelRowEnd: resetDelRowEnd
    };
});