(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './indexDataTable', './indexPage', './indexRow'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./indexDataTable'), require('./indexPage'), require('./indexRow'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.indexDataTable, global.indexPage, global.indexRow);
        global.index = mod.exports;
    }
})(this, function (exports, _indexDataTable, _indexPage, _indexRow) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DataTable = exports.u = undefined;

    window.DataTable = _indexDataTable.DataTable; /**
                                                   * Module : Kero webpack entry index
                                                   * Author : liuyk(liuyuekai@yonyou.com)
                                                   * Date	  : 2016-08-08 15:24:46
                                                   */

    window.Page = _indexPage.Page;

    window.Row = _indexRow.Row;

    window.u = window.u || {};
    exports.u = u = window.u;
    u.DataTable = _indexDataTable.DataTable;
    u.Row = _indexRow.Row;

    exports.u = u;
    exports.DataTable = _indexDataTable.DataTable;
});