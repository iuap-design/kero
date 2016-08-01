/**
 * Module : kero dataTable getPage
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

 

const getPage = function (pageIndex) {
    if (this.pageCache) {
        return this.cachedPages[pageIndex]
    }
    return -1;
}

const getPages = function () {
    if (this.pageCache) {
        return this.cachedPages
    }
    return [];
}

export {
	getPage,
	getPages
}
