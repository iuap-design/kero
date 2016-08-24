/**
 * Module : Kero webpack entry serverEvnet index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */

//相关依赖导入
import {
    addDataTable,
    addDataTables,
    addAllDataTables,
    updateDataTables
} from './server-dataTable';

import {
    fire,
    setSuccessFunc,
    _successFunc
} from './server-fire';

import {
    processXHRError
} from './server-processXHRError';

import {
    setCompression,
    addParameter,
    setEvent,
    getData,
    updateDom
} from './server-util'

class ServerEvent {
    constructor(app){

        this.app = app
        this.datas = {}
        this.params = {}
        this.event = null
        this.ent = u.core.collectEnvironment()
        if (!u.debugMode) {  //此处需要修改
            this.compression = true
        }
		
        // dataTable 
        this.addDataTable = addDataTable; 
        this.addDataTables = addDataTables; 
        this.addAllDataTables = addAllDataTables; 
        this.updateDataTables = updateDataTables;

        // fire
        this.fire = fire; 
        this.setSuccessFunc = setSuccessFunc; 
        this._successFunc = _successFunc;

        // processXHRError
        this.processXHRError = processXHRError;

        //util
        this.setCompression = setCompression;
        this.addParameter = addParameter;
        this.setEvent = setEvent;
        this.getData = getData;
        this.updateDom = updateDom;
    }
}

ServerEvent.DEFAULT = {
    async: true,
    singleton: true,
    url: (window.$ctx || '/iwebap') + '/evt/dispatch'
}


export {
    ServerEvent
}