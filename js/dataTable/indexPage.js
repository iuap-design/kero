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


class Page{
    constructor(options){
        this.focus = options['focus'] || null;
        this.selectedIndices = options['selectedIndices'] || null;
        this.rows = options['rows'] || []
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
