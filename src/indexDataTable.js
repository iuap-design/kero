 /**
 * Module : Kero webpack entry dataTable index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */

 import {extend} from 'tinper-sparrow/src/extend';

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
    getChildRow,
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
    cacheCurrentPage,
    updatePagesSelect,
    updatePageRows,
    updatePageSelect,
    updatePageFocus,
    updatePageAll
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
    refEnable,
    refByRow
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
    triggerReturn,
    getEvent
} from './events';


/**
 * DataTable
 * @namespace
 * @description 前端数据模型对象
 */
class DataTable{
    constructor(options){
        options = options || {};
        /**
         * DataTable对应的唯一标识
         * @type {string}
         */
        this.id = options['id'];
        /**
         * 在设置数据时是否自动创建对应字段，如果为true则不自动创建，如果为false则自动创建缺失的字段
         * @type {boolean}
         * @default false
         */
        this.strict = options['strict'] || false;
        /**
         * DataTable的所有字段属性信息
         * @type {object}
         */
        this.meta = DataTable.createMetaItems(options['meta']);
        /**
         * DataTable的是否支持编辑功能
         * @type {boolean}
         * @default true
         */
        this.enable = options['enable'] || DataTable.DEFAULTS.enable;
        /**
         * DataTable支持翻页功能时每页显示数据条数
         * @type {number}
         * @default 20
         */
        this.pageSize = ko.observable(options['pageSize'] || DataTable.DEFAULTS.pageSize);
        /**
         * DataTable支持翻页功能时当前页码
         * @type {number}
         * @default 0
         */
        this.pageIndex = ko.observable(options['pageIndex'] || DataTable.DEFAULTS.pageIndex);
        /**
         * DataTable支持翻页功能时总页数
         * @type {number}
         * @default 0
         */
        this.totalPages = ko.observable(options['totalPages'] || DataTable.DEFAULTS.totalPages);
        // 存储所有行对象
        this.totalRow = ko.observable();
        /**
         * DataTable的是否支持前端缓存，支持前端缓存则前端会存储所有页的数据信息，否则只保存当前页的数据信息。如果使用前端缓存则需要使用框架封装的fire方法来与后台进行交互
         * @type {boolean}
         * @default false
         */
        this.pageCache = options['pageCache'] === undefined ? DataTable.DEFAULTS.pageCache : options['pageCache'];
        // 存储所有row对象
        this.rows = ko.observableArray([])
        // 存储所有的选中行的index
        this.selectedIndices = ko.observableArray([])
        // 原有的当前行，用于判断当前行是否发生变化
        this._oldCurrentIndex = -1;
        // 当前focus行
        this.focusIndex = ko.observable(-1)
        // 存储所有页对象
        this.cachedPages = []
        // 存储meta改变信息
        this.metaChange = {};
        // 存储valuecahnge改变信息
        this.valueChange = {};//ko.observable(1);
        // 监听当前行改变
        this.currentRowChange = ko.observable(1);
        // 监听是否可修改属性的改变
        this.enableChange = ko.observable(1);
        /**
         * 使用者自定义的属性合集，框架内部不会针对此属性进行特殊处理，仅用于设置及获取
         * @type {object}
         */
        this.params = options['params'] || {};
        /**
         * 使用者自定义的属性，框架内部不会针对此属性进行特殊处理，仅用于设置及获取。
         * @type {string}
         */
        this.master = options['master'] || '';
        // 监听是否全部选中
        this.allSelected = ko.observable(false);
        /**
         * 通过getSimpleData获取数据时，日期字段是否转化为long型，如果为true时不进行转化，为false时转化为long型
         * @type {boolean}
         * @default false
         */
        this.dateNoConvert = options['dateNoConvert'] || false;
        // 对于子表通过root字段存储根datatable对象
        if (options['root']){
            this.root = options['root']
        }else{
            this.root = this;
        }
        // 记录子表的路径
        if (options['ns']){
            this.ns = options['ns'];
        }else{
            this.ns = '';
        }
        // 前端分页情况下记录前端新增的数据
        this.newCount = 0;
    }
}
DataTable.prototype.on = on;
DataTable.prototype.off = off;
DataTable.prototype.one = one;
DataTable.prototype.trigger = trigger;
DataTable.prototype.triggerReturn = triggerReturn;
DataTable.prototype.getEvent = getEvent;
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
DataTable.prototype.getChildRow = getChildRow;
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
DataTable.prototype.updatePagesSelect = updatePagesSelect;
DataTable.prototype.updatePageRows = updatePageRows;
DataTable.prototype.updatePageSelect = updatePageSelect;
DataTable.prototype.updatePageFocus = updatePageFocus;
DataTable.prototype.updatePageAll = updatePageAll;


//param
DataTable.prototype.addParam= addParam;
DataTable.prototype.addParams= addParams;

//ref
DataTable.prototype.refSelectedRows= refSelectedRows;
DataTable.prototype.ref= ref;
DataTable.prototype.refMeta= refMeta;
DataTable.prototype.refRowMeta= refRowMeta;
DataTable.prototype.refEnable= refEnable;
DataTable.prototype.refByRow= refByRow;

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
    totalPages: 0,
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
DataTable.ON_BEFORE_VALUE_CHANGE = 'beforeValueCHange'
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
