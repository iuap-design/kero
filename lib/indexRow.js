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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Module : Kero webpack entry row index
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author : liuyk(liuyuekai@yonyou.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date   : 2016-08-09 15:24:46
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Row = function (_Events) {
    _inherits(Row, _Events);

    function Row(options) {
        _classCallCheck(this, Row);

        var _this = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this));

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

        _this.init();
        return _this;
    }

    return Row;
}(_indexEvents.Events);

//data


Row.prototype.setValue = _rowData.setValue;
Row.prototype.setChildValue = _rowData.setChildValue;
Row.prototype.setChildSimpleDataByRowId = _rowData.setChildSimpleDataByRowId;
Row.prototype.setData = _rowData.setData;
Row.prototype.updateRow = _rowData.updateRow;

//getData
Row.prototype.getValue = _rowGetData.getValue;
Row.prototype.getChildValue = _rowGetData.getChildValue;
Row.prototype.getData = _rowGetData.getData;
Row.prototype.getEmptyData = _rowGetData.getEmptyData;

//getMeta
Row.prototype.getMeta = _rowGetMeta.getMeta;

//getSimpleData
Row.prototype.formatValueFun = _rowGetSimpleData.formatValueFun;
Row.prototype.getSimpleData = _rowGetSimpleData.getSimpleData;

//init
Row.prototype.init = _rowInit.init;

//meta
Row.prototype.setMeta = _rowMeta.setMeta;

//ref
Row.prototype.ref = _rowRef.ref;
Row.prototype.refMeta = _rowRef.refMeta;
Row.prototype.refCombo = _rowRef.refCombo;
Row.prototype.refDate = _rowRef.refDate;
Row.prototype.refEnum = _rowRef.refEnum;

//rowSelect
Row.prototype.toggleSelect = _rowRowSelect.toggleSelect;
Row.prototype.singleSelect = _rowRowSelect.singleSelect;
Row.prototype.multiSelect = _rowRowSelect.multiSelect;

//simpleData
Row.prototype.setSimpleData = _rowSimpleData.setSimpleData;

//util
Row.prototype.formatValue = _rowUtil.formatValue;

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