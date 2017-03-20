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
        global.util = mod.exports;
    }
})(this, function (exports, _util) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.utilFunObj = undefined;


    // 判断DataTable对象是否发生了改变
    const isChanged = function () {
        var rows = this.getAllRows();
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].status != Row.STATUS.NORMAL) return true;
        }
        return false;
    };

    // 将Row对象转为索引数组或者将Row对象数组转为索引数组
    /**
     * Module : kero dataTable util
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-08 09:59:01
     */
    const _formatToIndicesArray = function (dataTableObj, indices) {
        if (typeof indices == 'string' || typeof indices == 'number') {
            indices = [indices];
        } else if (indices instanceof Row) {
            indices = [dataTableObj.getIndexByRowId(indices.rowId)];
        } else if ((0, _util.isArray)(indices) && indices.length > 0 && indices[0] instanceof Row) {
            for (var i = 0; i < indices.length; i++) {
                indices[i] = dataTableObj.getIndexByRowId(indices[i].rowId);
            }
        }
        return indices;
    };

    const utilFunObj = exports.utilFunObj = {
        isChanged: isChanged,
        _formatToIndicesArray: _formatToIndicesArray

    };
});