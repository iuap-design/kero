 /**
  * Module : Kero webpack entry dataTable index
  * Author : liuyk(liuyuekai@yonyou.com)
  * Date   : 2016-08-09 15:24:46
  */

 import {
     extend
 } from 'tinper-sparrow/src/extend';


 import {
     copyRowFunObj
 } from './copyRow';

 import {
     dataFunObj
 } from './data';

 import {
     enableFunObj
 } from './enable';

 import {
     getCurrentFunObj
 } from './getCurrent';

 import {
     getDataFunObj
 } from './getData';

 import {
     getFocusFunObj
 } from './getFocus';

 import {
     getMetaFunObj
 } from './getMeta';

 import {
     getPageFunObj
 } from './getPage';

 import {
     getParamFunObj
 } from './getParam';

 import {
     getSelectFunObj
 } from './getSelect';

 import {
     getSimpleDataFunObj
 } from './getSimpleData';

 import {
     metaFunObj
 } from './meta';

 import {
     pageFunObj
 } from './page';

 import {
     paramFunObj
 } from './param';

 import {
     refFunObj
 } from './ref';

 import {
     removeRowFunObj
 } from './removeRow';

 import {
     rowFunObj
 } from './row';

 import {
     rowCurrentFunObj
 } from './rowCurrent';

 import {
     rowDeleteFunObj
 } from './rowDelete';

 import {
     rowSelectFunObj
 } from './rowSelect';

 import {
     rowFocusFunObj
 } from './rowFocus';

 import {
     simpleDataFunObj
 } from './simpleData';

 import {
     utilFunObj
 } from './util';

 import {
     eventsFunObj
 } from './events';


 /**
  * DataTable
  * @namespace
  * @description 前端数据模型对象
  */
 class DataTable {
     constructor(options) {
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
         this.valueChange = {}; //ko.observable(1);
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
         if (options['root']) {
             this.root = options['root']
         } else {
             this.root = this;
         }
         // 记录子表的路径
         if (options['ns']) {
             this.ns = options['ns'];
         } else {
             this.ns = '';
         }
         // 前端分页情况下记录前端新增的数据
         this.newCount = 0;
     }
 }

 var DataTableProto = DataTable.prototype;
 Object.assign(DataTableProto, copyRowFunObj);
 Object.assign(DataTableProto, dataFunObj);
 Object.assign(DataTableProto, enableFunObj);
 Object.assign(DataTableProto, getCurrentFunObj);
 Object.assign(DataTableProto, getDataFunObj);
 Object.assign(DataTableProto, getFocusFunObj);
 Object.assign(DataTableProto, getMetaFunObj);
 Object.assign(DataTableProto, getPageFunObj);
 Object.assign(DataTableProto, getParamFunObj);
 Object.assign(DataTableProto, getSelectFunObj);
 Object.assign(DataTableProto, getSimpleDataFunObj);
 Object.assign(DataTableProto, pageFunObj);
 Object.assign(DataTableProto, metaFunObj);
 Object.assign(DataTableProto, refFunObj);
 Object.assign(DataTableProto, paramFunObj);
 Object.assign(DataTableProto, rowFunObj);
 Object.assign(DataTableProto, removeRowFunObj);
 Object.assign(DataTableProto, rowCurrentFunObj);
 Object.assign(DataTableProto, simpleDataFunObj);
 Object.assign(DataTableProto, rowFocusFunObj);
 Object.assign(DataTableProto, eventsFunObj);
 Object.assign(DataTableProto, utilFunObj);
 Object.assign(DataTableProto, rowSelectFunObj);
 Object.assign(DataTableProto, rowDeleteFunObj);

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
 DataTable.ON_CURRENT_VALUE_CHANGE = 'currentValueChange' //当前行变化
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


 DataTable.createMetaItems = function(metas) {
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
