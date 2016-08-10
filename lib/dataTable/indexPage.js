'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Page = undefined;

var _pageData = require('./page-data');

var _pageGetData = require('./page-getData');

var _pageGetMeta = require('./page-getMeta');

var _pageMeta = require('./page-meta');

var _pageRemoveRow = require('./page-removeRow');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function Page(options) {
	_classCallCheck(this, Page);

	this.focus = options['focus'] || null;
	this.selectedIndices = options['selectedIndices'] || null;
	this.rows = options['rows'] || [];
	this.parent = options['parent'] || null;

	//data
	this.setRowValue = _pageData.setRowValue;
	this.updateRow = _pageData.updateRow;

	//getData
	this.getData = _pageGetData.getData;
	this.getSelectDatas = _pageGetData.getSelectDatas;
	this.getSelectRows = _pageGetData.getSelectRows;
	this.getRowByRowId = _pageGetData.getRowByRowId;
	this.getRowValue = _pageGetData.getRowValue;

	//getMeta
	this.getRowMeta = _pageGetMeta.getRowMeta;

	//meta
	this.setRowMeta = _pageMeta.setRowMeta;

	//removeRow
	this.removeRowByRowId = _pageRemoveRow.removeRowByRowId;
};

exports.Page = Page;