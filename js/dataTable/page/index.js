

import {
	setRowValue,
	updateRow
} from './data'; 

import {
	getData,
	getSelectDatas,
	getRowByRowId,
	getSelectRows,
	getRowByRowId,
	getRowValue
} from './getData'; 

import{
	getRowMeta
} from './getMeta'; 

import {
	setRowMeta
} from './meta'; 

import {
	removeRowByRowId
} from './removeRow'; 


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
		this.getRowByRowId= getRowByRowId;
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
