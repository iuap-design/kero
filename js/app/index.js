/**
 * Module : kero app entry index
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-29 09:34:01
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
        // adjustMetaFunc
        this.adjustMetaFunc = adjustMetaFunc;
        // dataTable 
        this.addDataTable = addDataTable; 
        this.getDataTable = getDataTable; 
        this.getDataTables = getDataTables; 
        // comp
        this.createComp = createComp;
        this.getComp = getComp;
        this.getCompsByDataTable = getCompsByDataTable;
        this.getCompsByType = getCompsByType;
        this.getComps = getComps;
        this.showComp = showComp;
        // validate
        this.compsValidate = compsValidate;
        this.compsValidateMultiParam = compsValidateMultiParam;
        // cache
        this.setUserCache = setUserCache;
        this.getUserCache = getUserCache;
        this.removeUserCache = removeUserCache;
        this.setCache = setCache;
        this.getCache = getCache;
        this.removeCache = removeCache;
        this.setSessionCache = setSessionCache;
        this.getSessionCache = getSessionCache;
        this.removeSessionCache = removeSessionCache;
        // iwebCode
        this.getEnvironment = getEnvironment;
        this.setClientAttribute = setClientAttribute;
        this.getClientAttribute = getClientAttribute;
        // ajax
        this.ajax = ajax;
        // serverEvent
        this.serverEvent = serverEvent;
        // util
        this.setEnable = setEnable;
    }
}
window.App = App;
window.processXHRError = processXHRError;
export {App}
