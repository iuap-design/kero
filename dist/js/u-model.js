var App = function () {
    this.dataTables = {};
}

App.fn = App.prototype;

App.fn.init = function (viewModel, element, doApplyBindings) {
    var self = this;
    element = element || document.body;
    if (!u.isArray(element)) {
        element = [element];
    }
    this.elements = element;
    u.each(this.elements, function (i, element) {
        if (typeof element === 'string'){
            element = document.querySelector(element);
        }
        if(element){
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                // if (ele['init'] && ele['init'] === true) return;
                //if ($(this).parents('[u-meta]').length > 0) return;
                var options = JSON.parse(ele.getAttribute('u-meta'));
                options['type'] = options['type'] || 'string';
                if (options && options['type']) {
                    if (self.adjustFunc)
                        self.adjustFunc.call(self, options);
                    //var comp = u.compMgr._createComp(ele, options, viewModel, self);
                    var comp = u.compMgr.createDataAdapter({el:ele,options:options,model:viewModel,app:self});
                    ele['u-meta'] = comp;
                    //if (comp)
                    //    $(this).data('u-meta', comp)
                }
            })
        }

        if (u.hotkeys)
            u.hotkeys.scan(element);
        //try {
            if (typeof doApplyBindings == 'undefined' || doApplyBindings == true)
                ko.applyBindings(viewModel, element);
        //} catch (e) {
            //iweb.log.error(e)
        //}
        u.compMgr.updateComp(element);
    });

    _getDataTables(this, viewModel);
//		ko.cleanNode(this.element)
}

App.fn.createComp = function(ele,viewModel){
    var options = JSON.parse(ele.getAttribute('u-meta'));
    if (options && options['type']) {
        var comp = u.compMgr.createDataAdapter({el:ele,options:options,model:viewModel,app:this});
        ele['u-meta'] = comp;
    }
    return comp;
}

App.fn.setAdjustMetaFunc = function (adjustFunc) {
    this.adjustFunc = adjustFunc
}

App.fn.addDataTable = function (dataTable) {
    this.dataTables[dataTable.id] = dataTable
    return this
}
App.fn.getDataTable = function (id) {
    return this.dataTables[id]
}

App.fn.getDataTables = function () {
    return this.dataTables
}

App.fn.getComp = function (compId) {
    var returnComp = null;
    u.each(this.elements, function (i, element) {
        if (typeof element === 'string'){
            element = document.querySelector(element);
        }
        if(element){
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                if (ele['u-meta']) {
                    var comp = ele['u-meta'];
                    if (comp.id === compId) {
                        returnComp = comp;
                        return false;
                    }
                }
            })
        }

    })
    return returnComp;
}

App.fn.getCompsByDataTable = function (dataTableId, element) {
    var comps = this.getComps(element),
        targetComps = []
    for (var i = 0; i < comps.length; i++) {
        if ((comps[i].dataModel && comps[i].dataModel['id'] == dataTableId) || (comps[i].dataTable && comps[i].dataTable['id'] == dataTableId))
            targetComps.push(comps[i])
    }
    return targetComps
}

/**
 * 获取某区域中的所有控件
 * @param {object} element
 */
App.fn.getComps = function (element) {
    var elements = element ? element : this.elements;
    var returnComps = [];
    if(typeof elements == 'string'){
    	elements = document.querySelectorAll(elements);
    }
    if (!u.isArray(elements) && !(elements instanceof NodeList))
        elements = [elements];
    u.each(elements, function (i, element) {
        if(element){
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                if (ele['u-meta']) {
                    var comp = ele['u-meta'];
                    if (comp)
                        returnComps.push(comp);
                }
            })
        }

    });
    return returnComps;
}

/**
 * 控件数据校验
 * @param {Object} element
 */
App.fn.compsValidate = function (element, retUnpass) {
    var comps = this.getComps(element),
        passed = true,
        unpassed=[];
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].doValidate){
            var result = comps[i].doValidate({trueValue:true,showMsg:true});
            result = typeof result === 'object' ? result['passed'] : result;
            passed = result && passed;
            if(!result) unpassed.push(comps[i])
        }
    }
    if(retUnpass) return unpassed;
    return passed
}

App.fn.compsValidateMultiParam = function(options){
    var element = options.element,
        comps = this.getComps(element),
        passed = true,
        showMsg = options.showMsg,
        MsgArr = new Array();
        Msg = '';
    for(var i = 0; i < comps.length; i++){
        if (comps[i].doValidate){
            result = comps[i].doValidate({trueValue:true, showMsg:showMsg});
            passed = result.passed && passed;
            if(!result.passed){
                MsgArr.push(result.Msg);
                Msg += result.Msg;
            }
        }
    }
    return {passed:passed,
            MsgArr:MsgArr};
}

/**
 * 根据类型获取控件
 * @param {String} type
 * @param {object} element
 */
App.fn.getCompsByType = function (type, element) {
    var elements = element ? element : this.elements;
    var returnComps = [];
    if (!u.isArray(elements))
        elements = [elements];
    u.each(elements, function (i, element) {
        if(element){
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                if (ele['u-meta']) {
                    var comp = ele['u-meta'];
                    if (comp && comp.type == type)
                        returnComps.push(comp);
                }
            })
        }

    });
    return returnComps;
}


App.fn.getEnvironment = function () {
    return window.iweb.Core.collectEnvironment()
}

App.fn.setClientAttribute = function (k, v) {
    window.iweb.Core.setClientAttribute(k, v)
}

App.fn.getClientAttribute = function (k) {
    return window.iweb.Core.getClientAttributes()[k]
}

App.fn.serverEvent = function () {
    return new ServerEvent(this)
}

App.fn.ajax = function (params) {
    params = this._wrapAjax(params)
    u.ajax(params)
}

App.fn._wrapAjax = function (params) {
    var self = this
    this.serverEventObj = this.serverEvent();
    var orignSuccess = params.success
    var orignError = params.error
    var deferred = params.deferred;
    if (!deferred || !deferred.resolve) {
        deferred = {
            resolve: function () {
            }, reject: function () {
            }
        }
    }
    params.success = function (data, state, xhr) {
        if (typeof data === 'string')
            data = JSON.parse(data)
        if (self.serverEventObj.processXHRError(self, data, state, xhr)) {
            orignSuccess.call(null, data)
            self._successFunc(data, deferred)
        } else {
            deferred.reject();
        }
    }
    params.error = function (data, state, xhr) {
        if (typeof data === 'string')
            data = JSON.parse(data)
        if (self.serverEventObj.processXHRError(self, data, state, xhr)) {
            orignError.call(null, data)
            self._successFunc(data, deferred)
        } else {
            deferred.reject();
        }
    }
    if (params.data)
        params.data.environment = ko.utils.stringifyJson(window.iweb.Core.collectEnvironment());
    else
        params.data = {environment: ko.utils.stringifyJson(window.iweb.Core.collectEnvironment())}
    return params
}

App.fn._successFunc = function (data, deferred) {
    deferred.resolve();
}

window.processXHRError = function (rsl, state, xhr) {
    if (typeof rsl === 'string')
        rsl = JSON.parse(rsl)
    if (xhr.getResponseHeader && xhr.getResponseHeader("X-Error")) {
        u.showMessageDialog({type: "info", title: "提示", msg: rsl["message"], backdrop: true});
        if (rsl["operate"]) {
            eval(rsl["operate"]);
        }
        return false;
    }
    return true;
};

App.fn.setUserCache = function (key, value) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode)return;
    localStorage.setItem(userCode + key, value);
}

App.fn.getUserCache = function (key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode)return;
    return localStorage.getItem(userCode + key);
}

App.fn.removeUserCache = function (key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode)return;
    localStorage.removeItem(userCode + key);
}

App.fn.setCache = function (key, value) {
    localStorage.setItem(key, value);
}

App.fn.getCache = function (key) {
    return localStorage.getItem(key);
}

App.fn.removeCache = function (key) {
    localStorage.removeItem(key)
}

App.fn.setSessionCache = function (key, value) {
    sessionStorage.setItem(key, value)
}

App.fn.getSessionCache = function (key) {
    return sessionStorage.getItem(key)
}

App.fn.removeSessionCache = function (key) {
    sessionStorage.removeItem(key)
}

App.fn.setEnable = function (enable) {
    u.each(this.elements, function (i, element) {
        if(element){
            element.querySelectorAll('[u-meta]').each(function () {
                if (this['u-meta']) {
                    var comp = this['u-meta'];
                    if (comp.setEnable)
                        comp.setEnable(enable)
                }
            })
        }

    })
}

var ServerEvent = function (app) {
    this.app = app
    this.datas = {}
    this.params = {}
    this.event = null
    this.ent = window.iweb.Core.collectEnvironment()
    if (!iweb.debugMode) {
        this.compression = true
    }
}

ServerEvent.DEFAULT = {
    async: true,
    singleton: true,
    url: (window.$ctx || '/iwebap') + '/evt/dispatch'
}

ServerEvent.fn = ServerEvent.prototype

ServerEvent.fn.addDataTable = function (dataTableId, rule) {
    var dataTable = this.app.getDataTable(dataTableId)
    this.datas[dataTableId] = dataTable.getDataByRule(rule)
    return this
}

ServerEvent.fn.setCompression = function (compression) {
    if (!iweb.browser.isIE8 && !window.pako && compression == true)
        iweb.log.error("can't compression, please include  pako!")
    else
        this.compression = compression
}

/**
 *
 * @param {Object} dataTabels
 * 格式1: ['dt1',{'dt2':'all'}]，格式2：['dt1', 'dt2']，格式3: ['dt1', 'dt2'], 'all'
 */
ServerEvent.fn.addDataTables = function (dataTables) {
    if (arguments.length == 2) {
        for (var i = 0; i < dataTables.length; i++) {
            var rule;
            if (typeof arguments[1] == 'string') {
                rule = arguments[1]
            } else if (u.isArray(arguments[1])) {
                rule = arguments[1][i]
            }
            this.addDataTable(dataTables[i], rule)
        }
    } else {
        for (var i = 0; i < dataTables.length; i++) {
            var dt = dataTables[i]
            if (typeof dt == 'string')
                this.addDataTable(dt)
            else {
                for (key in dt)
                    this.addDataTable(key, dt[key])
            }
        }
    }

    return this
}

ServerEvent.fn.addAllDataTables = function (rule) {
    var dts = this.app.dataTables
    for (var i = 0; i < dts.length; i++) {
        this.addDataTable(dts[i].id, rule)
    }
}


ServerEvent.fn.addParameter = function (key, value) {
    this.params[key] = value
    return this
}

ServerEvent.fn.setEvent = function (event) {
    //无用逻辑
    //if (true)
    //	this.event = event
    //else
    this.event = _formatEvent(event)
    return this
}

var _formatEvent = function (event) {
    return event
}


//	app.serverEvent().fire({
//		ctrl:'CurrtypeController',
//		event:'event1',
//		success:
//		params:
//	})
ServerEvent.fn.fire = function (p) {
    var self = this
//		params = $.extend(ServerEvent.DEFAULT, params);
    var data = this.getData();
    data.parameters = ko.utils.stringifyJson(this.params)
    var params = {
        type: p.type || "POST",
        data: p.params || {},
        url: p.url || ServerEvent.DEFAULT.url,
        async: typeof p.async == 'undefined' ? ServerEvent.DEFAULT.async : p.async,
        singleton: p.singleton || ServerEvent.DEFAULT.singleton,
        success: p.success,
        error: p.error,
        dataType: 'json'
    }
    params.data.ctrl = p.ctrl
    params.data.method = p.method
    if (this.event)
        params.data.event = ko.utils.stringifyJson(this.event)
    var preSuccess = p.preSuccess || function () {
        }
    var orignSuccess = p.success || function () {
        }
    var orignError = params.error //|| function(){}
    this.orignError = orignError
    var deferred = params.deferred;
    if (!deferred || !deferred.resolve) {
        deferred = {
            resolve: function () {
            }, reject: function () {
            }
        }
    }
    params.success = function (data, state, xhr) {
        if (typeof data === 'string')
            data = JSON.parse(data)
        if (self.processXHRError(self, data, state, xhr)) {
            preSuccess.call(null, data)
            self._successFunc(data, deferred)
            orignSuccess.call(null, data.custom)
            deferred.resolve();
        } else {
            deferred.reject();
        }
    }
    params.error = function (data, state, xhr) {
        if (typeof data === 'string')
            data = JSON.parse(data)
        if (self.processXHRError(self, data, state, xhr)) {
            if (orignError)
                orignError.call(null, data.custom)
//				self._successFunc(data, deferred)
        } else {
            deferred.reject();
        }
    }
    params.data = u.extend(params.data, data);
    u.ajax(params)

}

ServerEvent.fn.getData = function () {
    var envJson = ko.utils.stringifyJson(this.app.getEnvironment()),
        datasJson = ko.utils.stringifyJson(this.datas),
        compressType = '',
        compression = false
    if (window.trimServerEventData) {
        datasJson = window.trimServerEventData(datasJson);
    }
    if (this.compression) {
        if (!iweb.browser.isIE8 && window.pako) {
            envJson = encodeBase64(window.pako.gzip(envJson));
            datasJson = encodeBase64(window.pako.gzip(datasJson));
            compression = true
            compressType = 'gzip'
        }
    }
    return {
        environment: envJson,
        dataTables: datasJson,
        compression: compression,
        compressType: compressType
    }
}

ServerEvent.fn._successFunc = function (data, deferred) {
    if (typeof data === 'string')
        data = JSON.parse(data)
    var dataTables = data.dataTables
    var dom = data.dom
    if (dom)
        this.updateDom(JSON.parse(dom))
    if (dataTables)
        this.updateDataTables(dataTables, deferred)
}

ServerEvent.fn.updateDataTables = function (dataTables, deferred) {
    for (var key in dataTables) {
        var dt = this.app.getDataTable(key)
        if (dt) {
            dt.setData(dataTables[key])
            dt.updateMeta(dataTables[key].meta)
        }
    }
}

ServerEvent.fn.setSuccessFunc = function (func) {
    this._successFunc = func
}

ServerEvent.fn.updateDom = function () {
    u.each(dom, function (i, n) {
        var vo = n.two
        var key = n.one;
        _updateDom(key, vo)
    });
}

//TODO 去除jQuery后有问题待修改
function _updateDom(key, vos) {
    for (var i in vos) {
        var vo = vos[i]
        for (var key in vo) {
            var props = vo[key]
            if (key == 'trigger') {
                u.trigger(key,props[0]);
            }
            else {
                if (u.isArray(props)) {
                    u.each(props, function (i, n) {
                        key[i](n)
                    });
                }
                else
                    try {
                        key[i](vo)
                    } catch (error) {
                        key[i](vo[i])
                    }
            }
        }
    }
}

ServerEvent.fn.processXHRError = function (self, rsl, state, xhr) {
    if (typeof rsl === 'string')
        rsl = JSON.parse(rsl)
    if (xhr.getResponseHeader && xhr.getResponseHeader("X-Error")) {
        if (self.orignError)
            self.orignError.call(self, rsl, state, xhr)
        else {
            if (u.showMessageDialog)
                u.showMessageDialog({type: "info", title: "提示", msg: rsl["message"], backdrop: true});
            else
                alert(rsl["message"])
            if (rsl["operate"]) {
                eval(rsl["operate"]);
            }
        }
        return false;
    }
    return true;
};

u.createApp = function () {
    var app = new App();
    if (arguments.length > 0){
        var arg = arguments[0];
        app.init(arg.model, arg.el);
    }
    return app;
}

var _getDataTables = function (app, viewModel) {
    for (var key in viewModel) {
        if (viewModel[key] instanceof u.DataTable) {
            viewModel[key].id = key
            viewModel[key].parent = viewModel
            app.addDataTable(viewModel[key])
        }
    }
}

/* ========================================================================
 * UUI: dataTable.js
 *
 * ========================================================================
 * Copyright 2016 yonyou, Inc.
 * ======================================================================== */

var Events = function () {
};

Events.fn = Events.prototype;
/**
 * 绑定事件
 * 支持的格式： 1. on(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
 * 2. on([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
 * 3. on({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
 */
Events.fn.on = function (name, callback, one) {
    var self = this, origCb = callback;
    if(Object.prototype.toString.call(name) == '[object Array]') {
        // 数组
        for(var i in name) {
            this.on(name[i], callback);
        }
        return this;
    } else if(typeof name == 'object'){
        // map
        for(var key in name) {
            this.on(key, name[key]);
        }
        return this;
    }
    if(one) {
        callback = function() {
            self.off(name, callback);
            origCb.apply(this, arguments);
        }
    }
    name = name.toLowerCase();
    this._events || (this._events = {});
    var events = this._events[name] || (this._events[name] = []);
    events.push({
        callback: callback
    })
    return this;
}

/**
 * 解绑事件
 * 
**/
Events.fn.off = function (name, callback) {
    if(Object.prototype.toString.call(name) == '[object Array]') {
        // 数组
        for(var i in name) {
            this.off(name[i], callback);
        }
        return this;
    } else if(typeof name == 'object'){
        // map
        for(var key in name) {
            this.off(key, name[key]);
        }
        return this;
    }
    var cbs = this._events[name];
    if(!cbs) return this;
    if(!callback) {
        // 解绑所有事件
        cbs = null;
    } else {
        for(var i = cbs.length - 1;i >= 0; i--) {
            if(cbs[i] == callback) {
                cbs.splice(i, 1);
            }
        }
    }
    return this;
}

/**
 * 
**/
Events.fn.one = function (name, callback) {
    this.on(name, callback, 1);
}

/**
 * 触发事件
 */
Events.fn.trigger = function (name) {
    name = name.toLowerCase()
    if (!this._events || !this._events[name]) return this;
    var args = Array.prototype.slice.call(arguments, 1);
    var events = this._events[name];
    for (var i = 0, count = events.length; i < count; i++) {
        events[i].callback.apply(this, args);
    }
    return this;
}


Events.fn.getEvent = function (name) {
    name = name.toLowerCase()
    this._events || (this._events = {})
    return this._events[name]
}

/**===========================================================================================================
 *
 * 数据模型
 *
 * ===========================================================================================================
 */

var DataTable = function (options) {
    options = options || {};
    this.id = options['id'];
    this.meta = DataTable.createMetaItems(options['meta']);
    this.enable = options['enable'] || DataTable.DEFAULTS.enable;
    this.pageSize = ko.observable(options['pageSize'] || DataTable.DEFAULTS.pageSize)
    this.pageIndex = ko.observable(options['pageIndex'] || DataTable.DEFAULTS.pageIndex)
    this.totalPages = ko.observable(options['totalPages'] || DataTable.DEFAULTS.totalPages)
    this.totalRow = ko.observable()
    this.pageCache = options['pageCache'] === undefined ? DataTable.DEFAULTS.pageCache : options['pageCache']
    this.rows = ko.observableArray([])
    this.selectedIndices = ko.observableArray([])
    this._oldCurrentIndex = -1;
    this.focusIndex = ko.observable(-1)
    this.cachedPages = []
    this.metaChange = {};
    this.valueChange = {};//ko.observable(1);
    this.currentRowChange = ko.observable(1);
    this.enableChange = ko.observable(1);
    this.params = options['params'] || {};
    this.master = options['master'] || '';
    this.allSelected = ko.observable(false);
    if (options['root']){
        this.root = options['root']
    }else{
        this.root = this;
    }
    if (options['ns']){
        this.ns = options['ns'];
    }else{
        this.ns = '';
    }
}

DataTable.fn = DataTable.prototype = new Events()

DataTable.DEFAULTS = {
    pageSize: 20,
    pageIndex: 0,
    totalPages: 20,
    pageCache: false,
    enable: true
}

DataTable.META_DEFAULTS = {
    enable: true,
    required: false,
    descs: {}
}
DataTable.createMetaItems = function (metas) {
    var newMetas = {};
    for (var key in metas) {
        var meta = metas[key]
        if (typeof meta == 'string')
            meta = {}
        //if (meta['type'] && meta['type'] === 'child'){
        //
        //}
        newMetas[key] = u.extend({}, DataTable.META_DEFAULTS, meta)
    }
    //默认创建一个$data字段
    // if (u.isEmptyObject(newMetas)){
    //     newMetas['$data'] = {};
    // }
    return newMetas
}

/**
 * 字段不存在时，创建字段
 * @param fieldName
 * @param options
 */
DataTable.fn.createField = function(fieldName, options){
    //字段不主动定义，则不创建
    //return;
    //有子表的情况不创建字段
    if (fieldName.indexOf('.') != -1){
        var fNames = fieldName.split('.');
        var _name = fNames[0];
        for(var i= 0, count = fNames.length; i< count; i++){
            if (this.meta[_name] && this.meta[_name]['type'] === 'child')
                return;
            if ((i+1) < count)
                _name = _name + '.' + fNames[i+1]
        }
    }
    if (!this.meta[fieldName]){
        this.meta[fieldName] = {}
    }
    if (typeof options === 'object'){
        for(var key in options){
            if (!this.meta[fieldName][key]){
                this.meta[fieldName][key] = options[key];
            }
        }
    }
    // 在顶层dataTable上定义field信息
    if (this.root !== this){
        var nsArr = this.ns.split('.')
        var _fieldMeta = this.root.meta
        for (var i = 0; i< nsArr.length; i++){
            _fieldMeta[nsArr[i]] = _fieldMeta[nsArr[i]] || {}
            _fieldMeta[nsArr[i]]['type'] = _fieldMeta[nsArr[i]]['type'] || 'child';
            _fieldMeta[nsArr[i]]['meta'] = _fieldMeta[nsArr[i]]['meta'] || {};
            _fieldMeta =  _fieldMeta[nsArr[i]]['meta'];
        }
        if (!_fieldMeta[fieldName]){
            _fieldMeta[fieldName] = {}
        }
        if (typeof options === 'object'){
            for(var key in options){
                if (!_fieldMeta[fieldName][key]){
                    _fieldMeta[fieldName][key] = options[key];
                }
            }
        }
    }

}


//事件类型
DataTable.ON_ROW_SELECT = 'select'
DataTable.ON_ROW_UNSELECT = 'unSelect'
DataTable.ON_ROW_ALLSELECT = 'allSelect'
DataTable.ON_ROW_ALLUNSELECT = 'allUnselect'
DataTable.ON_VALUE_CHANGE = 'valueChange'
DataTable.ON_CURRENT_VALUE_CHANGE = 'currentValueChange'  //当前行变化
//	DataTable.ON_AFTER_VALUE_CHANGE = 'afterValueChange'
//	DataTable.ON_ADD_ROW = 'addRow'
DataTable.ON_INSERT = 'insert'
DataTable.ON_UPDATE = 'update'
DataTable.ON_CURRENT_UPDATE = 'currentUpdate'
DataTable.ON_DELETE = 'delete'
DataTable.ON_DELETE_ALL = 'deleteAll'
DataTable.ON_ROW_FOCUS = 'focus'
DataTable.ON_ROW_UNFOCUS = 'unFocus'
DataTable.ON_LOAD = 'load'
DataTable.ON_ENABLE_CHANGE = 'enableChange'
DataTable.ON_META_CHANGE = 'metaChange'
DataTable.ON_ROW_META_CHANGE = 'rowMetaChange'
DataTable.ON_CURRENT_META_CHANGE = 'currentMetaChange'
DataTable.ON_CURRENT_ROW_CHANGE = 'currentRowChange'

DataTable.SUBMIT = {
    current: 'current',
    focus: 'focus',
    all: 'all',
    select: 'select',
    change: 'change',
    empty: 'empty',
    allSelect: 'allSelect',
    allPages: 'allPages'
}


DataTable.fn.addParam = function (key, value) {
    this.params[key] = value
}

DataTable.fn.addParams = function (params) {
    for (var key in params) {
        this.params[key] = params[key]
    }
}

DataTable.fn.getParam = function (key) {
    return this.params[key]
}

/**
 * 获取meta信息，先取row上的信息，没有时，取dataTable上的信息
 * @param {Object} fieldName
 * @param {Object} key
 * @param {Object} row
 */
DataTable.fn.getMeta = function (fieldName, key) {
    if (arguments.length === 0)
        return this.meta;
    else if (arguments.length === 1)
        return this.meta[fieldName];

    if(this.meta[fieldName] && typeof this.meta[fieldName][key] !== 'undefined'){
        return this.meta[fieldName][key];
    }else{
        return null;
    }
    
}

DataTable.fn.setMeta = function (fieldName, key, value) {
    if(!this.meta[fieldName])
        return;
    var oldValue = this.meta[fieldName][key]
    var currRow = this.getCurrentRow();
    this.meta[fieldName][key] = value
    if (this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
    //this.metaChange(- this.metaChange())
    if (key == 'enable')
        this.enableChange(-this.enableChange())
    this.trigger(DataTable.ON_META_CHANGE, {
        eventType: 'dataTableEvent',
        dataTable: this.id,
        field: fieldName,
        meta: key,
        oldValue: oldValue,
        newValue: value
    });
    if (currRow && !currRow.getMeta(fieldName, key, false)) {
        this.trigger(fieldName + '.' + key + '.' + DataTable.ON_CURRENT_META_CHANGE, {
            eventType: 'dataTableEvent',
            dataTable: this.id,
            oldValue: oldValue,
            newValue: value
        });
    }
}

DataTable.fn.setCurrentPage = function (pageIndex, notCacheCurrentPage) {
    if (pageIndex != this.pageIndex() && notCacheCurrentPage != true)
        this.cacheCurrentPage();
    this.pageIndex(pageIndex)
    var cachedPage = this.cachedPages[this.pageIndex()]
    if (cachedPage) {
        this.removeAllRows()
        this.setRows(cachedPage.rows)
        this.setRowsSelect(cachedPage.selectedIndcies)
    }
}

DataTable.fn.isChanged = function () {
    var rows = this.getAllRows()
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != Row.STATUS.NORMAL)
            return true
    }
    return false
}


/**
 * example: meta: {supplier: {meta: {precision:'3', default: '0239900x', display:'显示名称'}}}
 */
DataTable.fn.updateMeta = function (meta) {
    if (!meta) {
        return;
    }
    for (var fieldKey in meta) {
        for (var propKey in meta[fieldKey]) {
            var oldValue = this.meta[fieldKey][propKey]
            var newValue = meta[fieldKey][propKey]
            if (propKey === 'default') {
                if (!this.meta[fieldKey]['default']) {
                    this.meta[fieldKey]['default'] = {}
                }
                this.meta[fieldKey]['default'].value = meta[fieldKey][propKey]
            } else if (propKey === 'display') {
                if (!this.meta[fieldKey]['default']) {
                    this.meta[fieldKey]['default'] = {}
                }
                this.meta[fieldKey]['default'].display = meta[fieldKey][propKey]
            } else {
                this.meta[fieldKey][propKey] = meta[fieldKey][propKey]
            }
            if (this.metaChange[fieldKey + '.' + propKey])
                this.metaChange[fieldKey + '.' + propKey](-this.metaChange[fieldKey + '.' + propKey]());

            this.trigger(DataTable.ON_META_CHANGE, {
                eventType: 'dataTableEvent',
                dataTable: this.id,
                field: fieldKey,
                meta: propKey,
                oldValue: oldValue,
                newValue: newValue
            });
        }

    }
    //this.metaChange(- this.metaChange())
}


/**
 *设置数据
 *
 */
DataTable.fn.setData = function (data,options) {
    var newIndex = data.pageIndex || 0,
        newSize = data.pageSize || this.pageSize(),
        newTotalPages = data.totalPages || this.totalPages(),
        newTotalRow = data.totalRow || data.rows.length,
        select, focus,unSelect=options?options.unSelect:true; // 改为默认为true
        //currPage,
        //type = data.type;

    this.pageCache = data.pageCache || this.pageCache
    if (this.pageCache === true) {
        this.updatePages(data.pages)
        if (newIndex != this.pageIndex()) {
            this.setCurrentPage(newIndex, true);
            this.totalPages(newTotalPages)
            this.totalRow(newTotalRow)
            return;
        }
        else {
            select = this.getPage(newIndex).selectedIndices
            focus = this.getPage(newIndex).focus
            this.setRows(this.getPage(newIndex).rows)
        }
    } else {
        select = data.select||(!unSelect?[0]:[]);
        focus = data.focus;
        this.setRows(data.rows)
    }
    this.pageIndex(newIndex)
    this.pageSize(newSize)
    this.totalPages(newTotalPages)
    this.totalRow(newTotalRow)

    this.updateSelectedIndices()

    if (select && select.length > 0 && this.rows().length > 0)
        this.setRowsSelect(select)
    if (focus)
        this.setRowFocus(focus)
};

/**
 * 获取数据,只取字段名与字段值
 */
DataTable.fn.getSimpleData = function(options){
    options = options || {}
    var rows,_rowData = [], type = options['type'] || 'all', fields = options['fields'] || null;

    if (type === 'all') {
        rows = this.rows.peek();
    }else if (type === 'current'){
        var currRow = this.getCurrentRow();
        rows = currRow == null ? [] :  [currRow];
    }else if (type === 'focus'){
        var focusRow = this.getFocusRow();
        rows = focusRow == null ? [] :  [focusRow];
    }else if (type === 'select'){
        rows = this.getSelectedRows();
    }else if (type === 'change'){
        rows = this.getChangedRows();
    }

    for(var i = 0; i< rows.length; i++){
        _rowData.push(rows[i].getSimpleData({fields:fields}));
    }
    return _rowData;
};

/**
 * 设置数据, 只设置字段值
 * @param {array} data
 *options{} unSelect为true：不选中，为false则选中，默认选中0行
 */
DataTable.fn.setSimpleData = function(data,options){
    if (!data){
        throw new Error("dataTable.setSimpleData param can't be null!");
    }
    this.clear();
    var rows = [];
    if (!u.isArray(data))
        data = [data];
    for (var i =0; i< data.length; i++){
        var _data = data[i];
        /* 判断data中的字段在datatable中是否存在，如果不存在则创建 */
        // for(var f in _data){
        //     this.createField(f)
        // }
        if (typeof data[i] !== 'object')
            _data = {$data:data[i]}
        rows.push({
            status: Row.STATUS.NORMAL,
            data: _data
        })
    }
    var _data = {
        rows: rows
    }
    this.setData(_data,options);
};


/**
 * 追加数据
 * @param data
 */
DataTable.fn.addSimpleData = function(data){
    if (!data){
        throw new Error("dataTable.addSimpleData param can't be null!");
    }
    if (!u.isArray(data))
        data = [data];
    for (var i =0; i< data.length; i++){
        var r = this.createEmptyRow();
        r.setSimpleData(data[i]);
    }

}


/**
 * 清空datatable的所有数据以及分页数据以及index
 */
DataTable.fn.clear = function () {
    this.removeAllRows();
    this.cachedPages = [];
    this.totalPages(1);
    this.pageIndex(0);
    this.focusIndex(-1);
    this.selectedIndices([]);
}

/**
 * 更新分页数据
 */
DataTable.fn.updatePages = function (pages) {
    var pageSize = this.pageSize(), pageIndex = 0, page, r, row;
    var page, index, i, rows, focus, selectIndices, status, j, row, originRow;
    for (i = 0; i < pages.length; i++) {
        index = pages[i].index
        rows = pages[i].rows
        focus = pages[i].current
        selectIndices = pages[i].select
        status = pages[i].status
        if (status === 'del') {
            this.cachedPages[index] = null;
            continue;
        }
        if (!this.cachedPages[index]) {
            page = new Page({parent: this})
            page.rows = rows;
            for (var j = 0; j < page.rows.length; j++) {
                page.rows[j].rowId = page.rows[j].id
                delete page.rows[j].id
            }
            this.cachedPages[index] = page
        } else {
            //如果是当前页，先把this.rows数据更新到page中
            if (index == this.pageIndex()) {
                this.cacheCurrentPage();
            }
            page = this.cachedPages[index]
            for (var j = 0; j < rows.length; j++) {
                r = rows[j];
                if (!r.id)
                    r.id = Row.getRandomRowId()
                if (r.status == Row.STATUS.DELETE) {
                    this.removeRowByRowId(r.id)
                } else {
                    row = page.getRowByRowId(r.id)
                    if (row) {
                        page.updateRow(row, r);
                    } else {
                        r.rowId = r.id
                        delete r.id
                        page.rows.push(r);
                    }
                }
            }
        }
        page.selectedIndices = selectIndices;
        page.focus = focus;
    }
}

/**
 * 设置行数据
 * @param {Object} rows
 */
DataTable.fn.setRows = function (rows) {
    var insertRows = [], _id;
    for (var i = 0; i < rows.length; i++) {
        var r = rows[i]
        _id = r.rowId || r.id;
        if (!_id)
            _id = Row.getRandomRowId()
        if (r.status == Row.STATUS.DELETE) {
            this.removeRowByRowId(_id)
        }
        else {
            var row = this.getRowByRowId(_id)
            if (row) {
                row.updateRow(r);
                if (!u.isEmptyObject(r.data)) {
                    this.trigger(DataTable.ON_UPDATE, {
                        index: i,
                        rows: [row]
                    })
                    if (row == this.getCurrentRow()) {
                        this.currentRowChange(-this.currentRowChange())
                        row.currentRowChange(-row.currentRowChange())
                        this.trigger(DataTable.ON_CURRENT_UPDATE, {
                            index: i,
                            rows: [row]
                        })
                    } else {
                        row.currentRowChange(-row.currentRowChange())
                    }
                }

            }
            else {
                row = new Row({parent: this, id: _id})
                row.setData(rows[i])
                insertRows.push(row)
//					this.addRow(row)
            }
        }
    }
    if (insertRows.length > 0)
        this.addRows(insertRows)
}

DataTable.fn.clearCache = function () {
    this.cachedPages = []
}

DataTable.fn.cacheCurrentPage = function () {
    if (this.pageCache && this.pageIndex() > -1) {
        var page = new Page({parent: this});
        page.focus = this.getFocusIndex();
        page.selectedIndices = this.selectedIndices().slice();
        var rows = this.rows.peek() //.slice();
        for (var i = 0; i < rows.length; i++) {
            var r = rows[i].getData();
            r.rowId = r.id;
            delete r.id;
            page.rows.push(r)
        }
        //page.rows = this.rows().slice();
        this.cachedPages[this.pageIndex()] = page
    }
}

/**
 * 前端分页方法，不建议使用，建议在后端进行分页
 * @param allRows
 */
DataTable.fn.setPages = function (allRows) {
    var pageSize = this.pageSize(), pageIndex = 0, page;
    this.cachedPages = [];
    for (var i = 0; i < allRows.length; i++) {
        pageIndex = Math.floor(i / pageSize);
        if (!this.cachedPages[pageIndex]) {
            page = new Page({parent: this})
            this.cachedPages[pageIndex] = page
        }
        page.rows.push(allRows[i])
    }
    if (this.pageIndex() > -1)
        this.setCurrentPage(this.pageIndex());
    this.totalRow(allRows.length);
    this.totalPages(pageIndex + 1);
}

DataTable.fn.hasPage = function (pageIndex) {
    //return (this.pageCache && this.cachedPages[pageIndex]  && this.cachedPages[pageIndex].pageSize == this.pageSize()) ? true : false
    return (this.pageCache && this.cachedPages[pageIndex]) ? true : false
}

DataTable.fn.getPage = function (pageIndex) {
    if (this.pageCache) {
        return this.cachedPages[pageIndex]
    }
    return -1;
}

DataTable.fn.getPages = function () {
    if (this.pageCache) {
        return this.cachedPages
    }
    return [];
}

DataTable.fn.copyRow = function (index, row) {
    this.copyRows(index, [row])
}

DataTable.fn.copyRows = function (index, rows) {
    for(var i=0;i < rows.length;i++) {
        var newRow = new Row({parent: this})
        if (rows[i]) {
            newRow.setData(rows[i].getData())
        }
        this.insertRows(index === undefined ? this.rows().length : index, [newRow])
    }
}

/**
 *追加行
 */
DataTable.fn.addRow = function (row) {
    this.insertRow(this.rows().length, row)
}

/**
 *追加多行
 */
DataTable.fn.addRows = function (rows) {
    this.insertRows(this.rows().length, rows)
}

DataTable.fn.insertRow = function (index, row) {
    if (!row) {
        row = new Row({parent: this})
    }
    this.insertRows(index, [row])
}

DataTable.fn.insertRows = function (index, rows) {
//		if (this.onBeforeRowInsert(index,rows) == false)
//			return
    var args = [index, 0]
    for (var i = 0; i < rows.length; i++) {
        args.push(rows[i]);
    }
    this.rows.splice.apply(this.rows, args);

    this.updateSelectedIndices(index, '+', rows.length)
    this.updateFocusIndex(index, '+', rows.length)

    this.trigger(DataTable.ON_INSERT, {
        index: index,
        rows: rows
    })
    if (this.ns){
        //var fName = this.parent.ns + '.' + fieldName;
        if (this.root.valueChange[this.ns])
            this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
    }
}

/**
 * 创建空行
 */
DataTable.fn.createEmptyRow = function () {
    var r = new Row({parent: this})
    this.addRow(r)
    if (!this.getCurrentRow())
        this.setRowSelect(r);
    return r
}

DataTable.fn.removeRowByRowId = function (rowId) {
    var index = this.getIndexByRowId(rowId)
    if (index != -1)
        this.removeRow(index)
}

DataTable.fn.removeRow = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.removeRows([index]);
}

DataTable.fn.removeAllRows = function () {
    this.rows([])
    this.selectedIndices([])
    this.focusIndex(-1)
    this.trigger(DataTable.ON_DELETE_ALL)
    this.updateCurrIndex();
}

DataTable.fn.removeRows = function (indices) {
    indices = this._formatToIndicesArray(indices)
    indices = indices.sort()
    var rowIds = [], rows = this.rows(), deleteRows = [];
    for (var i = indices.length - 1; i >= 0; i--) {
        var index = indices[i]
        var delRow = rows[index];
        if (delRow == null) {
            continue;
        }
        rowIds.push(delRow.rowId)
        var deleteRow = rows.splice(index, 1);
        deleteRows.push(deleteRow[0]);
        this.updateSelectedIndices(index, '-')
        this.updateFocusIndex(index, '-')
    }
    this.rows(rows)
    this.deleteRows = deleteRows;
    this.trigger(DataTable.ON_DELETE, {
        indices: indices,
        rowIds: rowIds,
        deleteRows: deleteRows
    })
    this.updateCurrIndex();
}

/**
 * 设置行删除
 * @param {Object} index
 */
DataTable.fn.setRowDelete = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.setRowDelete([index])
}

/**
 * 设置所有行删除
 */
DataTable.fn.setAllRowsDelete = function () {
    var indices = new Array(this.rows().length)
    for (var i = 0; i < indices.length; i++) {
        indices[i] = i
    }
    this.setRowsDelete(indices)
}

/**
 * 设置行删除
 * @param {Array} indices
 */
DataTable.fn.setRowsDelete = function (indices) {
    indices = this._formatToIndicesArray(indices)
    for (var i = 0; i < indices.length; i++) {
        var row = this.getRow(indices[i])
        if (row.status == Row.STATUS.NEW) {
            this.rows(this.rows().splice(indices[i], 1));
            this.updateSelectedIndices(indices[i], '-')
            this.updateFocusIndex(index, '-')
        }
        else {
            row.status = Row.STATUS.FALSE_DELETE
        }
    }
    var rowIds = this.getRowIdsByIndices(indices)
    this.trigger(DataTable.ON_ROW_DELETE, {
        falseDelete: true,
        indices: indices,
        rowIds: rowIds
    })
}

DataTable.fn.toggleAllSelect = function(){
    if (this.allSelected()){
        this.setAllRowsUnSelect();
    }else{
        this.setAllRowsSelect();
    }

};

DataTable.fn.setAllRowsSelect = function () {
    var indices = new Array(this.rows().length)
    for (var i = 0; i < indices.length; i++) {
        indices[i] = i
    }
    this.setRowsSelect(indices);
    this.allSelected(true);
    this.trigger(DataTable.ON_ROW_ALLSELECT, {})
}

/**
 * 设置选中行，清空之前已选中的所有行
 */
DataTable.fn.setRowSelect = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.setRowsSelect([index])
    this.setRowFocus(this.getSelectedIndex())
}

DataTable.fn.setRowsSelect = function (indices) {
    indices = indices || -1;
    if (indices == -1) {
        this.setAllRowsUnSelect({quiet: true})
        return;
    }
    indices = this._formatToIndicesArray(indices);
    var sIns = this.selectedIndices();
    if (u.isArray(indices) && u.isArray(sIns) && indices.join() == sIns.join()) {
        // 避免与控件循环触发
        return;
    }
    this.setAllRowsUnSelect({quiet: true});
    this.selectedIndices(indices);
//		var index = this.getSelectedIndex()
//		this.setCurrentRow(index)
    var rowIds = this.getRowIdsByIndices(indices);
    this.currentRowChange(-this.currentRowChange());
    this.trigger(DataTable.ON_ROW_SELECT, {
        indices: indices,
        rowIds: rowIds
    })
    this.updateCurrIndex();
}


/**
 * 添加选中行，不会清空之前已选中的行
 */
DataTable.fn.addRowSelect = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.addRowsSelect([index])
}

/**
 * 添加选中行，不会清空之前已选中的行
 */
DataTable.fn.addRowsSelect = function (indices) {
    indices = this._formatToIndicesArray(indices)
    var selectedIndices = this.selectedIndices().slice()
    for (var i = 0; i < indices.length; i++) {
        var ind = indices[i], toAdd = true
        for (var j = 0; j < selectedIndices.length; j++) {
            if (selectedIndices[j] == ind) {
                toAdd = false
            }
        }
        if (toAdd) {
            selectedIndices.push(indices[i])
        }
    }
    this.selectedIndices(selectedIndices)
//		var index = this.getSelectedIndex()
//		this.setCurrentRow(index)
    var rowIds = this.getRowIdsByIndices(indices)
    this.trigger(DataTable.ON_ROW_SELECT, {
        indices: indices,
        rowIds: rowIds
    })
    this.updateCurrIndex();
}

/**
 * 根据索引取rowid
 * @param {Object} indices
 */
DataTable.fn.getRowIdsByIndices = function (indices) {
    var rowIds = []
    for (var i = 0; i < indices.length; i++) {
        rowIds.push(this.getRow(indices[i]).rowId)
    }
    return rowIds
}

/**
 * 全部取消选中
 */
DataTable.fn.setAllRowsUnSelect = function (options) {
    this.selectedIndices([])
    if (!(options && options.quiet)) {
        this.trigger(DataTable.ON_ROW_ALLUNSELECT)
    }
    this.updateCurrIndex();
    this.allSelected(false);
}

/**
 * 取消选中
 */
DataTable.fn.setRowUnSelect = function (index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
    }
    this.setRowsUnSelect([index])
}

DataTable.fn.setRowsUnSelect = function (indices) {
    indices = this._formatToIndicesArray(indices)
    var selectedIndices = this.selectedIndices().slice()

    // 避免与控件循环触发
    if (selectedIndices.indexOf(indices[0]) == -1) return;

    for (var i = 0; i < indices.length; i++) {
        var index = indices[i]
        var pos = selectedIndices.indexOf(index)
        if (pos != -1)
            selectedIndices.splice(pos, 1)
    }
    this.selectedIndices(selectedIndices)
    var rowIds = this.getRowIdsByIndices(indices)
    this.trigger(DataTable.ON_ROW_UNSELECT, {
        indices: indices,
        rowIds: rowIds
    })
    this.updateCurrIndex();
    this.allSelected(false);
}

/**
 *
 * @param {Object} index 要处理的起始行索引
 * @param {Object} type   增加或减少  + -
 */
DataTable.fn.updateSelectedIndices = function (index, type, num) {
    if (!u.isNumber(num)) {
        num = 1
    }
    var selectedIndices = this.selectedIndices().slice()
    if (selectedIndices == null || selectedIndices.length == 0)
        return
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        if (type == '+') {
            if (selectedIndices[i] >= index)
                selectedIndices[i] = parseInt(selectedIndices[i]) + num
        }
        else if (type == '-') {
            if (selectedIndices[i] >= index && selectedIndices[i] <= index + num - 1) {
                selectedIndices.splice(i, 1)
            }
            else if (selectedIndices[i] > index + num - 1)
                selectedIndices[i] = selectedIndices[i] - num
        }
    }
    this.selectedIndices(selectedIndices)
//		var currIndex = this.getSelectedIndex()
//		this.setCurrentRow(currIndex)
}

DataTable.fn.updateFocusIndex = function (opIndex, opType, num) {
    if (!u.isNumber(num)) {
        num = 1
    }
    if (opIndex <= this.focusIndex() && this.focusIndex() != -1) {
        if (opType === '+') {
            this.focusIndex(this.focusIndex() + num)
        } else if (opType === '-') {
            if (this.focusIndex() >= opIndex && this.focusIndex() <= opIndex + num - 1) {
                this.focusIndex(this.focusIndex() - 1)
            } else if (this.focusIndex() > opIndex + num - 1) {
                this.focusIndex(this.focusIndex() - num)
            }
        }
    }
}

/**
 * 获取选中行索引，多选时，只返回第一个行索引
 */
DataTable.fn.getSelectedIndex = function () {
    var selectedIndices = this.selectedIndices()
    if (selectedIndices == null || selectedIndices.length == 0)
        return -1
    return selectedIndices[0]
};

/**
 *获取选中的所有行索引数组索引
 */
DataTable.fn.getSelectedIndices = function () {
    var selectedIndices = this.selectedIndices()
    if (selectedIndices == null || selectedIndices.length == 0)
        return []
    return selectedIndices
};

/**
 * 兼容保留，不要用
 */
DataTable.fn.getSelectedIndexs = function () {
    return this.getSelectedIndices();
}

/**
 * 获取焦点行
 */
DataTable.fn.getFocusIndex = function () {
    return this.focusIndex()
}

/**
 * 根据行号获取行索引
 * @param {String} rowId
 */
DataTable.fn.getIndexByRowId = function (rowId) {
    var rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowId)
            return i
    }
    return -1
}

/**
 * 获取所有行数据
 */
DataTable.fn.getAllDatas = function () {
    var rows = this.getAllRows()
    var datas = []
    for (var i = 0, count = rows.length; i < count; i++)
        if (rows[i])
            datas.push(rows[i].getData())
    return datas
}

/**
 * 获取当前页数据
 */
DataTable.fn.getData = function () {
    var datas = [], rows = this.rows();
    for (var i = 0; i < rows.length; i++) {
        datas.push(rows[i].getData())
    }
    return datas
}

DataTable.fn.getDataByRule = function (rule) {
    var returnData = {}, datas = null, rows;
    returnData.meta = this.meta
    returnData.params = this.params
    rule = rule || DataTable.SUBMIT.current
    if (rule == DataTable.SUBMIT.current) {
        datas = []
        var currIndex = this.focusIndex()
        if (currIndex == -1)
            currIndex = this.getSelectedIndex()
        rows = this.rows();
        for (var i = 0, count = rows.length; i < count; i++) {
            if (i == currIndex)
                datas.push(rows[i].getData())
            else
                datas.push(rows[i].getEmptyData())
        }

    }
    else if (rule == DataTable.SUBMIT.focus) {
        datas = []
        rows = this.rows();
        for (var i = 0, count = rows.length; i < count; i++) {
            if (i == this.focusIndex())
                datas.push(rows[i].getData())
            else
                datas.push(rows[i].getEmptyData())
        }
    }
    else if (rule == DataTable.SUBMIT.all) {
        datas = this.getData()
    }
    else if (rule == DataTable.SUBMIT.select) {
        datas = this.getSelectedDatas(true)
    }
    else if (rule == DataTable.SUBMIT.change) {
        datas = this.getChangedDatas()
    }
    else if (rule === DataTable.SUBMIT.empty) {
        datas = []
    }
    if (this.pageCache && datas != null) {
        datas = [{index: this.pageIndex(), select: this.getSelectedIndexs(), focus: this.focusIndex(), rows: datas}]
    }
    if (rule == DataTable.SUBMIT.allSelect) {
        datas = []
        var totalPages = this.totalPages();
        //缓存页数据
        for (var i = 0; i < totalPages; i++) {
            if (i == this.pageIndex()) {
                //当前页数据
                datas.push({
                    index: this.pageIndex(),
                    select: this.getSelectedIndexs(),
                    focus: this.focusIndex(),
                    rows: this.getSelectedDatas()
                });
            } else {
                var page = this.cachedPages[i];
                if (page) {
                    datas.push({
                        index: i,
                        select: page.selectedIndices,
                        focus: page.focus,
                        rows: page.getSelectDatas()
                    });
                }
            }
        }
    } else if (rule == DataTable.SUBMIT.allPages) {
        datas = []
        var totalPages = this.totalPages();
        //缓存页数据
        for (var i = 0; i < totalPages; i++) {
            if (i == this.pageIndex()) {
                //当前页数据
                datas.push({
                    index: this.pageIndex(),
                    select: this.getSelectedIndexs(),
                    focus: this.focusIndex(),
                    rows: this.getData()
                });
            } else {
                var page = this.cachedPages[i];
                if (page) {
                    datas.push({index: i, select: page.selectedIndices, focus: page.focus, rows: page.getData()});
                }
            }
        }
    }
    if (this.pageCache) {
        returnData.pages = datas;
    } else {
        returnData.rows = datas
        returnData.select = this.getSelectedIndexs()
        returnData.focus = this.getFocusIndex()
    }

    returnData.pageSize = this.pageSize()
    returnData.pageIndex = this.pageIndex()
    returnData.isChanged = this.isChanged()
    returnData.master = this.master
    returnData.pageCache = this.pageCache
    return returnData
}

/**
 * 获取选中行数据
 */
DataTable.fn.getSelectedDatas = function (withEmptyRow) {
    var selectedIndices = this.selectedIndices()
    var datas = []
    var sIndices = []
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        sIndices.push(selectedIndices[i])
    }
    var rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (sIndices.indexOf(i) != -1)
            datas.push(rows[i].getData())
        else if (withEmptyRow == true)
            datas.push(rows[i].getEmptyData())
    }
    return datas
};

/**
 * 取选中行
 */
DataTable.fn.getSelectedRows = function (){
    var selectedIndices = this.selectedIndices();
    var selectRows = [];
    var rows = this.rows.peek();
    var sIndices = []
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        sIndices.push(selectedIndices[i])
    }
    for (var i = 0, count = rows.length; i < count; i++) {
        if (sIndices.indexOf(i) != -1)
            selectRows.push(rows[i])
    }
    return selectRows
}

DataTable.fn.refSelectedRows = function () {
    return ko.pureComputed({
        read: function () {
            var ins = this.selectedIndices() || []
            var rs = this.rows()
            var selectedRows = []
            for (var i = 0; i < ins.length; i++) {
                selectedRows.push(rs[i])
            }
            return selectedRows
        }, owner: this
    })
}

/**
 * 绑定字段值
 * @param {Object} fieldName
 */
DataTable.fn.ref = function (fieldName) {
    this.createField(fieldName);
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            var row = this.getCurrentRow()
            if (row) {
                return row.getChildValue(fieldName)
            }
            else
                return ''
        },
        write: function (value) {
            var row = this.getCurrentRow()
            if (row)
                row.setChildValue(fieldName, value);
                //row.setValue(fieldName, value)
        },
        owner: this
    })
}

/**
 * 绑定字段属性
 * @param {Object} fieldName
 * @param {Object} key
 */
DataTable.fn.refMeta = function (fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.metaChange[fieldName + '.' + key]();
            this.currentRowChange();
            return this.getMeta(fieldName, key)
        },
        write: function (value) {
            this.setMeta(fieldName, key, value)
        },
        owner: this
    })
}

DataTable.fn.refRowMeta = function (fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.metaChange[fieldName + '.' + key]();
            this.currentRowChange();
            var row = this.getCurrentRow()
            if (row)
                return row.getMeta(fieldName, key)
            else
                return this.getMeta(fieldName, key)
        },
        write: function (value) {
            var row = this.getCurrentRow()
            if (row)
                row.setMeta(fieldName, value)
        },
        owner: this
    })
}

DataTable.fn.getRowMeta = function (fieldName, key) {
    var row = this.getCurrentRow()
    if (row)
        return row.getMeta(fieldName, key)
    else
        return this.getMeta(fieldName, key)
}

DataTable.fn.refEnable = function (fieldName) {
    return ko.pureComputed({
        //enable优先级： dataTable.enable >  row上的enable >  field中的enable定义
        read: function () {
            this.enableChange();
            if (!fieldName)
                return this.enable;
            var fieldEnable = this.getRowMeta(fieldName, 'enable')
            if (typeof fieldEnable == 'undefined' || fieldEnable == null)
                fieldEnable = true;
            return fieldEnable && this.enable
//				return this.enable && (this.getMeta(fieldName, 'enable') || false)
        },
        owner: this
    })
}

DataTable.fn.isEnable = function (fieldName) {
    var fieldEnable = this.getMeta(fieldName, 'enable')
    if (typeof fieldEnable == 'undefined' || fieldEnable == null)
        fieldEnable = true
    return fieldEnable && this.enable
}

DataTable.fn.getValue = function (fieldName, row) {
    row = row || this.getCurrentRow()
    if (row)
        return row.getValue(fieldName)
    else
        return ''
}



DataTable.fn.setValue = function (fieldName, value, row, ctx) {
    if (arguments.length === 1){
        value = fieldName;
        fieldName = '$data';
    }

    row = row ? row : this.getCurrentRow()
    if (row)
        row.setValue(fieldName, value, ctx)
}

DataTable.fn.setEnable = function (enable) {
    if (this.enable == enable) return
    //当传入的参数不为false时，默认enable为true
    if (enable===false){
        enable=false;
    }else{
        enable=true;
    }
    this.enable = enable
    this.enableChange(-this.enableChange())
    this.trigger(DataTable.ON_ENABLE_CHANGE, {
        enable: this.enable
    })
}

/**
 * 获取当前操作行
 * 规则： focus 行优先，没有focus行时，取第一选中行
 */
DataTable.fn.getCurrentRow = function () {
    if (this.focusIndex() != -1)
        return this.getFocusRow()
    var index = this.getSelectedIndex()
    if (index == -1)
        return null
    else
        return this.getRow(index)
}


DataTable.fn.updateCurrIndex = function () {
    var currentIndex = this.focusIndex() != -1 ? this.focusIndex() : this.getSelectedIndex();
    if (this._oldCurrentIndex != currentIndex) {
        this._oldCurrentIndex = currentIndex;
        this.trigger(DataTable.ON_CURRENT_ROW_CHANGE)
        this.currentRowChange(-this.currentRowChange());
        if (this.ns){
            if (this.root.valueChange[this.ns])
                this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
        }

    }
}

/**
 * 获取焦点行
 */
DataTable.fn.getFocusRow = function () {
    if (this.focusIndex() != -1)
        return this.getRow(this.focusIndex())
    else
        return null
}

/**
 * 设置焦点行
 * @param {Object} index 行对象或者行index
 * @param quiet 不触发事件
 * @param force 当index行与已focus的行相等时，仍然触发事件
 */
DataTable.fn.setRowFocus = function (index, quiet, force) {
    var rowId = null
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
        rowId = index.rowId
    }
    if (index === -1 || (index === this.focusIndex() && !force)) {
        return;
    }
    this.focusIndex(index)
    if (quiet) {
        return;
    }
    this.currentRowChange(-this.currentRowChange())
    if (!rowId) {
        rowId = this.getRow(index).rowId
    }
    this.trigger(DataTable.ON_ROW_FOCUS, {
        index: index,
        rowId: rowId
    })
    this.updateCurrIndex();
}

/**
 * 焦点行反选
 */
DataTable.fn.setRowUnFocus = function () {
    this.currentRowChange(-this.currentRowChange())
    var indx = this.focusIndex(), rowId = null;
    if (indx !== -1) {
        rowId = this.getRow(indx).rowId
    }
    this.trigger(DataTable.ON_ROW_UNFOCUS, {
        index: indx,
        rowId: rowId
    })
    this.focusIndex(-1)
    this.updateCurrIndex();
}

DataTable.fn.getRow = function (index) {
    //return this.rows()[index]   //modify by licza.   improve performance
    return this.rows.peek()[index]
};

/**
 * 根据rowid取row对象
 * @param rowid
 * @returns {*}
 */
DataTable.fn.getRowByRowId = function (rowid) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowid)
            return rows[i]
    }
    return null
}

/**
 * 取行索引
 * @param row
 * @returns {*}
 */
DataTable.fn.getRowIndex = function (row){
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId === row.rowId)
            return i;
    }
    return -1;
};

DataTable.fn.getAllRows = function () {
    return this.rows.peek();
}

DataTable.fn.getAllPageRows = function () {
    var datas = [], rows;
    for (var i = 0; i < this.totalPages(); i++) {
        rows = [];
        if (i == this.pageIndex()) {
            rows = this.getData();
        } else {
            var page = this.cachedPages[i];
            if (page) {
                rows = page.getData();
            }
        }
        for (var j = 0; j < rows.length; j++) {
            datas.push(rows[j]);
        }
    }
    return datas;
}

/**
 * 获取变动的数据(新增、修改)
 */
DataTable.fn.getChangedDatas = function (withEmptyRow) {
    var datas = [], rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            datas.push(rows[i].getData())
        }
        else if (withEmptyRow == true) {
            datas.push(rows[i].getEmptyData())
        }
    }
    return datas
};

/**
 * 取改变的行
 */
DataTable.fn.getChangedRows = function(){
    var changedRows = [], rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            changedRows.push(rows[i])
        }
    }
    return changedRows
}

DataTable.fn._formatToIndicesArray = function (indices) {
    if (typeof indices == 'string' || typeof indices == 'number') {
        indices = [indices]
    } else if (indices instanceof Row) {
        indices = this.getIndexByRowId(indices.rowId)
    } else if (u.isArray(indices) && indices.length > 0 && indices[0] instanceof Row) {
        for (var i = 0; i < indices.length; i++) {
            indices[i] = this.getIndexByRowId(indices[i].rowId)
        }
    }
    return indices;
};


/**
 * row :   {data:{}}
 * @constructor
 */
var Page = function (options) {
    this.focus = options['focus'] || null;
    this.selectedIndices = options['selectedIndices'] || null;
    this.rows = options['rows'] || []
    this.parent = options['parent'] || null;
}

Page.fn = Page.prototype

Page.fn.getData = function () {
    var datas = [], row, meta;
    meta = this.parent.getMeta()
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({'id': row.rowId, 'status': row.status, data: row.data});
    }
    return datas
}

Page.fn.getSelectDatas = function () {
    var datas = [], row;
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({'id': row.rowId, 'status': row.status, data: row.data});
    }
    for (var i = 0; i < this.selectedIndices.length; i++) {
        row = this.rows[this.selectedIndices[i]];
        datas.push({'id': row.rowId, 'status': row.status, data: row.data});
    }
    return datas
}

Page.fn.getRowByRowId = function (rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows.rowId == rowid)
            return this.rows[i]
    }
    return null
}

Page.fn.removeRowByRowId = function (rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows.rowId == rowid)
            this.rows.splice(i, 1);
    }
}

Page.fn.getSelectRows = function () {
    var rows = [];
    for (var i = 0; i < this.selectedIndices.length; i++) {
        rows.push(this.rows[this.selectedIndices[i]])
    }
    return rows
}

Page.fn.getRowByRowId = function (rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows[i].rowId == rowid)
            return this.rows[i]
    }
    return null
}

Page.fn.setRowValue = function (rowIndex, fieldName, value) {
    var row = this.rows[rowIndex]
    if (row) {
        row.data[fieldName]['value'] = value
        if (row.status != Row.STATUS.NEW)
            row.status = Row.STATUS.UPDATE
    }
}

Page.fn.getRowValue = function (rowIndex, fieldName) {
    var row = this.rows[rowIndex]
    if (row) {
        return row.data[fieldName]['value']
    }
    return null
}

Page.fn.setRowMeta = function (rowIndex, fieldName, metaName, value) {
    var row = this.rows[rowIndex]
    if (row) {
        var meta = row[fieldName].meta
        if (!meta)
            meta = row[fieldName].meta = {}
        meta[metaName] = value
        if (row.status != Row.STATUS.NEW)
            row.status = Row.STATUS.UPDATE
    }
}

Page.fn.getRowMeta = function (rowIndex, fieldName, metaName) {
    var row = this.rows[rowIndex]
    if (row) {
        var meta = row[fieldName].meta
        if (!meta)
            return null
        else
            return meta[metaName]
    }
    return null
}


Page.fn.updateRow = function (originRow, newRow) {
    originRow.status = originRow.status
    //this.rowId = data.rowId
    if (!newRow.data) return;
    for (var key in newRow.data) {
        if (originRow.data[key]) {
            var valueObj = newRow.data[key]
            if (typeof valueObj == 'string' || typeof valueObj == 'number' || valueObj === null)
                originRow.data[key]['value'] = valueObj
            //this.setValue(key, this.formatValue(key, valueObj))
            else {
//					this.setValue(key, valueObj.value)

                if (valueObj.error) {
                    u.showMessageDialog({title: "警告", msg: valueObj.error, backdrop: true});
                } else {
                    //this.setValue(key, this.formatValue(key, valueObj.value), null)
                    originRow.data[key]['value'] = valueObj.value
                    for (var k in valueObj.meta) {
                        originRow.data[key]['meta'] = originRow.data[key]['meta'] || {}
                        originRow.data[key]['meta'][k] = valueObj.meta[k]
                    }
                }
            }
        }
    }
}


/**===========================================================================================================
 *
 * 行模型
 *
 * {id:'xxx', parent:dataTable1}
 *
 * data:{value:'v1',meta:{}}
 *
 * ===========================================================================================================
 */
var Row = function (options) {
    var self = this;
    this.rowId = options['id'] || Row.getRandomRowId()
    this.status = Row.STATUS.NEW
    //this.selected = ko.observable(false);
    //this.selected.subscribe(function(value){
    //    if (value === true){
    //        self.parent.addRowSelect(self);
    //    }else{
    //        self.parent.setRowUnSelect(self);
    //    }
    //
    //})
    this.parent = options['parent']
    this.initValue = null
    this.data = {}
    this.metaChange = {}//ko.observable(1)
    this.valueChange = {};
    this.currentRowChange = ko.observable(1);
    this.selected = ko.pureComputed({
        read: function () {
            var index = this.parent.getRowIndex(this);
            var selectindices = this.parent.getSelectedIndices();
            return selectindices.indexOf(index) != -1;
        },
        owner: this

    })
    this.focused = ko.pureComputed({
        read: function () {
            var index = this.parent.getRowIndex(this);
            var focusIndex = this.parent.getFocusIndex()
            return focusIndex == index;
        },
        owner: this

    })
    this.init()
}

Row.STATUS = {
    NORMAL: 'nrm',
    UPDATE: 'upd',
    NEW: 'new',
    DELETE: 'del',
    FALSE_DELETE: 'fdel'
}

Row.fn = Row.prototype = new Events()

/**
 * Row初始化方法
 * @private
 */
Row.fn.init = function () {
    var meta = this.parent.meta;

    for (var key in meta) {
        var targetData;
        if (key.indexOf('.') > 0){
            var keys = key.split('.');
            targetData =  this.data[keys[0]] = this.data[keys[0]] || {};
            for(var i = 1; i< keys.length; i++){
                targetData[keys[i]] = targetData[keys[i]] || {};
                targetData = targetData[keys[i]];
            }
        }else{
            this.data[key] = this.data[key] || {}
            targetData = this.data[key];
        }
        targetData.value = null;
        //this.data[key] = {}
        //处理子表
        if (meta[key]['type'] && meta[key]['type'] === 'child'){
            targetData.isChild = true;
            //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
            var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key
            targetData.value = new u.DataTable({root:this.parent.root,ns:ns,meta:meta[key]['meta']});
        }
        //添加默认值
        else if (meta[key]['default']) {
            var defaults = meta[key]['default']
            if (typeof defaults === 'object'){
                for (var k in defaults) {
                    if (k == 'value'){
                        if (typeof defaults[k] === 'function')
                            targetData.value = this.formatValue(key,defaults[k]());
                        else
                            targetData.value = this.formatValue(key,defaults[k]);
                    }
                    else {
                        targetData.meta = targetData.meta || {}
                        targetData.meta[k] = defaults[k]
                    }
                }
            }else{
                if (typeof defaults === 'function')
                    targetData.value = this.formatValue(key, defaults());
                else
                    targetData.value = this.formatValue(key,defaults);
            }
        }
    }
}

Row.fn.toggleSelect = function(type){
    var index = this.parent.getRowIndex(this);
    var selectindices = this.parent.getSelectedIndices();
    if (selectindices.indexOf(index) != -1){
        this.parent.setRowUnSelect(index);
    }else{
        if (type === 'single')
            this.parent.setRowSelect(index);
        else
            this.parent.addRowSelect(index);
    }
};

/**
 * 行点击事件
 */
Row.fn.singleSelect = function(){
    this.toggleSelect('single');
};

Row.fn.multiSelect = function(){
    this.toggleSelect('multi');
};

Row.fn.ref = function (fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            return this.getChildValue(fieldName)
            //var value = this._getField(fieldName)['value'];
            //return value;
        },
        write: function (value) {
            this.setChildValue(fieldName, value);
            //this.setValue(fieldName, value)
        },
        owner: this
    })
}


/**
 * 绑定子表行
 * @param fieldName
 */
//Row.fn.refChildRows = function(fieldName){
//    if (!this.valueChange[fieldName])
//        this.valueChange[fieldName] = ko.observable(1);
//    return ko.pureComputed({
//        read: function () {
//            this.valueChange();
//            this.currentRowChange();
//            var childDt = this._getField(fieldName)['value'];
//            if (!(childDt instanceof u.DataTable)){
//                throw new Error("refChildRows('" + fieldName + "') error, field is not a child datatable!");
//            }
//            return childDt.rows.peek();
//        },
//        //write: function (value) {
//        //    this.setValue(fieldName, value)
//        //},
//        owner: this
//    })
//}

Row.fn.refMeta = function (fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.metaChange[fieldName + '.' + key]()
            return this.getMeta(fieldName, key)
        },
        write: function (value) {
            this.setMeta(fieldName, key, value)
        },
        owner: this
    })
}
Row.fn.refCombo = function (fieldName, datasource) {
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            var ds = u.getJSObject(this.parent.parent, datasource)
            if (this._getField(fieldName)['value'] === undefined || this._getField(fieldName)['value'] === "") return "";
            var v = this._getField(fieldName)['value'];
            var valArr = typeof v === 'string' ? v.split(',') : [v];

            var nameArr = []

            for (var i = 0, length = ds.length; i < length; i++) {
                for (var j = 0; j < valArr.length; j++) {
                    if (ds[i].pk == valArr[j]) {
                        nameArr.push(ds[i].name)
                    }
                }
            }

            return nameArr.toString();
        },
        write: function (value) {

            this.setValue(fieldName, value)
        },
        owner: this
    })
}
Row.fn.refDate = function (fieldName, format) {
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!this._getField(fieldName)['value']) return "";
            var valArr = this._getField(fieldName)['value']
            if (!valArr) return "";
            valArr = moment(valArr).format(format)
            return valArr;
        },
        write: function (value) {

            this.setValue(fieldName, value)
        },
        owner: this
    })
}

// 刘云燕提交
Row.fn.refEnum = function (fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!this._getField(fieldName)['value']) return "";
            var valArr = this._getField(fieldName)['value']
            if (!valArr) return "";
            if(valArr == "N")
                valArr = "否";
            else if(valArr == "Y")
                valArr = "是";
            return valArr;
        },
        write: function (value) {

            this.setValue(fieldName, value)
        },
        owner: this
    })
}

/**
 *获取row中某一列的值
 */
Row.fn.getValue = function (fieldName) {
    return this._getField(fieldName)['value']
}

/**
 * 获取子表值 ，如果fieldName对应了一个子表，返回该子表的行数组
 * @param fieldName
 */
Row.fn.getChildValue = function(fieldName){
    var nameArr = fieldName.split('.');
    var _name = nameArr[0];
    for (var i = 0, count = nameArr.length; i<count; i++){
        var _value = this.getValue(_name);
        //最后一级
        if (i == count -1){
            if (_value instanceof u.DataTable){
                return _value.rows.peek();
            }else{
                return _value;
            }
        }else{
            if (_value instanceof u.DataTable){
                _value = _value.getCurrentRow();
                if (!_value)
                    return '';
                else
                    return _value.getChildValue(fieldName.replace(_name + '.', ''))
            }else{
                _name = _name + '.' + nameArr[i+1];
            }

        }
    }
    return '';
};

Row.fn.setChildValue = function(fieldName, value){
    var nameArr = fieldName.split('.');
    var _name = nameArr[0];
    var _field = this.data[_name];//_field保存当前_name对应的数据
    for (var i = 0, count = nameArr.length; i<count; i++){
        // var _field = this.data[_name];
        // if (!_field)
        //     throw new Error('field:' + fieldName + ' not exist in dataTable:' + this.root.id + '!');
        //最后一级
        if (i == count -1){
            if (_field['value'] instanceof u.DataTable){
                //暂不处理
            }else{
                //_field['value'] = value;
                this.setValue(fieldName, value);
            }
        }else{
			if (_field && _field['value'] instanceof u.DataTable){
                var row = _field['value'].getCurrentRow();
                if (row)
                    row.setChildValue(fieldName.replace(_name + '.', ''), value)
            }else{
            	_name = nameArr[i + 1];
            	_field = _field[_name];//多层嵌套时_field取子项对应的数据
                // _name = _name + '.' + nameArr[i];
                
            }

        }
    }
};


var eq = function (a, b) {
    if ((a === null || a === undefined || a === '') && (b === null || b === undefined || b === '')) return true;
    if (u.isNumber(a) && u.isNumber(b) && parseFloat(a) == parseFloat(b)) return true;
    if (a + '' == b + '')  return true;
    return false;
}

Row.fn._triggerChange = function(fieldName, oldValue, ctx){
    this._getField(fieldName).changed = true
    if (this.status != Row.STATUS.NEW)
        this.status = Row.STATUS.UPDATE
    if (this.valueChange[fieldName])
        this.valueChange[fieldName](-this.valueChange[fieldName]())
    if (this.parent.getCurrentRow() == this && this.parent.valueChange[fieldName])
        this.parent.valueChange[fieldName](-this.parent.valueChange[fieldName]());
    if (this.parent.ns){
        var fName = this.parent.ns + '.' + fieldName;
        if (this.parent.root.valueChange[fName])
            this.parent.root.valueChange[fName](-this.parent.root.valueChange[fName]());
    }

    var event = {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        rowId: this.rowId,
        field: fieldName,
        oldValue: oldValue,
        newValue: this.getValue(fieldName),
        ctx: ctx || ""
    }
    this.parent.trigger(DataTable.ON_VALUE_CHANGE, event);
    this.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, event);
    if (this == this.parent.getCurrentRow())
        this.parent.trigger(fieldName + "." + DataTable.ON_CURRENT_VALUE_CHANGE, event);

};

/**
 *设置row中某一列的值
 */
Row.fn.setValue = function (fieldName, value, ctx, options) {
    if (arguments.length === 1){
        value = fieldName;
        fieldName = '$data';
    }
    var oldValue = this.getValue(fieldName) || ""
    if (eq(oldValue, value)) return;
    this._getField(fieldName)['value'] = value;
    this._triggerChange(fieldName, oldValue, ctx);
    // this._getField(fieldName).changed = true
    // if (this.status != Row.STATUS.NEW)
    //     this.status = Row.STATUS.UPDATE
    // if (this.valueChange[fieldName])
    //     this.valueChange[fieldName](-this.valueChange[fieldName]())
    // if (this.parent.getCurrentRow() == this && this.parent.valueChange[fieldName])
    //     this.parent.valueChange[fieldName](-this.parent.valueChange[fieldName]());
    // if (this.parent.ns){
    //     var fName = this.parent.ns + '.' + fieldName;
    //     if (this.parent.root.valueChange[fName])
    //         this.parent.root.valueChange[fName](-this.parent.root.valueChange[fName]());
    // }

    // var event = {
    //     eventType: 'dataTableEvent',
    //     dataTable: this.parent.id,
    //     rowId: this.rowId,
    //     field: fieldName,
    //     oldValue: oldValue,
    //     newValue: value,
    //     ctx: ctx || ""
    // }
    // this.parent.trigger(DataTable.ON_VALUE_CHANGE, event);
    // this.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, event);
    // if (this == this.parent.getCurrentRow())
    //     this.parent.trigger(fieldName + "." + DataTable.ON_CURRENT_VALUE_CHANGE, event);
}

/**
 *获取row中某一列的属性
 */
Row.fn.getMeta = function (fieldName, key, fetchParent) {
    if (arguments.length == 0) {
        var mt = {}
        for (var k in this.data) {
            mt[k] = this.data[k].meta ? this.data[k].meta : {}
        }
        return mt
    }
    var meta = this._getField(fieldName).meta
    if (meta && meta[key] !== undefined && meta[key] !== null && meta[key] !== '')
        return meta[key]
    else if (typeof fetchParent == 'undefined' || fetchParent != false)
        return this.parent.getMeta(fieldName, key)
    return undefined;
}

/**
 *设置row中某一列的属性
 */
Row.fn.setMeta = function (fieldName, key, value) {
    var meta = this._getField(fieldName).meta
    if (!meta)
        meta = this._getField(fieldName).meta = {}
    var oldValue = meta[key]
    if (eq(oldValue, value)) return;
    meta[key] = value
    //this.metaChange(- this.metaChange())
    if (this.metaChange[fieldName + '.' + key]) {
        this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
    }

    if (key == 'enable')
        this.parent.enableChange(-this.parent.enableChange())
    if (this.parent.getCurrentRow() == this) {
        if (this.parent.metaChange[fieldName + '.' + key])
            this.parent.metaChange[fieldName + '.' + key](-this.parent.metaChange[fieldName + '.' + key]());
        this.parent.trigger(fieldName + '.' + key + '.' + DataTable.ON_CURRENT_META_CHANGE, {
            eventType: 'dataTableEvent',
            dataTable: this.parent.id,
            oldValue: oldValue,
            newValue: value
        });
        //this.parent.metaChange(- this.parent.metaChange())
    }
    this.parent.trigger(DataTable.ON_ROW_META_CHANGE, {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        field: fieldName,
        meta: key,
        oldValue: oldValue,
        newValue: value,
        row: this
    });

    this.parent.trigger(fieldName + '.' + key + '.' + DataTable.ON_ROW_META_CHANGE, {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        field: fieldName,
        meta: key,
        oldValue: oldValue,
        newValue: value,
        row: this
    });
}

/**
 * [_setData description]
 * @param {[type]} sourceData 
 * @param {[type]} targetData 
 * @param {[type]} subscribe  
 * @param {[type]} parentKey  [父项key，数据项为数组时获取meta值用]
 */
Row.fn._setData = function(sourceData, targetData, subscribe, parentKey){
    for (var key in sourceData) {
    	var _parentKey = parentKey || null;
        //if (targetData[key]) {
        targetData[key] = targetData[key] || {};
        var valueObj = sourceData[key]
        if (typeof valueObj != 'object')
            this.parent.createField(key);
        //if (typeof this.parent.meta[key] === 'undefined') continue;
        if (valueObj == null ||  typeof valueObj != 'object'){
            targetData[key]['value'] = this.formatValue(key, valueObj)
            if (subscribe === true && (oldValue !== targetData[key]['value'])){
                    this._triggerChange(key, oldValue);
                }
        }
        else {
            if (valueObj.error) {
                u.showMessageDialog({title: "警告", msg: valueObj.error, backdrop: true});
            } else if (valueObj.value || valueObj.value === null  || valueObj.meta){
                var oldValue = targetData[key]['value'];
                targetData[key]['value'] = this.formatValue(key, valueObj.value)
                if (subscribe === true && (oldValue !== targetData[key]['value'])){
                    this._triggerChange(key, oldValue);
                }
                for (var k in valueObj.meta) {
                    this.setMeta(key, k, valueObj.meta[k])
                }
            }else if (u.isArray(valueObj)){
                targetData[key].isChild = true;
                //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
                var _key = _parentKey == null ? key : _parentKey + '.' + key;
                var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + _key
              if(this.parent.meta[_key]){
            	var meta = this.parent.meta[_key]['meta']
                targetData[key].value = new u.DataTable({root:this.parent.root,ns:ns,meta:meta});
                targetData[key].value.setSimpleData(valueObj);
              }
            }else{
            	_parentKey = _parentKey == null ? key : _parentKey + '.' + key;
                this._setData(valueObj, targetData[key], null, _parentKey);
            }
        }
        //}
    }

}

/**
 *设置Row数据
 *@subscribe 是否触发监听  
 */
Row.fn.setData = function (data, subscribe) {
    this.status = data.status
    var sourceData = data.data,
        targetData = this.data;
     this._setData(sourceData, targetData,subscribe);

    // 如果有一天，规则改成：定义dataTable的时候必须定义所有字段信息才能设置数据。放开下面这段代码
    //var meta = this.parent.meta;
    //for (var key in meta){
    //    var oldValue = newValue = null;
    //    //子数据
    //    if (meta[key]['type'] && meta[key]['type'] === 'child'){
    //        targetData[key].isChild = true;
    //        //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
    //        var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key
    //        var meta = this.parent.meta[key]['meta']
    //        targetData[key].value = new u.DataTable({root:this.parent.root,ns:ns,meta:meta});
    //        if (typeof sourceData[key] === 'object')
    //            targetData[key].value.setSimpleData(sourceData[key]);
    //    }
    //    //存在多级关系
    //    else if (key.indexOf('.') != -1){
    //        var keys = key.split('.');
    //        var _fieldValue = sourceData;
    //        var _targetField = targetData;
    //        for(var i = 0; i< keys.length; i++){
    //            _fieldValue = _fieldValue[keys[i]];
    //            _targetField = _targetField[keys[i]];
    //        }
    //        oldValue = _targetField['value'];
    //        _targetField['value'] = this.formatValue(key, _fieldValue)
    //        newValue = _targetField['value'];
    //    }
    //    // 通过 setSimpleData 设置的数据
    //    else if (sourceData[key] == null ||  typeof sourceData[key] != 'object'){
    //        oldValue = targetData[key]['value'];
    //        targetData[key]['value'] = this.formatValue(key, sourceData[key])
    //        newValue = targetData[key]['value'];
    //    }
    //    else{
    //        var valueObj = sourceData[key];
    //        if (valueObj.error) {
    //            u.showMessageDialog({title: "警告", msg: valueObj.error, backdrop: true});
    //        } else if (valueObj.value || valueObj.value === null || valueObj.meta){
    //            oldValue = targetData[key]['value'];
    //            targetData[key]['value'] = this.formatValue(key, valueObj.value)
    //            newValue = targetData[key]['value'];
    //            for (var k in valueObj.meta) {
    //                this.setMeta(key, k, valueObj.meta[k])
    //            }
    //        }
    //    }
    //    if (subscribe === true && (oldValue !== newValue)){
    //        this._triggerChange(key, oldValue);
    //    }
    //
    //}
};



Row.fn.setSimpleData = function(data){
    var allData = {};
    allData.data = data;
    allData.status = 'nrm';
    this.setData(allData, true);
    this.currentRowChange(-this.currentRowChange());
}


/**
 * 格式化数据值
 * @private
 * @param {Object} field
 * @param {Object} value
 */
Row.fn.formatValue = function (field, value) {
    var type = this.parent.getMeta(field, 'type')
    if (!type) return value
    if (type == 'date' || type == 'datetime') {
        return _formatDate(value)
    }
    return value
}

Row.fn.updateRow = function (row) {
    this.setData(row)
}

/**
 * @private
 * 提交数据到后台
 */
/**
 * @private
 * 提交数据到后台
 */
Row.fn.getData = function () {
    var data = ko.toJS(this.data)
    var meta = this.parent.getMeta()
    for (var key in meta) {
        if (meta[key] && meta[key].type) {
            if (meta[key].type == 'date' || meta[key].type == 'datetime') {
                if(key.indexOf('.')>0){//大于0说明是多级json
                    var keys=key.split('.');
                    var _keyValue=data;
                    for(var i=0,count=keys.length;i<count;i++){
                        _keyValue=_keyValue[keys[i]];
                    }
                    _keyValue.value =_dateToUTCString(_keyValue.value);
                  
                }else{
                    data[key].value = _dateToUTCString(data[key].value)
                }
            } else if(meta[key].type == 'child') {
                data[key].value = this.getValue(key).getDataByRule(DataTable.SUBMIT.all);
            }
        }
    }
    return {'id': this.rowId, 'status': this.status, data: data}
}

Row.fn.getEmptyData = function () {
    return {'id': this.rowId, 'status': this.status, data: {}}
};

Row.fn._getSimpleData = function(data){
    var _data = {};
    var meta = this.parent.getMeta() || {};
    for(var key in data){
        if (key === 'meta' || u.isEmptyObject(data[key])){
            continue;
        }else if (data[key].isChild) {
            _data[key] = data[key].value?data[key].value.getSimpleData():{};
        }else if (key === '$data'){  //处理一维数组： [1,2,3]
            _data = data[key].value
        }else if (typeof data[key].value !== 'undefined'){
           //如果类型为boolean，无论值为false、true都应该等于他本身
            if(meta[key] && meta[key].type==='boolean'){
                _data[key] = data[key].value?true:false;//默认值可能是null
            }else{
                _data[key] = data[key].value;
            }
            if (meta[key] && meta[key].type) {
                if (meta[key].type == 'date' || meta[key].type == 'datetime') {

                    _data[key] = _dateToUTCString(data[key].value)
                }
            }
        }else if(typeof data[key].value !== 'undefined'){
            _data[key] = undefined;
        }else{
            _data[key] = this._getSimpleData(data[key])
        }
    }
    return _data;

}

Row.fn.getSimpleData = function(options){
    options = options || {}
    var fields = options['fields'] || null;
    var meta = this.parent.getMeta();
    var data = ko.toJS(this.data)
    var data = this.data;
    var _data = this._getSimpleData(data); //{};
    // for (var key in meta) {
    //    if (fields && fields.indexOf(key) == -1)
    //        continue;
    //    if (meta[key] && meta[key].type) {
    //        if (meta[key].type == 'date' || meta[key].type == 'datetime') {
    //            data[key].value = _dateToUTCString(data[key].value)
    //        }
    //    }
    //    _data[key] = data[key].value;
    // }
    return _data;

};

Row.fn._findField = function(fieldName){
    var rat = this.data[fieldName];
    if (!rat) {
        var fnames = fieldName.split('.'); //多级field
        if (fnames.length > 1){
            var tempField = this.data
            for (var i = 0; i < fnames.length; i++){
                tempField = tempField[fnames[i]];
                if (!tempField){
                    break;
                }
            }
            rat = tempField;
        }
    }
    return rat || null;

}

Row.fn._getField = function (fieldName) {
    var rat = this._findField(fieldName);
    if (!rat) {
        var msg = 'field:' + fieldName + ' not exist in dataTable:' + this.parent.root.id + '!'
        console.error(msg);
        throw new Error(msg);
    }
    return rat;
}


/*
 * 生成随机行id
 * @private
 */
Row.getRandomRowId = function () {
    var _id = setTimeout(function () {})
    return  _id + '';
};

var _formatDate = function (value) {
    if (!value) return value
    var date = new Date();
    date.setTime(value);
    //如果不能转为Date 直接返回原值
    if (isNaN(date)){
        return value
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (parseInt(month) < 10) month = "0" + month;
    var day = date.getDate();
    if (parseInt(day) < 10) day = "0" + day;
    var hours = date.getHours();
    if (parseInt(hours) < 10) hours = "0" + hours;
    var minutes = date.getMinutes();
    if (parseInt(minutes) < 10) minutes = "0" + minutes;
    var seconds = date.getSeconds();
    if (parseInt(seconds) < 10) seconds = "0" + seconds;
    var mill = date.getMilliseconds();
    var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds ; //+ "." + mill;
    return formatString;
}

var _dateToUTCString = function (date) {
    if (!date) return ''
    if(typeof date==='number')
        return date
    if (date.indexOf("-") > -1)
        date = date.replace(/\-/g, "/");
    var utcString = Date.parse(date);
    if (isNaN(utcString)) return "";
    return utcString;
}


u.Row = Row;
u.DataTable = DataTable;

/**
 * Created by dingrf on 2016/1/15.
 */

/**
 * adapter基类
 */

u.BaseAdapter = u.Class.create({
    /**
     *
     * @param comp
     * @param options ：
     *      el: '#content',  对应的dom元素
     *      options: {},     配置
     *      model:{}        模型，包括数据和事件
     */
    initialize: function (options) {
        //组合mixin中的方法
        for(var i in this.mixins){
            var mixin = this.mixins[i];
            for (var key in mixin['methods']){
                if (!this[key]){
                    this[key] = mixin['methods'][key];
                }
            }
        }

        //this.comp = comp;
        this.element = options['el'];
        this.options = options['options'];
        this.viewModel = options['model'];
        this.dataModel = null;
        this.mixins = this.mixins || [];
        this.parseDataModel();
        this.init();
        //执行mixin中的初始化方法
        for(var i in this.mixins){
            var mixin = this.mixins[i];
            if (mixin['init'])
                mixin.init.call(this);
        }

    },
    parseDataModel: function () {
        if (!this.options || !this.options["data"]) return;
        this.field = this.options["field"];
        var dtId = this.options["data"];
        this.dataModel = u.getJSObject(this.viewModel, this.options["data"]);
        if (this.dataModel){
            var opt = {};
            if (this.options.type === 'u-date'){
                opt.type = 'date'
            }
            if (this.field)
                this.dataModel.createField(this.field, opt);
        }
    },
    getOption: function(key){
        return this.dataModel.getRowMeta(this.field, key) || this.options[key];
    },
    init: function(){

    }
});
u.CheckboxAdapter = u.BaseAdapter.extend({
    mixins: [u.ValueMixin, u.EnableMixin,u.RequiredMixin, u.ValidateMixin],
    init: function (options) {
        var self = this;
        // u.CheckboxAdapter.superclass.initialize.apply(this, arguments); 
        this.isGroup = this.options['isGroup'] === true || this.options['isGroup'] === 'true';
        if (this.options['datasource']) {
            this.isGroup = true;
            var datasource = u.getJSObject(this.viewModel, this.options['datasource']);
            this.checkboxTemplateArray = [];
            for (var i= 0, count = this.element.childNodes.length; i< count; i++){
                this.checkboxTemplateArray.push(this.element.childNodes[i]);
            }
            this.setComboData(datasource);
        }else{
            if(this.element['u.Checkbox']) {
                this.comp = this.element['u.Checkbox']
            } else {
                this.comp = new u.Checkbox(this.element);
                this.element['u.Checkbox'] = this.comp;
            }
            
            this.checkedValue =  this.options['checkedValue'] || this.comp._inputElement.value;
            this.unCheckedValue =  this.options["unCheckedValue"];

            this.comp.on('change', function(){
                if (self.slice) return;
                if(!self.dataModel) return;
                var modelValue = self.dataModel.getValue(self.field);
                modelValue = modelValue ? modelValue : '';
                if (self.isGroup) {
                    var valueArr = modelValue == '' ? [] : modelValue.split(',');

                    if (self.comp._inputElement.checked) {
                        valueArr.push(self.checkedValue)
                    } else {
                        var index = valueArr.indexOf(self.checkedValue);
                        valueArr.splice(index, 1);
                    }
                    self.dataModel.setValue(self.field, valueArr.join(','));
                }else{
                    if (self.comp._inputElement.checked) {
                        self.dataModel.setValue(self.field, self.checkedValue);
                    }else{
                        self.dataModel.setValue(self.field, self.unCheckedValue)
                    }
                }
            });
        }

        if(this.dataModel){
            this.dataModel.ref(this.field).subscribe(function(value) {
                self.modelValueChange(value)
            })
        }
    },
    setComboData: function (comboData) {
        var self = this;
        this.element.innerHTML = '';
        for (var i = 0, len = comboData.length; i < len; i++) {
            for(var j=0; j<this.checkboxTemplateArray.length; j++){
                this.element.appendChild(this.checkboxTemplateArray[j].cloneNode(true));
            }
        }
        var allCheck = this.element.querySelectorAll('[type=checkbox]');
        var allName = this.element.querySelectorAll('[data-role=name]');
        for (var k = 0; k < allCheck.length; k++) {
            allCheck[k].value = comboData[k].pk || comboData[k].value;
            allName[k].innerHTML = comboData[k].name
        }
        this.element.querySelectorAll('.u-checkbox').forEach(function (ele) {
            var comp;
            if(ele['u.Checkbox']) {
                comp = ele['u.Checkbox'];
            } else {
                comp = new u.Checkbox(ele);
            }
            ele['u.Checkbox'] = comp;
            comp.on('change', function(){
                if (self.slice) return;
                var modelValue = self.dataModel.getValue(self.field);
                modelValue = modelValue ? modelValue : '';
                var valueArr = modelValue == '' ? [] : modelValue.split(',');
                if (comp._inputElement.checked) {
                    valueArr.push(comp._inputElement.value)
                } else {
                    var index = valueArr.indexOf(comp._inputElement.value);
                    valueArr.splice(index, 1);
                }
                //self.slice = true;
                self.dataModel.setValue(self.field, valueArr.join(','));
                //self.slice = false;
            });
        })

    },
    modelValueChange: function (val) {
        var self = this;
        if (this.slice) return;
        if (this.isGroup){
            this.trueValue = val;
            this.element.querySelectorAll('.u-checkbox').forEach(function (ele) {
                var comp =  ele['u.Checkbox'];
                if (comp._inputElement.checked != (val + ',').indexOf(comp._inputElement.value) > -1){
                    self.slice = true;
                    comp.toggle();
                    self.slice = false;
                }
            })
        }else{
            if (this.comp._inputElement.checked != (val === this.checkedValue)){
                this.slice = true;
                this.comp.toggle();
                this.slice = false;
            }
        }
    },

    setEnable: function (enable) {
        this.enable = (enable === true || enable === 'true');
        if (this.isGroup){
            this.element.querySelectorAll('.u-checkbox').forEach(function (ele) {
                var comp =  ele['u.Checkbox'];
                if (enable === true || enable === 'true'){
                    comp.enable();
                }else{
                    comp.disable();
                }
            })
        }else{
            if (this.enable){
                this.comp.enable();
            }else{
                this.comp.disable();
            }
        }
    }
})


u.compMgr.addDataAdapter(
    {
        adapter: u.CheckboxAdapter,
        name: 'u-checkbox'
    });

u.ComboboxAdapter = u.BaseAdapter.extend({
    mixins:[u.ValueMixin,u.EnableMixin, u.RequiredMixin, u.ValidateMixin],
    init: function () {
        var self = this;
        //u.ComboboxAdapter.superclass.initialize.apply(this, arguments);
        this.datasource = u.getJSObject(this.viewModel, this.options['datasource']);
        this.mutil = this.options.mutil || false;
        this.onlySelect = this.options.onlySelect || false;
        this.validType = 'combobox';
        this.comp = new u.Combo({el:this.element,mutilSelect:this.mutil,onlySelect:this.onlySelect});
        this.element['u.Combo'] = this.comp;
        if (this.datasource){
            this.comp.setComboData(this.datasource);
        }else{
            if(u.isIE8 || u.isIE9)
                alert("IE8/IE9必须设置datasource");
        }
        ////TODO 后续支持多选
        //if (this.mutil) {
        //    //$(this.comboEle).on("mutilSelect", function (event, value) {
        //    //    self.setValue(value)
        //    //})
        //}
        this.comp.on('select', function(event){
            // self.slice = true;
            // if(self.dataModel)
            //     self.dataModel.setValue(self.field, event.value);
            // self.slice = false;
            self.setValue(event.value);
        });
        //if(this.dataModel){
        //    this.dataModel.ref(this.field).subscribe(function(value) {
        //        self.modelValueChange(value)
        //    })
        //}
    },
    modelValueChange: function (value) {
        if (this.slice) return;
        //this.trueValue = value;
        if (value === null || typeof value == "undefined")
            value = "";
        this.comp.setValue(value);
        this.trueValue = this.formater ? this.formater.format(value) : value;
        //this.element.trueValue = this.trueValue;
        this.showValue = this.masker ? this.masker.format(this.trueValue).value : this.trueValue;
        this.setShowValue(this.showValue);
    },
    //setValue: function (value) {
    //    this.trueValue = value;
    //    this.slice = true;
    //    this.setModelValue(this.trueValue);
    //    this.slice = false;
    //},
    //getValue: function () {
    //    return this.trueValue
    //},
    setEnable: function (enable) {
        var self = this;
        if (enable === true || enable === 'true') {
            this.enable = true;
            this.element.removeAttribute('readonly');
            this.comp._input.removeAttribute('readonly');
            u.removeClass(this.element.parentNode,'disablecover');
            u.on(this.comp._input, 'focus', function (e) {
                self.comp.show(e);
                u.stopEvent(e);
            })
            if (this.comp.iconBtn){
                u.on(this.comp.iconBtn, 'click', function(e){
                    self.comp.show(e);
                    u.stopEvent(e);
                })
            }
        } else if (enable === false || enable === 'false') {
            this.enable = false;
            this.element.setAttribute('readonly', 'readonly');
            this.comp._input.setAttribute('readonly', 'readonly');
            u.addClass(this.element.parentNode,'disablecover');
            u.off(this.comp._input, 'focus')
            if (this.comp.iconBtn){
                u.off(this.comp.iconBtn, 'click')
            }
        }
    }
});

u.compMgr.addDataAdapter(
    {
        adapter: u.ComboboxAdapter,
        name: 'u-combobox'
    });





/**
 * 货币控件
 */
u.CurrencyAdapter = u.FloatAdapter.extend({
    init: function () {
        var self = this;
        u.CurrencyAdapter.superclass.init.apply(this);

        this.maskerMeta = iweb.Core.getMaskerMeta('currency') || {};
        this.maskerMeta.precision = this.getOption('precision') || this.maskerMeta.precision;
        this.maskerMeta.curSymbol = this.getOption('curSymbol') || this.maskerMeta.curSymbol;
        this.validType = 'float';
        this.dataModel.on(this.field + '.curSymbol.' + u.DataTable.ON_CURRENT_META_CHANGE, function (event) {
            self.setCurSymbol(event.newValue)
        });
        this.formater = new u.NumberFormater(this.maskerMeta.precision);
        this.masker = new CurrencyMasker(this.maskerMeta);
    },
    /**
     * 修改精度
     * @param {Integer} precision
     */
    setPrecision: function (precision) {
        if (this.maskerMeta.precision == precision) return
        this.maskerMeta.precision = precision
        this.formater = new u.NumberFormater(this.maskerMeta.precision);
        this.masker = new u.CurrencyMasker(this.maskerMeta);
        var currentRow = this.dataModel.getCurrentRow();
        if (currentRow) {
            var v = this.dataModel.getCurrentRow().getValue(this.field)
            this.showValue = this.masker.format(this.formater.format(v)).value
        } else {
            this.showValue = this.masker.format(this.formater.format(this.trueValue)).value
        }
        this.setShowValue(this.showValue)
    },
    /**
     * 修改币符
     * @param {String} curSymbol
     */
    setCurSymbol: function (curSymbol) {
        if (this.maskerMeta.curSymbol == curSymbol) return
        this.maskerMeta.curSymbol = curSymbol
        this.masker.formatMeta.curSymbol = this.maskerMeta.curSymbol
        this.element.trueValue = this.trueValue
        this.showValue = this.masker.format(this.trueValue).value
        this.setShowValue(this.showValue)

    },
    onFocusin: function (e) {
        var v = this.getValue(), vstr = v + '', focusValue = v
        if (u.isNumber(v) && u.isNumber(this.maskerMeta.precision)) {
            if (vstr.indexOf('.') >= 0) {
                var sub = vstr.substr(vstr.indexOf('.') + 1)
                if (sub.length < this.maskerMeta.precision || parseInt(sub.substr(this.maskerMeta.precision)) == 0) {
                    focusValue = this.formater.format(v)
                }
            } else if (this.maskerMeta.precision > 0) {
                focusValue = this.formater.format(v)
            }
        }
        this.setShowValue(focusValue)

    }
})

u.compMgr.addDataAdapter({
        adapter: u.CurrencyAdapter,
        name: 'currency'
    });


u.DateTimeAdapter = u.BaseAdapter.extend({
	mixins: [u.ValueMixin,u.EnableMixin,u.RequiredMixin, u.ValidateMixin],
	init: function (options) {
		var self = this,adapterType,format;
		// u.DateTimeAdapter.superclass.initialize.apply(this, arguments);
		if (this.options.type === 'u-date'){
			this.adapterType = 'date';
		}else{
			this.adapterType = 'datetime'
			u.addClass(this.element,'time');
		}

		this.maskerMeta = u.core.getMaskerMeta(this.adapterType) || {};
		this.maskerMeta.format = this.options['format'] || this.maskerMeta.format;
		if(this.dataModel){
			this.dataModel.on(this.field + '.format.' +  u.DataTable.ON_CURRENT_META_CHANGE, function(event){
				self.setFormat(event.newValue)
			});
		}
		
		if(this.dataModel)
			format = this.dataModel.getMeta(this.field, "format")
		this.maskerMeta.format = format || this.maskerMeta.format

		this.startField = this.options.startField?this.options.startField : this.dataModel.getMeta(this.field, "startField");
		//if(!this.options['format'])
		//	this.options.format = "YYYY-MM-DD HH:mm:ss";
		//this.formater = new $.DateFormater(this.maskerMeta.format);
		//this.masker = new DateTimeMasker(this.maskerMeta);

		this.comp = new u.DateTimePicker({el:this.element,format:this.maskerMeta.format});
		this.element['u.DateTimePicker'] = this.comp;


		this.comp.on('select', function(event){
			/*self.slice = true;
			if(self.dataModel){
				if (this.options.type === 'u-date')
					self.dataModel.setValue(self.field, u.date.format(event.value,'YYYY-MM-DD'));
				else
					self.dataModel.setValue(self.field, u.date.format(event.value,'YYYY-MM-DD HH:mm:ss'));
			}
			self.slice = false;*/
			self.setValue(event.value);
		});
		if(this.dataModel){
			this.dataModel.ref(this.field).subscribe(function(value) {
				self.modelValueChange(value);
			});
			if(this.startField){
				this.dataModel.ref(this.startField).subscribe(function(value) {
					self.comp.setStartDate(value);
					if(self.comp.date < u.date.getDateObj(value) || !value){
						self.dataModel.setValue(self.field,'');
					}
				});
			}
			if(this.startField){
				var startValue = this.dataModel.getValue(this.startField);
				if(startValue)
					self.comp.setStartDate(startValue);
			}
			
		}
			
	},
	modelValueChange: function(value){
		if (this.slice) return;
		this.trueValue = value;
		this.comp.setDate(value);
	},
	setFormat: function(format){
		if (this.maskerMeta.format == format) return;
		this.maskerMeta.format = format;
		this.comp.setFormat(format);
		//this.formater = new $.DateFormater(this.maskerMeta.format);
		//this.masker = new DateTimeMasker(this.maskerMeta);
	},
	setValue: function (value) {
		if (this.options.type === 'u-date'){
			value = u.date.format(value,'YYYY-MM-DD');
		}else{
			value = u.date.format(value,'YYYY-MM-DD HH:mm:ss');
		}
        this.trueValue = this.formater ? this.formater.format(value) : value;
        this.showValue = this.masker ? this.masker.format(this.trueValue).value : this.trueValue;
        this.setShowValue(this.showValue);
        this.slice = true;
        this.dataModel.setValue(this.field, this.trueValue);
        this.slice = false;
    },
    setEnable: function(enable){
        if (enable === true || enable === 'true') {
            this.enable = true;
            this.element.removeAttribute('readonly');
            this.comp._input.removeAttribute('readonly');
            u.removeClass(this.element.parentNode,'disablecover');
        } else if (enable === false || enable === 'false') {
            this.enable = false;
            this.element.setAttribute('readonly', 'readonly');
            this.comp._input.setAttribute('readonly', 'readonly');
            u.addClass(this.element.parentNode,'disablecover');
        }
        this.comp.setEnable(enable);
    }

});

u.compMgr.addDataAdapter(
		{
			adapter: u.DateTimeAdapter,
			name: 'u-date'
		});

u.compMgr.addDataAdapter(
		{
			adapter: u.DateTimeAdapter,
			name: 'u-datetime'
		});

+function($) {

	/**
	 * Class Editor
	 * @param {[type]} document  [description]
	 * @param {[type]} options   [description]
	 * @param {[type]} viewModel [description]
	 */
	var Editor = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			
			this.element = element;
			this.id = options['id'];
			this.options = options;
			this.viewModel = viewModel;
			this.e_editor = this.id + "editor";
			this.render(this.options);
			
			Editor.superclass.initialize.apply(this, arguments)
			this.create()
			
			
		},
		
		render: function(data){
			var cols = data.cols || 80;
			var rows = data.rows || 10;
			var self = this
			var tpls = '<textarea cols="' + cols + '" id="'+ this.e_editor +'" name="editor" rows="' + rows + '"></textarea>';
			$(this.element).append(tpls);
			//this.element.append(tpls);
			$( '#'+this.e_editor ).ckeditor(); 
			var tmpeditor = CKEDITOR.instances[this.e_editor]
			this.tmpeditor = tmpeditor
			//tmpeditor.setData()
			this.tmpeditor.on('blur',function(){
			
				self.setValue(tmpeditor.getData())
			});
			
			this.tmpeditor.on('focus',function(){
				
				self.setShowValue(self.getValue())
			});
			
			//console.log(CKEDITOR.instances[this.e_editor].getData())
		},
		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value//this.formater.format(value)
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(Editor.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue			
			this.element.value = showValue
			this.tmpeditor.setData(showValue)
		},
		getShowValue: function() {
			return this.showValue
		},
		getContent: function(){
			return $( '#'+this.e_editor ).html();
		},

		setContent: function(txt){
			$( '#'+this.e_editor ).html(txt);
		},

		Statics: {
			compName: 'editor'
		}
	});	

	if ($.compManager)
		$.compManager.addPlug(Editor)

}($);

u.FloatAdapter = u.BaseAdapter.extend({
    mixins:[u.ValueMixin,u.EnableMixin, u.RequiredMixin, u.ValidateMixin],
    init: function () {
        var self = this;
        this.element = this.element.nodeName === 'INPUT' ? this.element : this.element.querySelector('input');
        if (!this.element){
            throw new Error('not found INPUT element, u-meta:' + JSON.stringify(this.options));
        };
        this.maskerMeta = u.core.getMaskerMeta('float') || {};
        this.validType = 'float';
        this.maskerMeta.precision = this.getOption('precision') || this.maskerMeta.precision;
        this.max = this.getOption('max') || "10000000000000000000";
        this.min = this.getOption('min') || "-10000000000000000000";
        this.maxNotEq = this.getOption('maxNotEq');
        this.minNotEq = this.getOption('minNotEq');

        //处理数据精度
        this.dataModel.refRowMeta(this.field, "precision").subscribe(function(precision){
            if(precision === undefined) return;
            self.setPrecision(precision)
        });
        this.formater = new u.NumberFormater(this.maskerMeta.precision);
        this.masker = new u.NumberMasker(this.maskerMeta);
        u.on(this.element, 'focus', function(){
            if(self.enable){
                self.onFocusin()
            }
        })

        u.on(this.element, 'blur',function(){
            if(self.enable){
                if (!self.doValidate() && self._needClean()) {
                    if (self.required && (self.element.value === null || self.element.value === undefined || self.element.value === '')) {
                        // 因必输项清空导致检验没通过的情况
                        self.setValue('')
                    } else {
                        self.element.value = self.getShowValue()
                    }
                }
                else
                    self.setValue(self.element.value)
            }
        });


    },
    /**
     * 修改精度
     * @param {Integer} precision
     */
    setPrecision: function (precision) {
        if (this.maskerMeta.precision == precision) return;
        this.maskerMeta.precision = precision
        this.formater = new u.NumberFormater(this.maskerMeta.precision);
        this.masker = new u.NumberMasker(this.maskerMeta);
        var currentRow = this.dataModel.getCurrentRow();
        if (currentRow) {
            var v = this.dataModel.getCurrentRow().getValue(this.field)
            this.showValue = this.masker.format(this.formater.format(v)).value
        } else {
            this.showValue = this.masker.format(this.formater.format(this.trueValue)).value
        }

        this.setShowValue(this.showValue)
    },
    onFocusin: function () {
        var v = this.dataModel.getCurrentRow().getValue(this.field), vstr = v + '', focusValue = v;
        if (u.isNumber(v) && u.isNumber(this.maskerMeta.precision)) {
            if (vstr.indexOf('.') >= 0) {
                var sub = vstr.substr(vstr.indexOf('.') + 1);
                if (sub.length < this.maskerMeta.precision || parseInt(sub.substr(this.maskerMeta.precision)) == 0) {
                    focusValue = this.formater.format(v)
                }
            } else if (this.maskerMeta.precision > 0) {
                focusValue = this.formater.format(v)
            }
        }
        focusValue = parseFloat(focusValue) || '';
        this.setShowValue(focusValue)
    },
    _needClean: function () {
        return true
    }
});

u.compMgr.addDataAdapter({
        adapter: u.FloatAdapter,
        name: 'float'
    });
u.IntegerAdapter = u.BaseAdapter.extend({
    mixins:[u.ValueMixin,u.EnableMixin, u.RequiredMixin, u.ValidateMixin],
    init: function () {
        var self = this;
        this.element = this.element.nodeName === 'INPUT' ? this.element : this.element.querySelector('input');
        if (!this.element){
            throw new Error('not found INPUT element, u-meta:' + JSON.stringify(this.options));
        };
        this.validType = this.options['validType'] || 'integer';
        this.max = this.options['max'];
        this.min = this.options['min'];
        this.maxNotEq = this.options['maxNotEq'];
        this.minNotEq = this.options['minNotEq'];
        this.maxLength = this.options['maxLength'] ? options['maxLength'] : 25;
        this.minLength = this.options['mixLength'] ? options['mixLength'] : 0;
        if (this.dataModel) {
            this.min = this.dataModel.getMeta(this.field, "min") !== undefined ? this.dataModel.getMeta(this.field, "min") : this.min;
            this.max = this.dataModel.getMeta(this.field, "max") !== undefined ? this.dataModel.getMeta(this.field, "max") : this.max;
            this.minNotEq = this.dataModel.getMeta(this.field, "minNotEq") !== undefined ? this.dataModel.getMeta(this.field, "minNotEq") : this.minNotEq;
            this.maxNotEq = this.dataModel.getMeta(this.field, "maxNotEq") !== undefined ? this.dataModel.getMeta(this.field, "maxNotEq") : this.maxNotEq;
            this.minLength = u.isNumber(this.dataModel.getMeta(this.field, "minLength")) ? this.dataModel.getMeta(this.field, "minLength") : this.minLength;
            this.maxLength = u.isNumber(this.dataModel.getMeta(this.field, "maxLength")) ? this.dataModel.getMeta(this.field, "maxLength") : this.maxLength;
        }
        u.on(this.element, 'focus', function(){
            if(self.enable){
                self.setShowValue(self.getValue())
            }
        })

        u.on(this.element, 'blur',function(){
            if(self.enable){
                if (!self.doValidate() && self._needClean()) {
                    if (self.required && (self.element.value === null || self.element.value === undefined || self.element.value === '')) {
                        // 因必输项清空导致检验没通过的情况
                        self.setValue('')
                    } else {
                        self.element.value = self.getShowValue()
                    }
                }
                else
                    self.setValue(self.element.value)
            }
        });
    }
});
u.compMgr.addDataAdapter({
        adapter: u.IntegerAdapter,
        name: 'integer'
    });


+function($) {

/**
 * link控件
 */
	var LinkComp = u.BaseComponent.extend({
		initialize: function(element, options, viewModel) {
			$.InputComp.superclass.initialize.apply(this, arguments)
			this.dataModel = null
			this.hasDataTable = false
			this.enable = true
			this.parseDataModel()
			if(options['click']){
				var clickFunc  = $.getJSObject(viewModel, options['click'])
				this.on('click', clickFunc)
			}
				
			this.create()
		},
		create: function() {
			var self = this
			if (this.dataModel) {
				//处理数据绑定
				if (this.hasDataTable) {
					//this.dataModel.ref(this.field).subscribe(function(value) {
					//		self.modelValueChange(value)
					//})
					this.dataModel.on(this.field + '.' +  $.DataTable.ON_CURRENT_VALUE_CHANGE, function(event){
						self.modelValueChange(event.newValue);
					});

					//处理只读
					//this.dataModel.refEnable(this.field).subscribe(function(value){
					//	self.setEnable(value)
					//})
					this.dataModel.on(this.field + '.enable.' +  $.DataTable.ON_CURRENT_META_CHANGE, function(event){
						self.setEnable(event.newValue);
					});

					this.dataModel.on($.DataTable.ON_CURRENT_ROW_CHANGE, function(){
						var row = self.dataModel.getCurrentRow();
						if (!row){
							self.modelValueChange('');
							self.setEnable(false);
						}else{
							self.modelValueChange(row.getValue(self.field));
						}
					});


					this.setEnable(this.dataModel.isEnable(this.field))
				} else {
					this.dataModel.subscribe(function(value) {
						self.modelValueChange(value)
					});
				}
				this.modelValueChange(this.hasDataTable ? this.dataModel.getValue(this.field) : this.dataModel())
			}
			$(this.element).on('click', function(){
				if (self.enable)
					self.trigger('click', {field:self.field,dataTable:self.dataModel})
			})
		},
		/**
		 * 模型数据改变
		 * @param {Object} value
		 */
		modelValueChange: function(value) {
			this.setValue(value)
		},

		/**
		 * @private
		 */
		parseDataModel: function() {
			if (!this.options || !this.options["data"]) return
			this.dataModel = $.getJSObject(this.viewModel, this.options["data"])
			if (this.dataModel instanceof $.DataTable) {
				this.hasDataTable = true
				this.field = this.options["field"]
			}
		},
		/**
		 * 设置控件值
		 * @param {Object} value
		 */
		setValue: function(value) {
			this.value = value
			$(this.element).html(value)
		},
		/**
		 * 取控件的值
		 */
		getValue: function() {
			return this.value
		},
//		setUrl: function(url){
//			
//		},
//		getUrl: function(){
//			
//		}

		setEnable: function(enable){
			if(enable === true || enable === 'true'){
				this.enable = true
				$(this.element).css('cursor', 'pointer')	
			}	
			else if(enable === false || enable === 'false'){	
				this.enable = false			
				$(this.element).css('cursor', 'not-allowed')
			}	
		},

		Statics: {
			compName: 'link'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(LinkComp)

}($);

u.MonthAdapter = u.BaseAdapter.extend({
    initialize: function (comp, options) {
        var self = this;
        u.MonthAdapter.superclass.initialize.apply(this, arguments);
        this.validType = 'month';

        this.comp = new u.Month(this.element);


        this.comp.on('valueChange', function(event){
            self.slice = true;
            self.dataModel.setValue(self.field, event.value);
            self.slice = false;
            //self.setValue(event.value);
        });
        this.dataModel.ref(this.field).subscribe(function(value) {
            self.modelValueChange(value)
        })


    },
    modelValueChange: function (value) {
        if (this.slice) return;
        this.comp.setValue(value);
    },
    setEnable: function (enable) {
    }
});

u.compMgr.addDataAdapter(
    {
        adapter: u.MonthAdapter,
        name: 'u-month'
    });





+function($) {
	var Multilang = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			Multilang.superclass.initialize.apply(this, arguments)
			this.create()
			var multinfo =  iweb.Core.getLanguages()
			if(options.multinfo){
				multinfo = options.multinfo
			}

			var multidata = [];
			this.field = options.field;
			multinfo.lang_name =  options.field
			for(i = 0; i < multinfo.length; i++){
				if(i){
					multidata[i] =  this.dataModel.getValue(this.field + (i+1),this.dataTableRow)
				}else{
					multidata[i] =  this.dataModel.getValue(this.field,this.dataTableRow)
				}

			}


			this.multinfo = multinfo;
			this.multidata = multidata;
			$(element).multilang({"multinfo":multinfo, "multidata":multidata});

			this.$element = $(element)
			this.$element.on('change.u.multilang', function(event, valObj) {

				self.setModelValue(valObj)
			})
		},
		create: function() {
			var self = this
			if (this.dataModel) {
				//处理数据绑定
				if (this.hasDataTable) {
					//this.dataModel.ref(this.field).subscribe(function(value) {
					//		self.modelValueChange(value)
					//})
					this.dataModel.on($.DataTable.ON_CURRENT_ROW_CHANGE, function(event){
						self.modelValueChange();
					});

					//处理只读
					//this.dataModel.refEnable(this.field).subscribe(function(value){
					//	self.setEnable(value)
					//})
					this.dataModel.on(this.field + '.enable.' +  $.DataTable.ON_CURRENT_META_CHANGE, function(event){
						self.setEnable(event.newValue);
					});
					this.setEnable(this.dataModel.isEnable(this.field))
				} else {
					this.dataModel.subscribe(function(value) {
						self.modelValueChange(value)
					})
				}
				this.modelValueChange(this.hasDataTable ? this.dataModel.getValue(this.field) : this.dataModel())
//				this.modelValuelangChange(this.hasDataTable ? this.dataModel.getValue(this.fieldlang) : this.dataModel())
			}

		},
		parseDataModel: function() {
			if (!this.options || !this.options["data"]) return
			this.dataModel = $.getJSObject(this.viewModel, this.options["data"])
			if (this.dataModel instanceof $.DataTable) {
				this.hasDataTable = true
				this.field = this.options["field"]
				//			this.fieldlang = this.options["fieldlang"]
			}
		},
		//往模型上设置值
		setModelValue: function(valObj) {
			if (!this.dataModel) return
			if (this.hasDataTable) {

				this.dataModel.setValue(valObj.field, valObj.newValue)
				//			this.dataModel.setValue(this.fieldlang, valObj.lang)
			} else {
				this.dataModel(valObj.newValue)
			}
		},
		modelValueChange: function(value) {

			var self = this
			if(this.multidata){

				for(i = 0; i < self.multinfo.length; i++){
					if(i){
						self.multidata[i] = self.dataModel.getValue(self.field + (i+1),self.dataTableRow)
					}else{
						self.multidata[i] = self.dataModel.getValue(self.field,self.dataTableRow)
					}
				}
				this.$element.multilang({"multidata":self.multidata});

			}



			//this.dataModel.getValue(this.field,this.dataTableRow)
			//$(this.element).siblings('.multilang_body').children('input').val(value)

		},
		modelValuelangChange: function(value) {

		},
		Statics: {
			compName: 'multilang'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(Multilang)
}($);
u.NativeCheckAdapter = u.BaseAdapter.extend({
    mixins: [u.ValueMixin, u.EnableMixin],
    init: function () {
        var self = this;
        this.isGroup = false;
        //如果存在datasource，动态创建checkbox
        if (this.options['datasource']) {
            this.isGroup = true;
            var datasource = u.getJSObject(this.viewModel, this.options['datasource']);
            //if(!u.isArray(datasource)) return;

            this.checkboxTemplateArray = [];
            for (var i= 0, count = this.element.childNodes.length; i< count; i++){
                this.checkboxTemplateArray.push(this.element.childNodes[i]);
            }
            this.setComboData(datasource);
        } else {
            this.checkedValue =  this.options['checkedValue'] || 'Y';
            this.unCheckedValue =  this.options["unCheckedValue"] || 'N';
            u.on(this.element, 'click', function () {
                if (this.checked) {
                    self.dataModel.setValue(self.field, self.checkedValue);
                }else{
                    self.dataModel.setValue(self.field, self.unCheckedValue)
                }
            });
        }
    },
    setComboData: function (comboData) {
        var self = this;
        this.element.innerHTML = '';
        for (var i = 0, len = comboData.length; i < len; i++) {
            for(var j=0; j<this.checkboxTemplateArray.length; j++){
                this.element.appendChild(this.checkboxTemplateArray[j].cloneNode(true));
            }
            //this.radioTemplate.clone().appendTo(this.element)
        }

        var allCheck = this.element.querySelectorAll('[type=checkbox]');
        var allName = this.element.querySelectorAll('[data-role=name]');
        for (var k = 0; k < allCheck.length; k++) {
            allCheck[k].value = comboData[k].pk || comboData[k].value;
            allName[k].innerHTML = comboData[k].name
        }

        this.element.querySelectorAll('[type=checkbox]').forEach(function (ele) {
            u.on(ele, 'click', function () {
                var modelValue = self.dataModel.getValue(self.field);

                var valueArr = modelValue == '' ? [] : modelValue.split(',');

                if (this.checked) {
                    valueArr.push(this.value)
                } else {
                    var index = valueArr.indexOf(this.value);
                    valueArr.splice(index, 1);
                }
                self.slice = true;
                self.dataModel.setValue(self.field, valueArr.join(','));
                self.slice = false;

            })
        })
    },
    modelValueChange: function (val) {
        if (this.slice) return;
        if (this.isGroup){
            this.element.querySelectorAll('[type=checkbox]').forEach(function (ele) {
                if (ele.checked != (val + ',').indexOf(ele.value) > -1){
                    this.slice = true;
                    ele.checked = !ele.checked;
                    this.slice = false;
                }
            })
        }else{
            if (this.element.checked != (val === this.checkedValue)){
                this.slice = true;
                this.element.checked = !this.element.checked;
                this.slice = false;
            }
        }
    },
    setValue: function (value) {
        this.trueValue = value;
        this.element.querySelectorAll('[type=checkbox]').forEach(function (ele) {
            if (ele.value == value) {
                ele.checked = true;
            } else {
                ele.checked = false;
            }
        })
        this.slice = true;
        this.dataModel.setValue(this.field, this.trueValue);
        this.slice = false;
    },
    getValue: function () {
        return this.trueValue;
    },


});

u.compMgr.addDataAdapter({
    adapter: u.NativeCheckAdapter,
    name: 'checkbox'
});

u.NativeRadioAdapter = u.BaseAdapter.extend({
    mixins: [u.ValueMixin, u.EnableMixin],
    init: function () {
        this.isDynamic = false;
        //如果存在datasource，动态创建radio
        if (this.options['datasource']) {
            this.isDynamic = true;
            var datasource = u.getJSObject(this.viewModel, this.options['datasource']);
            //if(!u.isArray(datasource)) return;

            this.radioTemplateArray = [];
            for (var i= 0, count = this.element.childNodes.length; i< count; i++){
                this.radioTemplateArray.push(this.element.childNodes[i]);
            }
            this.setComboData(datasource);
        } else {
        }
    },
    setComboData: function (comboData) {
        var self = this;
        //if(!this.radioTemplate.is(":radio")) return;
        this.element.innerHTML = '';
        for (var i = 0, len = comboData.length; i < len; i++) {
            for(var j=0; j<this.radioTemplateArray.length; j++){
                this.element.appendChild(this.radioTemplateArray[j].cloneNode(true));
            }
            //this.radioTemplate.clone().appendTo(this.element)
        }

        var allRadio = this.element.querySelectorAll('[type=radio]');
        var allName = this.element.querySelectorAll('[data-role=name]');
        for (var k = 0; k < allRadio.length; k++) {
            allRadio[k].value = comboData[k].pk || comboData[k].value;
            allName[k].innerHTML = comboData[k].name
        }

        this.radioInputName = allRadio[0].name;

        this.element.querySelectorAll('[type=radio][name="'+ this.radioInputName +'"]').forEach(function (ele) {
            u.on(ele, 'click', function () {
                if (this.checked) {
                    self.setValue(this.value);
                }

            })
        })
    },
    modelValueChange: function (value) {
        if (this.slice) return;
        this.setValue(value)
    },
    setValue: function (value) {
        this.trueValue = value;
        this.element.querySelectorAll('[type=radio][name="'+ this.radioInputName +'"]').forEach(function (ele) {
            if (ele.value == value) {
                ele.checked = true;
            } else {
                ele.checked = false;
            }
        })
        this.slice = true;
        this.dataModel.setValue(this.field, this.trueValue);
        this.slice = false;
    },
    getValue: function () {
        return this.trueValue;
    },


});

u.compMgr.addDataAdapter({
    adapter: u.NativeRadioAdapter,
    name: 'radio'
});

u.PaginationAdapter = u.BaseAdapter.extend({
        initialize: function (comp, options) {
            var self = this;
            u.PaginationAdapter.superclass.initialize.apply(this, arguments);

            //var Pagination = function(element, options, viewModel) {

            if (!this.dataModel.pageSize() && this.options.pageSize)
                this.dataModel.pageSize(this.options.pageSize)
            this.options.pageSize = this.dataModel.pageSize() || this.options.pageSize;
            //this.$element.pagination(options);
            //this.comp = this.$element.data('u.pagination');
            this.comp = new u.pagination({el:this.element,jumppage:true});
			this.element['u.pagination'] = this.comp;
            this.comp.dataModel = this.dataModel;
            this.pageChange = u.getFunction(this.viewModel, this.options['pageChange']);
            this.sizeChange = u.getFunction(this.viewModel, this.options['sizeChange']);

            this.comp.on('pageChange', function (pageIndex) {
                if (typeof self.pageChange == 'function') {
                    self.pageChange(pageIndex);
                } else {
                    self.defaultPageChange(pageIndex);
                }

            });
            this.comp.on('sizeChange', function (size, pageIndex) {
                if (typeof self.sizeChange == 'function') {
                    self.sizeChange(size, pageIndex);
                } else {
                    u.showMessage({msg:"没有注册sizeChange事件"});
                }
            });


            this.dataModel.totalPages.subscribe(function (value) {
                self.comp.update({totalPages: value})
            })

            this.dataModel.pageSize.subscribe(function (value) {
                self.comp.update({pageSize: value})
            })

            this.dataModel.pageIndex.subscribe(function (value) {
                self.comp.update({currentPage: value + 1})
            })

            this.dataModel.totalRow.subscribe(function (value) {
                self.comp.update({totalCount: value})
            })

        },

        defaultPageChange: function (pageIndex) {
        if (this.dataModel.hasPage(pageIndex)) {
            this.dataModel.setCurrentPage(pageIndex)
        } else {
        }
    },

    disableChangeSize: function () {
        this.comp.disableChangeSize();
    },

    enableChangeSize: function () {
        this.comp.enableChangeSize();
    }
});

u.compMgr.addDataAdapter(
    {
        adapter: u.PaginationAdapter,
        name: 'pagination'
    });





/**
 * 密码控件
 */
u.PassWordAdapter = u.StringAdapter.extend({
    init: function () {
        u.PassWordAdapter.superclass.init.apply(this);
        var oThis = this;
        this.element.type = "password";
        oThis.element.title = '';
        this._element = this.element.parentNode;
        this.span = this._element.querySelector("span");
        if(this.span){
            u.on(this.span,'click',function(){
                if(oThis.element.type == 'password'){
                    oThis.element.type = 'text';
                }else{
                    oThis.element.type = 'password';
                }
            });
        }
        
    },
    setShowValue: function (showValue) {
        this.showValue = showValue;
        this.element.value = showValue;
        this.element.title = '';
    },
});
u.compMgr.addDataAdapter(
    {
        adapter: u.PassWordAdapter,
        name: 'password'
    });



/**
 * 百分比控件
 */
u.PercentAdapter = u.FloatAdapter.extend({
    init: function () {
        u.PercentAdapter.superclass.init.apply(this);
        this.validType = 'float';
        this.maskerMeta = iweb.Core.getMaskerMeta('percent') || {};
        this.maskerMeta.precision = this.getOption('precision') || this.maskerMeta.precision;
        if (this.maskerMeta.precision){
            this.maskerMeta.precision = parseInt(this.maskerMeta.precision) + 2;
        }
        this.formater = new u.NumberFormater(this.maskerMeta.precision);
        this.masker = new PercentMasker(this.maskerMeta);
    }
});
u.compMgr.addDataAdapter(
    {
        adapter: u.PercentAdapter,
        name: 'percent'
    });



u.ProgressAdapter = u.BaseAdapter.extend({
    initialize: function (options) {
        var self = this;
        u.ProgressAdapter.superclass.initialize.apply(this, arguments);

        this.comp = new u.Progress(this.element);
        this.element['u.Progress'] = this.comp;

        this.dataModel.ref(this.field).subscribe(function(value) {
        	self.modelValueChange(value)
        })
    },

    modelValueChange: function (val) {
        this.comp.setProgress(val)
    }
})


u.compMgr.addDataAdapter(
    {
        adapter: u.ProgressAdapter,
        name: 'u-progress'
    });

u.RadioAdapter = u.BaseAdapter.extend({
    mixins: [u.ValueMixin, u.EnableMixin,u.RequiredMixin, u.ValidateMixin],
    init: function (options) {
        var self = this;
        //u.RadioAdapter.superclass.initialize.apply(this, arguments);
        this.dynamic = false;
        if (this.options['datasource']) {
            this.dynamic = true;
            var datasource = u.getJSObject(this.viewModel, this.options['datasource']);

            this.radioTemplateArray = [];
            for (var i= 0, count = this.element.childNodes.length; i< count; i++){
                this.radioTemplateArray.push(this.element.childNodes[i]);
            }
            this.setComboData(datasource);
        } else {
            this.comp = new u.Radio(this.element);
            this.element['u.Radio'] = this.comp;
            this.eleValue = this.comp._btnElement.value;

            this.comp.on('change', function(event){
                if (self.slice) return;
                var modelValue = self.dataModel.getValue(self.field);
                //var valueArr = modelValue == '' ?  [] : modelValue.split(',');
                if (self.comp._btnElement.checked){
                    self.dataModel.setValue(self.field, self.eleValue);
                }
            });
        }

        this.dataModel.ref(this.field).subscribe(function(value) {
            self.modelValueChange(value)
        })


    },
    setComboData: function (comboData) {
        var self = this;
        this.element.innerHTML = '';
        for (var i = 0, len = comboData.length; i < len; i++) {
            for(var j=0; j<this.radioTemplateArray.length; j++){
                this.element.appendChild(this.radioTemplateArray[j].cloneNode(true));
            }
            //this.radioTemplate.clone().appendTo(this.element)
        }

        var allRadio = this.element.querySelectorAll('[type=radio]');
        var allName = this.element.querySelectorAll('.u-radio-label');
        for (var k = 0; k < allRadio.length; k++) {
            allRadio[k].value = comboData[k].pk || comboData[k].value;
            allName[k].innerHTML = comboData[k].name
        }

        this.radioInputName = allRadio[0].name;

        this.element.querySelectorAll('.u-radio').forEach(function (ele) {
            var comp = new u.Radio(ele);
            ele['u.Radio'] = comp;

            comp.on('change', function(event){
                if (comp._btnElement.checked){
                    self.dataModel.setValue(self.field, comp._btnElement.value);
                }
            });
        })
    },

    modelValueChange: function (value) {
        if (this.slice) return;
        if (this.dynamic){
            this.trueValue = value;
            this.element.querySelectorAll('.u-radio').forEach(function (ele) {
                var comp =  ele['u.Radio'];
                if (comp._btnElement.value == value) {
                    comp._btnElement.click();
                }
            })
        }else{
            if (this.eleValue == value){
                this.slice = true
                this.comp._btnElement.click();
                this.slice = false
            }
        }
    },

    setEnable: function (enable) {
        this.enable = (enable === true || enable === 'true');
        if (this.dynamic){
            this.element.querySelectorAll('.u-radio').forEach(function (ele) {
                var comp =  ele['u.Radio'];
                if (enable === true || enable === 'true'){
                    comp.enable();
                }else{
                    comp.disable();
                }
            })
        }else{
            if (this.enable){
                this.comp.enable();
            }else{
                this.comp.disable();
            }
        }
    }
})


u.compMgr.addDataAdapter(
    {
        adapter: u.RadioAdapter,
        name: 'u-radio'
    });

u.StringAdapter = u.BaseAdapter.extend({
    mixins:[u.ValueMixin,u.EnableMixin, u.RequiredMixin, u.ValidateMixin],
    init: function(){
        var self = this;
        this.element = this.element.nodeName === 'INPUT' ? this.element : this.element.querySelector('input');
        if (!this.element){
            throw new Error('not found INPUT element, u-meta:' + JSON.stringify(this.options));
        };
        this.validType = this.options['validType'] || 'string';
        this.minLength = this.getOption('minLength');
        this.maxLength = this.getOption('maxLength');

        u.on(this.element, 'focus', function(){
            if(self.enable){
                self.setShowValue(self.getValue())
            }
        })

        u.on(this.element, 'blur',function(e){
            if(self.enable){
                if (!self.doValidate() && self._needClean()) {
                    if (self.required && (self.element.value === null || self.element.value === undefined || self.element.value === '')) {
                        // 因必输项清空导致检验没通过的情况
                        self.setValue('')
                    } else {
                        self.element.value = self.getShowValue()
                    }
                }
                else
                    self.setValue(self.element.value)
            }
        });
    }
});
u.compMgr.addDataAdapter({
        adapter: u.StringAdapter,
        name: 'string'
    });

	

u.SwitchAdapter = u.BaseAdapter.extend({
    initialize: function (options) {
        var self = this;
        u.SwitchAdapter.superclass.initialize.apply(this, arguments);

        this.comp = new u.Switch(this.element);
        this.element['u.Switch'] = this.comp;
        this.checkedValue =  this.options['checkedValue'] || this.comp._inputElement.value;
        this.unCheckedValue =  this.options["unCheckedValue"];
        this.comp.on('change', function(event){
            if (self.slice) return;
            if (self.comp._inputElement.checked) {
                self.dataModel.setValue(self.field, self.checkedValue);
            }else{
                self.dataModel.setValue(self.field, self.unCheckedValue)
            }
        });

        this.dataModel.ref(this.field).subscribe(function(value) {
        	self.modelValueChange(value)
        })


    },

    modelValueChange: function (val) {
        if (this.slice) return;
        if (this.comp._inputElement.checked != (val === this.checkedValue)){
            this.slice = true;
            this.comp.toggle();
            this.slice = false;
        }

    },
    setEnable: function (enable) {
        if (enable === true || enable === 'true') {
            this.enable = true
        } else if (enable === false || enable === 'false') {
            this.enable = false
        }
    }
})


u.compMgr.addDataAdapter(
    {
        adapter: u.SwitchAdapter,
        name: 'u-switch'
    });

u.TextAreaAdapter = u.BaseAdapter.extend({
    mixins:[u.ValueMixin,u.EnableMixin, u.RequiredMixin, u.ValidateMixin],
    init: function () {
        var self = this;
        this.element = this.element.nodeName === 'TEXTAREA' ? this.element : this.element.querySelector('textarea');
        if (!this.element){
            throw new Error('not found TEXTAREA element, u-meta:' + JSON.stringify(this.options));
        };

        u.on(this.element, 'focus', function () {
            self.setShowValue(self.getValue())
        });
        u.on(this.element, 'blur', function () {
            self.setValue(self.element.value)
        })
    }
});

u.compMgr.addDataAdapter({
        adapter: u.TextAreaAdapter,
        name: 'textarea'
    })

/**
 * Created by dingrf on 2016/1/25.
 */

u.TextFieldAdapter = u.BaseAdapter.extend({
    /**
     *
     * @param comp
     * @param options ：
     *      el: '#content',  对应的dom元素
     *      options: {},     配置
     *      model:{}        模型，包括数据和事件
     */
    initialize: function (options) {
        u.TextFieldAdapter.superclass.initialize.apply(this, arguments);
        //this.comp = comp;
        //this.element = options['el'];
        //this.options = options['options'];
        //this.viewModel = options['model'];
        var dataType = this.dataModel.getMeta(this.field,'type') || 'string';
        //var dataType = this.options['dataType'] || 'string';

        this.comp = new u.Text(this.element);
        this.element['u.Text'] = this.comp;


        if (dataType === 'float'){
            this.trueAdpt = new u.FloatAdapter(options);
        }
        else if (dataType === 'string'){
            this.trueAdpt = new u.StringAdapter(options);
        }
        else if (dataType === 'integer'){
            this.trueAdpt = new u.IntegerAdapter(options);
        }else{
            throw new Error("'u-text' only support 'float' or 'string' or 'integer' field type, not support type: '" + dataType + "', field: '" +this.field+ "'");
        }
        u.extend(this, this.trueAdpt);


        this.trueAdpt.comp = this.comp;
        this.trueAdpt.setShowValue = function (showValue) {
            this.showValue = showValue;
            //if (this.comp.compType === 'text')
            this.comp.change(showValue);
            this.element.title = showValue;
        }
        return this.trueAdpt;
    }
});

u.compMgr.addDataAdapter(
    {
        adapter: u.TextFieldAdapter,
        name: 'u-text'
        //dataType: 'float'
    })
u.TimeAdapter = u.BaseAdapter.extend({
    initialize: function (options) {
        var self = this;
        u.TimeAdapter.superclass.initialize.apply(this, arguments);
        this.validType = 'time';

        this.maskerMeta = u.core.getMaskerMeta('time') || {};
        this.maskerMeta.format = this.dataModel.getMeta(this.field, "format") || this.maskerMeta.format

        if (this.options.type == 'u-clockpicker' && !u.isIE8)
            this.comp = new u.ClockPicker(this.element);
        else
            this.comp = new u.Time(this.element);
        var dataType = this.dataModel.getMeta(this.field,'type');
        this.dataType =  dataType || 'string';


        this.comp.on('valueChange', function(event){
            self.slice = true;
            if(event.value == ''){
                self.dataModel.setValue(self.field,'')
            }else{
                var _date = self.dataModel.getValue(self.field);
                if (self.dataType === 'datetime') {
                    var valueArr = event.value.split(':');
                    _date = u.date.getDateObj(_date);
                    if (!_date){
                        self.dataModel.setValue(self.field,'');
                    }else {
                        if (event.value == _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds())
                            return;
                        _date.setHours(valueArr[0]);
                        _date.setMinutes(valueArr[1]);
                        _date.setSeconds(valueArr[2]);
                        self.dataModel.setValue(self.field, u.date.format(_date, 'YYYY-MM-DD HH:mm:ss'));
                    }
                }
                else{
                    if (event.value == _date)
                        return;
                    self.dataModel.setValue(self.field, event.value);
                }
            }
            
            self.slice = false;
            //self.setValue(event.value);
        });
        this.dataModel.ref(this.field).subscribe(function(value) {
            self.modelValueChange(value)
        })


    },
    modelValueChange: function (value) {
        if (this.slice) return;
        var compValue = '';
        if (this.dataType === 'datetime') {
            var _date = u.date.getDateObj(value);
            if (!_date)
                compValue = ''
            else
                compValue = _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds();
        }
        else{
            compValue = value;
        }
        this.comp.setValue(compValue);
    },
    setEnable: function (enable) {
    }
});

u.compMgr.addDataAdapter(
    {
        adapter: u.TimeAdapter,
        name: 'u-time'
    });

u.compMgr.addDataAdapter(
    {
        adapter: u.TimeAdapter,
        name: 'u-clockpicker'
    });




/**
 * URL控件
 */
u.UrlAdapter = u.StringAdapter.extend({
    init: function () {
        u.UrlAdapter.superclass.init.apply(this);
        this.validType = 'url';
        /*
         * 因为需要输入，因此不显示为超链接
         */
    }
});
u.compMgr.addDataAdapter(
    {
        adapter: u.UrlAdapter,
        name: 'url'
    });



u.YearAdapter = u.BaseAdapter.extend({
    initialize: function (comp, options) {
        var self = this;
        u.YearAdapter.superclass.initialize.apply(this, arguments);
        this.validType = 'year';

        this.comp = new u.Year(this.element);


        this.comp.on('valueChange', function(event){
            self.slice = true;
            self.dataModel.setValue(self.field, event.value);
            self.slice = false;
            //self.setValue(event.value);
        });
        this.dataModel.ref(this.field).subscribe(function(value) {
            self.modelValueChange(value)
        })


    },
    modelValueChange: function (value) {
        if (this.slice) return;
        this.comp.setValue(value);
    },
    setEnable: function (enable) {
    }
});

u.compMgr.addDataAdapter(
    {
        adapter: u.YearAdapter,
        name: 'u-year'
    });





u.YearMonthAdapter = u.BaseAdapter.extend({
    initialize: function (comp, options) {
        var self = this;
        u.YearMonthAdapter.superclass.initialize.apply(this, arguments);
        this.validType = 'yearmonth';

        this.comp = new u.YearMonth(this.element);


        this.comp.on('valueChange', function(event){
            self.slice = true;
            self.dataModel.setValue(self.field, event.value);
            self.slice = false;
            //self.setValue(event.value);
        });
        this.dataModel.ref(this.field).subscribe(function(value) {
            self.modelValueChange(value)
        })


    },
    modelValueChange: function (value) {
        if (this.slice) return;
        this.comp.setValue(value);
    },
    setEnable: function (enable) {
    }
});

u.compMgr.addDataAdapter(
    {
        adapter: u.YearMonthAdapter,
        name: 'u-yearmonth'
    });




