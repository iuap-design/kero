'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Row = undefined;

var _indexEvents = require('./indexEvents');

var _rowData = require('./row-data');

var _rowGetData = require('./row-getData');

var _rowGetMeta = require('./row-getMeta');

var _rowGetSimpleData = require('./row-getSimpleData');

var _rowInit = require('./row-init');

var _rowMeta = require('./row-meta');

var _rowRef = require('./row-ref');

var _rowRowSelect = require('./row-rowSelect');

var _rowSimpleData = require('./row-simpleData');

var _rowUtil = require('./row-util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_Events) {
    _inherits(Row, _Events);

    function Row(options) {
        _classCallCheck(this, Row);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Row).call(this));

        var self = _this;
        _this.rowId = options['id'] || Row.getRandomRowId();
        _this.status = Row.STATUS.NEW;
        _this.parent = options['parent'];
        _this.initValue = null;
        _this.data = {};
        _this.metaChange = {}; //ko.observable(1)
        _this.valueChange = {};
        _this.currentRowChange = ko.observable(1);
        _this.selected = ko.pureComputed({
            read: function read() {
                var index = this.parent.getRowIndex(this);
                var selectindices = this.parent.getSelectedIndices();
                return selectindices.indexOf(index) != -1;
            },
            owner: _this

        });
        _this.focused = ko.pureComputed({
            read: function read() {
                var index = this.parent.getRowIndex(this);
                var focusIndex = this.parent.getFocusIndex();
                return focusIndex == index;
            },
            owner: _this

        });

        //data
        _this.setValue = _rowData.setValue;
        _this.setChildValue = _rowData.setChildValue;
        _this.setChildSimpleDataByRowId = _rowData.setChildSimpleDataByRowId;
        _this.setData = _rowData.setData;
        _this.updateRow = _rowData.updateRow;

        //getData
        _this.getValue = _rowGetData.getValue;
        _this.getChildValue = _rowGetData.getChildValue;
        _this.getData = _rowGetData.getData;
        _this.getEmptyData = _rowGetData.getEmptyData;

        //getMeta
        _this.getMeta = _rowGetMeta.getMeta;

        //getSimpleData
        _this.getSimpleData = _rowGetSimpleData.getSimpleData;

        //init
        _this.init = _rowInit.init;

        //meta
        _this.setMeta = _rowMeta.setMeta;

        //ref
        _this.ref = _rowRef.ref;
        _this.refMeta = _rowRef.refMeta;
        _this.refCombo = _rowRef.refCombo;
        _this.refDate = _rowRef.refDate;
        _this.refEnum = _rowRef.refEnum;

        //rowSelect
        _this.toggleSelect = _rowRowSelect.toggleSelect;
        _this.singleSelect = _rowRowSelect.singleSelect;
        _this.multiSelect = _rowRowSelect.multiSelect;

        //simpleData
        _this.setSimpleData = _rowSimpleData.setSimpleData;

        //util
        _this.formatValue = _rowUtil.formatValue;

        _this.init();
        return _this;
    }

    return Row;
}(_indexEvents.Events);

Row.STATUS = {
    NORMAL: 'nrm',
    UPDATE: 'upd',
    NEW: 'new',
    DELETE: 'del',
    FALSE_DELETE: 'fdel'
};

/*
 * 生成随机行id
 * @private
 */
Row.getRandomRowId = function () {
    var _id = setTimeout(function () {});
    return _id + '';
};

exports.Row = Row;