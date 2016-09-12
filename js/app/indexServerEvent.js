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


    }
}

// dataTable
ServerEvent.prototype.addDataTable = addDataTable;
ServerEvent.prototype.addDataTables = addDataTables;
ServerEvent.prototype.addAllDataTables = addAllDataTables;
ServerEvent.prototype.updateDataTables = updateDataTables;

// fire
ServerEvent.prototype.fire = fire;
ServerEvent.prototype.setSuccessFunc = setSuccessFunc;
ServerEvent.prototype._successFunc = _successFunc;

// processXHRError
ServerEvent.prototype.processXHRError = processXHRError;

//util
ServerEvent.prototype.setCompression = setCompression;
ServerEvent.prototype.addParameter = addParameter;
ServerEvent.prototype.setEvent = setEvent;
ServerEvent.prototype.getData = getData;
ServerEvent.prototype.updateDom = updateDom;

ServerEvent.DEFAULT = {
    async: true,
    singleton: true,
    url: (window.$ctx || '/iwebap') + '/evt/dispatch'
}


export {
    ServerEvent
}
