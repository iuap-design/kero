(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './util'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./util'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.util);
        global.rowDelete = mod.exports;
    }
})(this, function (exports, _util) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.rowDeleteFunObj = undefined;


    /***
     * 根据索引删除数据行
     * @param {number} index 需要删除数据行的索引
     */
    const setRowDelete = function (index) {
        if (index instanceof Row) {
            index = this.getIndexByRowId(index.rowId);
        }
        this.setRowsDelete([index]);
    };

    /***
     * 删除所有数据行
     */
    /**
     * Module : kero dataTable rowDelete
     * Desc: 不建议使用此库方法
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-01 14:34:01
     */
    const setAllRowsDelete = function () {
        var indices = new Array(this.rows().length);
        for (var i = 0; i < indices.length; i++) {
            indices[i] = i;
        }
        this.setRowsDelete(indices);
    };

    /***
     * 根据索引数组删除数据行
     * @param {Array} indices 需要删除数据行的索引数组
     */
    const setRowsDelete = function (indices) {
        indices = _util.utilFunObj._formatToIndicesArray(this, indices);
        var rowIds = this.getRowIdsByIndices(indices);
        this.trigger(DataTable.ON_DELETE, {
            falseDelete: true,
            indices: indices,
            rowIds: rowIds
        });
        for (var i = 0; i < indices.length; i++) {
            var row = this.getRow(indices[i]);
            if (row.status == Row.STATUS.NEW) {
                this.rows().splice(indices[i], 1);
                this.updateSelectedIndices(indices[i], '-');
                this.updateFocusIndex(index, '-');
            } else {
                row.setStatus(Row.STATUS.FALSE_DELETE);
                var temprows = this.rows().splice(indices[i], 1);
                this.rows().push(temprows[0]);
            }
        }
    };

    const rowDeleteFunObj = exports.rowDeleteFunObj = {
        setRowDelete: setRowDelete,
        setAllRowsDelete: setAllRowsDelete,
        setRowsDelete: setRowsDelete
    };
});