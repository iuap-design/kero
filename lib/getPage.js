"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero dataTable getPage
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

var getPage = function getPage(pageIndex) {
    if (this.pageCache) {
        return this.cachedPages[pageIndex];
    }
    return -1;
};

var getPages = function getPages() {
    if (this.pageCache) {
        return this.cachedPages;
    }
    return [];
};

exports.getPage = getPage;
exports.getPages = getPages;