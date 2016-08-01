/**
 * Module : kero dataTable entry index
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

 //相关依赖导入
import {
	on,
    off,
    one,
    trigger,
    getEvent
} from './events';

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
    addParam,
    addParams,
    getParam
} from './param';

import {
    getMeta,
    setMeta,
    updateMeta
} from './meta'

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

        // param
        this.addParam = addParam;
        this.addParams = addParams;
        this.getParam = getParam;

        // meta
        this.getMeta = getMeta;
        this.setMeta = setMeta;,
        this.updateMeta = updateMeta;

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
        //if (meta['type'] && meta['type'] === 'child'){
        //
        //}
        newMetas[key] = u.extend({}, DataTable.META_DEFAULTS, meta)
    }
    //默认创建一个$data字段
    // if (u.isEmptyObject(newMetas)){
    //     newMetas['$data'] = {};
    // }
    return newMetas
}

export {App}
