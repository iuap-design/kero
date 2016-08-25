/**
 * Module : Kero webpack entry dataTable index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */

 import {extend} from 'neoui-sparrow/js/extend';

import {
    Events
} from './indexEvents';

import {
    copyRow,
    copyRows
} from './copyRow'; 

import {
    setData,
    setValue
} from './data'; 

import{
    isEnable,
    setEnable
} from './enable'; 

import{
    getCurrentRow,
    getCurrentIndex
} from './getCurrent'; 

import {
    getData,
    getDataByRule,
    getRow,
    getRowByRowId,
    getRowIndex,
    getRowsByField,
    getRowByField,
    getAllRows,
    getAllPageRows,
    getChangedDatas,
    getChangedRows,
    getValue,
    getIndexByRowId,
    getAllDatas,
    getRowIdsByIndices
} from './getData'; 

import {
    getFocusRow,
    getFocusIndex
} from './getFocus'; 

import {
    getMeta,
    getRowMeta
} from './getMeta'; 

import {
    getPage,
    getPages
} from './getPage'; 

import {
    getParam
} from './getParam'; 

import {
    getSelectedIndex,
    getSelectedIndices,
    getSelectedIndexs,
    getSelectedDatas,
    getSelectedRows
} from './getSelect'; 

import {
    getSimpleData
} from './getSimpleData'; 

import {
    setMeta,
    updateMeta,
    createField
} from './meta'; 

import {
    setCurrentPage,
    updatePages,
    setPages,
    hasPage,
    clearCache,
    cacheCurrentPage
} from './page'; 

import {
    addParam,
    addParams
} from './param'; 

import {
    refSelectedRows,
    ref,
    refMeta,
    refRowMeta,
    refEnable
} from './ref'; 

import {
    removeRowByRowId,
    removeRow,
    removeAllRows,
    removeRows,
    clear
} from './removeRow'; 

import {
    setRows,
    addRow,
    addRows,
    insertRow,
    insertRows,
    createEmptyRow
} from './row'; 

import {
    updateCurrIndex
} from './rowCurrent'; 

import {
    setRowDelete,
    setAllRowsDelete,
    setRowsDelete
} from './rowDelete'; 

import {
    setAllRowsSelect,
    setRowSelect,
    setRowsSelect,
    addRowSelect,
    addRowsSelect,
    setAllRowsUnSelect,
    setRowUnSelect,
    setRowsUnSelect,
    toggleAllSelect,
    updateSelectedIndices
} from './rowSelect'; 

import {
    setRowFocus,
    setRowUnFocus,
    updateFocusIndex
} from './rowFocus'; 

import {
    setSimpleData,
    addSimpleData
} from './simpleData'; 

import {
    isChanged
} from './util'; 

import {
    on,
    off,
    one,
    trigger,
    getEvent
} from './events';

class DataTable{
// class DataTable extends Events{
    constructor(options){
        // IE9下转化之后的代码有问题，无法获得superClass方法
        // super();
        this.on = on;
        this.off = off;
        this.one = one;
        this.trigger = trigger;
        this.getEvent = getEvent;

        options = options || {};
        this.id = options['id'];
        this.strict = options['strict'] || false;
        this.meta = DataTable.createMetaItems(options['meta']);
        this.enable = options['enable'] || DataTable.DEFAULTS.enable;
        this.pageSize = ko.observable(options['pageSize'] || DataTable.DEFAULTS.pageSize)
        this.pageIndex = ko.observable(options['pageIndex'] || DataTable.DEFAULTS.pageIndex)
        this.totalPages = ko.observable(options['totalPages'] || DataTable.DEFAULTS.totalPages)
        this.totalRow = ko.observable()
        this.pageCache = options['pageCache'] === undefined ? DataTable.DEFAULTS.pageCache : options['pageCache']
        this.rows = ko.observableArray([])
        this.selectedIndices = ko.observableArray([])
        this._oldCurrentIndex = -1;
        this.focusIndex = ko.observable(-1)
        this.cachedPages = []
        this.metaChange = {};
        this.valueChange = {};//ko.observable(1);
        this.currentRowChange = ko.observable(1);
        this.enableChange = ko.observable(1);
        this.params = options['params'] || {};
        this.master = options['master'] || '';
        this.allSelected = ko.observable(false);
        if (options['root']){
            this.root = options['root']
        }else{
            this.root = this;
        }
        if (options['ns']){
            this.ns = options['ns'];
        }else{
            this.ns = '';
        }

        
        //copyRow
        this.copyRow= copyRow;
        this.copyRows= copyRows;

        //data
        this.setData= setData;
        this.setValue= setValue;

        //enable
        this.isEnable= isEnable;
        this.setEnable= setEnable;

        //getData
        this.getData= getData;
        this.getDataByRule= getDataByRule;
        this.getRow= getRow;
        this.getRowByRowId= getRowByRowId;
        this.getRowIndex= getRowIndex;
        this.getRowsByField= getRowsByField;
        this.getRowByField= getRowByField;
        this.getAllRows= getAllRows;
        this.getAllPageRows= getAllPageRows;
        this.getChangedDatas= getChangedDatas;
        this.getChangedRows= getChangedRows;
        this.getValue= getValue;
        this.getIndexByRowId= getIndexByRowId;
        this.getAllDatas= getAllDatas;
        this.getRowIdsByIndices= getRowIdsByIndices;

        //getCurrent
        this.getCurrentRow= getCurrentRow;
        this.getCurrentIndex= getCurrentIndex;

        //getFocus
        this.getFocusRow= getFocusRow;
        this.getFocusIndex= getFocusIndex;

        //getMeta
        this.getMeta= getMeta;
        this.getRowMeta= getRowMeta;

        //getPage
        this.getPage= getPage;
        this.getPages= getPages;

        //getParam
        this.getParam= getParam;

        //getSelect
        this.getSelectedIndex= getSelectedIndex;
        this.getSelectedIndices= getSelectedIndices;
        this.getSelectedIndexs= getSelectedIndexs;
        this.getSelectedDatas= getSelectedDatas;
        this.getSelectedRows= getSelectedRows;

        //getSimpleData
        this.getSimpleData= getSimpleData;

        //meta
        this.setMeta= setMeta;
        this.updateMeta= updateMeta;
        this.createField= createField;

        //page
        this.setCurrentPage= setCurrentPage;
        this.updatePages= updatePages;
        this.setPages= setPages;
        this.hasPage= hasPage;
        this.clearCache= clearCache;
        this.cacheCurrentPage= cacheCurrentPage;

        //param
        this.addParam= addParam;
        this.addParams= addParams;

        //ref
        this.refSelectedRows= refSelectedRows;
        this.ref= ref;
        this.refMeta= refMeta;
        this.refRowMeta= refRowMeta;
        this.refEnable= refEnable;

        //row
        this.setRows= setRows;
        this.addRow= addRow;
        this.addRows= addRows;
        this.insertRow= insertRow;
        this.insertRows= insertRows;
        this.createEmptyRow= createEmptyRow;

        //removeRow
        this.removeRowByRowId= removeRowByRowId;
        this.removeRow= removeRow;
        this.removeAllRows= removeAllRows;
        this.removeRows= removeRows;
        this.clear= clear;

        //rowCurrent
        this.updateCurrIndex= updateCurrIndex;

        //rowDelete
        this.setRowDelete= setRowDelete;
        this.setAllRowsDelete= setAllRowsDelete;
        this.setRowsDelete= setRowsDelete;

        //rowFocus
        this.setRowFocus= setRowFocus;
        this.setRowUnFocus= setRowUnFocus;
        this.updateFocusIndex= updateFocusIndex;

        //rowSelect
        this.setAllRowsSelect= setAllRowsSelect;
        this.setRowSelect= setRowSelect;
        this.setRowsSelect= setRowsSelect;
        this.addRowSelect= addRowSelect;
        this.addRowsSelect= addRowsSelect;
        this.setAllRowsUnSelect= setAllRowsUnSelect;
        this.setRowUnSelect= setRowUnSelect;
        this.setRowsUnSelect= setRowsUnSelect;
        this.toggleAllSelect= toggleAllSelect;
        this.updateSelectedIndices= updateSelectedIndices;

        //simpleData
        this.setSimpleData= setSimpleData;
        this.addSimpleData= addSimpleData;

        //util
        this.isChanged= isChanged;
    }
}

DataTable.DEFAULTS = {
    pageSize: 20,
    pageIndex: 0,
    totalPages: 20,
    pageCache: false,
    enable: true
}

DataTable.META_DEFAULTS = {
    enable: true,
    required: false,
    descs: {}
}

//事件类型
DataTable.ON_ROW_SELECT = 'select'
DataTable.ON_ROW_UNSELECT = 'unSelect'
DataTable.ON_ROW_ALLSELECT = 'allSelect'
DataTable.ON_ROW_ALLUNSELECT = 'allUnselect'
DataTable.ON_VALUE_CHANGE = 'valueChange'
DataTable.ON_CURRENT_VALUE_CHANGE = 'currentValueChange'  //当前行变化
//  DataTable.ON_AFTER_VALUE_CHANGE = 'afterValueChange'
//  DataTable.ON_ADD_ROW = 'addRow'
DataTable.ON_INSERT = 'insert'
DataTable.ON_UPDATE = 'update'
DataTable.ON_CURRENT_UPDATE = 'currentUpdate'
DataTable.ON_DELETE = 'delete'
DataTable.ON_DELETE_ALL = 'deleteAll'
DataTable.ON_ROW_FOCUS = 'focus'
DataTable.ON_ROW_UNFOCUS = 'unFocus'
DataTable.ON_LOAD = 'load'
DataTable.ON_ENABLE_CHANGE = 'enableChange'
DataTable.ON_META_CHANGE = 'metaChange'
DataTable.ON_ROW_META_CHANGE = 'rowMetaChange'
DataTable.ON_CURRENT_META_CHANGE = 'currentMetaChange'
DataTable.ON_CURRENT_ROW_CHANGE = 'currentRowChange'

DataTable.SUBMIT = {
    current: 'current',
    focus: 'focus',
    all: 'all',
    select: 'select',
    change: 'change',
    empty: 'empty',
    allSelect: 'allSelect',
    allPages: 'allPages'
}


DataTable.createMetaItems = function (metas) {
    var newMetas = {};
    for (var key in metas) {
        var meta = metas[key]
        if (typeof meta == 'string')
            meta = {}
        newMetas[key] = extend({}, DataTable.META_DEFAULTS, meta)
    }
    return newMetas
}


export {
    DataTable
}