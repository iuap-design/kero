/**
 * Module : Kero webpack entry Page index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date	  : 2016-08-09 15:24:46
 */

import {
	pageDataFunObj
} from './page-data';

import {
	pageGetDataFunObj
} from './page-getData';

import{
	rowGetMetaFunObj
} from './page-getMeta';

import {
	pageMetaFunObj
} from './page-meta';

import {
	pageRemoveRowFunObj
} from './page-removeRow';

/**
 * Page
 * @namespace
 * @description 分页对象
 */
class Page{
    constructor(options){
				// 当前焦点行
        this.focus = options['focus'] || null;
				// 选中行
        this.selectedIndices = options['selectedIndices'] || null;
				// 所有数据行
        this.rows = options['rows'] || []
				// DataTable对象
        this.parent = options['parent'] || null;
    }
}

const PageProto = Page.prototype;
Object.assign(PageProto, pageDataFunObj);
Object.assign(PageProto, pageGetDataFunObj);
Object.assign(PageProto, rowGetMetaFunObj);
Object.assign(PageProto, pageMetaFunObj);
Object.assign(PageProto, pageRemoveRowFunObj);

export {
	Page
}
