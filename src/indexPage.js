/**
 * Module : Kero webpack entry Page index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date	  : 2016-08-09 15:24:46
 */

import {
	setRowValue,
	updateRow
} from './page-data';

import {
	getData,
	getSelectDatas,
	getSelectRows,
	getRowByRowId,
	getRowValue
} from './page-getData';

import{
	getRowMeta
} from './page-getMeta';

import {
	setRowMeta
} from './page-meta';

import {
	removeRowByRowId,
	updateSelectedIndices,
	updateFocusIndex
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

//data
Page.prototype.setRowValue= setRowValue;
Page.prototype.updateRow= updateRow;

//getData
Page.prototype.getData= getData;
Page.prototype.getSelectDatas= getSelectDatas;
Page.prototype.getSelectRows= getSelectRows;
Page.prototype.getRowByRowId= getRowByRowId;
Page.prototype.getRowValue= getRowValue;

//getMeta
Page.prototype.getRowMeta= getRowMeta;

//meta
Page.prototype.setRowMeta= setRowMeta;

//removeRow
Page.prototype.removeRowByRowId= removeRowByRowId;
Page.prototype.updateSelectedIndices= updateSelectedIndices;
Page.prototype.updateFocusIndex= updateFocusIndex;


export {
	Page
}
