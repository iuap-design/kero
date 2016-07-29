/**
 * Module : kero app serverEvent entry index
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-29 09:34:01
 */

 //相关依赖导入
import {
    addDataTable,
    addDataTables,
    addAllDataTables,
    updateDataTables
} from './dataTable';

import {
    fire,
    setSuccessFunc
} from './fire';

import {
    processXHRError
} from './processXHRError';



import {
    setCompression,
    addParameter,
    setEvent,
    getData,
    updateDom
} from './util'

class ServerEvent {
    constructor(app){

        this.app = app
        this.datas = {}
        this.params = {}
        this.event = null
        this.ent = window.iweb.Core.collectEnvironment()
        if (!iweb.debugMode) {  //此处需要修改
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

u.createApp = function () {
    var app = new App();
    if (arguments.length > 0){
        var arg = arguments[0];
        app.init(arg.model, arg.el);
    }
    return app;
}

window.ServerEvent = ServerEvent;
export {ServerEvent}
