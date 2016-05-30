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
