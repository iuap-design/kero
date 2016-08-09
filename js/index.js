/**
 * Module : Kero webpack entry index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date	  : 2016-08-08 15:24:46
 */


 //相关依赖导入
import {
	init
} from './app/init';

import {
	adjustMetaFunc
} from './app/adjustMetaFunc';

import {
	addDataTable, 
	getDataTable, 
	getDataTables
} from './app/dataTable';

import {
	createComp, 
	getComp, 
	getCompsByDataTable, 
	getCompsByType,
	getComps,
	showComp
} from './app/comp';

import {
	compsValidate,
	compsValidateMultiParam
} from './app/validate';

import {
    setUserCache,
    getUserCache,
    removeUserCache,
    setCache,
    getCache,
    removeCache,
    setSessionCache,
    getSessionCache,
    removeSessionCache
} from './app/cache';

import {
	getEnvironment,
	setClientAttribute,
	getClientAttribute
} from './app/iwebCore';

import {
	ajax
} from './app/ajax';

import {
	processXHRError
} from './app/processXHRError';

import {
	serverEvent
} from './app/serverEvent';

import {
	setEnable
} from './app/util';

class App {
    constructor(){
		// init
        this.init = init; 
        // adjustMetaFunc
        this.adjustMetaFunc = adjustMetaFunc;
        // dataTable 
        this.addDataTable = addDataTable; 
        this.getDataTable = getDataTable; 
        this.getDataTables = getDataTables; 
        // comp
        this.createComp = createComp;
        this.getComp = getComp;
        this.getCompsByDataTable = getCompsByDataTable;
        this.getCompsByType = getCompsByType;
        this.getComps = getComps;
        this.showComp = showComp;
        // validate
        this.compsValidate = compsValidate;
        this.compsValidateMultiParam = compsValidateMultiParam;
        // cache
        this.setUserCache = setUserCache;
        this.getUserCache = getUserCache;
        this.removeUserCache = removeUserCache;
        this.setCache = setCache;
        this.getCache = getCache;
        this.removeCache = removeCache;
        this.setSessionCache = setSessionCache;
        this.getSessionCache = getSessionCache;
        this.removeSessionCache = removeSessionCache;
        // iwebCode
        this.getEnvironment = getEnvironment;
        this.setClientAttribute = setClientAttribute;
        this.getClientAttribute = getClientAttribute;
        // ajax
        this.ajax = ajax;
        // serverEvent
        this.serverEvent = serverEvent;
        // util
        this.setEnable = setEnable;
    }
}
window.App = App;
window.processXHRError = processXHRError;
export {App}


 //相关依赖导入
import {
    addDataTable,
    addDataTables,
    addAllDataTables,
    updateDataTables
} from './app/server-dataTable';

import {
    fire,
    setSuccessFunc
} from './app/server-fire';

import {
    processXHRError
} from './app/server-processXHRError';



import {
    setCompression,
    addParameter,
    setEvent,
    getData,
    updateDom
} from './app/server-util'

class ServerEvent {
    constructor(app){

        this.app = app
        this.datas = {}
        this.params = {}
        this.event = null
        this.ent = window.iweb.Core.collectEnvironment()
        if (!iweb.debugMode) {  //此处需要修改
            this.compression = true
        }
		
        // dataTable 
        this.addDataTable = addDataTable; 
        this.addDataTables = addDataTables; 
        this.addAllDataTables = addAllDataTables; 
        this.updateDataTables = updateDataTables;

        // fire
        this.fire = fire; 
        this.setSuccessFunc = setSuccessFunc; 

        // processXHRError
        this.processXHRError = processXHRError;

        //util
        this.setCompression = setCompression;
        this.addParameter = addParameter;
        this.setEvent = setEvent;
        this.getData = getData;
        this.updateDom = updateDom;
    }
}

ServerEvent.DEFAULT = {
    async: true,
    singleton: true,
    url: (window.$ctx || '/iwebap') + '/evt/dispatch'
}

u.createApp = function () {
    var app = new App();
    if (arguments.length > 0){
        var arg = arguments[0];
        app.init(arg.model, arg.el);
    }
    return app;
}

window.ServerEvent = ServerEvent;
export {ServerEvent}



 //相关依赖导入
import {
	on,
    off,
    one,
    trigger,
    getEvent
} from './dataTable/events';

class Events{
    constructor(){
        this.on = on;
        this.off = off;
        this.one = one;
        this.trigger = trigger;
        this.getEvent = getEvent;
    }
}

import {
    copyRow,
    copyRows
} from './dataTable/copyRow'; 

import {
    setData,
    setValue
} from './dataTable/data'; 

import{
    isEnable,
    setEnable
} from './dataTable/enable'; 

import{
    getCurrentRow,
    getCurrentIndex
} from './dataTable/getCurrent'; 

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
} from './dataTable/getData'; 

import {
    getFocusRow,
    getFocusIndex
} from './dataTable/getFocus'; 

import {
    getMeta,
    getRowMeta
} from './dataTable/getMeta'; 

import {
    getPage,
    getPages
} from './dataTable/getPage'; 

import {
    getParam
} from './dataTable/getParam'; 

import {
    getSelectedIndex,
    getSelectedIndices,
    getSelectedIndexs,
    getSelectedDatas,
    getSelectedRows
} from './dataTable/getSelect'; 

import {
    getSimpleData
} from './dataTable/getSimpleData'; 

import {
    setMeta,
    updateMeta,
    createField
} from './dataTable/meta'; 

import {
    setCurrentPage,
    updatePages,
    setPages,
    hasPage,
    clearCache,
    cacheCurrentPage
} from './dataTable/page'; 

import {
    addParam,
    addParams
} from './dataTable/param'; 

import {
    refSelectedRows,
    ref,
    refMeta,
    refRowMeta,
    refEnable
} from './dataTable/ref'; 

import {
    removeRowByRowId,
    removeRow,
    removeAllRows,
    removeRows,
    clear
} from './dataTable/removeRow'; 

import {
    setRows,
    addRow,
    addRows,
    insertRow,
    insertRows,
    createEmptyRow
} from './dataTable/row'; 

import {
    updateCurrIndex
} from './dataTable/rowCurrent'; 

import {
    setRowDelete,
    setAllRowsDelete,
    setRowsDelete
} from './dataTable/rowDelete'; 

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
} from './dataTable/rowSelect'; 

import {
    setRowFocus,
    setRowUnFocus,
    updateFocusIndex
} from './dataTable/rowFocus'; 

import {
    setSimpleData,
    addSimpleData
} from './dataTable/simpleData'; 

import {
    isChanged
} from './dataTable/util'; 


class DataTable extends Events{
    constructor(options){
        super();
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
        newMetas[key] = u.extend({}, DataTable.META_DEFAULTS, meta)
    }
    return newMetas
}




import {
	setRowValue,
	updateRow
} from './dataTable/page-data'; 

import {
	getData,
	getSelectDatas,
	getRowByRowId,
	getSelectRows,
	getRowByRowId,
	getRowValue
} from './dataTable/page-getData'; 

import{
	getRowMeta
} from './dataTable/page-getMeta'; 

import {
	setRowMeta
} from './dataTable/page-meta'; 

import {
	removeRowByRowId
} from './dataTable/page-removeRow'; 


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




import {
    setValue,
    setChildValue,
    setChildSimpleDataByRowId,
    setData,
    updateRow
} from './dataTable/row-data'; 

import {
    getValue,
    getChildValue,
    getData,
    getEmptyData
} from './dataTable/row-getData'; 

import {
    getMeta
} from './dataTable/row-getMeta'; 

import {
    getSimpleData
} from './dataTable/row-getSimpleData'; 

import {
    init
} from './dataTable/row-init'; 

import {
    setMeta
} from './dataTable/row-meta'; 

import {
    ref,
    refMeta,
    refCombo,
    refDate,
    refEnum
} from './dataTable/row-ref'; 

import{
    toggleSelect,
    singleSelect,
    multiSelect
} from './dataTable/row-rowSelect'; 

import {
    setSimpleData
} from './dataTable/row-simpleData'; 

import {
    formatValue, //需要最终产出
} from './dataTable/row-util'; 


class Row extends Events{
    constructor(options){
        super();
        var self = this;
        this.rowId = options['id'] || Row.getRandomRowId()
        this.status = Row.STATUS.NEW
        this.parent = options['parent']
        this.initValue = null
        this.data = {}
        this.metaChange = {}//ko.observable(1)
        this.valueChange = {};
        this.currentRowChange = ko.observable(1);
        this.selected = ko.pureComputed({
            read: function () {
                var index = this.parent.getRowIndex(this);
                var selectindices = this.parent.getSelectedIndices();
                return selectindices.indexOf(index) != -1;
            },
            owner: this

        })
        this.focused = ko.pureComputed({
            read: function () {
                var index = this.parent.getRowIndex(this);
                var focusIndex = this.parent.getFocusIndex()
                return focusIndex == index;
            },
            owner: this

        })

        
        //data
        this.setValue= setValue;
        this.setChildValue= setChildValue;
        this.setChildSimpleDataByRowId= setChildSimpleDataByRowId;
        this.setData= setData;
        this.updateRow= updateRow;

        //getData
        this.getValue= getValue;
        this.getChildValue= getChildValue;
        this.getData= getData;
        this.getEmptyData= getEmptyData;

        //getMeta
        this.getMeta= getMeta;

        //getSimpleData
        this.getSimpleData= getSimpleData;

        //init
        this.init= init;

        //meta
        this.setMeta= setMeta;

        //ref
        this.ref= ref;
        this.refMeta= refMeta;
        this.refCombo= refCombo;
        this.refDate= refDate;
        this.refEnum= refEnum;

        //rowSelect
        this.toggleSelect= toggleSelect;
        this.singleSelect= singleSelect;
        this.multiSelect= multiSelect;

        //simpleData
        this.setSimpleData= setSimpleData;

        //util
        this.formatValue= formatValue;

        this.init()
    }
}

Row.STATUS = {
    NORMAL: 'nrm',
    UPDATE: 'upd',
    NEW: 'new',
    DELETE: 'del',
    FALSE_DELETE: 'fdel'
}

/*
 * 生成随机行id
 * @private
 */
Row.getRandomRowId = function () {
    var _id = setTimeout(function () {})
    return  _id + '';
};