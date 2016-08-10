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
	removeRowByRowId
} from './page-removeRow'; 


class Page{
    constructor(options){
        this.focus = options['focus'] || null;
        this.selectedIndices = options['selectedIndices'] || null;
        this.rows = options['rows'] || []
        this.parent = options['parent'] || null;

        
		//data
		this.setRowValue= setRowValue;
		this.updateRow= updateRow;

		//getData
		this.getData= getData;
		this.getSelectDatas= getSelectDatas;
		this.getSelectRows= getSelectRows;
		this.getRowByRowId= getRowByRowId;
		this.getRowValue= getRowValue;

		//getMeta
		this.getRowMeta= getRowMeta;

		//meta
		this.setRowMeta= setRowMeta;

		//removeRow
		this.removeRowByRowId= removeRowByRowId;

    }
}


export {
	Page
}