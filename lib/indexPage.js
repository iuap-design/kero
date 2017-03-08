(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './page-data', './page-getData', './page-getMeta', './page-meta', './page-removeRow'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./page-data'), require('./page-getData'), require('./page-getMeta'), require('./page-meta'), require('./page-removeRow'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.pageData, global.pageGetData, global.pageGetMeta, global.pageMeta, global.pageRemoveRow);
    global.indexPage = mod.exports;
  }
})(this, function (exports, _pageData, _pageGetData, _pageGetMeta, _pageMeta, _pageRemoveRow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Page = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Page = function Page(options) {
    _classCallCheck(this, Page);

    // 当前焦点行
    this.focus = options['focus'] || null;
    // 选中行
    this.selectedIndices = options['selectedIndices'] || null;
    // 所有数据行
    this.rows = options['rows'] || [];
    // DataTable对象
    this.parent = options['parent'] || null;
  };

  var PageProto = Page.prototype;
  Object.assign(PageProto, _pageData.pageDataFunObj);
  Object.assign(PageProto, _pageGetData.pageGetDataFunObj);
  Object.assign(PageProto, _pageGetMeta.rowGetMetaFunObj);
  Object.assign(PageProto, _pageMeta.pageMetaFunObj);
  Object.assign(PageProto, _pageRemoveRow.pageRemoveRowFunObj);

  exports.Page = Page;
});