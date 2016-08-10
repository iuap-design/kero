'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable page
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

var setCurrentPage = function setCurrentPage(pageIndex, notCacheCurrentPage) {
    if (pageIndex != this.pageIndex() && notCacheCurrentPage != true) this.cacheCurrentPage();
    this.pageIndex(pageIndex);
    var cachedPage = this.cachedPages[this.pageIndex()];
    if (cachedPage) {
        this.removeAllRows();
        this.setRows(cachedPage.rows);
        this.setRowsSelect(cachedPage.selectedIndcies);
    }
};

/**
 * 更新分页数据
 */
var updatePages = function updatePages(pages) {
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
            page = new Page({ parent: this });
            page.rows = rows;
            for (var j = 0; j < page.rows.length; j++) {
                page.rows[j].rowId = page.rows[j].id;
                delete page.rows[j].id;
            }
            this.cachedPages[index] = page;
        } else {
            //如果是当前页，先把this.rows数据更新到page中
            if (index == this.pageIndex()) {
                this.cacheCurrentPage();
            }
            page = this.cachedPages[index];
            for (var j = 0; j < rows.length; j++) {
                r = rows[j];
                if (!r.id) r.id = Row.getRandomRowId();
                if (r.status == Row.STATUS.DELETE) {
                    this.removeRowByRowId(r.id);
                } else {
                    row = page.getRowByRowId(r.id);
                    if (row) {
                        page.updateRow(row, r);
                    } else {
                        r.rowId = r.id;
                        delete r.id;
                        page.rows.push(r);
                    }
                }
            }
        }
        page.selectedIndices = selectIndices;
        page.focus = focus;
    }
};

/**
 * 前端分页方法，不建议使用，建议在后端进行分页
 * @param allRows
 */
var setPages = function setPages(allRows) {
    var pageSize = this.pageSize(),
        pageIndex = 0,
        page;
    this.cachedPages = [];
    for (var i = 0; i < allRows.length; i++) {
        pageIndex = Math.floor(i / pageSize);
        if (!this.cachedPages[pageIndex]) {
            page = new Page({ parent: this });
            this.cachedPages[pageIndex] = page;
        }
        page.rows.push(allRows[i]);
    }
    if (this.pageIndex() > -1) this.setCurrentPage(this.pageIndex());
    this.totalRow(allRows.length);
    this.totalPages(pageIndex + 1);
};

var hasPage = function hasPage(pageIndex) {
    return this.pageCache && this.cachedPages[pageIndex] ? true : false;
};

var clearCache = function clearCache() {
    this.cachedPages = [];
};

var cacheCurrentPage = function cacheCurrentPage() {
    if (this.pageCache && this.pageIndex() > -1) {
        var page = new Page({ parent: this });
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

exports.setCurrentPage = setCurrentPage;
exports.updatePages = updatePages;
exports.setPages = setPages;
exports.hasPage = hasPage;
exports.clearCache = clearCache;
exports.cacheCurrentPage = cacheCurrentPage;