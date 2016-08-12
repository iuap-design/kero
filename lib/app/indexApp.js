'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = exports.processXHRError = exports.App = undefined;

var _init = require('./init');

var _adjustMetaFunc = require('./adjustMetaFunc');

var _dataTable = require('./dataTable');

var _comp = require('./comp');

var _validate = require('./validate');

var _cache = require('./cache');

var _iwebCore = require('./iwebCore');

var _ajax = require('./ajax');

var _processXHRError = require('./processXHRError');

var _serverEvent = require('./serverEvent');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Module : Kero webpack entry app index
                                                                                                                                                           * Author : liuyk(liuyuekai@yonyou.com)
                                                                                                                                                           * Date	  : 2016-08-09 15:24:46
                                                                                                                                                           */

//相关依赖导入


var App = function App() {
  _classCallCheck(this, App);

  // init
  this.init = _init.init;
  // adjustMetaFunc
  this.adjustMetaFunc = _adjustMetaFunc.adjustMetaFunc;
  // dataTable 
  this.addDataTable = _dataTable.addDataTable;
  this.getDataTable = _dataTable.getDataTable;
  this.getDataTables = _dataTable.getDataTables;
  // comp
  this.createComp = _comp.createComp;
  this.getComp = _comp.getComp;
  this.getCompsByDataTable = _comp.getCompsByDataTable;
  this.getCompsByType = _comp.getCompsByType;
  this.getComps = _comp.getComps;
  this.showComp = _comp.showComp;
  // validate
  this.compsValidate = _validate.compsValidate;
  this.compsValidateMultiParam = _validate.compsValidateMultiParam;
  // cache
  this.setUserCache = _cache.setUserCache;
  this.getUserCache = _cache.getUserCache;
  this.removeUserCache = _cache.removeUserCache;
  this.setCache = _cache.setCache;
  this.getCache = _cache.getCache;
  this.removeCache = _cache.removeCache;
  this.setSessionCache = _cache.setSessionCache;
  this.getSessionCache = _cache.getSessionCache;
  this.removeSessionCache = _cache.removeSessionCache;
  // iwebCode
  this.getEnvironment = _iwebCore.getEnvironment;
  this.setClientAttribute = _iwebCore.setClientAttribute;
  this.getClientAttribute = _iwebCore.getClientAttribute;
  // ajax
  this.ajax = _ajax.ajax;
  // serverEvent
  this.serverEvent = _serverEvent.serverEvent;
  // util
  this.setEnable = _util.setEnable;
};

var createApp = function createApp() {
  var app = new App();
  if (arguments.length > 0) {
    var arg = arguments[0];
    app.init(arg.model, arg.el);
  }
  return app;
};

exports.App = App;
exports.processXHRError = _processXHRError.processXHRError;
exports.createApp = createApp;