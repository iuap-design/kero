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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Module : Kero webpack entry Page index
                                                                                                                                                           * Author : liuyk(liuyuekai@yonyou.com)
                                                                                                                                                           * Date	  : 2016-08-09 15:24:46
                                                                                                                                                           */

var Page = function Page(options) {
	_classCallCheck(this, Page);

	this.focus = options['focus'] || null;
	this.selectedIndices = options['selectedIndices'] || null;
	this.rows = options['rows'] || [];
	this.parent = options['parent'] || null;
};

//data


Page.prototype.setRowValue = _pageData.setRowValue;
Page.prototype.updateRow = _pageData.updateRow;

//getData
Page.prototype.getData = _pageGetData.getData;
Page.prototype.getSelectDatas = _pageGetData.getSelectDatas;
Page.prototype.getSelectRows = _pageGetData.getSelectRows;
Page.prototype.getRowByRowId = _pageGetData.getRowByRowId;
Page.prototype.getRowValue = _pageGetData.getRowValue;

//getMeta
Page.prototype.getRowMeta = _pageGetMeta.getRowMeta;

//meta
Page.prototype.setRowMeta = _pageMeta.setRowMeta;

//removeRow
Page.prototype.removeRowByRowId = _pageRemoveRow.removeRowByRowId;
Page.prototype.updateSelectedIndices = _pageRemoveRow.updateSelectedIndices;
Page.prototype.updateFocusIndex = _pageRemoveRow.updateFocusIndex;

exports.Page = Page;