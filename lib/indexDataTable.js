'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataTable = undefined;

var _extend = require('tinper-sparrow/src/extend');

var _indexEvents = require('./indexEvents');

var _copyRow = require('./copyRow');

var _data = require('./data');

var _enable = require('./enable');

var _getCurrent = require('./getCurrent');

var _getData = require('./getData');

var _getFocus = require('./getFocus');

var _getMeta = require('./getMeta');

var _getPage = require('./getPage');

var _getParam = require('./getParam');

var _getSelect = require('./getSelect');

var _getSimpleData = require('./getSimpleData');

var _meta = require('./meta');

var _page = require('./page');

var _param = require('./param');

var _ref = require('./ref');

var _removeRow = require('./removeRow');

var _row = require('./row');

var _rowCurrent = require('./rowCurrent');

var _rowDelete = require('./rowDelete');

var _rowSelect = require('./rowSelect');

var _rowFocus = require('./rowFocus');

var _simpleData = require('./simpleData');

var _util = require('./util');

var _events = require('./events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                          * Module : Kero webpack entry dataTable index
                                                                                                                                                          * Author : liuyk(liuyuekai@yonyou.com)
                                                                                                                                                          * Date   : 2016-08-09 15:24:46
                                                                                                                                                          */

var DataTable =
// class DataTable extends Events{
function DataTable(options) {
    _classCallCheck(this, DataTable);

    // IE9下转化之后的代码有问题，无法获得superClass方法
    // super();
    options = options || {};
    this.id = options['id'];
    this.strict = options['strict'] || false;
    this.meta = DataTable.createMetaItems(options['meta']);
    this.enable = options['enable'] || DataTable.DEFAULTS.enable;
    this.pageSize = ko.observable(options['pageSize'] || DataTable.DEFAULTS.pageSize);
    this.pageIndex = ko.observable(options['pageIndex'] || DataTable.DEFAULTS.pageIndex);
    this.totalPages = ko.observable(options['totalPages'] || DataTable.DEFAULTS.totalPages);
    this.totalRow = ko.observable();
    this.pageCache = options['pageCache'] === undefined ? DataTable.DEFAULTS.pageCache : options['pageCache'];
    this.rows = ko.observableArray([]);
    this.selectedIndices = ko.observableArray([]);
    this._oldCurrentIndex = -1;
    this.focusIndex = ko.observable(-1);
    this.cachedPages = [];
    this.metaChange = {};
    this.valueChange = {}; //ko.observable(1);
    this.currentRowChange = ko.observable(1);
    this.enableChange = ko.observable(1);
    this.params = options['params'] || {};
    this.master = options['master'] || '';
    this.allSelected = ko.observable(false);
    //dateNoconvert：true时，时间不转化，按真实走，false是，时间转换成long型
    this.dateNoConvert = options['dateNoConvert'];
    if (options['root']) {
        this.root = options['root'];
    } else {
        this.root = this;
    }
    if (options['ns']) {
        this.ns = options['ns'];
    } else {
        this.ns = '';
    }
    this.newCount = 0;
};

DataTable.prototype.on = _events.on;
DataTable.prototype.off = _events.off;
DataTable.prototype.one = _events.one;
DataTable.prototype.trigger = _events.trigger;
DataTable.prototype.triggerReturn = _events.triggerReturn;
DataTable.prototype.getEvent = _events.getEvent;
//copyRow
DataTable.prototype.copyRow = _copyRow.copyRow;
DataTable.prototype.copyRows = _copyRow.copyRows;

//data
DataTable.prototype.setData = _data.setData;
DataTable.prototype.setValue = _data.setValue;

//enable
DataTable.prototype.isEnable = _enable.isEnable;
DataTable.prototype.setEnable = _enable.setEnable;

//getData
DataTable.prototype.getData = _getData.getData;
DataTable.prototype.getDataByRule = _getData.getDataByRule;
DataTable.prototype.getRow = _getData.getRow;
DataTable.prototype.getChildRow = _getData.getChildRow;
DataTable.prototype.getRowByRowId = _getData.getRowByRowId;
DataTable.prototype.getRowIndex = _getData.getRowIndex;
DataTable.prototype.getRowsByField = _getData.getRowsByField;
DataTable.prototype.getRowByField = _getData.getRowByField;
DataTable.prototype.getAllRows = _getData.getAllRows;
DataTable.prototype.getAllPageRows = _getData.getAllPageRows;
DataTable.prototype.getChangedDatas = _getData.getChangedDatas;
DataTable.prototype.getChangedRows = _getData.getChangedRows;
DataTable.prototype.getValue = _getData.getValue;
DataTable.prototype.getIndexByRowId = _getData.getIndexByRowId;
DataTable.prototype.getAllDatas = _getData.getAllDatas;
DataTable.prototype.getRowIdsByIndices = _getData.getRowIdsByIndices;

//getCurrent
DataTable.prototype.getCurrentRow = _getCurrent.getCurrentRow;
DataTable.prototype.getCurrentIndex = _getCurrent.getCurrentIndex;

//getFocus
DataTable.prototype.getFocusRow = _getFocus.getFocusRow;
DataTable.prototype.getFocusIndex = _getFocus.getFocusIndex;

//getMeta
DataTable.prototype.getMeta = _getMeta.getMeta;
DataTable.prototype.getRowMeta = _getMeta.getRowMeta;

//getPage
DataTable.prototype.getPage = _getPage.getPage;
DataTable.prototype.getPages = _getPage.getPages;

//getParam
DataTable.prototype.getParam = _getParam.getParam;

//getSelect
DataTable.prototype.getSelectedIndex = _getSelect.getSelectedIndex;
DataTable.prototype.getSelectedIndices = _getSelect.getSelectedIndices;
DataTable.prototype.getSelectedIndexs = _getSelect.getSelectedIndexs;
DataTable.prototype.getSelectedDatas = _getSelect.getSelectedDatas;
DataTable.prototype.getSelectedRows = _getSelect.getSelectedRows;

//getSimpleData
DataTable.prototype.getSimpleData = _getSimpleData.getSimpleData;

//meta
DataTable.prototype.setMeta = _meta.setMeta;
DataTable.prototype.updateMeta = _meta.updateMeta;
DataTable.prototype.createField = _meta.createField;

//page
DataTable.prototype.setCurrentPage = _page.setCurrentPage;
DataTable.prototype.updatePages = _page.updatePages;
DataTable.prototype.setPages = _page.setPages;
DataTable.prototype.hasPage = _page.hasPage;
DataTable.prototype.clearCache = _page.clearCache;
DataTable.prototype.cacheCurrentPage = _page.cacheCurrentPage;
DataTable.prototype.updatePagesSelect = _page.updatePagesSelect;
DataTable.prototype.updatePageRows = _page.updatePageRows;
DataTable.prototype.updatePageSelect = _page.updatePageSelect;
DataTable.prototype.updatePageFocus = _page.updatePageFocus;
DataTable.prototype.updatePageAll = _page.updatePageAll;

//param
DataTable.prototype.addParam = _param.addParam;
DataTable.prototype.addParams = _param.addParams;

//ref
DataTable.prototype.refSelectedRows = _ref.refSelectedRows;
DataTable.prototype.ref = _ref.ref;
DataTable.prototype.refMeta = _ref.refMeta;
DataTable.prototype.refRowMeta = _ref.refRowMeta;
DataTable.prototype.refEnable = _ref.refEnable;
DataTable.prototype.refByRow = _ref.refByRow;

//row
DataTable.prototype.setRows = _row.setRows;
DataTable.prototype.addRow = _row.addRow;
DataTable.prototype.addRows = _row.addRows;
DataTable.prototype.insertRow = _row.insertRow;
DataTable.prototype.insertRows = _row.insertRows;
DataTable.prototype.createEmptyRow = _row.createEmptyRow;

//removeRow
DataTable.prototype.removeRowByRowId = _removeRow.removeRowByRowId;
DataTable.prototype.removeRow = _removeRow.removeRow;
DataTable.prototype.removeAllRows = _removeRow.removeAllRows;
DataTable.prototype.removeRows = _removeRow.removeRows;
DataTable.prototype.clear = _removeRow.clear;

//rowCurrent
DataTable.prototype.updateCurrIndex = _rowCurrent.updateCurrIndex;

//rowDelete
DataTable.prototype.setRowDelete = _rowDelete.setRowDelete;
DataTable.prototype.setAllRowsDelete = _rowDelete.setAllRowsDelete;
DataTable.prototype.setRowsDelete = _rowDelete.setRowsDelete;

//rowFocus
DataTable.prototype.setRowFocus = _rowFocus.setRowFocus;
DataTable.prototype.setRowUnFocus = _rowFocus.setRowUnFocus;
DataTable.prototype.updateFocusIndex = _rowFocus.updateFocusIndex;

//rowSelect
DataTable.prototype.setAllRowsSelect = _rowSelect.setAllRowsSelect;
DataTable.prototype.setRowSelect = _rowSelect.setRowSelect;
DataTable.prototype.setRowsSelect = _rowSelect.setRowsSelect;
DataTable.prototype.addRowSelect = _rowSelect.addRowSelect;
DataTable.prototype.addRowsSelect = _rowSelect.addRowsSelect;
DataTable.prototype.setAllRowsUnSelect = _rowSelect.setAllRowsUnSelect;
DataTable.prototype.setRowUnSelect = _rowSelect.setRowUnSelect;
DataTable.prototype.setRowsUnSelect = _rowSelect.setRowsUnSelect;
DataTable.prototype.toggleAllSelect = _rowSelect.toggleAllSelect;
DataTable.prototype.updateSelectedIndices = _rowSelect.updateSelectedIndices;

//simpleData
DataTable.prototype.setSimpleData = _simpleData.setSimpleData;
DataTable.prototype.addSimpleData = _simpleData.addSimpleData;

//util
DataTable.prototype.isChanged = _util.isChanged;

DataTable.DEFAULTS = {
    pageSize: 20,
    pageIndex: 0,
    totalPages: 0,
    pageCache: false,
    enable: true
};

DataTable.META_DEFAULTS = {
    enable: true,
    required: false,
    descs: {}
};

//事件类型
DataTable.ON_ROW_SELECT = 'select';
DataTable.ON_ROW_UNSELECT = 'unSelect';
DataTable.ON_ROW_ALLSELECT = 'allSelect';
DataTable.ON_ROW_ALLUNSELECT = 'allUnselect';
DataTable.ON_VALUE_CHANGE = 'valueChange';
DataTable.ON_BEFORE_VALUE_CHANGE = 'beforeValueCHange';
DataTable.ON_CURRENT_VALUE_CHANGE = 'currentValueChange'; //当前行变化
//  DataTable.ON_AFTER_VALUE_CHANGE = 'afterValueChange'
//  DataTable.ON_ADD_ROW = 'addRow'
DataTable.ON_INSERT = 'insert';
DataTable.ON_UPDATE = 'update';
DataTable.ON_CURRENT_UPDATE = 'currentUpdate';
DataTable.ON_DELETE = 'delete';
DataTable.ON_DELETE_ALL = 'deleteAll';
DataTable.ON_ROW_FOCUS = 'focus';
DataTable.ON_ROW_UNFOCUS = 'unFocus';
DataTable.ON_LOAD = 'load';
DataTable.ON_ENABLE_CHANGE = 'enableChange';
DataTable.ON_META_CHANGE = 'metaChange';
DataTable.ON_ROW_META_CHANGE = 'rowMetaChange';
DataTable.ON_CURRENT_META_CHANGE = 'currentMetaChange';
DataTable.ON_CURRENT_ROW_CHANGE = 'currentRowChange';

DataTable.SUBMIT = {
    current: 'current',
    focus: 'focus',
    all: 'all',
    select: 'select',
    change: 'change',
    empty: 'empty',
    allSelect: 'allSelect',
    allPages: 'allPages'
};

DataTable.createMetaItems = function (metas) {
    var newMetas = {};
    for (var key in metas) {
        var meta = metas[key];
        if (typeof meta == 'string') meta = {};
        newMetas[key] = (0, _extend.extend)({}, DataTable.META_DEFAULTS, meta);
    }
    return newMetas;
};

exports.DataTable = DataTable;