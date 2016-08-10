'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataTable = undefined;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = function (_Events) {
    _inherits(DataTable, _Events);

    function DataTable(options) {
        _classCallCheck(this, DataTable);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataTable).call(this));

        options = options || {};
        _this.id = options['id'];
        _this.strict = options['strict'] || false;
        _this.meta = DataTable.createMetaItems(options['meta']);
        _this.enable = options['enable'] || DataTable.DEFAULTS.enable;
        _this.pageSize = ko.observable(options['pageSize'] || DataTable.DEFAULTS.pageSize);
        _this.pageIndex = ko.observable(options['pageIndex'] || DataTable.DEFAULTS.pageIndex);
        _this.totalPages = ko.observable(options['totalPages'] || DataTable.DEFAULTS.totalPages);
        _this.totalRow = ko.observable();
        _this.pageCache = options['pageCache'] === undefined ? DataTable.DEFAULTS.pageCache : options['pageCache'];
        _this.rows = ko.observableArray([]);
        _this.selectedIndices = ko.observableArray([]);
        _this._oldCurrentIndex = -1;
        _this.focusIndex = ko.observable(-1);
        _this.cachedPages = [];
        _this.metaChange = {};
        _this.valueChange = {}; //ko.observable(1);
        _this.currentRowChange = ko.observable(1);
        _this.enableChange = ko.observable(1);
        _this.params = options['params'] || {};
        _this.master = options['master'] || '';
        _this.allSelected = ko.observable(false);
        if (options['root']) {
            _this.root = options['root'];
        } else {
            _this.root = _this;
        }
        if (options['ns']) {
            _this.ns = options['ns'];
        } else {
            _this.ns = '';
        }

        //copyRow
        _this.copyRow = _copyRow.copyRow;
        _this.copyRows = _copyRow.copyRows;

        //data
        _this.setData = _data.setData;
        _this.setValue = _data.setValue;

        //enable
        _this.isEnable = _enable.isEnable;
        _this.setEnable = _enable.setEnable;

        //getData
        _this.getData = _getData.getData;
        _this.getDataByRule = _getData.getDataByRule;
        _this.getRow = _getData.getRow;
        _this.getRowByRowId = _getData.getRowByRowId;
        _this.getRowIndex = _getData.getRowIndex;
        _this.getRowsByField = _getData.getRowsByField;
        _this.getRowByField = _getData.getRowByField;
        _this.getAllRows = _getData.getAllRows;
        _this.getAllPageRows = _getData.getAllPageRows;
        _this.getChangedDatas = _getData.getChangedDatas;
        _this.getChangedRows = _getData.getChangedRows;
        _this.getValue = _getData.getValue;
        _this.getIndexByRowId = _getData.getIndexByRowId;
        _this.getAllDatas = _getData.getAllDatas;
        _this.getRowIdsByIndices = _getData.getRowIdsByIndices;

        //getCurrent
        _this.getCurrentRow = _getCurrent.getCurrentRow;
        _this.getCurrentIndex = _getCurrent.getCurrentIndex;

        //getFocus
        _this.getFocusRow = _getFocus.getFocusRow;
        _this.getFocusIndex = _getFocus.getFocusIndex;

        //getMeta
        _this.getMeta = _getMeta.getMeta;
        _this.getRowMeta = _getMeta.getRowMeta;

        //getPage
        _this.getPage = _getPage.getPage;
        _this.getPages = _getPage.getPages;

        //getParam
        _this.getParam = _getParam.getParam;

        //getSelect
        _this.getSelectedIndex = _getSelect.getSelectedIndex;
        _this.getSelectedIndices = _getSelect.getSelectedIndices;
        _this.getSelectedIndexs = _getSelect.getSelectedIndexs;
        _this.getSelectedDatas = _getSelect.getSelectedDatas;
        _this.getSelectedRows = _getSelect.getSelectedRows;

        //getSimpleData
        _this.getSimpleData = _getSimpleData.getSimpleData;

        //meta
        _this.setMeta = _meta.setMeta;
        _this.updateMeta = _meta.updateMeta;
        _this.createField = _meta.createField;

        //page
        _this.setCurrentPage = _page.setCurrentPage;
        _this.updatePages = _page.updatePages;
        _this.setPages = _page.setPages;
        _this.hasPage = _page.hasPage;
        _this.clearCache = _page.clearCache;
        _this.cacheCurrentPage = _page.cacheCurrentPage;

        //param
        _this.addParam = _param.addParam;
        _this.addParams = _param.addParams;

        //ref
        _this.refSelectedRows = _ref.refSelectedRows;
        _this.ref = _ref.ref;
        _this.refMeta = _ref.refMeta;
        _this.refRowMeta = _ref.refRowMeta;
        _this.refEnable = _ref.refEnable;

        //row
        _this.setRows = _row.setRows;
        _this.addRow = _row.addRow;
        _this.addRows = _row.addRows;
        _this.insertRow = _row.insertRow;
        _this.insertRows = _row.insertRows;
        _this.createEmptyRow = _row.createEmptyRow;

        //removeRow
        _this.removeRowByRowId = _removeRow.removeRowByRowId;
        _this.removeRow = _removeRow.removeRow;
        _this.removeAllRows = _removeRow.removeAllRows;
        _this.removeRows = _removeRow.removeRows;
        _this.clear = _removeRow.clear;

        //rowCurrent
        _this.updateCurrIndex = _rowCurrent.updateCurrIndex;

        //rowDelete
        _this.setRowDelete = _rowDelete.setRowDelete;
        _this.setAllRowsDelete = _rowDelete.setAllRowsDelete;
        _this.setRowsDelete = _rowDelete.setRowsDelete;

        //rowFocus
        _this.setRowFocus = _rowFocus.setRowFocus;
        _this.setRowUnFocus = _rowFocus.setRowUnFocus;
        _this.updateFocusIndex = _rowFocus.updateFocusIndex;

        //rowSelect
        _this.setAllRowsSelect = _rowSelect.setAllRowsSelect;
        _this.setRowSelect = _rowSelect.setRowSelect;
        _this.setRowsSelect = _rowSelect.setRowsSelect;
        _this.addRowSelect = _rowSelect.addRowSelect;
        _this.addRowsSelect = _rowSelect.addRowsSelect;
        _this.setAllRowsUnSelect = _rowSelect.setAllRowsUnSelect;
        _this.setRowUnSelect = _rowSelect.setRowUnSelect;
        _this.setRowsUnSelect = _rowSelect.setRowsUnSelect;
        _this.toggleAllSelect = _rowSelect.toggleAllSelect;
        _this.updateSelectedIndices = _rowSelect.updateSelectedIndices;

        //simpleData
        _this.setSimpleData = _simpleData.setSimpleData;
        _this.addSimpleData = _simpleData.addSimpleData;

        //util
        _this.isChanged = _util.isChanged;
        return _this;
    }

    return DataTable;
}(_indexEvents.Events);

DataTable.DEFAULTS = {
    pageSize: 20,
    pageIndex: 0,
    totalPages: 20,
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
        newMetas[key] = u.extend({}, DataTable.META_DEFAULTS, meta);
    }
    return newMetas;
};

exports.DataTable = DataTable;