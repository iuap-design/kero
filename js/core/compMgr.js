

function _findRegisteredClass(name, optReplace) {
    for (var i = 0; i < CompMgr.registeredControls.length; i++) {
        if (CompMgr.registeredControls[i].className === name) {
            if (typeof optReplace !== 'undefined') {
                CompMgr.registeredControls[i] = optReplace;
            }
            return CompMgr.registeredControls[i];
        }
    }
    return false;
}

function _getUpgradedListOfElement(element) {
    var dataUpgraded = element.getAttribute('data-upgraded');
    // Use `['']` as default value to conform the `,name,name...` style.
    return dataUpgraded === null ? [''] : dataUpgraded.split(',');
}

function _isElementUpgraded(element, jsClass) {
    var upgradedList = _getUpgradedListOfElement(element);
    return upgradedList.indexOf(jsClass) != -1;
}

function _upgradeElement(element, optJsClass) {
    if (!(typeof element === 'object' && element instanceof Element)) {
        throw new Error('Invalid argument provided to upgrade MDL element.');
    }
    var upgradedList = _getUpgradedListOfElement(element);
    var classesToUpgrade = [];
    if (!optJsClass) {
        var className = element.className;
        for(var i=0; i< CompMgr.registeredControls.length; i++){
            var component = CompMgr.registeredControls[i]
            if (className.indexOf(component.cssClass) > -1 && classesToUpgrade.indexOf(component) === -1 &&
                !_isElementUpgraded(element, component.className)) {
                classesToUpgrade.push(component);
            }
        }
    } else if (!_isElementUpgraded(element, optJsClass)) {
        classesToUpgrade.push(_findRegisteredClass(optJsClass));
    }

    // Upgrade the element for each classes.
    for (var i = 0, n = classesToUpgrade.length, registeredClass; i < n; i++) {
        registeredClass = classesToUpgrade[i];
        if (registeredClass) {
            if (element[registeredClass.className]){
                continue;
            }
            // Mark element as upgraded.
            upgradedList.push(registeredClass.className);
            element.setAttribute('data-upgraded', upgradedList.join(','));
            var instance = new registeredClass.classConstructor(element);
            CompMgr.createdControls.push(instance);
            // Call any callbacks the user has registered with this component type.
            for (var j = 0, m = registeredClass.callbacks.length; j < m; j++) {
                registeredClass.callbacks[j](element);
            }
            element[registeredClass.className] = instance;
        } else {
            throw new Error('Unable to find a registered component for the given class.');
        }

    }
}

function _upgradeDomInternal(optJsClass, optCssClass, ele) {
    if (typeof optJsClass === 'undefined' && typeof optCssClass === 'undefined') {
        for (var i = 0; i < CompMgr.registeredControls.length; i++) {
            _upgradeDomInternal(CompMgr.registeredControls[i].className, registeredControls[i].cssClass, ele);
        }
    } else {
        var jsClass = (optJsClass);
        if (!optCssClass) {
            var registeredClass = _findRegisteredClass(jsClass);
            if (registeredClass) {
                optCssClass = registeredClass.cssClass;
            }
        }
        var elements;
        if(ele) {
            elements = u.hasClass(ele, optCssClass) ? [ele] : ele.querySelectorAll('.' + optCssClass);
        } else {
           elements = document.querySelectorAll('.' + optCssClass);
        }
        for (var n = 0; n < elements.length; n++) {
            _upgradeElement(elements[n], jsClass);
        }
    }
}

var CompMgr = {
    plugs: {},
    dataAdapters:{},
    /** 注册的控件*/
    registeredControls: [],
    createdControls: [],
    /**
     *
     * @param options  {el:'#content', model:{}}
     */
    apply: function (options) {
		if(options){
        var _el = options.el||document.body;
        var model = options.model;
		}
        if (typeof _el == 'string'){
            _el = document.body.querySelector(_el);
        }
        if (_el == null || typeof _el != 'object')
            _el = document.body;
        var comps =_el.querySelectorAll('[u-meta]');
        comps.forEach(function(element){
            if (element['comp']) return;
            var options = JSON.parse(element.getAttribute('u-meta'));
            if (options && options['type']) {
                //var comp = CompMgr._createComp({el:element,options:options,model:model});
                var comp = CompMgr.createDataAdapter({el:element,options:options,model:model});
                if (comp){
                    element['adpt'] = comp;
                    element['u-meta'] = comp;
                }
            }
        });
    },
    addPlug: function (config) {
        var plug = config['plug'],
            name = config['name'];
        this.plugs || (this.plugs = {});
        if (this.plugs[name]) {
            throw new Error('plug has exist:' + name);
        }
        plug.compType = name;
        this.plugs[name] = plug
    },
    addDataAdapter: function(config){
        var adapter = config['adapter'],
            name = config['name'];
            //dataType = config['dataType'] || ''
        //var key = dataType ? name + '.' + dataType : name;
        this.dataAdapters || (dataAdapters = {});
        if(this.dataAdapters[name]){
            throw new Error('dataAdapter has exist:' + name);
        }
        this.dataAdapters[name] = adapter;

    },
    getDataAdapter: function(name){
        if (!name) return;
        this.dataAdapters || (dataAdapters = {});
        //var key = dataType ? name + '.' + dataType : name;
        return this.dataAdapters[name];
    },
    createDataAdapter: function(options){
        var opt = options['options'];
        var type = opt['type'],
            id = opt['id'];
        var adpt = this.dataAdapters[type];
        if (!adpt) return null;
        var comp = new adpt(options);
        comp.type = type;
        comp.id = id;
        return comp;
    },
    _createComp: function (options) {
        var opt = options['options'];
        var type = opt['type'];
        var plug = this.plugs[type];
        if (!plug) return null;
        var comp = new plug(options);
        comp.type = type;
        return comp;
    },
    /**
     * 注册UI控件
     */
    regComp: function(config){
        var newConfig = {
            classConstructor: config.comp,
            className: config.compAsString || config['compAsString'],
            cssClass: config.css || config['css'],
            callbacks: []
        };
        config.comp.prototype.compType = config.compAsString;
        for(var i=0; i< this.registeredControls.length; i++){
            var item = this.registeredControls[i];
            //registeredControls.forEach(function(item) {
            if (item.cssClass === newConfig.cssClass) {
                throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
            }
            if (item.className === newConfig.className) {
                throw new Error('The provided className has already been registered');
            }
        };
        this.registeredControls.push(newConfig);
    },
    updateComp: function(ele){
        for (var n = 0; n < this.registeredControls.length; n++) {
            _upgradeDomInternal(this.registeredControls[n].className,null ,ele);
        }
    }
};

u.compMgr = CompMgr;

///**
// * 加载控件
// */
//
//if (document.readyState && document.readyState === 'complete'){
//    u.compMgr.updateComp();
//}else{
//    u.on(window, 'load', function() {
//
//        //扫描并生成控件
//        u.compMgr.updateComp();
//    });
//}
