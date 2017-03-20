(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.page = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Module : kero dataTable page
     * Author : liuyk(liuyk@yonyou.com)
     * Date	  : 2016-08-01 14:34:01
     */

    // 设置当前页
    const setCurrentPage = function (pageIndex, notCacheCurrentPage) {
        var nowTotalRow = this.totalRow();
        if (pageIndex != this.pageIndex() && notCacheCurrentPage != true) this.cacheCurrentPage();
        this.pageIndex(pageIndex);
        var cachedPage = this.cachedPages[this.pageIndex()];
        if (cachedPage) {
            // 取当前页的选中行重设选中行
            var selectedIndices = cachedPage.selectedIndices;
            this.removeAllRows();
            this.setRows(cachedPage.rows);
            this.setRowsSelect(selectedIndices);
        }
        this.totalRow(nowTotalRow);
    };

    // 更新分页信息，通过fire调用，不对外提供
    const updatePages = function (pages) {
        var pageSize = this.pageSize(),
            pageIndex = 0,
            page,
            r,
            row;
        var page, index, i, rows, focus, selectIndices, status, j, row, originRow;
        for (i = 0; i < pages.length; i++) {
            index = pages[i].index;
            rows = pages[i].rows;
            focus = pages[i].current;
            selectIndices = pages[i].select;
            status = pages[i].status;
            if (status === 'del') {
                this.cachedPages[index] = null;
                continue;
            }
            if (!this.cachedPages[index]) {
                page = new Page({
                    parent: this
                });
                page.rows = rows;
                for (var j = 0; j < page.rows.length; j++) {
                    page.rows[j].rowId = page.rows[j].id;
                    delete page.rows[j].id;
                }
                this.cachedPages[index] = page;
                page.selectedIndices = selectIndices;
                page.focus = focus;
            } else {
                page = this.cachedPages[index];
                page.selectedIndices = selectIndices;
                page.focus = focus;
                for (var j = 0; j < rows.length; j++) {
                    r = rows[j];
                    if (!r.id) r.id = Row.getRandomRowId();
                    if (r.status == Row.STATUS.DELETE) {

                        var row = page.getRowByRowId(r.id);
                        if (row) {
                            // 针对后台不传回总行数的情况下更新总行数
                            var oldTotalRow = this.totalRow();
                            var newTotalRow = oldTotalRow - 1;
                            this.totalRow(newTotalRow);
                            if (row.status == Row.STATUS.NEW) {
                                this.newCount -= 1;
                                if (this.newCount < 0) this.newCount = 0;
                            }
                        }
                        this.removeRowByRowId(r.id);
                        page.removeRowByRowId(r.id);
                    } else {
                        row = page.getRowByRowId(r.id);
                        if (row) {
                            page.updateRow(row, r);
                            // if(row.status == Row.STATUS.NEW){
                            //     // 针对后台不传回总行数的情况下更新总行数
                            //     var oldTotalRow = this.totalRow();
                            //     var newTotalRow = oldTotalRow + 1;
                            //     this.totalRow(newTotalRow);
                            // }
                            if (row.status == Row.STATUS.NEW && r.status != Row.STATUS.NEW) {
                                this.newCount -= 1;
                                if (this.newCount < 0) this.newCount = 0;
                            }
                            row.setStatus(Row.STATUS.NORMAL);
                            if (r.status == Row.STATUS.NEW) {
                                row.setStatus(Row.STATUS.NEW);
                            }
                        } else {
                            r.rowId = r.id;
                            delete r.id;
                            page.rows.push(r);
                            if (r.status != Row.STATUS.NEW) {
                                row.setStatus(Row.STATUS.NORMAL);
                            } else {
                                this.newCount += 1;
                            }
                            // 针对后台不传回总行数的情况下更新总行数
                            var oldTotalRow = this.totalRow();
                            var newTotalRow = oldTotalRow + 1;
                            this.totalRow(newTotalRow);
                        }
                    }
                }
            }
        }
    };

    // 前端分页方法，不建议使用，建议在后端进行分页
    const setPages = function (allRows) {
        var pageSize = this.pageSize(),
            pageIndex = 0,
            page;
        this.cachedPages = [];
        for (var i = 0; i < allRows.length; i++) {
            pageIndex = Math.floor(i / pageSize);
            if (!this.cachedPages[pageIndex]) {
                page = new Page({
                    parent: this
                });
                this.cachedPages[pageIndex] = page;
            }
            page.rows.push(allRows[i]);
        }
        if (this.pageIndex() > -1) this.setCurrentPage(this.pageIndex());
        this.totalRow(allRows.length);
        this.totalPages(pageIndex + 1);
    };

    // 判断是否存在索引对应的Page
    const hasPage = function (pageIndex) {
        return this.pageCache && this.cachedPages[pageIndex] ? true : false;
    };

    // 清空cachedPages
    const clearCache = function () {
        this.cachedPages = [];
    };

    // 更新当前分页的page对象
    const cacheCurrentPage = function () {
        if (this.pageCache && this.pageIndex() > -1) {
            var page = new Page({
                parent: this
            });
            page.focus = this.getFocusIndex();
            page.selectedIndices = this.selectedIndices().slice();
            var rows = this.rows.peek();
            for (var i = 0; i < rows.length; i++) {
                var r = rows[i].getData();
                r.rowId = r.id;
                delete r.id;
                page.rows.push(r);
            }
            this.cachedPages[this.pageIndex()] = page;
        }
    };

    //根据datatable的选中行更新每页的选中行
    const updatePagesSelect = function () {
        var selectRows = this.getSelectedRows();
        var pages = this.getPages();
        for (var i = 0; i < pages.length; i++) {
            var rows = pages[i].rows;
            var selectedIndices = [];
            for (var j = 0; j < selectRows.length; j++) {
                var nowSelectRow = selectRows[j];
                for (var k = 0; k < rows.length; k++) {
                    var row = rows[k];
                    if (nowSelectRow == row) {
                        selectedIndices.push(k);
                        break;
                    }
                }
            }
            pages[i].selectedIndices = selectedIndices;
        }
    };

    //根据datatable的rows更新当前页的rows
    const updatePageRows = function () {
        if (this.pageCache) {
            var pageIndex = this.pageIndex();
            var page = this.getPages()[pageIndex];
            if (page) {
                page.rows = this.rows();
            }
        }
    };

    //根据datatable的选中行更新page的选中行
    const updatePageSelect = function () {
        if (this.pageCache) {
            var pageIndex = this.pageIndex();
            var page = this.getPages()[pageIndex];
            if (page) {
                var selectedIndices = this.selectedIndices().slice();
                page.selectedIndices = selectedIndices;
            }
        }
    };

    //根据datatable的focus更新page的focus
    const updatePageFocus = function () {
        if (this.pageCache) {
            var pageIndex = this.pageIndex();
            var page = this.getPages()[pageIndex];
            if (page) {
                page.focus = this.getFocusIndex();
            }
        }
    };

    // 根据datatable更新page对象
    const updatePageAll = function () {
        this.updatePageRows();
        this.updatePageSelect();
        this.updatePageFocus();
    };

    const pageFunObj = exports.pageFunObj = {
        setCurrentPage: setCurrentPage,
        updatePages: updatePages,
        setPages: setPages,
        hasPage: hasPage,
        clearCache: clearCache,
        cacheCurrentPage: cacheCurrentPage,
        updatePagesSelect: updatePagesSelect,
        updatePageRows: updatePageRows,
        updatePageSelect: updatePageSelect,
        updatePageFocus: updatePageFocus,
        updatePageAll: updatePageAll
    };
});