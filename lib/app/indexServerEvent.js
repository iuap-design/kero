'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ServerEvent = undefined;

var _serverDataTable = require('./server-dataTable');

var _serverFire = require('./server-fire');

var _serverProcessXHRError = require('./server-processXHRError');

var _serverUtil = require('./server-util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //相关依赖导入


var ServerEvent = function ServerEvent(app) {
    _classCallCheck(this, ServerEvent);

    this.app = app;
    this.datas = {};
    this.params = {};
    this.event = null;
    this.ent = window.iweb.Core.collectEnvironment();
    if (!iweb.debugMode) {
        //此处需要修改
        this.compression = true;
    }

    // dataTable 
    this.addDataTable = _serverDataTable.addDataTable;
    this.addDataTables = _serverDataTable.addDataTables;
    this.addAllDataTables = _serverDataTable.addAllDataTables;
    this.updateDataTables = _serverDataTable.updateDataTables;

    // fire
    this.fire = _serverFire.fire;
    this.setSuccessFunc = _serverFire.setSuccessFunc;

    // processXHRError
    this.processXHRError = _serverProcessXHRError.processXHRError;

    //util
    this.setCompression = _serverUtil.setCompression;
    this.addParameter = _serverUtil.addParameter;
    this.setEvent = _serverUtil.setEvent;
    this.getData = _serverUtil.getData;
    this.updateDom = _serverUtil.updateDom;
};

ServerEvent.DEFAULT = {
    async: true,
    singleton: true,
    url: (window.$ctx || '/iwebap') + '/evt/dispatch'
};

exports.ServerEvent = ServerEvent;