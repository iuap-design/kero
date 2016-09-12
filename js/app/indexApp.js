/**
 * Module : Kero webpack entry app index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date	  : 2016-08-09 15:24:46
 */

//相关依赖导入
import {
	init
} from './init';

import {
	adjustMetaFunc
} from './adjustMetaFunc';

import {
	addDataTable,
	getDataTable,
	getDataTables
} from './dataTable';

import {
	createComp,
	getComp,
	getCompsByDataTable,
	getCompsByType,
	getComps,
	showComp
} from './comp';

import {
	compsValidate,
	compsValidateMultiParam
} from './validate';

import {
    setUserCache,
    getUserCache,
    removeUserCache,
    setCache,
    getCache,
    removeCache,
    setSessionCache,
    getSessionCache,
    removeSessionCache
} from './cache';

import {
	getEnvironment,
	setClientAttribute,
	getClientAttribute
} from './iwebCore';

import {
	ajax
} from './ajax';

import {
	processXHRError
} from './processXHRError';

import {
	serverEvent
} from './serverEvent';

import {
	setEnable
} from './util';

class App {
    constructor(){
		// init
        this.init = init;
        this.dataTables = {};

    }
}

// adjustMetaFunc
App.prototype.adjustMetaFunc = adjustMetaFunc;
// dataTable
App.prototype.addDataTable = addDataTable;
App.prototype.getDataTable = getDataTable;
App.prototype.getDataTables = getDataTables;
// comp
App.prototype.createComp = createComp;
App.prototype.getComp = getComp;
App.prototype.getCompsByDataTable = getCompsByDataTable;
App.prototype.getCompsByType = getCompsByType;
App.prototype.getComps = getComps;
App.prototype.showComp = showComp;
// validate
App.prototype.compsValidate = compsValidate;
App.prototype.compsValidateMultiParam = compsValidateMultiParam;
// cache
App.prototype.setUserCache = setUserCache;
App.prototype.getUserCache = getUserCache;
App.prototype.removeUserCache = removeUserCache;
App.prototype.setCache = setCache;
App.prototype.getCache = getCache;
App.prototype.removeCache = removeCache;
App.prototype.setSessionCache = setSessionCache;
App.prototype.getSessionCache = getSessionCache;
App.prototype.removeSessionCache = removeSessionCache;
// iwebCode
App.prototype.getEnvironment = getEnvironment;
App.prototype.setClientAttribute = setClientAttribute;
App.prototype.getClientAttribute = getClientAttribute;
// ajax
App.prototype.ajax = ajax;
// serverEvent
App.prototype.serverEvent = serverEvent;
// util
App.prototype.setEnable = setEnable;

const createApp = function () {
    var app = new App();
    if (arguments.length > 0){
        var arg = arguments[0];
        app.init(arg.model, arg.el);
    }
    return app;
}

export {
    App,
    processXHRError,
    createApp
}
