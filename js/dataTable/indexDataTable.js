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



    }
}

//copyRow
DataTable.prototype.copyRow= copyRow;
DataTable.prototype.copyRows= copyRows;

//data
DataTable.prototype.setData= setData;
DataTable.prototype.setValue= setValue;

//enable
DataTable.prototype.isEnable= isEnable;
DataTable.prototype.setEnable= setEnable;

//getData
DataTable.prototype.getData= getData;
DataTable.prototype.getDataByRule= getDataByRule;
DataTable.prototype.getRow= getRow;
DataTable.prototype.getRowByRowId= getRowByRowId;
DataTable.prototype.getRowIndex= getRowIndex;
DataTable.prototype.getRowsByField= getRowsByField;
DataTable.prototype.getRowByField= getRowByField;
DataTable.prototype.getAllRows= getAllRows;
DataTable.prototype.getAllPageRows= getAllPageRows;
DataTable.prototype.getChangedDatas= getChangedDatas;
DataTable.prototype.getChangedRows= getChangedRows;
DataTable.prototype.getValue= getValue;
DataTable.prototype.getIndexByRowId= getIndexByRowId;
DataTable.prototype.getAllDatas= getAllDatas;
DataTable.prototype.getRowIdsByIndices= getRowIdsByIndices;

//getCurrent
DataTable.prototype.getCurrentRow= getCurrentRow;
DataTable.prototype.getCurrentIndex= getCurrentIndex;

//getFocus
DataTable.prototype.getFocusRow= getFocusRow;
DataTable.prototype.getFocusIndex= getFocusIndex;

//getMeta
DataTable.prototype.getMeta= getMeta;
DataTable.prototype.getRowMeta= getRowMeta;

//getPage
DataTable.prototype.getPage= getPage;
DataTable.prototype.getPages= getPages;

//getParam
DataTable.prototype.getParam= getParam;

//getSelect
DataTable.prototype.getSelectedIndex= getSelectedIndex;
DataTable.prototype.getSelectedIndices= getSelectedIndices;
DataTable.prototype.getSelectedIndexs= getSelectedIndexs;
DataTable.prototype.getSelectedDatas= getSelectedDatas;
DataTable.prototype.getSelectedRows= getSelectedRows;

//getSimpleData
DataTable.prototype.getSimpleData= getSimpleData;

//meta
DataTable.prototype.setMeta= setMeta;
DataTable.prototype.updateMeta= updateMeta;
DataTable.prototype.createField= createField;

//page
DataTable.prototype.setCurrentPage= setCurrentPage;
DataTable.prototype.updatePages= updatePages;
DataTable.prototype.setPages= setPages;
DataTable.prototype.hasPage= hasPage;
DataTable.prototype.clearCache= clearCache;
DataTable.prototype.cacheCurrentPage= cacheCurrentPage;

//param
DataTable.prototype.addParam= addParam;
DataTable.prototype.addParams= addParams;

//ref
DataTable.prototype.refSelectedRows= refSelectedRows;
DataTable.prototype.ref= ref;
DataTable.prototype.refMeta= refMeta;
DataTable.prototype.refRowMeta= refRowMeta;
DataTable.prototype.refEnable= refEnable;

//row
DataTable.prototype.setRows= setRows;
DataTable.prototype.addRow= addRow;
DataTable.prototype.addRows= addRows;
DataTable.prototype.insertRow= insertRow;
DataTable.prototype.insertRows= insertRows;
DataTable.prototype.createEmptyRow= createEmptyRow;

//removeRow
DataTable.prototype.removeRowByRowId= removeRowByRowId;
DataTable.prototype.removeRow= removeRow;
DataTable.prototype.removeAllRows= removeAllRows;
DataTable.prototype.removeRows= removeRows;
DataTable.prototype.clear= clear;

//rowCurrent
DataTable.prototype.updateCurrIndex= updateCurrIndex;

//rowDelete
DataTable.prototype.setRowDelete= setRowDelete;
DataTable.prototype.setAllRowsDelete= setAllRowsDelete;
DataTable.prototype.setRowsDelete= setRowsDelete;

//rowFocus
DataTable.prototype.setRowFocus= setRowFocus;
DataTable.prototype.setRowUnFocus= setRowUnFocus;
DataTable.prototype.updateFocusIndex= updateFocusIndex;

//rowSelect
DataTable.prototype.setAllRowsSelect= setAllRowsSelect;
DataTable.prototype.setRowSelect= setRowSelect;
DataTable.prototype.setRowsSelect= setRowsSelect;
DataTable.prototype.addRowSelect= addRowSelect;
DataTable.prototype.addRowsSelect= addRowsSelect;
DataTable.prototype.setAllRowsUnSelect= setAllRowsUnSelect;
DataTable.prototype.setRowUnSelect= setRowUnSelect;
DataTable.prototype.setRowsUnSelect= setRowsUnSelect;
DataTable.prototype.toggleAllSelect= toggleAllSelect;
DataTable.prototype.updateSelectedIndices= updateSelectedIndices;

//simpleData
DataTable.prototype.setSimpleData= setSimpleData;
DataTable.prototype.addSimpleData= addSimpleData;

//util
DataTable.prototype.isChanged= isChanged;

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
