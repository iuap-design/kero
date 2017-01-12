/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DataTable = exports.u = undefined;

	var _indexApp = __webpack_require__(1);

	var _indexServerEvent = __webpack_require__(23);

	var _indexDataTable = __webpack_require__(28);

	var _indexPage = __webpack_require__(54);

	var _indexRow = __webpack_require__(60);

	window.App = _indexApp.App; /**
	                             * Module : Kero webpack entry index
	                             * Author : liuyk(liuyuekai@yonyou.com)
	                             * Date	  : 2016-08-08 15:24:46
	                             */

	window.processXHRError = _indexApp.processXHRError;

	window.ServerEvent = _indexServerEvent.ServerEvent;

	window.DataTable = _indexDataTable.DataTable;

	window.Page = _indexPage.Page;

	window.Row = _indexRow.Row;

	window.u = window.u || {};
	exports.u = u = window.u;
	u.createApp = _indexApp.createApp;
	u.DataTable = _indexDataTable.DataTable;
	u.Row = _indexRow.Row;

	exports.u = u;
	exports.DataTable = _indexDataTable.DataTable;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createApp = exports.processXHRError = exports.App = undefined;

	var _init = __webpack_require__(2);

	var _adjustMetaFunc = __webpack_require__(12);

	var _dataTable = __webpack_require__(13);

	var _comp = __webpack_require__(14);

	var _validate = __webpack_require__(15);

	var _cache = __webpack_require__(16);

	var _iwebCore = __webpack_require__(17);

	var _ajax = __webpack_require__(18);

	var _processXHRError = __webpack_require__(20);

	var _serverEvent = __webpack_require__(21);

	var _util = __webpack_require__(22);

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
	  this.dataTables = {};
	};

	// adjustMetaFunc


	App.prototype.adjustMetaFunc = _adjustMetaFunc.adjustMetaFunc;
	// dataTable
	App.prototype.addDataTable = _dataTable.addDataTable;
	App.prototype.getDataTable = _dataTable.getDataTable;
	App.prototype.getDataTables = _dataTable.getDataTables;
	// comp
	App.prototype.createComp = _comp.createComp;
	App.prototype.getComp = _comp.getComp;
	App.prototype.getCompsByDataTable = _comp.getCompsByDataTable;
	App.prototype.getCompsByType = _comp.getCompsByType;
	App.prototype.getComps = _comp.getComps;
	App.prototype.showComp = _comp.showComp;
	// validate
	App.prototype.compsValidate = _validate.compsValidate;
	App.prototype.compsValidateMultiParam = _validate.compsValidateMultiParam;
	// cache
	App.prototype.setUserCache = _cache.setUserCache;
	App.prototype.getUserCache = _cache.getUserCache;
	App.prototype.removeUserCache = _cache.removeUserCache;
	App.prototype.setCache = _cache.setCache;
	App.prototype.getCache = _cache.getCache;
	App.prototype.removeCache = _cache.removeCache;
	App.prototype.setSessionCache = _cache.setSessionCache;
	App.prototype.getSessionCache = _cache.getSessionCache;
	App.prototype.removeSessionCache = _cache.removeSessionCache;
	// iwebCode
	App.prototype.getEnvironment = _iwebCore.getEnvironment;
	App.prototype.setClientAttribute = _iwebCore.setClientAttribute;
	App.prototype.getClientAttribute = _iwebCore.getClientAttribute;
	// ajax
	App.prototype.ajax = _ajax.ajax;
	// serverEvent
	App.prototype.serverEvent = _serverEvent.serverEvent;
	// util
	App.prototype.setEnable = _util.setEnable;

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = undefined;

	var _compMgr = __webpack_require__(3);

	var _util = __webpack_require__(9);

	var _hotKeys = __webpack_require__(10);

	var init = function init(viewModel, element, doApplyBindings) {
	    var self = this;
	    element = element || document.body;
	    if (!(0, _util.isArray)(element)) {
	        element = [element];
	    }
	    this.elements = element;
	    (0, _util.each)(this.elements, function (i, element) {
	        if (typeof element === 'string') {
	            element = document.querySelector(element);
	        }
	        if (element) {
	            element.querySelectorAll('[u-meta]').forEach(function (ele) {
	                var options = JSON.parse(ele.getAttribute('u-meta'));
	                options['type'] = options['type'] || 'string';
	                if (options && options['type']) {
	                    if (self.adjustFunc) self.adjustFunc.call(self, options);
	                    var comp = _compMgr.compMgr.createDataAdapter({ el: ele, options: options, model: viewModel, app: self });
	                    ele['u-meta'] = comp;
	                }
	            });
	        }

	        if (_hotKeys.hotkeys) _hotKeys.hotkeys.scan(element);
	        if (typeof doApplyBindings == 'undefined' || doApplyBindings == true) ko.applyBindings(viewModel, element);
	        _compMgr.compMgr.updateComp(element);
	    });

	    _getDataTables(this, viewModel);
	}; /**
	    * Module : kero app init
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-07-29 09:34:01
	    */


	var _getDataTables = function _getDataTables(app, viewModel) {
	    for (var key in viewModel) {
	        if (viewModel[key] && viewModel[key] instanceof u.DataTable) {
	            viewModel[key].id = key;
	            viewModel[key].parent = viewModel;
	            app.addDataTable(viewModel[key]);
	        }
	    }
	};

	exports.init = init;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.compMgr = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : Sparrow compMgr
	                                                                                                                                                                                                                                                                               * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-07-28 18:41:06
	                                                                                                                                                                                                                                                                               * Update : 2016-09-13 09:26:00
	                                                                                                                                                                                                                                                                               */

	var _dom = __webpack_require__(4);

	var _util = __webpack_require__(9);

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
	    if (!((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element instanceof Element)) {
	        throw new Error('Invalid argument provided to upgrade MDL element.');
	    }
	    var upgradedList = _getUpgradedListOfElement(element);
	    var classesToUpgrade = [];
	    if (!optJsClass) {
	        var className = element.className;
	        for (var i = 0; i < CompMgr.registeredControls.length; i++) {
	            var component = CompMgr.registeredControls[i];
	            if (className.indexOf(component.cssClass) > -1 && classesToUpgrade.indexOf(component) === -1 && !_isElementUpgraded(element, component.className)) {
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
	            if (element[registeredClass.className]) {
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
	        var jsClass = optJsClass;
	        if (!optCssClass) {
	            var registeredClass = _findRegisteredClass(jsClass);
	            if (registeredClass) {
	                optCssClass = registeredClass.cssClass;
	            }
	        }
	        var elements;
	        if (ele) {
	            elements = (0, _dom.hasClass)(ele, optCssClass) ? [ele] : ele.querySelectorAll('.' + optCssClass);
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
	    dataAdapters: {},
	    /** 注册的控件*/
	    registeredControls: [],
	    createdControls: [],
	    /**
	     *
	     * @param options  {el:'#content', model:{}}
	     */
	    apply: function apply(options) {
	        if (options) {
	            var _el = options.el || document.body;
	            var model = options.model;
	        }
	        if (typeof _el == 'string') {
	            _el = document.body.querySelector(_el);
	        }
	        if (_el == null || (typeof _el === 'undefined' ? 'undefined' : _typeof(_el)) != 'object') _el = document.body;
	        var comps = _el.querySelectorAll('[u-meta]');
	        comps.forEach(function (element) {
	            if (element['comp']) return;
	            var options = JSON.parse(element.getAttribute('u-meta'));
	            if (options && options['type']) {
	                //var comp = CompMgr._createComp({el:element,options:options,model:model});
	                var comp = CompMgr.createDataAdapter({
	                    el: element,
	                    options: options,
	                    model: model
	                });
	                if (comp) {
	                    element['adpt'] = comp;
	                    element['u-meta'] = comp;
	                }
	            }
	        });
	    },
	    addPlug: function addPlug(config) {
	        var plug = config['plug'],
	            name = config['name'];
	        this.plugs || (this.plugs = {});
	        if (this.plugs[name]) {
	            throw new Error('plug has exist:' + name);
	        }
	        plug.compType = name;
	        this.plugs[name] = plug;
	    },
	    addDataAdapter: function addDataAdapter(config) {
	        var adapter = config['adapter'],
	            name = config['name'];
	        //dataType = config['dataType'] || ''
	        //var key = dataType ? name + '.' + dataType : name;
	        this.dataAdapters || (dataAdapters = {});
	        if (this.dataAdapters[name]) {
	            throw new Error('dataAdapter has exist:' + name);
	        }
	        this.dataAdapters[name] = adapter;
	    },
	    getDataAdapter: function getDataAdapter(name) {
	        if (!name) return;
	        this.dataAdapters || (dataAdapters = {});
	        //var key = dataType ? name + '.' + dataType : name;
	        return this.dataAdapters[name];
	    },
	    createDataAdapter: function createDataAdapter(options) {
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
	    _createComp: function _createComp(options) {
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
	    regComp: function regComp(config) {
	        var newConfig = {
	            classConstructor: config.comp,
	            className: config.compAsString || config['compAsString'],
	            cssClass: config.css || config['css'],
	            callbacks: [],
	            dependencies: config.dependencies || []
	        };
	        config.comp.prototype.compType = config.compAsString;
	        for (var i = 0; i < this.registeredControls.length; i++) {
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

	    updateComp: function updateComp(ele) {
	        this._reorderComps();
	        for (var n = 0; n < this.registeredControls.length; n++) {
	            _upgradeDomInternal(this.registeredControls[n].className, null, ele);
	        }
	    },
	    // 后续遍历registeredControls，重新排列
	    _reorderComps: function _reorderComps() {
	        var tmpArray = [];
	        var dictory = {};

	        for (var n = 0; n < this.registeredControls.length; n++) {
	            dictory[this.registeredControls[n].className] = this.registeredControls[n];
	        }
	        for (var n = 0; n < this.registeredControls.length; n++) {
	            traverse(this.registeredControls[n]);
	        }

	        this.registeredControls = tmpArray;

	        function traverse(control) {
	            if ((0, _util.inArray)(control, tmpArray)) return;
	            if (control.dependencies.length > 0) {
	                for (var i = 0, len = control.dependencies.length; i < len; i++) {
	                    var childControl = dictory[control.dependencies[i]];
	                    traverse(childControl);
	                }
	            }
	            tmpArray.push(control);
	        }
	    }
	};

	var compMgr = CompMgr;
	exports.compMgr = compMgr;

	///**
	// * 加载控件
	// */
	//
	//if (document.readyState && document.readyState === 'complete'){
	//    compMgr.updateComp();
	//}else{
	//    on(window, 'load', function() {
	//
	//        //扫描并生成控件
	//        compMgr.updateComp();
	//    });
	//}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getElementTop = exports.getElementLeft = exports.showPanelByEle = exports.getScroll = exports.getOffset = exports.makeModal = exports.makeDOM = exports.getZIndex = exports.getStyle = exports.wrap = exports.css = exports.closest = exports.toggleClass = exports.hasClass = exports.removeClass = exports.addClass = undefined;

	var _event = __webpack_require__(5);

	/**
	 * 元素增加指定样式
	 * @param value
	 * @returns {*}
	 */
	var addClass = function addClass(element, value) {
		if (element) {
			if (typeof element.classList === 'undefined') {
				if (u._addClass) {
					u._addClass(element, value);
				} else {
					$(element).addClass(value);
				}
			} else {
				element.classList.add(value);
			}
		}

		return this;
	};
	/**
	 * 删除元素上指定样式
	 * @param {Object} element
	 * @param {Object} value
	 */
	/**
	 * Module : Sparrow dom
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-16 13:59:17
	 */
	var removeClass = function removeClass(element, value) {
		if (element) {
			if (typeof element.classList === 'undefined') {
				if (u._removeClass) {
					u._removeClass(element, value);
				} else {
					$(element).removeClass(value);
				}
			} else {
				element.classList.remove(value);
			}
		}
		return this;
	};
	/**
	 * 元素上是否存在该类
	 * @param {Object} element
	 * @param {Object} value
	 */
	var hasClass = function hasClass(element, value) {
		if (!element) return false;
		if (element.nodeName && (element.nodeName === '#text' || element.nodeName === '#comment')) return false;
		if (typeof element.classList === 'undefined') {
			if (u._hasClass) {
				return u._hasClass(element, value);
			} else {
				return $(element).hasClass(value);
			}

			return false;
		} else {
			return element.classList.contains(value);
		}
	};
	/**
	 * 选择元素类切换
	 * @param {Object} element
	 * @param {Object} value
	 */
	var toggleClass = function toggleClass(element, value) {
		if (typeof element.classList === 'undefined') {
			return u._toggleClass(element, value);
		} else {
			return element.classList.toggle(value);
		}
	};

	/**
	 * 向上查找指定类元素
	 * @param {Object} element
	 * @param {Object} selector
	 */
	var closest = function closest(element, selector) {
		var tmp = element;
		while (tmp != null && !hasClass(tmp, selector) && tmp != document.body) {
			tmp = tmp.parentNode;
		}
		if (tmp == document.body) return null;
		return tmp;
	};

	/**
	 * 元素CSS操作
	 * @param {Object} element
	 * @param {Object} csstext
	 * @param {Object} val
	 */
	var css = function css(element, csstext, val) {
		//TO DO : 实现u.相关方法
		if (csstext instanceof Object) {
			for (var k in csstext) {
				var tmpcss = csstext[k];
				if (["width", "height", "top", "bottom", "left", "right"].indexOf(k) > -1 && isNumber(tmpcss)) {
					tmpcss = tmpcss + "px";
				}
				element.style[k] = tmpcss;
			}
		} else {
			if (arguments.length > 2) {
				element.style[csstext] = val;
			} else {
				return getStyle(element, csstext);
			}
		}
	};

	var wrap = function wrap(element, parent) {
		var p = makeDOM(parent);
		element.parentNode.insertBefore(p, element);
		p.appendChild(element);
	};
	var getStyle = function getStyle(element, key) {
		//不要在循环里用
		var allCSS;
		if (window.getComputedStyle) {
			allCSS = window.getComputedStyle(element);
		} else {
			allCSS = element.currentStyle;
		}
		if (allCSS[key] !== undefined) {
			return allCSS[key];
		} else {
			return "";
		}
	};
	var globalZIndex;
	/**
	 * 统一zindex值, 不同控件每次显示时都取最大的zindex，防止显示错乱
	 */
	var getZIndex = function getZIndex() {
		if (!globalZIndex) {
			globalZIndex = 2000;
		}
		return globalZIndex++;
	};
	var makeDOM = function makeDOM(htmlString) {
		var tempDiv = document.createElement("div");
		tempDiv.innerHTML = htmlString;
		var _dom = tempDiv.children[0];
		return _dom;
	};
	/**
	 * element
	 */
	var makeModal = function makeModal(element, parEle) {
		var overlayDiv = document.createElement('div');
		$(overlayDiv).addClass('u-overlay');
		overlayDiv.style.zIndex = getZIndex();
		// 如果有父元素则插入到父元素上，没有则添加到body上
		if (parEle && parEle != document.body) {
			addClass(overlayDiv, 'hasPar');
			parEle.appendChild(overlayDiv);
		} else {
			document.body.appendChild(overlayDiv);
		}

		element.style.zIndex = getZIndex();
		(0, _event.on)(overlayDiv, 'click', function (e) {
			(0, _event.stopEvent)(e);
		});
		return overlayDiv;
	};

	var getOffset = function getOffset(Node, offset) {
		if (!offset) {
			offset = {};
			offset.top = 0;
			offset.left = 0;
		}
		if (Node == document.body) {
			return offset;
		}
		offset.top += Node.offsetTop;
		offset.left += Node.offsetLeft;
		if (Node.offsetParent) return getOffset(Node.offsetParent, offset);else return offset;
	};
	var getScroll = function getScroll(Node, offset) {
		if (!offset) {
			offset = {};
			offset.top = 0;
			offset.left = 0;
		}
		if (Node == document.body) {
			offset.top += Node.scrollTop || document.documentElement.scrollTop;
			offset.left += Node.scrollLeft || document.documentElement.scrollLeft;
			return offset;
		}
		if (Node.tagName != 'INPUT') {
			offset.top += Node.scrollTop;
			offset.left += Node.scrollLeft;
		}

		if (Node.parentNode) return getScroll(Node.parentNode, offset);else return offset;
	};
	var showPanelByEle = function showPanelByEle(obj) {
		var ele = obj.ele,
		    panel = obj.panel,
		    position = obj.position,

		// off = u.getOffset(ele),scroll = u.getScroll(ele),
		// offLeft = off.left,offTop = off.top,
		// scrollLeft = scroll.left,scrollTop = scroll.top,
		// eleWidth = ele.offsetWidth,eleHeight = ele.offsetHeight,
		// panelWidth = panel.offsetWidth,panelHeight = panel.offsetHeight,
		bodyWidth = document.body.clientWidth,
		    bodyHeight = document.body.clientHeight,
		    position = position || 'top',

		// left = offLeft - scrollLeft,top = offTop - scrollTop,
		eleRect = obj.ele.getBoundingClientRect(),
		    panelRect = obj.panel.getBoundingClientRect(),
		    eleWidth = eleRect.width || 0,
		    eleHeight = eleRect.height || 0,
		    left = eleRect.left || 0,
		    top = eleRect.top || 0,
		    panelWidth = panelRect.width || 0,
		    panelHeight = panelRect.height || 0,
		    docWidth = document.documentElement.clientWidth,
		    docHeight = document.documentElement.clientHeight;

		// 基准点为Ele的左上角
		// 后续根据需要完善
		if (position == 'left') {
			left = left - panelWidth;
			top = top + (eleHeight - panelHeight) / 2;
		} else if (position == 'right') {
			left = left + eleWidth;
			top = top + (eleHeight - panelHeight) / 2;
		} else if (position == 'top' || position == 'topCenter') {
			left = left + (eleWidth - panelWidth) / 2;
			top = top - panelHeight;
		} else if (position == 'bottom' || position == 'bottomCenter') {
			left = left + (eleWidth - panelWidth) / 2;
			top = top + eleHeight;
		} else if (position == 'bottomLeft') {
			left = left;
			top = top + eleHeight;
		}

		if (left + panelWidth > docWidth) left = docWidth - panelWidth - 10;
		if (left < 0) left = 0;

		if (top + panelHeight > docHeight) {
			top = docHeight - panelHeight - 10;
		}

		if (top < 0) top = 0;
		panel.style.left = left + 'px';
		panel.style.top = top + 'px';
	};

	var getElementLeft = function getElementLeft(element) {
		var actualLeft = element.offsetLeft;
		var current = element.offsetParent;
		while (current !== null) {
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}
		if (document.compatMode == "BackCompat") {
			var elementScrollLeft = document.body.scrollLeft;
		} else {
			var elementScrollLeft = document.documentElement.scrollLeft;
		}
		return actualLeft - elementScrollLeft;
	};
	var getElementTop = function getElementTop(element) {
		var actualTop = element.offsetTop;
		var current = element.offsetParent;
		while (current !== null) {
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}
		if (document.compatMode == "BackCompat") {
			var elementScrollTop = document.body.scrollTop;
		} else {
			var elementScrollTop = document.documentElement.scrollTop;
		}
		return actualTop - elementScrollTop;
	};
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.hasClass = hasClass;
	exports.toggleClass = toggleClass;
	exports.closest = closest;
	exports.css = css;
	exports.wrap = wrap;
	exports.getStyle = getStyle;
	exports.getZIndex = getZIndex;
	exports.makeDOM = makeDOM;
	exports.makeModal = makeModal;
	exports.getOffset = getOffset;
	exports.getScroll = getScroll;
	exports.showPanelByEle = showPanelByEle;
	exports.getElementLeft = getElementLeft;
	exports.getElementTop = getElementTop;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.event = exports.stopEvent = exports.trigger = exports.off = exports.on = undefined;

	var _env = __webpack_require__(6);

	var u = {}; /**
	             * Module : Sparrow touch event
	             * Author : Kvkens(yueming@yonyou.com)
	             * Date	  : 2016-07-28 14:41:17
	             */

	u.event = {};

	var touchStartEvent = _env.env.hasTouch ? "touchstart" : "mousedown",
	    touchStopEvent = _env.env.hasTouch ? "touchend" : "mouseup",
	    touchMoveEvent = _env.env.hasTouch ? "touchmove" : "mousemove";

	// tap和taphold
	u.event.tap = {
		tapholdThreshold: 750,
		emitTapOnTaphold: true,
		touchstartFun: function touchstartFun() {
			trigger(this, 'vmousedown');
		},
		touchendFun: function touchendFun() {
			trigger(this, 'vmouseup');
			trigger(this, 'vclick');
		},
		setup: function setup() {
			var thisObject = this,
			    isTaphold = false;

			on(thisObject, "vmousedown", function (event) {
				isTaphold = false;
				if (event.which && event.which !== 1) {
					return false;
				}

				var origTarget = event.target,
				    timer;

				function clearTapTimer() {
					clearTimeout(timer);
				}

				function clearTapHandlers() {
					clearTapTimer();

					off(thisObject, 'vclick');
					off(thisObject, 'vmouseup');
					off(document, 'vmousecancel');
				}

				function clickHandler(event) {
					clearTapHandlers();

					// ONLY trigger a 'tap' event if the start target is
					// the same as the stop target.
					if (!isTaphold && origTarget === event.target) {
						trigger(thisObject, 'tap');
					} else if (isTaphold) {
						event.preventDefault();
					}
				}
				on(thisObject, 'vmouseup', clearTapTimer);
				on(thisObject, 'vclick', clickHandler);
				on(document, 'vmousecancel', clearTapHandlers);

				timer = setTimeout(function () {
					if (!u.event.tap.emitTapOnTaphold) {
						isTaphold = true;
					}
					trigger(thisObject, "taphold");
					clearTapHandlers();
				}, u.event.tap.tapholdThreshold);
			});

			on(thisObject, 'touchstart', u.event.tap.touchstartFun);
			on(thisObject, 'touchend', u.event.tap.touchendFun);
		},
		teardown: function teardown() {
			off(thisObject, 'vmousedown');
			off(thisObject, 'vclick');
			off(thisObject, 'vmouseup');
			off(document, 'vmousecancel');
		}
	};

	u.event.taphold = u.event.tap;

	u.event.swipe = {

		// More than this horizontal displacement, and we will suppress scrolling.
		scrollSupressionThreshold: 30,

		// More time than this, and it isn't a swipe.
		durationThreshold: 1000,

		// Swipe horizontal displacement must be more than this.
		horizontalDistanceThreshold: 30,

		// Swipe vertical displacement must be less than this.
		verticalDistanceThreshold: 30,

		getLocation: function getLocation(event) {
			var winPageX = window.pageXOffset,
			    winPageY = window.pageYOffset,
			    x = event.clientX,
			    y = event.clientY;

			if (event.pageY === 0 && Math.floor(y) > Math.floor(event.pageY) || event.pageX === 0 && Math.floor(x) > Math.floor(event.pageX)) {

				// iOS4 clientX/clientY have the value that should have been
				// in pageX/pageY. While pageX/page/ have the value 0
				x = x - winPageX;
				y = y - winPageY;
			} else if (y < event.pageY - winPageY || x < event.pageX - winPageX) {

				// Some Android browsers have totally bogus values for clientX/Y
				// when scrolling/zooming a page. Detectable since clientX/clientY
				// should never be smaller than pageX/pageY minus page scroll
				x = event.pageX - winPageX;
				y = event.pageY - winPageY;
			}

			return {
				x: x,
				y: y
			};
		},

		start: function start(event) {
			var data = event.touches ? event.touches[0] : event,
			    location = u.event.swipe.getLocation(data);
			return {
				time: new Date().getTime(),
				coords: [location.x, location.y],
				origin: event.target
			};
		},

		stop: function stop(event) {
			var data = event.touches ? event.touches[0] : event,
			    location = u.event.swipe.getLocation(data);
			return {
				time: new Date().getTime(),
				coords: [location.x, location.y]
			};
		},

		handleSwipe: function handleSwipe(start, stop, thisObject, origTarget) {
			if (stop.time - start.time < u.event.swipe.durationThreshold && Math.abs(start.coords[0] - stop.coords[0]) > u.event.swipe.horizontalDistanceThreshold && Math.abs(start.coords[1] - stop.coords[1]) < u.event.swipe.verticalDistanceThreshold) {
				var direction = start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight";

				trigger(thisObject, "swipe");
				trigger(thisObject, direction);
				return true;
			}
			return false;
		},

		// This serves as a flag to ensure that at most one swipe event event is
		// in work at any given time
		eventInProgress: false,

		setup: function setup() {
			var events,
			    thisObject = this,
			    context = {};

			// Retrieve the events data for this element and add the swipe context
			events = thisObject["mobile-events"];
			if (!events) {
				events = {
					length: 0
				};
				thisObject["mobile-events"] = events;
			}
			events.length++;
			events.swipe = context;

			context.start = function (event) {

				// Bail if we're already working on a swipe event
				if (u.event.swipe.eventInProgress) {
					return;
				}
				u.event.swipe.eventInProgress = true;

				var stop,
				    start = u.event.swipe.start(event),
				    origTarget = event.target,
				    emitted = false;

				context.move = function (event) {
					// if ( !start || event.isDefaultPrevented() ) {
					if (!start) {
						return;
					}

					stop = u.event.swipe.stop(event);
					if (!emitted) {
						emitted = u.event.swipe.handleSwipe(start, stop, thisObject, origTarget);
						if (emitted) {

							// Reset the context to make way for the next swipe event
							u.event.swipe.eventInProgress = false;
						}
					}
					// prevent scrolling
					if (Math.abs(start.coords[0] - stop.coords[0]) > u.event.swipe.scrollSupressionThreshold) {
						event.preventDefault();
					}
				};

				context.stop = function () {
					emitted = true;

					// Reset the context to make way for the next swipe event
					u.event.swipe.eventInProgress = false;
					off(document, touchMoveEvent, context.move);
					context.move = null;
				};

				on(document, touchMoveEvent, context.move);
				on(document, touchStopEvent, context.stop);
			};
			on(thisObject, touchStartEvent, context.start);
		},

		teardown: function teardown() {
			var events, context;

			events = thisObject["mobile-events"];
			if (events) {
				context = events.swipe;
				delete events.swipe;
				events.length--;
				if (events.length === 0) {
					thisObject["mobile-events"] = null;
				}
			}

			if (context) {
				if (context.start) {
					off(thisObject, touchStartEvent, context.start);
				}
				if (context.move) {
					off(document, touchMoveEvent, context.move);
				}
				if (context.stop) {
					off(document, touchStopEvent, context.stop);
				}
			}
		}
	};

	u.event.swipeleft = u.event.swipe;

	u.event.swiperight = u.event.swipe;

	var event = u.event;

	var on = function on(element, eventName, child, listener) {
		if (!element) return;
		if (arguments.length < 4) {
			listener = child;
			child = undefined;
		} else {
			var childlistener = function childlistener(e) {
				if (!e) {
					return;
				}
				var tmpchildren = element.querySelectorAll(child);
				tmpchildren.forEach(function (node) {
					if (node == e.target) {
						listener.call(e.target, e);
					}
				});
			};
		}
		//capture = capture || false;

		if (!element["uEvent"]) {
			//在dom上添加记录区
			element["uEvent"] = {};
		}
		//判断是否元素上是否用通过on方法填加进去的事件
		if (!element["uEvent"][eventName]) {
			element["uEvent"][eventName] = [child ? childlistener : listener];
			if (u.event && u.event[eventName] && u.event[eventName].setup) {
				u.event[eventName].setup.call(element);
			}
			element["uEvent"][eventName + 'fn'] = function (e) {
				//火狐下有问题修改判断
				if (!e) e = typeof event != 'undefined' && event ? event : window.event;
				element["uEvent"][eventName].forEach(function (fn) {
					try {
						e.target = e.target || e.srcElement; //兼容IE8
					} catch (ee) {}
					if (fn) fn.call(element, e);
				});
			};
			if (element.addEventListener) {
				// 用于支持DOM的浏览器
				element.addEventListener(eventName, element["uEvent"][eventName + 'fn']);
			} else if (element.attachEvent) {
				// 用于IE浏览器
				element.attachEvent("on" + eventName, element["uEvent"][eventName + 'fn']);
			} else {
				// 用于其它浏览器
				element["on" + eventName] = element["uEvent"][eventName + 'fn'];
			}
		} else {
			//如果有就直接往元素的记录区添加事件
			var lis = child ? childlistener : listener;
			var hasLis = false;
			element["uEvent"][eventName].forEach(function (fn) {
				if (fn == lis) {
					hasLis = true;
				}
			});
			if (!hasLis) {
				element["uEvent"][eventName].push(child ? childlistener : listener);
			}
		}
	};

	var off = function off(element, eventName, listener) {
		//删除事件数组
		if (listener) {
			if (element && element["uEvent"] && element["uEvent"][eventName]) {
				element["uEvent"][eventName].forEach(function (fn, i) {
					if (fn == listener) {
						element["uEvent"][eventName].splice(i, 1);
					}
				});
			}
			return;
		}
		var eventfn;
		if (element && element["uEvent"] && element["uEvent"][eventName + 'fn']) eventfn = element["uEvent"][eventName + 'fn'];
		if (element.removeEventListener) {
			// 用于支持DOM的浏览器
			element.removeEventListener(eventName, eventfn);
		} else if (element.removeEvent) {
			// 用于IE浏览器
			element.removeEvent("on" + eventName, eventfn);
		} else {
			// 用于其它浏览器
			delete element["on" + eventName];
		}
		if (u.event && u.event[eventName] && u.event[eventName].teardown) {
			u.event[eventName].teardown.call(element);
		}

		if (element && element["uEvent"] && element["uEvent"][eventName]) element["uEvent"][eventName] = undefined;
		if (element && element["uEvent"] && element["uEvent"][eventName + 'fn']) element["uEvent"][eventName + 'fn'] = undefined;
	};
	var trigger = function trigger(element, eventName) {
		if (element["uEvent"] && element["uEvent"][eventName]) {
			element["uEvent"][eventName + 'fn']();
		}
	};

	/**
	 * 阻止冒泡
	 */
	var stopEvent = function stopEvent(e) {
		if (typeof e != "undefined") {
			if (e.stopPropagation) e.stopPropagation();else {
				e.cancelBubble = true;
			}
			//阻止默认浏览器动作(W3C)
			if (e && e.preventDefault) e.preventDefault();
			//IE中阻止函数器默认动作的方式
			else window.event.returnValue = false;
		}
	};

	exports.on = on;
	exports.off = off;
	exports.trigger = trigger;
	exports.stopEvent = stopEvent;
	exports.event = event;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.env = undefined;

	var _extend = __webpack_require__(7);

	var u = {}; /**
	             * Module : Sparrow browser environment
	             * Author : Kvkens(yueming@yonyou.com)
	             * Date	  : 2016-07-27 21:46:50
	             */

	(0, _extend.extend)(u, {
		isIE: false,
		isFF: false,
		isOpera: false,
		isChrome: false,
		isSafari: false,
		isWebkit: false,
		isIE8_BEFORE: false,
		isIE8: false,
		isIE8_CORE: false,
		isIE9: false,
		isIE9_CORE: false,
		isIE10: false,
		isIE10_ABOVE: false,
		isIE11: false,
		isEdge: false,
		isIOS: false,
		isIphone: false,
		isIPAD: false,
		isStandard: false,
		version: 0,
		isWin: false,
		isUnix: false,
		isLinux: false,
		isAndroid: false,
		isAndroidPAD: false,
		isAndroidPhone: false,
		isMac: false,
		hasTouch: false,
		isMobile: false
	});

	(function () {
		var userAgent = navigator.userAgent,
		    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
		    rFirefox = /(firefox)\/([\w.]+)/,
		    rOpera = /(opera).+version\/([\w.]+)/,
		    rChrome = /(chrome)\/([\w.]+)/,
		    rSafari = /version\/([\w.]+).*(safari)/,
		    version,
		    ua = userAgent.toLowerCase(),
		    s,
		    browserMatch = {
			browser: "",
			version: ''
		},
		    match = rMsie.exec(ua);

		if (match != null) {
			browserMatch = {
				browser: "IE",
				version: match[2] || "0"
			};
		}
		match = rFirefox.exec(ua);
		if (match != null) {
			browserMatch = {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
		match = rOpera.exec(ua);
		if (match != null) {
			browserMatch = {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
		match = rChrome.exec(ua);
		if (match != null) {
			browserMatch = {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
		match = rSafari.exec(ua);
		if (match != null) {
			browserMatch = {
				browser: match[2] || "",
				version: match[1] || "0"
			};
		}

		if (userAgent.indexOf("Edge") > -1) {
			u.isEdge = true;
		}
		if (s = ua.match(/opera.([\d.]+)/)) {
			u.isOpera = true;
		} else if (browserMatch.browser == "IE" && browserMatch.version == 11) {
			u.isIE11 = true;
			u.isIE = true;
		} else if (s = ua.match(/chrome\/([\d.]+)/)) {
			u.isChrome = true;
			u.isStandard = true;
		} else if (s = ua.match(/version\/([\d.]+).*safari/)) {
			u.isSafari = true;
			u.isStandard = true;
		} else if (s = ua.match(/gecko/)) {
			//add by licza : support XULRunner
			u.isFF = true;
			u.isStandard = true;
		} else if (s = ua.match(/msie ([\d.]+)/)) {
			u.isIE = true;
		} else if (s = ua.match(/firefox\/([\d.]+)/)) {
			u.isFF = true;
			u.isStandard = true;
		}
		if (ua.match(/webkit\/([\d.]+)/)) {
			u.isWebkit = true;
		}
		if (ua.match(/ipad/i)) {
			u.isIOS = true;
			u.isIPAD = true;
			u.isStandard = true;
		}

		if (ua.match(/iphone/i)) {
			u.isIOS = true;
			u.isIphone = true;
		}

		if (navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel") {
			//u.isIOS = true;
			u.isMac = true;
		}

		if (navigator.platform == "Win32" || navigator.platform == "Windows" || navigator.platform == "Win64") {
			u.isWin = true;
		}

		if (navigator.platform == "X11" && !u.isWin && !u.isMac) {
			u.isUnix = true;
		}
		if (String(navigator.platform).indexOf("Linux") > -1) {
			u.isLinux = true;
		}

		if (ua.indexOf('Android') > -1 || ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('adr') > -1) {
			u.isAndroid = true;
		}

		u.version = version ? browserMatch.version ? browserMatch.version : 0 : 0;
		if (u.isAndroid) {
			if (window.screen.width >= 768 && window.screen.width < 1024) {
				u.isAndroidPAD = true;
			}
			if (window.screen.width <= 768) {
				u.isAndroidPhone = true;
			}
		}
		if (u.isIE) {
			var intVersion = parseInt(u.version);
			var mode = document.documentMode;
			if (mode == null) {
				if (intVersion == 6 || intVersion == 7) {
					u.isIE8_BEFORE = true;
				}
			} else {
				if (mode == 7) {
					u.isIE8_BEFORE = true;
				} else if (mode == 8) {
					u.isIE8 = true;
				} else if (mode == 9) {
					u.isIE9 = true;
					u.isSTANDARD = true;
				} else if (mode == 10) {
					u.isIE10 = true;
					u.isSTANDARD = true;
					u.isIE10_ABOVE = true;
				} else {
					u.isSTANDARD = true;
				}
				if (intVersion == 8) {
					u.isIE8_CORE = true;
				} else if (intVersion == 9) {
					u.isIE9_CORE = true;
				} else if (browserMatch.version == 11) {
					u.isIE11 = true;
				}
			}
		}
		if ("ontouchend" in document) {
			u.hasTouch = true;
		}
		if (u.isIphone || u.isAndroidPhone) u.isMobile = true;
	})();

	var env = u;
	exports.env = env;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.extend = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : Sparrow extend
	                                                                                                                                                                                                                                                                               * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-07-27 21:46:50
	                                                                                                                                                                                                                                                                               */

	var _enumerables = __webpack_require__(8);

	/**
	 * 复制对象属性
	 *
	 * @param {Object}  目标对象
	 * @param {config} 源对象
	 */
	var extend = function extend(object, config) {
		var args = arguments,
		    options;
		if (args.length > 1) {
			for (var len = 1; len < args.length; len++) {
				options = args[len];
				if (object && options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
					var i, j, k;
					for (i in options) {
						object[i] = options[i];
					}
					if (_enumerables.enumerables) {
						for (j = _enumerables.enumerables.length; j--;) {
							k = _enumerables.enumerables[j];
							if (options.hasOwnProperty && options.hasOwnProperty(k)) {
								object[k] = options[k];
							}
						}
					}
				}
			}
		}
		return object;
	};

	exports.extend = extend;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Module : Sparrow extend enum
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-27 21:46:50
	 */

	var U_LANGUAGES = "i_languages";
	var U_THEME = "u_theme";
	var U_LOCALE = "u_locale";
	var U_USERCODE = "usercode";

	var enumerables = true,
	    enumerablesTest = {
		toString: 1
	},
	    toString = Object.prototype.toString;
	for (var i in enumerablesTest) {
		exports.enumerables = enumerables = null;
	}
	if (enumerables) {
		exports.enumerables = enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
	}

	exports.enumerables = enumerables;
	exports.U_LANGUAGES = U_LANGUAGES;
	exports.U_THEME = U_THEME;
	exports.U_LOCALE = U_LOCALE;
	exports.U_USERCODE = U_USERCODE;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Module : Sparrow util tools
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-27 21:46:50
	 */

	/**
	 * 创建一个带壳的对象,防止外部修改
	 * @param {Object} proto
	 */
	var createShellObject = function createShellObject(proto) {
		var exf = function exf() {};
		exf.prototype = proto;
		return new exf();
	};
	var execIgnoreError = function execIgnoreError(a, b, c) {
		try {
			a.call(b, c);
		} catch (e) {}
	};

	var getFunction = function getFunction(target, val) {
		if (!val || typeof val == 'function') return val;
		if (typeof target[val] == 'function') return target[val];else if (typeof window[val] == 'function') return window[val];else if (val.indexOf('.') != -1) {
			var func = getJSObject(target, val);
			if (typeof func == 'function') return func;
			func = getJSObject(window, val);
			if (typeof func == 'function') return func;
		}
		return val;
	};
	var getJSObject = function getJSObject(target, names) {
		if (!names) {
			return;
		}
		if ((typeof names === 'undefined' ? 'undefined' : _typeof(names)) == 'object') return names;
		var nameArr = names.split('.');
		var obj = target;
		for (var i = 0; i < nameArr.length; i++) {
			obj = obj[nameArr[i]];
			if (!obj) return null;
		}
		return obj;
	};
	var isDate = function isDate(input) {
		return Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
	};
	var isNumber = function isNumber(obj) {
		//return obj === +obj
		//加了个typeof 判断，因为'431027199110.078573'会解析成number
		return obj - parseFloat(obj) + 1 >= 0;
	};
	var isArray = Array.isArray || function (val) {
		return Object.prototype.toString.call(val) === '[object Array]';
	};
	var isEmptyObject = function isEmptyObject(obj) {
		var name;
		for (name in obj) {
			return false;
		}
		return true;
	};
	var inArray = function inArray(node, arr) {
		if (!arr instanceof Array) {
			throw "arguments is not Array";
		}
		for (var i = 0, k = arr.length; i < k; i++) {
			if (node == arr[i]) {
				return true;
			}
		}
		return false;
	};
	var isDomElement = function isDomElement(obj) {
		if (window['HTMLElement']) {
			return obj instanceof HTMLElement;
		} else {
			return obj && obj.tagName && obj.nodeType === 1;
		}
	};
	var each = function each(obj, callback) {
		if (obj.forEach) {
			obj.forEach(function (v, k) {
				callback(k, v);
			});
		} else if (obj instanceof Object) {
			for (var k in obj) {
				callback(k, obj[k]);
			}
		} else {
			return;
		}
	};
	try {
		NodeList.prototype.forEach = Array.prototype.forEach;
	} catch (e) {}

	/**
	 * 获得字符串的字节长度
	 */
	String.prototype.lengthb = function () {
		//	var str = this.replace(/[^\x800-\x10000]/g, "***");
		var str = this.replace(/[^\x00-\xff]/g, "**");
		return str.length;
	};

	/**
	 * 将AFindText全部替换为ARepText
	 */
	String.prototype.replaceAll = function (AFindText, ARepText) {
		//自定义String对象的方法
		var raRegExp = new RegExp(AFindText, "g");
		return this.replace(raRegExp, ARepText);
	};

	var dateFormat = function dateFormat(str) {
		//如果不是string类型  原型返回
		if (typeof str !== 'string') {
			return str;
		}
		//判断 str 格式如果是 yy-mm-dd
		if (str && str.indexOf('-') > -1) {
			//获取当前是否是 ios版本,>8是因为ios不识别new Date（“2016/11”）格式
			var ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
				//转换成 yy/mm/dd
				str = str.replace(/-/g, "/");
				str = str.replace(/(^\s+)|(\s+$)/g, "");
				if (str.length <= 8) {
					str = str += "/01";
				}
			}
		}

		return str;
	};

	exports.createShellObject = createShellObject;
	exports.execIgnoreError = execIgnoreError;
	exports.getFunction = getFunction;
	exports.getJSObject = getJSObject;
	exports.isDate = isDate;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isEmptyObject = isEmptyObject;
	exports.inArray = inArray;
	exports.isDomElement = isDomElement;
	exports.each = each;
	exports.dateFormat = dateFormat;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.hotkeys = undefined;

	var _class = __webpack_require__(11);

	var _extend = __webpack_require__(7);

	var _util = __webpack_require__(9);

	var hotkeys = {}; /**
	                   * Module : Sparrow hotKeys
	                   * Author : Kvkens(yueming@yonyou.com)
	                   * Date	  : 2016-07-28 20:25:39
	                   */

	hotkeys.special_keys = {
	    27: 'esc', 9: 'tab', 32: 'space', 13: 'enter', 8: 'backspace', 145: 'scroll', 20: 'capslock',
	    144: 'numlock', 19: 'pause', 45: 'insert', 36: 'home', 46: 'del', 35: 'end', 33: 'pageup',
	    34: 'pagedown', 37: 'left', 38: 'up', 39: 'right', 40: 'down', 112: 'f1', 113: 'f2', 114: 'f3',
	    115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12'
	};

	hotkeys.shift_nums = {
	    "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
	    "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ":", "'": "\"", ",": "<",
	    ".": ">", "/": "?", "\\": "|"
	};

	hotkeys.add = function (combi, options, callback) {
	    if ((0, _class.isFunction)(options)) {
	        callback = options;
	        options = {};
	    }
	    var opt = {},
	        defaults = { type: 'keydown', propagate: false, disableInInput: false, target: document.body, checkParent: true },
	        that = this;
	    opt = (0, _extend.extend)(opt, defaults, options || {});
	    combi = combi.toLowerCase();

	    // inspect if keystroke matches
	    var inspector = function inspector(event) {
	        //event = $.event.fix(event); // jQuery event normalization.
	        var element = this; //event.target;
	        // @ TextNode -> nodeType == 3
	        element = element.nodeType == 3 ? element.parentNode : element;

	        if (opt['disableInInput']) {
	            // Disable shortcut keys in Input, Textarea fields
	            var target = element; //$(element);
	            if (target.tagName == "INPUT" || target.tagName == "TEXTAREA") {
	                return;
	            }
	        }
	        var code = event.which,
	            type = event.type,
	            character = String.fromCharCode(code).toLowerCase(),
	            special = that.special_keys[code],
	            shift = event.shiftKey,
	            ctrl = event.ctrlKey,
	            alt = event.altKey,
	            propagate = true,
	            // default behaivour
	        mapPoint = null;

	        // in opera + safari, the event.target is unpredictable.
	        // for example: 'keydown' might be associated with HtmlBodyElement
	        // or the element where you last clicked with your mouse.
	        if (opt.checkParent) {
	            //              while (!that.all[element] && element.parentNode){
	            while (!element['hotkeys'] && element.parentNode) {
	                element = element.parentNode;
	            }
	        }

	        //          var cbMap = that.all[element].events[type].callbackMap;
	        var cbMap = element['hotkeys'].events[type].callbackMap;
	        if (!shift && !ctrl && !alt) {
	            // No Modifiers
	            mapPoint = cbMap[special] || cbMap[character];
	        }
	        // deals with combinaitons (alt|ctrl|shift+anything)
	        else {
	                var modif = '';
	                if (alt) modif += 'alt+';
	                if (ctrl) modif += 'ctrl+';
	                if (shift) modif += 'shift+';
	                // modifiers + special keys or modifiers + characters or modifiers + shift characters
	                mapPoint = cbMap[modif + special] || cbMap[modif + character] || cbMap[modif + that.shift_nums[character]];
	            }
	        if (mapPoint) {
	            mapPoint.cb(event);
	            if (!mapPoint.propagate) {
	                event.stopPropagation();
	                event.preventDefault();
	                return false;
	            }
	        }
	    };
	    // first hook for this element
	    var data = opt.target['hotkeys'];
	    if (!data) {
	        opt.target['hotkeys'] = data = { events: {} };
	    }
	    //      if (!hotkeys.all[opt.target]){
	    //          hotkeys.all[opt.target] = {events:{}};
	    //      }
	    if (!data.events[opt.type]) {
	        data.events[opt.type] = { callbackMap: {} };
	        on(opt.target, opt.type, inspector);
	        //$.event.add(opt.target, opt.type, inspector);
	    }
	    //      if (!hotkeys.all[opt.target].events[opt.type]){
	    //          hotkeys.all[opt.target].events[opt.type] = {callbackMap: {}}
	    //          $.event.add(opt.target, opt.type, inspector);
	    //      }
	    data.events[opt.type].callbackMap[combi] = { cb: callback, propagate: opt.propagate };
	    //      hotkeys.all[opt.target].events[opt.type].callbackMap[combi] =  {cb: callback, propagate:opt.propagate};
	    return hotkeys;
	};
	hotkeys.remove = function (exp, opt) {
	    opt = opt || {};
	    target = opt.target || document.body;
	    type = opt.type || 'keydown';
	    exp = exp.toLowerCase();

	    delete target['hotkeys'].events[type].callbackMap[exp];
	};

	hotkeys.scan = function (element, target) {
	    element = element || document.body;
	    element.querySelectorAll('[u-enter]').forEach(function (el) {
	        var enterValue = el.getAttribute('u-enter');
	        if (!enterValue) return;
	        if (enterValue.substring(0, 1) == '#') hotkeys.add('enter', { target: this }, function () {
	            var _el = element.querySelector(enterValue);
	            if (_el) {
	                _el.focus();
	            }
	        });else {
	            target = target || window;
	            var func = h(target, enterValue);
	            hotkeys.add('enter', { target: this }, function () {
	                func.call(this);
	            });
	        }
	    });
	    element.querySelectorAll('[u-hotkey]').forEach(function (el) {
	        var hotkey = el.getAttribute('u-hotkey');
	        if (!hotkey) return;
	        hotkeys.add(hotkey, function () {
	            el.click();
	        });
	    });
	};

	var hotkeys = hotkeys;

	exports.hotkeys = hotkeys;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Module : Sparrow class
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-28 08:45:39
	 */

	var Class = function Class(o) {
		if (!(this instanceof Class) && isFunction(o)) {
			return classify(o);
		}
	};

	// Create a new Class.
	//
	//  var SuperPig = Class.create({
	//    Extends: Animal,
	//    Implements: Flyable,
	//    initialize: function() {
	//      SuperPig.superclass.initialize.apply(this, arguments)
	//    },
	//    Statics: {
	//      COLOR: 'red'
	//    }
	// })
	//
	Class.create = function (parent, properties) {
		if (!isFunction(parent)) {
			properties = parent;
			parent = null;
		}

		properties || (properties = {});
		parent || (parent = properties.Extends || Class);
		properties.Extends = parent;

		// The created class constructor
		function SubClass() {
			var ret;
			// Call the parent constructor.
			parent.apply(this, arguments);

			// Only call initialize in self constructor.
			if (this.constructor === SubClass && this.initialize) {
				ret = this.initialize.apply(this, arguments);
			}
			return ret ? ret : this;
		}

		// Inherit class (static) properties from parent.
		if (parent !== Class) {
			mix(SubClass, parent, parent.StaticsWhiteList);
		}

		// Add instance properties to the subclass.
		implement.call(SubClass, properties);

		// Make subclass extendable.
		return classify(SubClass);
	};

	function implement(properties) {
		var key, value;

		for (key in properties) {
			value = properties[key];

			if (Class.Mutators.hasOwnProperty(key)) {
				Class.Mutators[key].call(this, value);
			} else {
				this.prototype[key] = value;
			}
		}
	}

	// Create a sub Class based on `Class`.
	Class.extend = function (properties) {
		properties || (properties = {});
		properties.Extends = this;

		return Class.create(properties);
	};

	function classify(cls) {
		cls.extend = Class.extend;
		cls.implement = implement;
		return cls;
	}

	// Mutators define special properties.
	Class.Mutators = {

		'Extends': function Extends(parent) {
			var existed = this.prototype;
			var proto = createProto(parent.prototype);

			// Keep existed properties.
			mix(proto, existed);

			// Enforce the constructor to be what we expect.
			proto.constructor = this;

			// Set the prototype chain to inherit from `parent`.
			this.prototype = proto;

			// Set a convenience property in case the parent's prototype is
			// needed later.
			this.superclass = parent.prototype;
		},

		'Implements': function Implements(items) {
			isArray(items) || (items = [items]);
			var proto = this.prototype,
			    item;

			while (item = items.shift()) {
				mix(proto, item.prototype || item);
			}
		},

		'Statics': function Statics(staticProperties) {
			mix(this, staticProperties);
		}
	};

	// Shared empty constructor function to aid in prototype-chain creation.
	function Ctor() {}

	// See: http://jsperf.com/object-create-vs-new-ctor
	var createProto = Object.__proto__ ? function (proto) {
		return {
			__proto__: proto
		};
	} : function (proto) {
		Ctor.prototype = proto;
		return new Ctor();
	};

	// Helpers
	// ------------

	function mix(r, s, wl) {
		// Copy "all" properties including inherited ones.
		for (var p in s) {
			if (s.hasOwnProperty(p)) {
				if (wl && indexOf(wl, p) === -1) continue;

				// 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
				if (p !== 'prototype') {
					r[p] = s[p];
				}
			}
		}
	}

	var toString = Object.prototype.toString;

	var isArray = Array.isArray || function (val) {
		return toString.call(val) === '[object Array]';
	};

	var isFunction = function isFunction(val) {
		return toString.call(val) === '[object Function]';
	};

	var indexOf = function indexOf(arr, item) {
		if (Array.prototype.indexOf && arr.indexOf) {
			return arr.indexOf(item);
		} else {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === item) {
					return i;
				}
			}
			return -1;
		}
	};

	exports.Class = Class;
	exports.isFunction = isFunction;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Module : kero app AdjustMetaFunc
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-29 09:34:01
	 */

	var setAdjustMetaFunc = function setAdjustMetaFunc(adjustFunc) {
	  this.adjustFunc = adjustFunc;
	};

	exports.setAdjustMetaFunc = setAdjustMetaFunc;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero app dataTable
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-29 09:34:01
	 */

	var addDataTable = function addDataTable(dataTable) {
	    this.dataTables[dataTable.id] = dataTable;
	    return this;
	};
	var getDataTable = function getDataTable(id) {
	    return this.dataTables[id];
	};

	var getDataTables = function getDataTables() {
	    return this.dataTables;
	};

	exports.addDataTable = addDataTable;
	exports.getDataTable = getDataTable;
	exports.getDataTables = getDataTables;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.showComp = exports.getComps = exports.getCompsByType = exports.getCompsByDataTable = exports.getComp = exports.createComp = undefined;

	var _compMgr = __webpack_require__(3);

	var _util = __webpack_require__(9);

	var _dom = __webpack_require__(4);

	var createComp = function createComp(ele, viewModel) {
	    var options = JSON.parse(ele.getAttribute('u-meta'));
	    if (options && options['type']) {
	        var comp = _compMgr.compMgr.createDataAdapter({ el: ele, options: options, model: viewModel, app: this });
	        ele['u-meta'] = comp;
	    }
	    return comp;
	}; /**
	    * Module : kero app comp
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-07-29 09:34:01
	    */


	var getComp = function getComp(compId) {
	    var returnComp = null;
	    (0, _util.each)(this.elements, function (i, element) {
	        if (typeof element === 'string') {
	            element = document.querySelector(element);
	        }
	        if (element) {
	            element.querySelectorAll('[u-meta]').forEach(function (ele) {
	                if (ele['u-meta']) {
	                    var comp = ele['u-meta'];
	                    if (comp.id === compId) {
	                        returnComp = comp;
	                        return false;
	                    }
	                }
	            });
	        }
	    });
	    return returnComp;
	};

	var getCompsByDataTable = function getCompsByDataTable(dataTableId, element) {
	    var comps = this.getComps(element),
	        targetComps = [];
	    for (var i = 0; i < comps.length; i++) {
	        if (comps[i].dataModel && comps[i].dataModel['id'] == dataTableId || comps[i].dataTable && comps[i].dataTable['id'] == dataTableId) targetComps.push(comps[i]);
	    }
	    return targetComps;
	};

	/**
	 * 根据类型获取控件
	 * @param {String} type
	 * @param {object} element
	 */
	var getCompsByType = function getCompsByType(type, element) {
	    var elements = element ? element : this.elements;
	    var returnComps = [];
	    if (!(0, _util.isArray)(elements)) elements = [elements];
	    (0, _util.each)(elements, function (i, element) {
	        if (element) {
	            element.querySelectorAll('[u-meta]').forEach(function (ele) {
	                if (ele['u-meta']) {
	                    var comp = ele['u-meta'];
	                    if (comp && comp.type == type) returnComps.push(comp);
	                }
	            });
	        }
	    });
	    return returnComps;
	};

	/**
	 * 获取某区域中的所有控件
	 * @param {object} element
	 */
	var getComps = function getComps(element) {
	    var elements = element ? element : this.elements;
	    var returnComps = [];
	    if (typeof elements == 'string') {
	        elements = document.querySelectorAll(elements);
	    }
	    if (!(0, _util.isArray)(elements) && !(elements instanceof NodeList)) elements = [elements];
	    (0, _util.each)(elements, function (i, element) {
	        if (element) {
	            element.querySelectorAll('[u-meta]').forEach(function (ele) {
	                if (ele['u-meta']) {
	                    var comp = ele['u-meta'];
	                    if (comp) returnComps.push(comp);
	                }
	            });
	        }
	    });
	    return returnComps;
	};

	/**
	 * 将comp显示到顶端（此方法只支持body上存在滚动条的情况）
	 * @param {object} comp对象
	 */
	var showComp = function showComp(comp) {
	    var ele = comp.element,
	        off = (0, _dom.getOffset)(ele),
	        scroll = (0, _dom.getScroll)(ele),
	        top = off.top - scroll.top,
	        bodyHeight = document.body.clientHeight,
	        nowTop = document.body.scrollTop;
	    if (top > bodyHeight || top < 0) {
	        document.body.scrollTop = nowTop + top;
	    }
	};

	exports.createComp = createComp;
	exports.getComp = getComp;
	exports.getCompsByDataTable = getCompsByDataTable;
	exports.getCompsByType = getCompsByType;
	exports.getComps = getComps;
	exports.showComp = showComp;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.compsValidateMultiParam = exports.compsValidate = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : kero app validate
	                                                                                                                                                                                                                                                                               * Author : liuyk(liuyk@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date   : 2016-07-29 09:34:01
	                                                                                                                                                                                                                                                                               */

	var _env = __webpack_require__(6);

	var _dom = __webpack_require__(4);

	/**
	 * 控件数据校验
	 * @param {Object} element
	 */
	var compsValidate = function compsValidate(element, retUnpass) {
	    var comps = this.getComps(element),
	        passed = true,
	        unpassed = [];
	    for (var i = 0; i < comps.length; i++) {
	        if (comps[i].doValidate) {
	            var result = comps[i].doValidate({ trueValue: true, showMsg: true });
	            result = (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' ? result['passed'] : result;
	            passed = result && passed;
	            if (!result) unpassed.push(comps[i]);
	        }
	    }
	    if (retUnpass) return unpassed;
	    return passed;
	};

	var compsValidateMultiParam = function compsValidateMultiParam(options) {
	    var element = options.element,
	        comps = this.getComps(element),
	        passed = true,
	        showMsg = options.showMsg,
	        notPassedArr = new Array();
	    for (var i = 0; i < comps.length; i++) {
	        if (comps[i].doValidate) {
	            var result = comps[i].doValidate({ trueValue: true, showMsg: showMsg });
	            // 如果passed为true,result.passed为false说明第一次出现错误校验
	            if (passed && !result.passed) {
	                var off = (0, _dom.getOffset)(comps[i].element);
	                //滚动到第一次出现错误的地方
	                window.scrollTo(0, off.top - 80);
	                if (_env.env.isIPAD) {
	                    // ipad上面云表单提交校验的时候没有滚动到对应位置
	                    window.top.scrollTo(0, off.top - 80);
	                }
	            }
	            passed = result.passed && passed;
	            if (!result.passed) {
	                notPassedArr.push(result);
	            }
	        }
	    }
	    return { passed: passed,
	        notPassedArr: notPassedArr };
	};

	exports.compsValidate = compsValidate;
	exports.compsValidateMultiParam = compsValidateMultiParam;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero app cache
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-07-29 09:34:01
	 */

	var setUserCache = function setUserCache(key, value) {
	    var userCode = this.getEnvironment().usercode;
	    if (!userCode) return;
	    localStorage.setItem(userCode + key, value);
	};

	var getUserCache = function getUserCache(key) {
	    var userCode = this.getEnvironment().usercode;
	    if (!userCode) return;
	    return localStorage.getItem(userCode + key);
	};

	var removeUserCache = function removeUserCache(key) {
	    var userCode = this.getEnvironment().usercode;
	    if (!userCode) return;
	    localStorage.removeItem(userCode + key);
	};

	var setCache = function setCache(key, value) {
	    localStorage.setItem(key, value);
	};

	var getCache = function getCache(key) {
	    return localStorage.getItem(key);
	};

	var removeCache = function removeCache(key) {
	    localStorage.removeItem(key);
	};

	var setSessionCache = function setSessionCache(key, value) {
	    sessionStorage.setItem(key, value);
	};

	var getSessionCache = function getSessionCache(key) {
	    return sessionStorage.getItem(key);
	};

	var removeSessionCache = function removeSessionCache(key) {
	    sessionStorage.removeItem(key);
	};

	exports.setUserCache = setUserCache;
	exports.getUserCache = getUserCache;
	exports.removeUserCache = removeUserCache;
	exports.setCache = setCache;
	exports.getCache = getCache;
	exports.removeCache = removeCache;
	exports.setSessionCache = setSessionCache;
	exports.getSessionCache = getSessionCache;
	exports.removeSessionCache = removeSessionCache;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero app iwebCore
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-29 09:34:01
	 */

	var getEnvironment = function getEnvironment() {
	    return u.core.collectEnvironment();
	};

	var setClientAttribute = function setClientAttribute(k, v) {
	    u.core.setClientAttribute(k, v);
	};

	var getClientAttribute = function getClientAttribute(k) {
	    return u.core.getClientAttributes()[k];
	};

	exports.getEnvironment = getEnvironment;
	exports.setClientAttribute = setClientAttribute;
	exports.getClientAttribute = getClientAttribute;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ajax = undefined;

	var _ajax = __webpack_require__(19);

	var ajax = function ajax(params) {
	    params = _wrapAjax.call(this, params);
	    (0, _ajax.ajax)(params);
	}; /**
	    * Module : kero app ajax
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-07-29 09:34:01
	    */

	var _wrapAjax = function _wrapAjax(params) {
	    var self = this;
	    this.serverEventObj = this.serverEvent();
	    var orignSuccess = params.success;
	    var orignError = params.error;
	    var deferred = params.deferred;
	    if (!deferred || !deferred.resolve) {
	        deferred = {
	            resolve: function resolve() {}, reject: function reject() {}
	        };
	    }
	    params.success = function (data, state, xhr) {
	        if (typeof data === 'string') data = JSON.parse(data);
	        if (self.serverEventObj.processXHRError(self, data, state, xhr)) {
	            orignSuccess.call(null, data);
	            _successFunc(data, deferred);
	        } else {
	            deferred.reject();
	        }
	    };
	    params.error = function (data, state, xhr) {
	        if (typeof data === 'string') data = JSON.parse(data);
	        if (self.serverEventObj.processXHRError(self, data, state, xhr)) {
	            orignError.call(null, data);
	            _successFunc(data, deferred);
	        } else {
	            deferred.reject();
	        }
	    };
	    if (params.data) params.data.environment = ko.utils.stringifyJson(u.core.collectEnvironment());else params.data = { environment: ko.utils.stringifyJson(u.core.collectEnvironment()) };
	    return params;
	};

	var _successFunc = function _successFunc(data, deferred) {
	    deferred.resolve();
	};

	exports.ajax = ajax;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ajax = undefined;

	var _env = __webpack_require__(6);

	var XmlHttp = {
		get: "get",
		post: "post",
		reqCount: 4,
		createXhr: function createXhr() {
			var xmlhttp = null;
			/*if (window.XMLHttpRequest) {
	    xmlhttp = new XMLHttpRequest();
	  } else {
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  }*/
			if (_env.env.isIE8) {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP
			} else if (_env.env.isIE) {
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); //IE高版本创建XMLHTTP
			} else if (window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			}
			return xmlhttp;
		},
		ajax: function ajax(_json) {
			var url = _json["url"];
			var callback = _json["success"];
			var async = _json["async"] == undefined ? true : _json["async"];
			var error = _json["error"];
			var params = _json["data"] || {};
			var method = (_json["type"] == undefined ? XmlHttp.post : _json["type"]).toLowerCase();
			var gzipFlag = params.compressType;
			url = XmlHttp.serializeUrl(url);
			params = XmlHttp.serializeParams(params);
			if (method == XmlHttp.get && params != null) {
				url += "&" + params;
				params = null; //如果是get请求,保证最终会执行send(null)
			}

			var xmlhttp = XmlHttp.createXhr();
			//xmlhttp.open(method, url+ escape(new Date()), async);
			xmlhttp.open(method, url, async);

			if (method == XmlHttp.post) {
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
			}

			var execount = 0;
			// 异步
			if (async) {
				// readyState 从 1~4发生4次变化
				xmlhttp.onreadystatechange = function () {
					execount++;
					// 等待readyState状态不再变化之后,再执行回调函数
					//if (execount == XmlHttp.reqCount) {// 火狐下存在问题，修改判断方式
					if (xmlhttp.readyState == XmlHttp.reqCount) {
						XmlHttp.execBack(xmlhttp, callback, error);
					}
				};
				// send方法要在在回调函数之后执行
				xmlhttp.send(params);
			} else {
				// 同步 readyState 直接变为 4
				// 并且 send 方法要在回调函数之前执行
				xmlhttp.send(params);
				XmlHttp.execBack(xmlhttp, callback, error);
			}
		},
		execBack: function execBack(xmlhttp, callback, error) {
			//if (xmlhttp.readyState == 4
			if (xmlhttp.status == 200 || xmlhttp.status == 304 || xmlhttp.readyState == 4) {
				callback(xmlhttp.responseText, xmlhttp.status, xmlhttp);
			} else {
				if (error) {
					error(xmlhttp.responseText, xmlhttp.status, xmlhttp);
				} else {
					var errorMsg = "no error callback function!";
					if (xmlhttp.responseText) {
						errorMsg = xmlhttp.responseText;
					}
					alert(errorMsg);
					// throw errorMsg;
				}
			}
		},
		serializeUrl: function serializeUrl(url) {
			var cache = "cache=" + Math.random();
			if (url.indexOf("?") > 0) {
				url += "&" + cache;
			} else {
				url += "?" + cache;
			}
			return url;
		},
		serializeParams: function serializeParams(params) {
			var ud = undefined;
			if (ud == params || params == null || params == "") {
				return null;
			}
			if (params.constructor == Object) {
				var result = "";
				for (var p in params) {
					result += p + "=" + encodeURIComponent(params[p]) + "&";
				}
				return result.substring(0, result.length - 1);
			}
			return params;
		}
	}; /**
	    * Module : Sparrow ajax
	    * Author : Kvkens(yueming@yonyou.com)
	    * Date	  : 2016-07-28 19:06:36
	    */

	var ajax = XmlHttp.ajax;
	exports.ajax = ajax;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero app processXHRError
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-07-29 09:34:01
	 */

	var processXHRError = function processXHRError(rsl, state, xhr) {
	    if (typeof rsl === 'string') rsl = JSON.parse(rsl);
	    if (xhr.getResponseHeader && xhr.getResponseHeader("X-Error")) {
	        if (u.showMessageDialog) {
	            u.showMessageDialog({ type: "info", title: "提示", msg: rsl["message"], backdrop: true });
	        } else {
	            alert(rsl["message"]);
	        }

	        if (rsl["operate"]) {
	            eval(rsl["operate"]);
	        }
	        return false;
	    }
	    return true;
	};

	exports.processXHRError = processXHRError;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Module : kero app serverEvent
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-29 09:34:01
	 */

	var serverEvent = function serverEvent() {
	  return new ServerEvent(this);
	};

	exports.serverEvent = serverEvent;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setEnable = undefined;

	var _util = __webpack_require__(9);

	var setEnable = function setEnable(enable) {
	    (0, _util.each)(this.elements, function (i, element) {
	        if (element) {
	            element.querySelectorAll('[u-meta]').each(function () {
	                if (this['u-meta']) {
	                    var comp = this['u-meta'];
	                    if (comp.setEnable) comp.setEnable(enable);
	                }
	            });
	        }
	    });
	}; /**
	    * Module : kero app util
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-07-29 09:34:01
	    */

	exports.setEnable = setEnable;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ServerEvent = undefined;

	var _serverDataTable = __webpack_require__(24);

	var _serverFire = __webpack_require__(25);

	var _serverProcessXHRError = __webpack_require__(26);

	var _serverUtil = __webpack_require__(27);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * Module : Kero webpack entry serverEvnet index
	                                                                                                                                                           * Author : liuyk(liuyuekai@yonyou.com)
	                                                                                                                                                           * Date   : 2016-08-09 15:24:46
	                                                                                                                                                           */

	//相关依赖导入


	var ServerEvent = function ServerEvent(app) {
	    _classCallCheck(this, ServerEvent);

	    this.app = app;
	    this.datas = {};
	    this.params = {};
	    this.event = null;
	    this.ent = u.core.collectEnvironment();
	    if (!u.debugMode) {
	        //此处需要修改
	        this.compression = true;
	    }
	};

	// dataTable


	ServerEvent.prototype.addDataTable = _serverDataTable.addDataTable;
	ServerEvent.prototype.addDataTables = _serverDataTable.addDataTables;
	ServerEvent.prototype.addAllDataTables = _serverDataTable.addAllDataTables;
	ServerEvent.prototype.updateDataTables = _serverDataTable.updateDataTables;

	// fire
	ServerEvent.prototype.fire = _serverFire.fire;
	ServerEvent.prototype.setSuccessFunc = _serverFire.setSuccessFunc;
	ServerEvent.prototype._successFunc = _serverFire._successFunc;

	// processXHRError
	ServerEvent.prototype.processXHRError = _serverProcessXHRError.processXHRError;

	//util
	ServerEvent.prototype.setCompression = _serverUtil.setCompression;
	ServerEvent.prototype.addParameter = _serverUtil.addParameter;
	ServerEvent.prototype.setEvent = _serverUtil.setEvent;
	ServerEvent.prototype.getData = _serverUtil.getData;
	ServerEvent.prototype.updateDom = _serverUtil.updateDom;

	ServerEvent.DEFAULT = {
	    async: true,
	    singleton: true,
	    url: (window.$ctx || '/iwebap') + '/evt/dispatch'
	};

	exports.ServerEvent = ServerEvent;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.updateDataTables = exports.addAllDataTables = exports.addDataTables = exports.addDataTable = undefined;

	var _util = __webpack_require__(9);

	var addDataTable = function addDataTable(dataTableId, rule) {
	    var dataTable = this.app.getDataTable(dataTableId);
	    this.datas[dataTableId] = dataTable.getDataByRule(rule);
	    return this;
	};

	/**
	 *
	 * @param {Object} dataTabels
	 * 格式1: ['dt1',{'dt2':'all'}]，格式2：['dt1', 'dt2']，格式3: ['dt1', 'dt2'], 'all'
	 */
	/**
	 * Module : kero app serverEvent dataTable
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-29 09:34:01
	 */
	var addDataTables = function addDataTables(dataTables) {
	    if (arguments.length == 2) {
	        for (var i = 0; i < dataTables.length; i++) {
	            var rule;
	            if (typeof arguments[1] == 'string') {
	                rule = arguments[1];
	            } else if ((0, _util.isArray)(arguments[1])) {
	                rule = arguments[1][i];
	            }
	            this.addDataTable(dataTables[i], rule);
	        }
	    } else {
	        for (var i = 0; i < dataTables.length; i++) {
	            var dt = dataTables[i];
	            if (typeof dt == 'string') this.addDataTable(dt);else {
	                for (var key in dt) {
	                    this.addDataTable(key, dt[key]);
	                }
	            }
	        }
	    }

	    return this;
	};

	var addAllDataTables = function addAllDataTables(rule) {
	    var dts = this.app.dataTables;
	    for (var i = 0; i < dts.length; i++) {
	        this.addDataTable(dts[i].id, rule);
	    }
	};

	var updateDataTables = function updateDataTables(dataTables, deferred) {
	    for (var key in dataTables) {
	        var dt = this.app.getDataTable(key);
	        if (dt) {
	            dt.setData(dataTables[key]);
	            dt.updateMeta(dataTables[key].meta);
	        }
	    }
	};

	exports.addDataTable = addDataTable;
	exports.addDataTables = addDataTables;
	exports.addAllDataTables = addAllDataTables;
	exports.updateDataTables = updateDataTables;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setSuccessFunc = exports._successFunc = exports.fire = undefined;

	var _extend = __webpack_require__(7);

	var _ajax = __webpack_require__(19);

	/**
	 * Module : kero app serverEvent fire
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-29 09:34:01
	 */
	var fire = function fire(p) {
	    var self = this;
	    var data = this.getData();
	    data.parameters = ko.utils.stringifyJson(this.params);
	    var params = {
	        type: p.type || "POST",
	        data: p.params || {},
	        url: p.url || ServerEvent.DEFAULT.url,
	        async: typeof p.async == 'undefined' ? ServerEvent.DEFAULT.async : p.async,
	        singleton: p.singleton || ServerEvent.DEFAULT.singleton,
	        success: p.success,
	        error: p.error,
	        dataType: 'json'
	    };
	    params.data.ctrl = p.ctrl;
	    params.data.method = p.method;
	    if (this.event) params.data.event = ko.utils.stringifyJson(this.event);
	    var preSuccess = p.preSuccess || function () {};
	    var orignSuccess = p.success || function () {};
	    var orignError = params.error; //|| function(){}
	    this.orignError = orignError;
	    var deferred = params.deferred;
	    if (!deferred || !deferred.resolve) {
	        deferred = {
	            resolve: function resolve() {}, reject: function reject() {}
	        };
	    }
	    params.success = function (data, state, xhr) {
	        if (typeof data === 'string') data = JSON.parse(data);
	        if (self.processXHRError(self, data, state, xhr)) {
	            preSuccess.call(null, data);
	            self._successFunc(data, deferred);
	            orignSuccess.call(null, data.custom);
	            deferred.resolve();
	        } else {
	            deferred.reject();
	        }
	    };
	    params.error = function (data, state, xhr) {
	        if (typeof data === 'string') data = JSON.parse(data);
	        if (self.processXHRError(self, data, state, xhr)) {
	            if (orignError) orignError.call(null, data.custom);
	            //				self._successFunc(data, deferred)
	        } else {
	            deferred.reject();
	        }
	    };
	    params.data = (0, _extend.extend)(params.data, data);
	    if ($) $.ajax(params);else (0, _ajax.ajax)(params);
	};

	var _successFunc = function _successFunc(data, deferred) {
	    if (typeof data === 'string') data = JSON.parse(data);
	    var dataTables = data.dataTables;
	    var dom = data.dom;
	    if (dom) this.updateDom(JSON.parse(dom));
	    if (dataTables) this.updateDataTables(dataTables, deferred);
	};

	var setSuccessFunc = function setSuccessFunc(func) {
	    this._successFunc = func;
	};

	exports.fire = fire;
	exports._successFunc = _successFunc;
	exports.setSuccessFunc = setSuccessFunc;

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero app serverEvent processXHRError
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-07-29 09:34:01
	 */

	var processXHRError = function processXHRError(self, rsl, state, xhr) {
	    if (typeof rsl === 'string') rsl = JSON.parse(rsl);
	    if (xhr.getResponseHeader && xhr.getResponseHeader("X-Error")) {
	        if (self.orignError) self.orignError.call(self, rsl, state, xhr);else {
	            if (u.showMessageDialog) u.showMessageDialog({ type: "info", title: "提示", msg: rsl["message"], backdrop: true });else alert(rsl["message"]);
	            if (rsl["operate"]) {
	                eval(rsl["operate"]);
	            }
	        }
	        return false;
	    }
	    return true;
	};

	exports.processXHRError = processXHRError;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.updateDom = exports.getData = exports.setEvent = exports.addParameter = exports.setCompression = undefined;

	var _util = __webpack_require__(9);

	var _event = __webpack_require__(5);

	var _env = __webpack_require__(6);

	var setCompression = function setCompression(compression) {
	    if (!_env.env.isIE8 && !window.pako && compression == true) alert("can't compression, please include  pako!");else this.compression = compression;
	}; /**
	    * Module : kero app serverEvent util
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-07-29 09:34:01
	    */


	var addParameter = function addParameter(key, value) {
	    this.params[key] = value;
	    return this;
	};

	var setEvent = function setEvent(event) {
	    this.event = _formatEvent(event);
	    return this;
	};

	var _formatEvent = function _formatEvent(event) {
	    return event;
	};

	var getData = function getData() {
	    var envJson = ko.utils.stringifyJson(this.app.getEnvironment()),
	        datasJson = ko.utils.stringifyJson(this.datas, function replacer(key, value) {
	        if (typeof value === "undefined" || value == null) {
	            return '';
	        }
	        return value;
	    }),
	        compressType = '',
	        compression = false;
	    if (window.trimServerEventData) {
	        datasJson = window.trimServerEventData(datasJson);
	    }
	    if (this.compression) {
	        if (!_env.env.isIE8 && window.pako) {
	            envJson = encodeBase64(window.pako.gzip(envJson));
	            datasJson = encodeBase64(window.pako.gzip(datasJson));
	            compression = true;
	            compressType = 'gzip';
	        }
	    }
	    return {
	        environment: envJson,
	        dataTables: datasJson,
	        compression: compression,
	        compressType: compressType
	    };
	};

	var updateDom = function updateDom() {
	    (0, _util.each)(dom, function (i, n) {
	        var vo = n.two;
	        var key = n.one;
	        _updateDom(key, vo);
	    });
	};

	//TODO 去除jQuery后有问题待修改
	function _updateDom(key, vos) {
	    for (var i in vos) {
	        var vo = vos[i];
	        for (var key in vo) {
	            var props = vo[key];
	            if (key == 'trigger') {
	                (0, _event.trigger)(key, props[0]);
	            } else {
	                if (u.isArray(props)) {
	                    (0, _util.each)(props, function (i, n) {
	                        key[i](n);
	                    });
	                } else try {
	                    key[i](vo);
	                } catch (error) {
	                    key[i](vo[i]);
	                }
	            }
	        }
	    }
	}

	exports.setCompression = setCompression;
	exports.addParameter = addParameter;
	exports.setEvent = setEvent;
	exports.getData = getData;
	exports.updateDom = updateDom;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DataTable = undefined;

	var _extend = __webpack_require__(7);

	var _indexEvents = __webpack_require__(29);

	var _copyRow = __webpack_require__(31);

	var _data = __webpack_require__(32);

	var _enable = __webpack_require__(33);

	var _getCurrent = __webpack_require__(34);

	var _getData = __webpack_require__(35);

	var _getFocus = __webpack_require__(36);

	var _getMeta = __webpack_require__(37);

	var _getPage = __webpack_require__(38);

	var _getParam = __webpack_require__(39);

	var _getSelect = __webpack_require__(40);

	var _getSimpleData = __webpack_require__(41);

	var _meta = __webpack_require__(42);

	var _page = __webpack_require__(43);

	var _param = __webpack_require__(44);

	var _ref = __webpack_require__(45);

	var _removeRow = __webpack_require__(46);

	var _row = __webpack_require__(48);

	var _rowCurrent = __webpack_require__(49);

	var _rowDelete = __webpack_require__(50);

	var _rowSelect = __webpack_require__(51);

	var _rowFocus = __webpack_require__(52);

	var _simpleData = __webpack_require__(53);

	var _util = __webpack_require__(47);

	var _events = __webpack_require__(30);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                          * Module : Kero webpack entry dataTable index
	                                                                                                                                                          * Author : liuyk(liuyuekai@yonyou.com)
	                                                                                                                                                          * Date   : 2016-08-09 15:24:46
	                                                                                                                                                          */

	var DataTable =
	// class DataTable extends Events{
	function DataTable(options) {
	    _classCallCheck(this, DataTable);

	    // IE9下转化之后的代码有问题，无法获得superClass方法
	    // super();
	    options = options || {};
	    this.id = options['id'];
	    this.strict = options['strict'] || false;
	    this.meta = DataTable.createMetaItems(options['meta']);
	    this.enable = options['enable'] || DataTable.DEFAULTS.enable;
	    this.pageSize = ko.observable(options['pageSize'] || DataTable.DEFAULTS.pageSize);
	    this.pageIndex = ko.observable(options['pageIndex'] || DataTable.DEFAULTS.pageIndex);
	    this.totalPages = ko.observable(options['totalPages'] || DataTable.DEFAULTS.totalPages);
	    this.totalRow = ko.observable();
	    this.pageCache = options['pageCache'] === undefined ? DataTable.DEFAULTS.pageCache : options['pageCache'];
	    this.rows = ko.observableArray([]);
	    this.selectedIndices = ko.observableArray([]);
	    this._oldCurrentIndex = -1;
	    this.focusIndex = ko.observable(-1);
	    this.cachedPages = [];
	    this.metaChange = {};
	    this.valueChange = {}; //ko.observable(1);
	    this.currentRowChange = ko.observable(1);
	    this.enableChange = ko.observable(1);
	    this.params = options['params'] || {};
	    this.master = options['master'] || '';
	    this.allSelected = ko.observable(false);
	    //dateNoconvert：true时，时间不转化，按真实走，false是，时间转换成long型
	    this.dateNoConvert = options['dateNoConvert'];
	    if (options['root']) {
	        this.root = options['root'];
	    } else {
	        this.root = this;
	    }
	    if (options['ns']) {
	        this.ns = options['ns'];
	    } else {
	        this.ns = '';
	    }
	    this.newCount = 0;
	};

	DataTable.prototype.on = _events.on;
	DataTable.prototype.off = _events.off;
	DataTable.prototype.one = _events.one;
	DataTable.prototype.trigger = _events.trigger;
	DataTable.prototype.triggerReturn = _events.triggerReturn;
	DataTable.prototype.getEvent = _events.getEvent;
	//copyRow
	DataTable.prototype.copyRow = _copyRow.copyRow;
	DataTable.prototype.copyRows = _copyRow.copyRows;

	//data
	DataTable.prototype.setData = _data.setData;
	DataTable.prototype.setValue = _data.setValue;

	//enable
	DataTable.prototype.isEnable = _enable.isEnable;
	DataTable.prototype.setEnable = _enable.setEnable;

	//getData
	DataTable.prototype.getData = _getData.getData;
	DataTable.prototype.getDataByRule = _getData.getDataByRule;
	DataTable.prototype.getRow = _getData.getRow;
	DataTable.prototype.getChildRow = _getData.getChildRow;
	DataTable.prototype.getRowByRowId = _getData.getRowByRowId;
	DataTable.prototype.getRowIndex = _getData.getRowIndex;
	DataTable.prototype.getRowsByField = _getData.getRowsByField;
	DataTable.prototype.getRowByField = _getData.getRowByField;
	DataTable.prototype.getAllRows = _getData.getAllRows;
	DataTable.prototype.getAllPageRows = _getData.getAllPageRows;
	DataTable.prototype.getChangedDatas = _getData.getChangedDatas;
	DataTable.prototype.getChangedRows = _getData.getChangedRows;
	DataTable.prototype.getValue = _getData.getValue;
	DataTable.prototype.getIndexByRowId = _getData.getIndexByRowId;
	DataTable.prototype.getAllDatas = _getData.getAllDatas;
	DataTable.prototype.getRowIdsByIndices = _getData.getRowIdsByIndices;

	//getCurrent
	DataTable.prototype.getCurrentRow = _getCurrent.getCurrentRow;
	DataTable.prototype.getCurrentIndex = _getCurrent.getCurrentIndex;

	//getFocus
	DataTable.prototype.getFocusRow = _getFocus.getFocusRow;
	DataTable.prototype.getFocusIndex = _getFocus.getFocusIndex;

	//getMeta
	DataTable.prototype.getMeta = _getMeta.getMeta;
	DataTable.prototype.getRowMeta = _getMeta.getRowMeta;

	//getPage
	DataTable.prototype.getPage = _getPage.getPage;
	DataTable.prototype.getPages = _getPage.getPages;

	//getParam
	DataTable.prototype.getParam = _getParam.getParam;

	//getSelect
	DataTable.prototype.getSelectedIndex = _getSelect.getSelectedIndex;
	DataTable.prototype.getSelectedIndices = _getSelect.getSelectedIndices;
	DataTable.prototype.getSelectedIndexs = _getSelect.getSelectedIndexs;
	DataTable.prototype.getSelectedDatas = _getSelect.getSelectedDatas;
	DataTable.prototype.getSelectedRows = _getSelect.getSelectedRows;

	//getSimpleData
	DataTable.prototype.getSimpleData = _getSimpleData.getSimpleData;

	//meta
	DataTable.prototype.setMeta = _meta.setMeta;
	DataTable.prototype.updateMeta = _meta.updateMeta;
	DataTable.prototype.createField = _meta.createField;

	//page
	DataTable.prototype.setCurrentPage = _page.setCurrentPage;
	DataTable.prototype.updatePages = _page.updatePages;
	DataTable.prototype.setPages = _page.setPages;
	DataTable.prototype.hasPage = _page.hasPage;
	DataTable.prototype.clearCache = _page.clearCache;
	DataTable.prototype.cacheCurrentPage = _page.cacheCurrentPage;
	DataTable.prototype.updatePagesSelect = _page.updatePagesSelect;
	DataTable.prototype.updatePageRows = _page.updatePageRows;
	DataTable.prototype.updatePageSelect = _page.updatePageSelect;
	DataTable.prototype.updatePageFocus = _page.updatePageFocus;
	DataTable.prototype.updatePageAll = _page.updatePageAll;

	//param
	DataTable.prototype.addParam = _param.addParam;
	DataTable.prototype.addParams = _param.addParams;

	//ref
	DataTable.prototype.refSelectedRows = _ref.refSelectedRows;
	DataTable.prototype.ref = _ref.ref;
	DataTable.prototype.refMeta = _ref.refMeta;
	DataTable.prototype.refRowMeta = _ref.refRowMeta;
	DataTable.prototype.refEnable = _ref.refEnable;
	DataTable.prototype.refByRow = _ref.refByRow;

	//row
	DataTable.prototype.setRows = _row.setRows;
	DataTable.prototype.addRow = _row.addRow;
	DataTable.prototype.addRows = _row.addRows;
	DataTable.prototype.insertRow = _row.insertRow;
	DataTable.prototype.insertRows = _row.insertRows;
	DataTable.prototype.createEmptyRow = _row.createEmptyRow;

	//removeRow
	DataTable.prototype.removeRowByRowId = _removeRow.removeRowByRowId;
	DataTable.prototype.removeRow = _removeRow.removeRow;
	DataTable.prototype.removeAllRows = _removeRow.removeAllRows;
	DataTable.prototype.removeRows = _removeRow.removeRows;
	DataTable.prototype.clear = _removeRow.clear;

	//rowCurrent
	DataTable.prototype.updateCurrIndex = _rowCurrent.updateCurrIndex;

	//rowDelete
	DataTable.prototype.setRowDelete = _rowDelete.setRowDelete;
	DataTable.prototype.setAllRowsDelete = _rowDelete.setAllRowsDelete;
	DataTable.prototype.setRowsDelete = _rowDelete.setRowsDelete;

	//rowFocus
	DataTable.prototype.setRowFocus = _rowFocus.setRowFocus;
	DataTable.prototype.setRowUnFocus = _rowFocus.setRowUnFocus;
	DataTable.prototype.updateFocusIndex = _rowFocus.updateFocusIndex;

	//rowSelect
	DataTable.prototype.setAllRowsSelect = _rowSelect.setAllRowsSelect;
	DataTable.prototype.setRowSelect = _rowSelect.setRowSelect;
	DataTable.prototype.setRowsSelect = _rowSelect.setRowsSelect;
	DataTable.prototype.addRowSelect = _rowSelect.addRowSelect;
	DataTable.prototype.addRowsSelect = _rowSelect.addRowsSelect;
	DataTable.prototype.setAllRowsUnSelect = _rowSelect.setAllRowsUnSelect;
	DataTable.prototype.setRowUnSelect = _rowSelect.setRowUnSelect;
	DataTable.prototype.setRowsUnSelect = _rowSelect.setRowsUnSelect;
	DataTable.prototype.toggleAllSelect = _rowSelect.toggleAllSelect;
	DataTable.prototype.updateSelectedIndices = _rowSelect.updateSelectedIndices;

	//simpleData
	DataTable.prototype.setSimpleData = _simpleData.setSimpleData;
	DataTable.prototype.addSimpleData = _simpleData.addSimpleData;

	//util
	DataTable.prototype.isChanged = _util.isChanged;

	DataTable.DEFAULTS = {
	    pageSize: 20,
	    pageIndex: 0,
	    totalPages: 0,
	    pageCache: false,
	    enable: true
	};

	DataTable.META_DEFAULTS = {
	    enable: true,
	    required: false,
	    descs: {}
	};

	//事件类型
	DataTable.ON_ROW_SELECT = 'select';
	DataTable.ON_ROW_UNSELECT = 'unSelect';
	DataTable.ON_ROW_ALLSELECT = 'allSelect';
	DataTable.ON_ROW_ALLUNSELECT = 'allUnselect';
	DataTable.ON_VALUE_CHANGE = 'valueChange';
	DataTable.ON_BEFORE_VALUE_CHANGE = 'beforeValueCHange';
	DataTable.ON_CURRENT_VALUE_CHANGE = 'currentValueChange'; //当前行变化
	//  DataTable.ON_AFTER_VALUE_CHANGE = 'afterValueChange'
	//  DataTable.ON_ADD_ROW = 'addRow'
	DataTable.ON_INSERT = 'insert';
	DataTable.ON_UPDATE = 'update';
	DataTable.ON_CURRENT_UPDATE = 'currentUpdate';
	DataTable.ON_DELETE = 'delete';
	DataTable.ON_DELETE_ALL = 'deleteAll';
	DataTable.ON_ROW_FOCUS = 'focus';
	DataTable.ON_ROW_UNFOCUS = 'unFocus';
	DataTable.ON_LOAD = 'load';
	DataTable.ON_ENABLE_CHANGE = 'enableChange';
	DataTable.ON_META_CHANGE = 'metaChange';
	DataTable.ON_ROW_META_CHANGE = 'rowMetaChange';
	DataTable.ON_CURRENT_META_CHANGE = 'currentMetaChange';
	DataTable.ON_CURRENT_ROW_CHANGE = 'currentRowChange';

	DataTable.SUBMIT = {
	    current: 'current',
	    focus: 'focus',
	    all: 'all',
	    select: 'select',
	    change: 'change',
	    empty: 'empty',
	    allSelect: 'allSelect',
	    allPages: 'allPages'
	};

	DataTable.createMetaItems = function (metas) {
	    var newMetas = {};
	    for (var key in metas) {
	        var meta = metas[key];
	        if (typeof meta == 'string') meta = {};
	        newMetas[key] = (0, _extend.extend)({}, DataTable.META_DEFAULTS, meta);
	    }
	    return newMetas;
	};

	exports.DataTable = DataTable;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Events = undefined;

	var _events = __webpack_require__(30);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * Module : Kero webpack entry events index
	                                                                                                                                                           * Author : liuyk(liuyuekai@yonyou.com)
	                                                                                                                                                           * Date   : 2016-08-09 15:24:46
	                                                                                                                                                           */

	//相关依赖导入


	var Events = function Events() {
	  _classCallCheck(this, Events);
	};

	Events.prototype.on = _events.on;
	Events.prototype.off = _events.off;
	Events.prototype.one = _events.one;
	Events.prototype.trigger = _events.trigger;
	Events.prototype.getEvent = _events.getEvent;

	exports.Events = Events;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Module : kero dataTable events
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-07-30 14:34:01
	 */

	/**
	 * 绑定事件
	 * 支持的格式： 1. on(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
	 * 2. on([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
	 * 3. on({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
	 */
	var on = function on(name, _callback, one) {
	    var self = this,
	        origCb = _callback;
	    if (Object.prototype.toString.call(name) == '[object Array]') {
	        // 数组
	        for (var i in name) {
	            this.on(name[i], _callback);
	        }
	        return this;
	    } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
	        // map
	        for (var key in name) {
	            this.on(key, name[key]);
	        }
	        return this;
	    }
	    if (one) {
	        _callback = function callback() {
	            self.off(name, _callback);
	            origCb.apply(this, arguments);
	        };
	    }
	    name = name.toLowerCase();
	    this._events || (this._events = {});
	    var events = this._events[name] || (this._events[name] = []);
	    events.push({
	        callback: _callback
	    });
	    return this;
	};

	/**
	 * 解绑事件
	 * 
	**/
	var off = function off(name, callback) {
	    if (Object.prototype.toString.call(name) == '[object Array]') {
	        // 数组
	        for (var i in name) {
	            this.off(name[i], callback);
	        }
	        return this;
	    } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
	        // map
	        for (var key in name) {
	            this.off(key, name[key]);
	        }
	        return this;
	    }
	    var cbs = this._events[name];
	    if (!cbs) return this;
	    if (!callback) {
	        // 解绑所有事件
	        cbs = null;
	    } else {
	        for (var i = cbs.length - 1; i >= 0; i--) {
	            if (cbs[i] == callback) {
	                cbs.splice(i, 1);
	            }
	        }
	    }
	    return this;
	};

	/**
	 * 
	**/
	var one = function one(name, callback) {
	    this.on(name, callback, 1);
	};

	/**
	 * 触发事件
	 */
	var trigger = function trigger(name) {
	    name = name.toLowerCase();
	    if (!this._events || !this._events[name]) return this;
	    var args = Array.prototype.slice.call(arguments, 1);
	    var events = this._events[name];
	    for (var i = 0, count = events.length; i < count; i++) {
	        events[i].callback.apply(this, args);
	    }
	    return this;
	};

	var triggerReturn = function triggerReturn(name) {
	    name = name.toLowerCase();
	    if (!this._events || !this._events[name]) return this;
	    var args = Array.prototype.slice.call(arguments, 1);
	    var events = this._events[name];
	    var flag = true;
	    for (var i = 0, count = events.length; i < count; i++) {
	        flag = flag && events[i].callback.apply(this, args);
	    }
	    return flag;
	};

	var getEvent = function getEvent(name) {
	    name = name.toLowerCase();
	    this._events || (this._events = {});
	    return this._events[name];
	};

	exports.on = on;
	exports.off = off;
	exports.one = one;
	exports.trigger = trigger;
	exports.triggerReturn = triggerReturn;
	exports.getEvent = getEvent;

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable copyRow
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-08-01 14:34:01
	 */

	var copyRow = function copyRow(index, row) {
	    this.copyRows(index, [row]);
	};

	var copyRows = function copyRows(index, rows) {
	    for (var i = 0; i < rows.length; i++) {
	        var newRow = new Row({ parent: this });
	        if (rows[i]) {
	            newRow.setData(rows[i].getData());
	        }
	        this.insertRows(index === undefined ? this.rows().length : index, [newRow]);
	    }
	};

	exports.copyRow = copyRow;
	exports.copyRows = copyRows;

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable data
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-30 14:34:01
	 */

	/**
	 *设置数据
	 *
	 */
	var setData = function setData(data, options) {
	    if (data.pageIndex || data.pageIndex === 0) {
	        var newIndex = data.pageIndex;
	    } else {
	        var newIndex = this.pageIndex();
	    }
	    if (data.pageSize || data.pageSize === 0) {
	        var newSize = data.pageSize;
	    } else {
	        var newSize = this.pageSize();
	    }
	    if (data.totalPages || data.totalPages === 0) {
	        var newTotalPages = data.totalPages;
	    } else {
	        var newTotalPages = this.totalPages();
	    }
	    if (data.totalRow || data.totalRow === 0) {
	        var newTotalRow = data.totalRow;
	    } else {
	        if (data.rows) var newTotalRow = data.rows.length;else var newTotalRow = this.totalRow();
	    }
	    var select,
	        focus,
	        unSelect = options ? options.unSelect : false;

	    this.pageIndex(newIndex);
	    this.pageSize(newSize);

	    this.pageCache = data.pageCache || this.pageCache;
	    if (this.pageCache === true) {
	        this.updatePages(data.pages);
	        if (newIndex != this.pageIndex()) {
	            this.setCurrentPage(newIndex, true);
	            this.totalPages(newTotalPages);
	            this.totalRow(newTotalRow + this.newCount);
	            return;
	        } else {
	            // 首先删除数据，然后将当前页数据插入
	            this.removeAllRows();
	            select = this.getPage(newIndex).selectedIndices;
	            focus = this.getPage(newIndex).focus;
	            var rows = this.setRows(this.getPage(newIndex).rows, options);
	            this.getPage(newIndex).rows = rows;
	        }
	        // 后台传入totalPages及totalRow才进行更新
	        if (data.totalPages) {
	            this.totalPages(data.totalPages);
	        }
	        if (data.totalRow || data.totalRow === 0) {
	            this.totalRow(data.totalRow + this.newCount);
	        }
	    } else {
	        select = data.select || (!unSelect ? [0] : []);
	        focus = data.focus !== undefined ? data.focus : data.current;
	        this.setRows(data.rows, options);
	        this.totalPages(newTotalPages);
	        this.totalRow(newTotalRow);
	    }

	    this.updateSelectedIndices();

	    if (select && select.length > 0 && this.rows().length > 0) this.setRowsSelect(select);
	    if (focus !== undefined && this.getRow(focus)) this.setRowFocus(focus);
	};

	var setValue = function setValue(fieldName, value, row, ctx) {
	    if (arguments.length === 1) {
	        value = fieldName;
	        fieldName = '$data';
	    }

	    row = row ? row : this.getCurrentRow();
	    if (row) row.setValue(fieldName, value, ctx);
	};

	exports.setData = setData;
	exports.setValue = setValue;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable enable
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */

	var isEnable = function isEnable(fieldName) {
	    var fieldEnable = this.getMeta(fieldName, 'enable');
	    if (typeof fieldEnable == 'undefined' || fieldEnable == null) fieldEnable = true;
	    return fieldEnable && this.enable;
	};

	var setEnable = function setEnable(enable) {
	    if (this.enable == enable) return;
	    //当传入的参数不为false时，默认enable为true
	    if (enable === false) {
	        enable = false;
	    } else {
	        enable = true;
	    }
	    this.enable = enable;
	    this.enableChange(-this.enableChange());
	    this.trigger(DataTable.ON_ENABLE_CHANGE, {
	        enable: this.enable
	    });
	};

	exports.isEnable = isEnable;
	exports.setEnable = setEnable;

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable getCurrent
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */

	/**
	 * 获取当前操作行
	 * 规则： focus 行优先，没有focus行时，取第一选中行
	 */
	var getCurrentRow = function getCurrentRow() {
	    if (this.focusIndex() != -1) return this.getFocusRow();
	    var index = this.getSelectedIndex();
	    if (index == -1) return null;else return this.getRow(index);
	};

	var getCurrentIndex = function getCurrentIndex() {
	    if (this.focusIndex() != -1) return this.focusIndex();
	    var index = this.getSelectedIndex();
	    if (index == -1) return -1;else return index;
	};

	exports.getCurrentRow = getCurrentRow;
	exports.getCurrentIndex = getCurrentIndex;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable getData
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-07-30 14:34:01
	 */

	/**
	 * 获取当前页数据
	 */
	var getData = function getData() {
	    var datas = [],
	        rows = this.rows();
	    for (var i = 0; i < rows.length; i++) {
	        datas.push(rows[i].getData());
	    }
	    return datas;
	};

	/**
	 * 将page转为row对象格式
	 */
	var page2data = function page2data(page, pageIndex) {
	    var data = {};
	    data.focus = page.focus;
	    data.index = pageIndex;
	    data.select = page.selectedIndices;
	    return data;
	};

	var getDataByRule = function getDataByRule(rule) {
	    var returnData = {},
	        datas = null,
	        rows;
	    returnData.meta = this.meta;
	    returnData.params = this.params;
	    rule = rule || DataTable.SUBMIT.current;
	    // 存在多页及不存在多页分开处理
	    if (this.pageCache) {
	        var pages = this.getPages();
	        if (rule == DataTable.SUBMIT.current || rule == DataTable.SUBMIT.focus) {
	            datas = [];
	            var pageIndex = this.pageIndex();
	            var currPage = pages[pageIndex];
	            if (currPage) {
	                var currIndex = this.focusIndex();
	                if (rule == DataTable.SUBMIT.current) {
	                    if (currIndex == -1) currIndex = this.getSelectedIndex();
	                }
	                var data = page2data(currPage, pageIndex);
	                data.rows = [];
	                for (var i = 0, count = currPage.rows.length; i < count; i++) {
	                    var row = currPage.rows[i].getData();
	                    if (i != currIndex) row.data = {};
	                    data.rows.push(row);
	                }
	                datas.push(data);
	            }
	        } else if (rule == DataTable.SUBMIT.all || rule == DataTable.SUBMIT.allPages) {
	            datas = [];
	            for (var i = 0; i < pages.length; i++) {
	                var currPage = pages[i];
	                var data = page2data(currPage, i);
	                data.rows = [];
	                for (var i = 0; i < currPage.rows.length; i++) {
	                    data.rows.push(currPage.rows[i].getData());
	                }
	                datas.push(data);
	            }
	        } else if (rule == DataTable.SUBMIT.select) {
	            datas = [];
	            var pageIndex = this.pageIndex();
	            var currPage = pages[pageIndex];
	            if (currPage) {
	                var data = page2data(currPage, pageIndex);
	                data.rows = [];
	                for (var i = 0, count = currPage.rows.length; i < count; i++) {
	                    var row = currPage.rows[i].getData();
	                    if (data.select.indexOf(i) < 0) row.data = {};
	                    data.rows.push(row);
	                }
	                datas.push(data);
	            }
	        } else if (rule == DataTable.SUBMIT.allSelect) {
	            datas = [];
	            for (var i = 0; i < pages.length; i++) {
	                var currPage = pages[i];
	                var data = page2data(currPage, i);
	                data.rows = [];
	                for (var j = 0, count = currPage.rows.length; j < count; j++) {
	                    var row = currPage.rows[j].getData();
	                    if (data.select.indexOf(j) < 0) row.data = {};
	                    data.rows.push(row);
	                }
	                datas.push(data);
	            }
	        } else if (rule == DataTable.SUBMIT.change) {
	            datas = [];
	            for (var i = 0; i < pages.length; i++) {
	                var currPage = pages[i];
	                var data = page2data(currPage, i);
	                data.rows = [];
	                for (var j = 0, count = currPage.rows.length; j < count; j++) {
	                    var row = currPage.rows[j].getData();
	                    if (row.status == Row.STATUS.NORMAL) {
	                        row.data = {};
	                    }
	                    data.rows.push(row);
	                }
	                datas.push(data);
	            }
	        } else if (rule === DataTable.SUBMIT.empty) {
	            datas = [];
	        }
	        if (pages.length < 1 || !pages[this.pageIndex()]) {
	            datas = [{ index: this.pageIndex(), select: [], focus: -1, rows: [] }];
	        }
	        returnData.pages = datas;
	    } else {
	        if (rule == DataTable.SUBMIT.current) {
	            datas = [];
	            var currIndex = this.focusIndex();
	            if (currIndex == -1) currIndex = this.getSelectedIndex();
	            rows = this.rows();
	            for (var i = 0, count = rows.length; i < count; i++) {
	                if (i == currIndex) datas.push(rows[i].getData());else datas.push(rows[i].getEmptyData());
	            }
	        } else if (rule == DataTable.SUBMIT.focus) {
	            datas = [];
	            rows = this.rows();
	            for (var i = 0, count = rows.length; i < count; i++) {
	                if (i == this.focusIndex()) datas.push(rows[i].getData());else datas.push(rows[i].getEmptyData());
	            }
	        } else if (rule == DataTable.SUBMIT.all) {
	            datas = this.getData();
	        } else if (rule == DataTable.SUBMIT.select) {
	            datas = this.getSelectedDatas(true);
	        } else if (rule == DataTable.SUBMIT.change) {
	            datas = this.getChangedDatas();
	        } else if (rule === DataTable.SUBMIT.empty) {
	            datas = [];
	        }

	        returnData.rows = datas;
	        returnData.select = this.getSelectedIndexs();
	        returnData.focus = this.getFocusIndex();
	    }

	    returnData.pageSize = this.pageSize();
	    returnData.pageIndex = this.pageIndex();
	    returnData.isChanged = this.isChanged();
	    returnData.master = this.master;
	    returnData.pageCache = this.pageCache;
	    return returnData;
	};

	var getRow = function getRow(index) {
	    //return this.rows()[index]   //modify by licza.   improve performance
	    return this.rows.peek()[index];
	};

	var getChildRow = function getChildRow(obj) {
	    var fullField = obj.fullField,
	        index = obj.index,
	        row = null;
	    if (parseInt(index) > -1) {
	        if ((index + '').indexOf('.') > 0) {
	            var fieldArr = fullField.split('.');
	            var indexArr = index.split('.');
	            var nowDatatable = this;
	            var nowRow = null;
	            for (var i = 0; i < indexArr.length; i++) {
	                nowRow = nowDatatable.getRow(indexArr[i]);
	                if (i < indexArr.length - 1) {
	                    if (nowRow) {
	                        nowDatatable = nowRow.getValue(fieldArr[i]);
	                    } else {
	                        nowRow = null;
	                        break;
	                    }
	                }
	            }
	            row = nowRow;
	        } else {
	            row = this.getRow(index);
	        }
	    }
	    return row;
	};

	/**
	 * 根据rowid取row对象
	 * @param rowid
	 * @returns {*}
	 */
	var getRowByRowId = function getRowByRowId(rowid) {
	    var rows = this.rows.peek();
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (rows[i].rowId == rowid) return rows[i];
	    }
	    return null;
	};

	/**
	 * 取行索引
	 * @param row
	 * @returns {*}
	 */
	var getRowIndex = function getRowIndex(row) {
	    var rows = this.rows.peek();
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (rows[i].rowId === row.rowId) return i;
	    }
	    return -1;
	};

	var getRowsByField = function getRowsByField(field, value) {
	    var rows = this.rows.peek();
	    var returnRows = new Array();
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (rows[i].getValue(field) === value) returnRows.push(rows[i]);
	    }
	    return returnRows;
	};

	var getRowByField = function getRowByField(field, value) {
	    var rows = this.rows.peek();
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (rows[i].getValue(field) === value) return rows[i];
	    }
	    return null;
	};

	var getAllRows = function getAllRows() {
	    return this.rows.peek();
	};

	var getAllPageRows = function getAllPageRows() {
	    var datas = [],
	        rows;
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
	};

	/**
	 * 获取变动的数据(新增、修改)
	 */
	var getChangedDatas = function getChangedDatas(withEmptyRow) {
	    var datas = [],
	        rows = this.rows();
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
	            datas.push(rows[i].getData());
	        } else if (withEmptyRow == true) {
	            datas.push(rows[i].getEmptyData());
	        }
	    }
	    return datas;
	};

	/**
	 * 取改变的行
	 */
	var getChangedRows = function getChangedRows() {
	    var changedRows = [],
	        rows = this.rows.peek();
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
	            changedRows.push(rows[i]);
	        }
	    }
	    return changedRows;
	};

	var getValue = function getValue(fieldName, row) {
	    row = row || this.getCurrentRow();
	    if (row) return row.getValue(fieldName);else return '';
	};

	/**
	 * 根据行号获取行索引
	 * @param {String} rowId
	 */
	var getIndexByRowId = function getIndexByRowId(rowId) {
	    var rows = this.rows();
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (rows[i].rowId == rowId) return i;
	    }
	    return -1;
	};

	/**
	 * 获取所有行数据
	 */
	var getAllDatas = function getAllDatas() {
	    var rows = this.getAllRows();
	    var datas = [];
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (rows[i]) datas.push(rows[i].getData());
	    }return datas;
	};

	/**
	 * 根据索引取rowid
	 * @param {Object} indices
	 */
	var getRowIdsByIndices = function getRowIdsByIndices(indices) {
	    var rowIds = [];
	    for (var i = 0; i < indices.length; i++) {
	        rowIds.push(this.getRow(indices[i]).rowId);
	    }
	    return rowIds;
	};

	exports.getData = getData;
	exports.getDataByRule = getDataByRule;
	exports.getRow = getRow;
	exports.getChildRow = getChildRow;
	exports.getRowByRowId = getRowByRowId;
	exports.getRowIndex = getRowIndex;
	exports.getRowsByField = getRowsByField;
	exports.getRowByField = getRowByField;
	exports.getAllRows = getAllRows;
	exports.getAllPageRows = getAllPageRows;
	exports.getChangedDatas = getChangedDatas;
	exports.getChangedRows = getChangedRows;
	exports.getValue = getValue;
	exports.getIndexByRowId = getIndexByRowId;
	exports.getAllDatas = getAllDatas;
	exports.getRowIdsByIndices = getRowIdsByIndices;

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Module : kero dataTable getFocus
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */

	/**
	 * 获取焦点行
	 */
	var getFocusRow = function getFocusRow() {
	  if (this.focusIndex() != -1) return this.getRow(this.focusIndex());else return null;
	};

	/**
	 * 获取焦点行
	 */
	var getFocusIndex = function getFocusIndex() {
	  return this.focusIndex();
	};

	exports.getFocusRow = getFocusRow;
	exports.getFocusIndex = getFocusIndex;

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable getMete
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-30 14:34:01
	 */

	/**
	 * 获取meta信息，先取row上的信息，没有时，取dataTable上的信息
	 * @param {Object} fieldName
	 * @param {Object} key
	 * @param {Object} row
	 */
	var getMeta = function getMeta(fieldName, key) {
	    if (arguments.length === 0) return this.meta;else if (arguments.length === 1) return this.meta[fieldName];

	    if (this.meta[fieldName] && typeof this.meta[fieldName][key] !== 'undefined') {
	        return this.meta[fieldName][key];
	    } else {
	        return null;
	    }
	};

	var getRowMeta = function getRowMeta(fieldName, key) {
	    var row = this.getCurrentRow();
	    if (row) return row.getMeta(fieldName, key);else return this.getMeta(fieldName, key);
	};

	exports.getMeta = getMeta;
	exports.getRowMeta = getRowMeta;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable getPage
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-08-01 14:34:01
	 */

	var getPage = function getPage(pageIndex) {
	    if (this.pageCache) {
	        return this.cachedPages[pageIndex];
	    }
	    return -1;
	};

	var getPages = function getPages() {
	    if (this.pageCache) {
	        return this.cachedPages;
	    }
	    return [];
	};

	exports.getPage = getPage;
	exports.getPages = getPages;

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Module : kero dataTable getParam
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-30 14:34:01
	 */

	var getParam = function getParam(key) {
	  return this.params[key];
	};

	exports.getParam = getParam;

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable getSelect
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-01 14:34:01
	 */

	/**
	 * 获取选中行索引，多选时，只返回第一个行索引
	 */
	var getSelectedIndex = function getSelectedIndex() {
	    var selectedIndices = this.selectedIndices();
	    if (selectedIndices == null || selectedIndices.length == 0) return -1;
	    return selectedIndices[0];
	};

	/**
	 *获取选中的所有行索引数组索引
	 */
	var getSelectedIndices = function getSelectedIndices() {
	    var selectedIndices = this.selectedIndices();
	    if (selectedIndices == null || selectedIndices.length == 0) return [];
	    return selectedIndices;
	};

	/**
	 * 兼容保留，不要用
	 */
	var getSelectedIndexs = function getSelectedIndexs() {
	    return this.getSelectedIndices();
	};

	/**
	 * 获取选中行数据
	 */
	var getSelectedDatas = function getSelectedDatas(withEmptyRow) {
	    var selectedIndices = this.selectedIndices();
	    var datas = [];
	    var sIndices = [];
	    for (var i = 0, count = selectedIndices.length; i < count; i++) {
	        sIndices.push(selectedIndices[i]);
	    }
	    var rows = this.rows();
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (sIndices.indexOf(i) != -1) datas.push(rows[i].getData());else if (withEmptyRow == true) datas.push(rows[i].getEmptyData());
	    }
	    return datas;
	};

	/**
	 * 取选中行
	 */
	var getSelectedRows = function getSelectedRows() {
	    var selectedIndices = this.selectedIndices();
	    var selectRows = [];
	    var rows = this.rows.peek();
	    var sIndices = [];
	    for (var i = 0, count = selectedIndices.length; i < count; i++) {
	        sIndices.push(selectedIndices[i]);
	    }
	    for (var i = 0, count = rows.length; i < count; i++) {
	        if (sIndices.indexOf(i) != -1) selectRows.push(rows[i]);
	    }
	    return selectRows;
	};

	exports.getSelectedIndex = getSelectedIndex;
	exports.getSelectedIndices = getSelectedIndices;
	exports.getSelectedIndexs = getSelectedIndexs;
	exports.getSelectedDatas = getSelectedDatas;
	exports.getSelectedRows = getSelectedRows;

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable getSimpleData
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-08-01 14:34:01
	 */

	/**
	 * 获取数据,只取字段名与字段值
	 */
	var getSimpleData = function getSimpleData(options) {
	    options = options || {};
	    var rows,
	        _rowData = [],
	        type = options['type'] || 'all',
	        fields = options['fields'] || null;

	    if (type === 'all') {
	        rows = this.rows.peek();
	    } else if (type === 'current') {
	        var currRow = this.getCurrentRow();
	        rows = currRow == null ? [] : [currRow];
	    } else if (type === 'focus') {
	        var focusRow = this.getFocusRow();
	        rows = focusRow == null ? [] : [focusRow];
	    } else if (type === 'select') {
	        rows = this.getSelectedRows();
	    } else if (type === 'change') {
	        rows = this.getChangedRows();
	    }

	    for (var i = 0; i < rows.length; i++) {
	        _rowData.push(rows[i].getSimpleData({ fields: fields }));
	    }
	    if (_rowData.length == 0) {
	        _rowData = this.setSimpleDataReal; //云采提的#需求
	    }
	    return _rowData;
	};

	exports.getSimpleData = getSimpleData;

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Module : kero dataTable mete
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-30 14:34:01
	 */

	var setMeta = function setMeta(fieldName, key, value) {
	    if (!this.meta[fieldName]) return;
	    var oldValue = this.meta[fieldName][key];
	    var currRow = this.getCurrentRow();
	    this.meta[fieldName][key] = value;
	    if (this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
	    if (key == 'enable') this.enableChange(-this.enableChange());
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
	};

	/**
	 * example: meta: {supplier: {meta: {precision:'3', default: '0239900x', display:'显示名称'}}}
	 */
	var updateMeta = function updateMeta(meta) {
	    if (!meta) {
	        return;
	    }
	    for (var fieldKey in meta) {
	        for (var propKey in meta[fieldKey]) {
	            var oldValue = this.meta[fieldKey][propKey];
	            var newValue = meta[fieldKey][propKey];
	            if (propKey === 'default') {
	                if (!this.meta[fieldKey]['default']) {
	                    this.meta[fieldKey]['default'] = {};
	                }
	                this.meta[fieldKey]['default'].value = meta[fieldKey][propKey];
	            } else if (propKey === 'display') {
	                if (!this.meta[fieldKey]['default']) {
	                    this.meta[fieldKey]['default'] = {};
	                }
	                this.meta[fieldKey]['default'].display = meta[fieldKey][propKey];
	            } else {
	                this.meta[fieldKey][propKey] = meta[fieldKey][propKey];
	            }
	            if (this.metaChange[fieldKey + '.' + propKey]) this.metaChange[fieldKey + '.' + propKey](-this.metaChange[fieldKey + '.' + propKey]());

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
	};

	/**
	 * 字段不存在时，创建字段
	 * @param fieldName
	 * @param options
	 */
	var createField = function createField(fieldName, options) {
	    //字段不主动定义，则不创建
	    if (this.root.strict == true) return;
	    //有子表的情况不创建字段
	    if (fieldName.indexOf('.') != -1) {
	        var fNames = fieldName.split('.');
	        var _name = fNames[0];
	        for (var i = 0, count = fNames.length; i < count; i++) {
	            if (this.meta[_name] && this.meta[_name]['type'] === 'child') return;
	            if (i + 1 < count) _name = _name + '.' + fNames[i + 1];
	        }
	    }
	    if (!this.meta[fieldName]) {
	        this.meta[fieldName] = {};
	    }
	    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	        if (options['meta']) {
	            for (var key in options['meta']) {
	                //if (!this.meta[fieldName][key]){
	                this.meta[fieldName]['meta'][key] = options['meta'][key];
	                //}
	            }
	        } else {
	            for (var key in options) {
	                //if (!this.meta[fieldName][key]){
	                this.meta[fieldName][key] = options[key];
	                //}
	            }
	        }
	    }
	    // 在顶层dataTable上定义field信息
	    if (this.root !== this) {
	        var nsArr = this.ns.split('.');
	        var _fieldMeta = this.root.meta;
	        for (var i = 0; i < nsArr.length; i++) {
	            _fieldMeta[nsArr[i]] = _fieldMeta[nsArr[i]] || {};
	            _fieldMeta[nsArr[i]]['type'] = _fieldMeta[nsArr[i]]['type'] || 'child';
	            _fieldMeta[nsArr[i]]['meta'] = _fieldMeta[nsArr[i]]['meta'] || {};
	            _fieldMeta = _fieldMeta[nsArr[i]]['meta'];
	        }
	        if (!_fieldMeta[fieldName]) {
	            _fieldMeta[fieldName] = {};
	        }
	        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	            for (var key in options) {
	                if (!_fieldMeta[fieldName][key]) {
	                    _fieldMeta[fieldName][key] = options[key];
	                }
	            }
	        }
	    }
	};

	exports.setMeta = setMeta;
	exports.updateMeta = updateMeta;
	exports.createField = createField;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable page
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-08-01 14:34:01
	 */

	var setCurrentPage = function setCurrentPage(pageIndex, notCacheCurrentPage) {
	    var nowTotalRow = this.totalRow();
	    if (pageIndex != this.pageIndex() && notCacheCurrentPage != true) this.cacheCurrentPage();
	    this.pageIndex(pageIndex);
	    var cachedPage = this.cachedPages[this.pageIndex()];
	    if (cachedPage) {
	        // 取当前页的选中行重设选中行
	        var selectedIndices = cachedPage.selectedIndices;
	        this.removeAllRows();
	        this.setRows(cachedPage.rows);
	        this.setRowsSelect(selectedIndices);
	    }
	    this.totalRow(nowTotalRow);
	};

	/**
	 * 更新分页数据
	 */
	var updatePages = function updatePages(pages) {
	    var pageSize = this.pageSize(),
	        pageIndex = 0,
	        page,
	        r,
	        row;
	    var page, index, i, rows, focus, selectIndices, status, j, row, originRow;
	    for (i = 0; i < pages.length; i++) {
	        index = pages[i].index;
	        rows = pages[i].rows;
	        focus = pages[i].current;
	        selectIndices = pages[i].select;
	        status = pages[i].status;
	        if (status === 'del') {
	            this.cachedPages[index] = null;
	            continue;
	        }
	        if (!this.cachedPages[index]) {
	            page = new Page({ parent: this });
	            page.rows = rows;
	            for (var j = 0; j < page.rows.length; j++) {
	                page.rows[j].rowId = page.rows[j].id;
	                delete page.rows[j].id;
	            }
	            this.cachedPages[index] = page;
	            page.selectedIndices = selectIndices;
	            page.focus = focus;
	        } else {
	            page = this.cachedPages[index];
	            page.selectedIndices = selectIndices;
	            page.focus = focus;
	            for (var j = 0; j < rows.length; j++) {
	                r = rows[j];
	                if (!r.id) r.id = Row.getRandomRowId();
	                if (r.status == Row.STATUS.DELETE) {

	                    var row = page.getRowByRowId(r.id);
	                    if (row) {
	                        // 针对后台不传回总行数的情况下更新总行数
	                        var oldTotalRow = this.totalRow();
	                        var newTotalRow = oldTotalRow - 1;
	                        this.totalRow(newTotalRow);
	                        if (row.status == Row.STATUS.NEW) {
	                            this.newCount -= 1;
	                            if (this.newCount < 0) this.newCount = 0;
	                        }
	                    }
	                    this.removeRowByRowId(r.id);
	                    page.removeRowByRowId(r.id);
	                } else {
	                    row = page.getRowByRowId(r.id);
	                    if (row) {
	                        page.updateRow(row, r);
	                        // if(row.status == Row.STATUS.NEW){
	                        //     // 针对后台不传回总行数的情况下更新总行数
	                        //     var oldTotalRow = this.totalRow();
	                        //     var newTotalRow = oldTotalRow + 1;
	                        //     this.totalRow(newTotalRow);
	                        // }
	                        if (row.status == Row.STATUS.NEW && r.status != Row.STATUS.NEW) {
	                            this.newCount -= 1;
	                            if (this.newCount < 0) this.newCount = 0;
	                        }
	                        row.status = Row.STATUS.NORMAL;
	                        if (r.status == Row.STATUS.NEW) {
	                            row.status = Row.STATUS.NEW;
	                        }
	                    } else {
	                        r.rowId = r.id;
	                        delete r.id;
	                        page.rows.push(r);
	                        if (r.status != Row.STATUS.NEW) {
	                            r.status = Row.STATUS.NORMAL;
	                        } else {
	                            this.newCount += 1;
	                        }
	                        // 针对后台不传回总行数的情况下更新总行数
	                        var oldTotalRow = this.totalRow();
	                        var newTotalRow = oldTotalRow + 1;
	                        this.totalRow(newTotalRow);
	                    }
	                }
	            }
	        }
	    }
	};

	/**
	 * 前端分页方法，不建议使用，建议在后端进行分页
	 * @param allRows
	 */
	var setPages = function setPages(allRows) {
	    var pageSize = this.pageSize(),
	        pageIndex = 0,
	        page;
	    this.cachedPages = [];
	    for (var i = 0; i < allRows.length; i++) {
	        pageIndex = Math.floor(i / pageSize);
	        if (!this.cachedPages[pageIndex]) {
	            page = new Page({ parent: this });
	            this.cachedPages[pageIndex] = page;
	        }
	        page.rows.push(allRows[i]);
	    }
	    if (this.pageIndex() > -1) this.setCurrentPage(this.pageIndex());
	    this.totalRow(allRows.length);
	    this.totalPages(pageIndex + 1);
	};

	var hasPage = function hasPage(pageIndex) {
	    return this.pageCache && this.cachedPages[pageIndex] ? true : false;
	};

	var clearCache = function clearCache() {
	    this.cachedPages = [];
	};

	var cacheCurrentPage = function cacheCurrentPage() {
	    if (this.pageCache && this.pageIndex() > -1) {
	        var page = new Page({ parent: this });
	        page.focus = this.getFocusIndex();
	        page.selectedIndices = this.selectedIndices().slice();
	        var rows = this.rows.peek();
	        for (var i = 0; i < rows.length; i++) {
	            var r = rows[i].getData();
	            r.rowId = r.id;
	            delete r.id;
	            page.rows.push(r);
	        }
	        this.cachedPages[this.pageIndex()] = page;
	    }
	};

	/**
	 * [updatePagesSelect 根据datatable的选中行更新每页的选中行]
	 */
	var updatePagesSelect = function updatePagesSelect() {
	    var selectRows = this.getSelectedRows();
	    var pages = this.getPages();
	    for (var i = 0; i < pages.length; i++) {
	        var rows = pages[i].rows;
	        var selectedIndices = [];
	        for (var j = 0; j < selectRows.length; j++) {
	            var nowSelectRow = selectRows[j];
	            for (var k = 0; k < rows.length; k++) {
	                var row = rows[k];
	                if (nowSelectRow == row) {
	                    selectedIndices.push(k);
	                    break;
	                }
	            }
	        }
	        pages[i].selectedIndices = selectedIndices;
	    }
	};

	/**
	 * [updatePageRows 根据datatable的rows更新当前页的rows]
	 */
	var updatePageRows = function updatePageRows() {
	    if (this.pageCache) {
	        var pageIndex = this.pageIndex();
	        var page = this.getPages()[pageIndex];
	        if (page) {
	            page.rows = this.rows();
	        }
	    }
	};

	/**
	 * [updatePageSelect 根据datatable的选中行更新page的选中行]
	 */
	var updatePageSelect = function updatePageSelect() {
	    if (this.pageCache) {
	        var pageIndex = this.pageIndex();
	        var page = this.getPages()[pageIndex];
	        if (page) {
	            var selectedIndices = this.selectedIndices().slice();
	            page.selectedIndices = selectedIndices;
	        }
	    }
	};

	/**
	 * [updatePageFocus 根据datatable的focus更新page的focus]
	 */
	var updatePageFocus = function updatePageFocus() {
	    if (this.pageCache) {
	        var pageIndex = this.pageIndex();
	        var page = this.getPages()[pageIndex];
	        if (page) {
	            page.focus = this.getFocusIndex();
	        }
	    }
	};

	/**
	 * [updatePageAll 根据datatable更新page对象]
	 */
	var updatePageAll = function updatePageAll() {
	    this.updatePageRows();
	    this.updatePageSelect();
	    this.updatePageFocus();
	};

	exports.setCurrentPage = setCurrentPage;
	exports.updatePages = updatePages;
	exports.setPages = setPages;
	exports.hasPage = hasPage;
	exports.clearCache = clearCache;
	exports.cacheCurrentPage = cacheCurrentPage;
	exports.updatePagesSelect = updatePagesSelect;
	exports.updatePageRows = updatePageRows;
	exports.updatePageSelect = updatePageSelect;
	exports.updatePageFocus = updatePageFocus;
	exports.updatePageAll = updatePageAll;

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable param
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-07-30 14:34:01
	 */

	var addParam = function addParam(key, value) {
	    this.params[key] = value;
	};

	var addParams = function addParams(params) {
	    for (var key in params) {
	        this.params[key] = params[key];
	    }
	};

	exports.addParam = addParam;
	exports.addParams = addParams;

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable ref
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-01 14:34:01
	 */

	var refSelectedRows = function refSelectedRows() {
	    return ko.pureComputed({
	        read: function read() {
	            var ins = this.selectedIndices() || [];
	            var rs = this.rows();
	            var selectedRows = [];
	            for (var i = 0; i < ins.length; i++) {
	                selectedRows.push(rs[i]);
	            }
	            return selectedRows;
	        }, owner: this
	    });
	};

	/**
	 * 绑定字段值
	 * @param {Object} fieldName
	 */
	var ref = function ref(fieldName) {
	    this.createField(fieldName);
	    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
	    return ko.pureComputed({
	        read: function read() {
	            this.valueChange[fieldName]();
	            this.currentRowChange();
	            var row = this.getCurrentRow();
	            if (row) {
	                return row.getChildValue(fieldName);
	            } else return '';
	        },
	        write: function write(value) {
	            var row = this.getCurrentRow();
	            if (row) row.setChildValue(fieldName, value);
	        },
	        owner: this
	    });
	};

	var refByRow = function refByRow(obj) {
	    var fieldName = obj.fieldName,
	        fullField = obj.fullField;
	    this.createField(fieldName);
	    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
	    return ko.pureComputed({
	        read: function read() {
	            this.valueChange[fieldName]();
	            this.currentRowChange();
	            var row,
	                index = obj.index + '';
	            var childRowObj = {
	                fullField: fullField,
	                index: index
	            };
	            row = this.getChildRow(childRowObj);

	            if (row) {
	                return row.getChildValue(fieldName);
	            } else return '';
	        },
	        write: function write(value) {
	            var row;
	            if (obj.index > -1) row = this.getRow(obj.index);
	            if (row) row.setChildValue(fieldName, value);
	        },
	        owner: this
	    });
	};
	/**
	 * 绑定字段属性
	 * @param {Object} fieldName
	 * @param {Object} key
	 */
	var refMeta = function refMeta(fieldName, key) {
	    if (!this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key] = ko.observable(1);
	    return ko.pureComputed({
	        read: function read() {
	            this.metaChange[fieldName + '.' + key]();
	            this.currentRowChange();
	            return this.getMeta(fieldName, key);
	        },
	        write: function write(value) {
	            this.setMeta(fieldName, key, value);
	        },
	        owner: this
	    });
	};

	var refRowMeta = function refRowMeta(fieldName, key) {
	    if (!this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key] = ko.observable(1);
	    return ko.pureComputed({
	        read: function read() {
	            this.metaChange[fieldName + '.' + key]();
	            this.currentRowChange();
	            var row = this.getCurrentRow();
	            if (row) return row.getMeta(fieldName, key);else return this.getMeta(fieldName, key);
	        },
	        write: function write(value) {
	            var row = this.getCurrentRow();
	            if (row) row.setMeta(fieldName, value);
	        },
	        owner: this
	    });
	};

	var refEnable = function refEnable(fieldName) {
	    return ko.pureComputed({
	        //enable优先级： dataTable.enable >  row上的enable >  field中的enable定义
	        read: function read() {
	            this.enableChange();
	            if (!fieldName) return this.enable;
	            var fieldEnable = this.getRowMeta(fieldName, 'enable');
	            if (typeof fieldEnable == 'undefined' || fieldEnable == null) fieldEnable = true;
	            return fieldEnable && this.enable;
	        },
	        owner: this
	    });
	};

	exports.refSelectedRows = refSelectedRows;
	exports.ref = ref;
	exports.refMeta = refMeta;
	exports.refRowMeta = refRowMeta;
	exports.refEnable = refEnable;
	exports.refByRow = refByRow;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.clear = exports.removeRows = exports.removeAllRows = exports.removeRow = exports.removeRowByRowId = undefined;

	var _util = __webpack_require__(47);

	var removeRowByRowId = function removeRowByRowId(rowId) {
	    var index = this.getIndexByRowId(rowId);
	    if (index != -1) this.removeRow(index);
	}; /**
	    * Module : kero dataTable removeRow
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-08-01 14:34:01
	    */


	var removeRow = function removeRow(index) {
	    if (index instanceof Row) {
	        index = this.getIndexByRowId(index.rowId);
	    }
	    this.removeRows([index]);
	};

	var removeAllRows = function removeAllRows() {
	    this.rows([]);
	    this.selectedIndices([]);
	    this.focusIndex(-1);
	    this.trigger(DataTable.ON_DELETE_ALL);
	    this.updateCurrIndex();
	};

	var removeRows = function removeRows(indices) {
	    indices = (0, _util._formatToIndicesArray)(this, indices);
	    indices = indices.sort(function (a, b) {
	        return a - b;
	    });
	    var rowIds = [],
	        rows = this.rows(),
	        deleteRows = [];
	    for (var i = indices.length - 1; i >= 0; i--) {
	        var index = indices[i];
	        var delRow = rows[index];
	        if (delRow == null) {
	            continue;
	        }
	        rowIds.push(delRow.rowId);
	        var deleteRow = rows.splice(index, 1);
	        deleteRows.push(deleteRow[0]);
	        this.updateSelectedIndices(index, '-');
	        this.updateFocusIndex(index, '-');
	    }
	    this.rows(rows);
	    this.deleteRows = deleteRows;
	    this.trigger(DataTable.ON_DELETE, {
	        indices: indices,
	        rowIds: rowIds,
	        deleteRows: deleteRows
	    });

	    this.updateCurrIndex();
	};

	/**
	 * 清空datatable的所有数据以及分页数据以及index
	 */
	var clear = function clear() {
	    this.removeAllRows();
	    this.cachedPages = [];
	    this.totalPages(1);
	    this.pageIndex(0);
	    this.focusIndex(-1);
	    this.selectedIndices([]);
	};

	exports.removeRowByRowId = removeRowByRowId;
	exports.removeRow = removeRow;
	exports.removeAllRows = removeAllRows;
	exports.removeRows = removeRows;
	exports.clear = clear;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports._formatToIndicesArray = exports.isChanged = undefined;

	var _util = __webpack_require__(9);

	var isChanged = function isChanged() {
	    var rows = this.getAllRows();
	    for (var i = 0; i < rows.length; i++) {
	        if (rows[i].status != Row.STATUS.NORMAL) return true;
	    }
	    return false;
	}; /**
	    * Module : kero dataTable util
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-08-08 09:59:01
	    */


	var _formatToIndicesArray = function _formatToIndicesArray(dataTableObj, indices) {
	    if (typeof indices == 'string' || typeof indices == 'number') {
	        indices = [indices];
	    } else if (indices instanceof Row) {
	        indices = [dataTableObj.getIndexByRowId(indices.rowId)];
	    } else if ((0, _util.isArray)(indices) && indices.length > 0 && indices[0] instanceof Row) {
	        for (var i = 0; i < indices.length; i++) {
	            indices[i] = dataTableObj.getIndexByRowId(indices[i].rowId);
	        }
	    }
	    return indices;
	};

	exports.isChanged = isChanged;
	exports._formatToIndicesArray = _formatToIndicesArray;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createEmptyRow = exports.insertRows = exports.insertRow = exports.addRows = exports.addRow = exports.setRows = undefined;

	var _util = __webpack_require__(9);

	/**
	 * 设置行数据
	 * @param {Object} rows
	 */
	var setRows = function setRows(rows, options) {
	    var insertRows = [],
	        _id;
	    for (var i = 0; i < rows.length; i++) {
	        var r = rows[i];
	        _id = r.rowId || r.id;
	        if (!_id) _id = Row.getRandomRowId();
	        if (r.status == Row.STATUS.DELETE) {
	            this.removeRowByRowId(_id);
	        } else {
	            var row = this.getRowByRowId(_id);
	            if (row) {
	                row.updateRow(r);
	                if (!(0, _util.isEmptyObject)(r.data)) {
	                    this.trigger(DataTable.ON_UPDATE, {
	                        index: i,
	                        rows: [row]
	                    });
	                    if (row == this.getCurrentRow()) {
	                        this.currentRowChange(-this.currentRowChange());
	                        row.currentRowChange(-row.currentRowChange());
	                        this.trigger(DataTable.ON_CURRENT_UPDATE, {
	                            index: i,
	                            rows: [row]
	                        });
	                    } else {
	                        row.currentRowChange(-row.currentRowChange());
	                    }
	                }
	            } else {
	                row = new Row({ parent: this, id: _id });
	                row.setData(rows[i], null, options);
	                insertRows.push(row);
	            }
	            // 如果r对象中存在状态则更新状态为返回的状态
	            if (r.status) {
	                row.status = r.status;
	            }
	        }
	    }
	    if (insertRows.length > 0) this.addRows(insertRows);
	    return insertRows;
	};

	/**
	 *追加行
	 */
	/**
	 * Module : kero dataTable row
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-08-01 14:34:01
	 */
	var addRow = function addRow(row) {
	    this.insertRow(this.rows().length, row);
	};

	/**
	 *追加多行
	 */
	var addRows = function addRows(rows) {
	    this.insertRows(this.rows().length, rows);
	};

	var insertRow = function insertRow(index, row) {
	    if (!row) {
	        row = new Row({ parent: this });
	    }
	    this.insertRows(index, [row]);
	};

	var insertRows = function insertRows(index, rows) {
	    var args = [index, 0];
	    for (var i = 0; i < rows.length; i++) {
	        args.push(rows[i]);
	    }
	    this.rows.splice.apply(this.rows, args);

	    this.updateSelectedIndices(index, '+', rows.length);
	    this.updateFocusIndex(index, '+', rows.length);
	    this.updatePageAll();
	    this.trigger(DataTable.ON_INSERT, {
	        index: index,
	        rows: rows
	    });
	    if (this.ns) {
	        if (this.root.valueChange[this.ns]) this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
	    }
	};

	/**
	 * 创建空行
	 */
	var createEmptyRow = function createEmptyRow() {
	    var r = new Row({ parent: this });
	    this.addRow(r);
	    if (!this.getCurrentRow()) this.setRowSelect(r);
	    return r;
	};

	exports.setRows = setRows;
	exports.addRow = addRow;
	exports.addRows = addRows;
	exports.insertRow = insertRow;
	exports.insertRows = insertRows;
	exports.createEmptyRow = createEmptyRow;

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable rowCurrent
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */

	var updateCurrIndex = function updateCurrIndex() {
	    var currentIndex = this.focusIndex() != -1 ? this.focusIndex() : this.getSelectedIndex();
	    if (this._oldCurrentIndex != currentIndex) {
	        this._oldCurrentIndex = currentIndex;
	        this.trigger(DataTable.ON_CURRENT_ROW_CHANGE);
	        this.currentRowChange(-this.currentRowChange());
	        if (this.ns) {
	            if (this.root.valueChange[this.ns]) this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
	        }
	    }
	};

	exports.updateCurrIndex = updateCurrIndex;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setRowsDelete = exports.setAllRowsDelete = exports.setRowDelete = undefined;

	var _util = __webpack_require__(47);

	/**
	 * 设置行删除
	 * @param {Object} index
	 */
	var setRowDelete = function setRowDelete(index) {
	    if (index instanceof Row) {
	        index = this.getIndexByRowId(index.rowId);
	    }
	    this.setRowsDelete([index]);
	};

	/**
	 * 设置所有行删除
	 */
	/**
	 * Module : kero dataTable rowDelete
	 * Desc: 不建议使用此库方法
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-01 14:34:01
	 */
	var setAllRowsDelete = function setAllRowsDelete() {
	    var indices = new Array(this.rows().length);
	    for (var i = 0; i < indices.length; i++) {
	        indices[i] = i;
	    }
	    this.setRowsDelete(indices);
	};

	/**
	 * 设置行删除
	 * @param {Array} indices
	 */
	var setRowsDelete = function setRowsDelete(indices) {
	    indices = (0, _util._formatToIndicesArray)(this, indices);
	    var rowIds = this.getRowIdsByIndices(indices);
	    this.trigger(DataTable.ON_DELETE, {
	        falseDelete: true,
	        indices: indices,
	        rowIds: rowIds
	    });
	    for (var i = 0; i < indices.length; i++) {
	        var row = this.getRow(indices[i]);
	        if (row.status == Row.STATUS.NEW) {
	            this.rows().splice(indices[i], 1);
	            this.updateSelectedIndices(indices[i], '-');
	            this.updateFocusIndex(index, '-');
	        } else {
	            row.status = Row.STATUS.FALSE_DELETE;
	            var temprows = this.rows().splice(indices[i], 1);
	            this.rows().push(temprows[0]);
	        }
	    }
	};

	exports.setRowDelete = setRowDelete;
	exports.setAllRowsDelete = setAllRowsDelete;
	exports.setRowsDelete = setRowsDelete;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.updateSelectedIndices = exports.toggleAllSelect = exports.setRowsUnSelect = exports.setRowUnSelect = exports.setAllRowsUnSelect = exports.addRowsSelect = exports.addRowSelect = exports.setRowsSelect = exports.setRowSelect = exports.setAllRowsSelect = undefined;

	var _util = __webpack_require__(9);

	var _util2 = __webpack_require__(47);

	/**
	 * Module : kero dataTable rowSelect
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-01 14:34:01
	 */
	var setAllRowsSelect = function setAllRowsSelect() {
	    var indices = new Array(this.rows().length);
	    for (var i = 0; i < indices.length; i++) {
	        indices[i] = i;
	    }
	    this.setRowsSelect(indices);
	    this.allSelected(true);
	    this.trigger(DataTable.ON_ROW_ALLSELECT, {});
	};

	/**
	 * 设置选中行，清空之前已选中的所有行
	 */
	var setRowSelect = function setRowSelect(index) {
	    if (index instanceof Row) {
	        index = this.getIndexByRowId(index.rowId);
	    }
	    this.setRowsSelect([index]);
	    this.setRowFocus(this.getSelectedIndex());
	};

	var setRowsSelect = function setRowsSelect(indices) {
	    indices = indices || -1;
	    if (indices == -1) {
	        this.setAllRowsUnSelect({ quiet: true });
	        return;
	    }
	    indices = (0, _util2._formatToIndicesArray)(this, indices);
	    var sIns = this.selectedIndices();
	    if ((0, _util.isArray)(indices) && (0, _util.isArray)(sIns) && indices.join() == sIns.join()) {
	        // 避免与控件循环触发
	        return;
	    }

	    if (u.isArray(indices)) {
	        var rowNum = this.rows().length;
	        for (var i = 0; i < indices.length; i++) {
	            if (indices[i] < 0 || indices[i] >= rowNum) indices.splice(i, 1);
	        }
	    }

	    this.setAllRowsUnSelect({ quiet: true });
	    try {
	        this.selectedIndices(indices);
	    } catch (e) {}
	    this.updatePageSelect();
	    var rowIds = this.getRowIdsByIndices(indices);
	    this.currentRowChange(-this.currentRowChange());
	    this.trigger(DataTable.ON_ROW_SELECT, {
	        indices: indices,
	        rowIds: rowIds
	    });
	    this.updateCurrIndex();
	};

	/**
	 * 添加选中行，不会清空之前已选中的行
	 */
	var addRowSelect = function addRowSelect(index) {
	    if (index instanceof Row) {
	        index = this.getIndexByRowId(index.rowId);
	    }
	    this.addRowsSelect([index]);
	};

	/**
	 * 添加选中行，不会清空之前已选中的行
	 */
	var addRowsSelect = function addRowsSelect(indices) {
	    indices = (0, _util2._formatToIndicesArray)(this, indices);
	    var selectedIndices = this.selectedIndices().slice();
	    var needTrigger = false;
	    for (var i = 0; i < indices.length; i++) {
	        var ind = indices[i],
	            toAdd = true;
	        for (var j = 0; j < selectedIndices.length; j++) {
	            if (selectedIndices[j] == ind) {
	                toAdd = false;
	            }
	        }
	        if (toAdd) {
	            needTrigger = true;
	            selectedIndices.push(indices[i]);
	        }
	    }
	    this.selectedIndices(selectedIndices);
	    this.updatePageSelect();
	    var rowIds = this.getRowIdsByIndices(selectedIndices);
	    if (needTrigger) {
	        this.trigger(DataTable.ON_ROW_SELECT, {
	            indices: selectedIndices,
	            rowIds: rowIds
	        });
	    }
	    this.updateCurrIndex();
	};

	/**
	 * 全部取消选中
	 */
	var setAllRowsUnSelect = function setAllRowsUnSelect(options) {
	    this.selectedIndices([]);
	    this.updatePageSelect();
	    if (!(options && options.quiet)) {
	        this.trigger(DataTable.ON_ROW_ALLUNSELECT);
	    }
	    this.updateCurrIndex();
	    this.allSelected(false);
	};

	/**
	 * 取消选中
	 */
	var setRowUnSelect = function setRowUnSelect(index) {
	    if (index instanceof Row) {
	        index = this.getIndexByRowId(index.rowId);
	    }
	    this.setRowsUnSelect([index]);
	};

	var setRowsUnSelect = function setRowsUnSelect(indices) {
	    indices = (0, _util2._formatToIndicesArray)(this, indices);
	    var selectedIndices = this.selectedIndices().slice();

	    // 避免与控件循环触发
	    if (selectedIndices.indexOf(indices[0]) == -1) return;

	    for (var i = 0; i < indices.length; i++) {
	        var index = indices[i];
	        var pos = selectedIndices.indexOf(index);
	        if (pos != -1) selectedIndices.splice(pos, 1);
	    }
	    this.selectedIndices(selectedIndices);
	    this.updatePageSelect();
	    var rowIds = this.getRowIdsByIndices(indices);
	    this.trigger(DataTable.ON_ROW_UNSELECT, {
	        indices: indices,
	        rowIds: rowIds
	    });
	    this.updateCurrIndex();
	    this.allSelected(false);
	};

	var toggleAllSelect = function toggleAllSelect() {
	    if (this.allSelected()) {
	        this.setAllRowsUnSelect();
	    } else {
	        this.setAllRowsSelect();
	    }
	};

	/**
	 *
	 * @param {Object} index 要处理的起始行索引
	 * @param {Object} type   增加或减少  + -
	 */
	var updateSelectedIndices = function updateSelectedIndices(index, type, num) {
	    if (!(0, _util.isNumber)(num)) {
	        num = 1;
	    }
	    var selectedIndices = this.selectedIndices().slice();
	    if (selectedIndices == null || selectedIndices.length == 0) return;
	    for (var i = 0, count = selectedIndices.length; i < count; i++) {
	        if (type == '+') {
	            if (selectedIndices[i] >= index) selectedIndices[i] = parseInt(selectedIndices[i]) + num;
	        } else if (type == '-') {
	            if (selectedIndices[i] >= index && selectedIndices[i] <= index + num - 1) {
	                selectedIndices.splice(i, 1);
	            } else if (selectedIndices[i] > index + num - 1) selectedIndices[i] = selectedIndices[i] - num;
	        }
	    }
	    this.selectedIndices(selectedIndices);
	    this.updatePageSelect();
	};
	exports.setAllRowsSelect = setAllRowsSelect;
	exports.setRowSelect = setRowSelect;
	exports.setRowsSelect = setRowsSelect;
	exports.addRowSelect = addRowSelect;
	exports.addRowsSelect = addRowsSelect;
	exports.setAllRowsUnSelect = setAllRowsUnSelect;
	exports.setRowUnSelect = setRowUnSelect;
	exports.setRowsUnSelect = setRowsUnSelect;
	exports.toggleAllSelect = toggleAllSelect;
	exports.updateSelectedIndices = updateSelectedIndices;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.updateFocusIndex = exports.setRowUnFocus = exports.setRowFocus = undefined;

	var _util = __webpack_require__(9);

	/**
	 * 设置焦点行
	 * @param {Object} index 行对象或者行index
	 * @param quiet 不触发事件
	 * @param force 当index行与已focus的行相等时，仍然触发事件
	 */
	var setRowFocus = function setRowFocus(index, quiet, force) {
	    var rowId = null;
	    if (index instanceof Row) {
	        index = this.getIndexByRowId(index.rowId);
	        rowId = index.rowId;
	    }
	    if (index === -1 || index === this.focusIndex() && !force) {
	        return;
	    }
	    this.focusIndex(index);
	    if (quiet) {
	        return;
	    }
	    this.currentRowChange(-this.currentRowChange());
	    if (!rowId) {
	        rowId = this.getRow(index).rowId;
	    }
	    this.trigger(DataTable.ON_ROW_FOCUS, {
	        index: index,
	        rowId: rowId
	    });
	    this.updateCurrIndex();
	};

	/**
	 * 焦点行反选
	 */
	/**
	 * Module : kero dataTable rowFocus
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */
	var setRowUnFocus = function setRowUnFocus() {
	    this.currentRowChange(-this.currentRowChange());
	    var indx = this.focusIndex(),
	        rowId = null;
	    if (indx !== -1) {
	        rowId = this.getRow(indx).rowId;
	    }
	    this.trigger(DataTable.ON_ROW_UNFOCUS, {
	        index: indx,
	        rowId: rowId
	    });
	    this.focusIndex(-1);
	    this.updateCurrIndex();
	};

	var updateFocusIndex = function updateFocusIndex(opIndex, opType, num) {
	    if (!(0, _util.isNumber)(num)) {
	        num = 1;
	    }
	    if (opIndex <= this.focusIndex() && this.focusIndex() != -1) {
	        if (opType === '+') {
	            this.focusIndex(this.focusIndex() + num);
	        } else if (opType === '-') {
	            if (this.focusIndex() >= opIndex && this.focusIndex() <= opIndex + num - 1) {
	                this.focusIndex(this.focusIndex() - 1);
	            } else if (this.focusIndex() > opIndex + num - 1) {
	                this.focusIndex(this.focusIndex() - num);
	            }
	        }
	    }
	};

	exports.setRowFocus = setRowFocus;
	exports.setRowUnFocus = setRowUnFocus;
	exports.updateFocusIndex = updateFocusIndex;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addSimpleData = exports.setSimpleData = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : kero dataTable simpleData
	                                                                                                                                                                                                                                                                               * Author : liuyk(liuyk@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-08-01 14:34:01
	                                                                                                                                                                                                                                                                               */


	var _util = __webpack_require__(9);

	/**
	 * 设置数据, 只设置字段值
	 * @param {array} data
	 *options{} unSelect为true：不选中，为false则选中，默认选中0行
	 */
	var setSimpleData = function setSimpleData(data, options) {
	    this.removeAllRows();
	    this.cachedPages = [];
	    this.focusIndex(-1);
	    this.selectedIndices([]);

	    this.setSimpleDataReal = [];
	    if (!data) {
	        this.setSimpleDataReal = data;
	        // throw new Error("dataTable.setSimpleData param can't be null!");
	        return;
	    }

	    var rows = [];
	    if (!(0, _util.isArray)(data)) data = [data];
	    for (var i = 0; i < data.length; i++) {
	        var _data = data[i];
	        /* 判断data中的字段在datatable中是否存在，如果不存在则创建 */
	        // for(var f in _data){
	        //     this.createField(f)
	        // }
	        if (_typeof(data[i]) !== 'object') _data = { $data: data[i] };
	        rows.push({
	            status: Row.STATUS.NORMAL,
	            data: _data
	        });
	    }
	    var _data = {
	        rows: rows
	    };
	    if (options) {
	        if (typeof options.fieldFlag == 'undefined') {
	            options.fieldFlag = true;
	        }
	    }
	    this.setData(_data, options);
	};

	/**
	 * 追加数据
	 * @param data
	 */
	var addSimpleData = function addSimpleData(data, status) {
	    if (!data) {
	        throw new Error("dataTable.addSimpleData param can't be null!");
	    }
	    if (!(0, _util.isArray)(data)) data = [data];
	    for (var i = 0; i < data.length; i++) {
	        var r = this.createEmptyRow();
	        r.setSimpleData(data[i], status);
	    }
	};

	exports.setSimpleData = setSimpleData;
	exports.addSimpleData = addSimpleData;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Page = undefined;

	var _pageData = __webpack_require__(55);

	var _pageGetData = __webpack_require__(56);

	var _pageGetMeta = __webpack_require__(57);

	var _pageMeta = __webpack_require__(58);

	var _pageRemoveRow = __webpack_require__(59);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * Module : Kero webpack entry Page index
	                                                                                                                                                           * Author : liuyk(liuyuekai@yonyou.com)
	                                                                                                                                                           * Date	  : 2016-08-09 15:24:46
	                                                                                                                                                           */

	var Page = function Page(options) {
		_classCallCheck(this, Page);

		this.focus = options['focus'] || null;
		this.selectedIndices = options['selectedIndices'] || null;
		this.rows = options['rows'] || [];
		this.parent = options['parent'] || null;
	};

	//data


	Page.prototype.setRowValue = _pageData.setRowValue;
	Page.prototype.updateRow = _pageData.updateRow;

	//getData
	Page.prototype.getData = _pageGetData.getData;
	Page.prototype.getSelectDatas = _pageGetData.getSelectDatas;
	Page.prototype.getSelectRows = _pageGetData.getSelectRows;
	Page.prototype.getRowByRowId = _pageGetData.getRowByRowId;
	Page.prototype.getRowValue = _pageGetData.getRowValue;

	//getMeta
	Page.prototype.getRowMeta = _pageGetMeta.getRowMeta;

	//meta
	Page.prototype.setRowMeta = _pageMeta.setRowMeta;

	//removeRow
	Page.prototype.removeRowByRowId = _pageRemoveRow.removeRowByRowId;
	Page.prototype.updateSelectedIndices = _pageRemoveRow.updateSelectedIndices;
	Page.prototype.updateFocusIndex = _pageRemoveRow.updateFocusIndex;

	exports.Page = Page;

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable page data
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */

	var setRowValue = function setRowValue(rowIndex, fieldName, value) {
	    var row = this.rows[rowIndex];
	    if (row) {
	        row.data[fieldName]['value'] = value;
	        if (row.status != Row.STATUS.NEW) row.status = Row.STATUS.UPDATE;
	    }
	};

	var updateRow = function updateRow(originRow, newRow) {
	    originRow.status = originRow.status;
	    //this.rowId = data.rowId
	    if (!newRow.data) return;
	    for (var key in newRow.data) {
	        if (originRow.data[key]) {
	            var valueObj = newRow.data[key];
	            if (typeof valueObj == 'string' || typeof valueObj == 'number' || valueObj === null) originRow.data[key]['value'] = valueObj;
	            //this.setValue(key, this.formatValue(key, valueObj))
	            else {
	                    //					this.setValue(key, valueObj.value)

	                    if (valueObj.error) {
	                        if (u.showMessageDialog) u.showMessageDialog({ title: "警告", msg: valueObj.error, backdrop: true });else alert(valueObj.error);
	                    } else {
	                        //this.setValue(key, this.formatValue(key, valueObj.value), null)
	                        originRow.data[key]['value'] = valueObj.value;
	                        for (var k in valueObj.meta) {
	                            originRow.data[key]['meta'] = originRow.data[key]['meta'] || {};
	                            originRow.data[key]['meta'][k] = valueObj.meta[k];
	                        }
	                    }
	                }
	        }
	    }
	};

	exports.setRowValue = setRowValue;
	exports.updateRow = updateRow;

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable page getData
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */

	var getData = function getData() {
	    var datas = [],
	        row,
	        meta;
	    meta = this.parent.getMeta();
	    for (var i = 0; i < this.rows.length; i++) {
	        row = this.rows[i];
	        datas.push({ 'id': row.rowId, 'status': row.status, data: row.data });
	    }
	    return datas;
	};

	var getSelectDatas = function getSelectDatas() {
	    var datas = [],
	        row;
	    for (var i = 0; i < this.rows.length; i++) {
	        row = this.rows[i];
	        datas.push({ 'id': row.rowId, 'status': row.status, data: row.data });
	    }
	    for (var i = 0; i < this.selectedIndices.length; i++) {
	        row = this.rows[this.selectedIndices[i]];
	        datas.push({ 'id': row.rowId, 'status': row.status, data: row.data });
	    }
	    return datas;
	};

	var getSelectRows = function getSelectRows() {
	    var rows = [];
	    for (var i = 0; i < this.selectedIndices.length; i++) {
	        rows.push(this.rows[this.selectedIndices[i]]);
	    }
	    return rows;
	};

	var getRowByRowId = function getRowByRowId(rowid) {
	    for (var i = 0, count = this.rows.length; i < count; i++) {
	        if (this.rows[i].rowId == rowid) return this.rows[i];
	    }
	    return null;
	};

	var getRowValue = function getRowValue(rowIndex, fieldName) {
	    var row = this.rows[rowIndex];
	    if (row) {
	        return row.data[fieldName]['value'];
	    }
	    return null;
	};

	exports.getData = getData;
	exports.getSelectDatas = getSelectDatas;
	exports.getSelectRows = getSelectRows;
	exports.getRowByRowId = getRowByRowId;
	exports.getRowValue = getRowValue;

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable page getMeta
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */

	var getRowMeta = function getRowMeta(rowIndex, fieldName, metaName) {
	    var row = this.rows[rowIndex];
	    if (row) {
	        var meta = row[fieldName].meta;
	        if (!meta) return null;else return meta[metaName];
	    }
	    return null;
	};

	exports.getRowMeta = getRowMeta;

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable page meta
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */

	var setRowMeta = function setRowMeta(rowIndex, fieldName, metaName, value) {
	    var row = this.rows[rowIndex];
	    if (row) {
	        var meta = row[fieldName].meta;
	        if (!meta) meta = row[fieldName].meta = {};
	        meta[metaName] = value;
	        if (row.status != Row.STATUS.NEW) row.status = Row.STATUS.UPDATE;
	    }
	};

	exports.setRowMeta = setRowMeta;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.updateFocusIndex = exports.updateSelectedIndices = exports.removeRowByRowId = undefined;

	var _util = __webpack_require__(9);

	var removeRowByRowId = function removeRowByRowId(rowid) {
	    for (var i = 0, count = this.rows.length; i < count; i++) {
	        if (this.rows[i].rowId == rowid) {
	            this.rows.splice(i, 1);
	            count--;
	            this.updateSelectedIndices(i, '-');
	            this.updateFocusIndex(i, '-');
	        }
	    }
	};

	/**
	 * [updateSelectedIndices 更新选中行]
	 * @param  {[type]} index [起始行号]
	 * @param  {[type]} type  [增减类型]
	 * @param  {[type]} num   [影响行数]
	 */
	/**
	 * Module : kero dataTable page removeRow
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 09:59:01
	 */

	var updateSelectedIndices = function updateSelectedIndices(index, type, num) {
	    if (!(0, _util.isNumber)(num)) {
	        num = 1;
	    }
	    var selectedIndices = this.selectedIndices.slice();
	    if (selectedIndices == null || selectedIndices.length == 0) return;
	    for (var i = 0, count = selectedIndices.length; i < count; i++) {
	        if (type == '+') {
	            if (selectedIndices[i] >= index) selectedIndices[i] = parseInt(selectedIndices[i]) + num;
	        } else if (type == '-') {
	            if (selectedIndices[i] >= index && selectedIndices[i] <= index + num - 1) {
	                selectedIndices.splice(i, 1);
	            } else if (selectedIndices[i] > index + num - 1) selectedIndices[i] = selectedIndices[i] - num;
	        }
	    }
	    this.selectedIndices = selectedIndices;
	};

	/**
	 * [updateFocusIndex 更新focus行]
	 * @param  {[type]} opIndex [起始行号]
	 * @param  {[type]} opType  [增减类型]
	 * @param  {[type]} num     [影响行数]
	 */
	var updateFocusIndex = function updateFocusIndex(opIndex, opType, num) {
	    if (!(0, _util.isNumber)(num)) {
	        num = 1;
	    }
	    if (opIndex <= this.focus && this.focus != -1) {
	        if (opType === '+') {
	            this.focus = this.focus + num;
	        } else if (opType === '-') {
	            if (this.focus >= opIndex && this.focus <= opIndex + num - 1) {
	                this.focus = this.focus - 1;
	            } else if (this.focus > opIndex + num - 1) {
	                this.focus = this.focus - num;
	            }
	        }
	    }
	};

	exports.removeRowByRowId = removeRowByRowId;
	exports.updateSelectedIndices = updateSelectedIndices;
	exports.updateFocusIndex = updateFocusIndex;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Row = undefined;

	var _indexEvents = __webpack_require__(29);

	var _rowData = __webpack_require__(61);

	var _rowGetData = __webpack_require__(63);

	var _rowGetMeta = __webpack_require__(64);

	var _rowGetSimpleData = __webpack_require__(65);

	var _rowInit = __webpack_require__(66);

	var _rowMeta = __webpack_require__(67);

	var _rowRef = __webpack_require__(68);

	var _rowRowSelect = __webpack_require__(73);

	var _rowSimpleData = __webpack_require__(74);

	var _rowUtil = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Module : Kero webpack entry row index
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author : liuyk(liuyuekai@yonyou.com)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date   : 2016-08-09 15:24:46
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Row = function (_Events) {
	    _inherits(Row, _Events);

	    function Row(options) {
	        _classCallCheck(this, Row);

	        var _this = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this));

	        var self = _this;
	        _this.rowId = options['id'] || Row.getRandomRowId();
	        _this.status = Row.STATUS.NEW;
	        _this.parent = options['parent'];
	        _this.initValue = null;
	        _this.data = {};
	        _this.metaChange = {}; //ko.observable(1)
	        _this.valueChange = {};
	        _this.currentRowChange = ko.observable(1);
	        _this.selected = ko.pureComputed({
	            read: function read() {
	                var index = this.parent.getRowIndex(this);
	                var selectindices = this.parent.getSelectedIndices();
	                return selectindices.indexOf(index) != -1;
	            },
	            owner: _this

	        });
	        _this.focused = ko.pureComputed({
	            read: function read() {
	                var index = this.parent.getRowIndex(this);
	                var focusIndex = this.parent.getFocusIndex();
	                return focusIndex == index;
	            },
	            owner: _this

	        });

	        _this.init();
	        return _this;
	    }

	    return Row;
	}(_indexEvents.Events);

	//data


	Row.prototype.setValue = _rowData.setValue;
	Row.prototype.setChildValue = _rowData.setChildValue;
	Row.prototype.setChildSimpleDataByRowId = _rowData.setChildSimpleDataByRowId;
	Row.prototype.setData = _rowData.setData;
	Row.prototype.updateRow = _rowData.updateRow;

	//getData
	Row.prototype.getValue = _rowGetData.getValue;
	Row.prototype.getChildValue = _rowGetData.getChildValue;
	Row.prototype.getData = _rowGetData.getData;
	Row.prototype.getEmptyData = _rowGetData.getEmptyData;

	//getMeta
	Row.prototype.getMeta = _rowGetMeta.getMeta;

	//getSimpleData
	Row.prototype.formatValueFun = _rowGetSimpleData.formatValueFun;
	Row.prototype.getSimpleData = _rowGetSimpleData.getSimpleData;

	//init
	Row.prototype.init = _rowInit.init;

	//meta
	Row.prototype.setMeta = _rowMeta.setMeta;

	//ref
	Row.prototype.ref = _rowRef.ref;
	Row.prototype.refMeta = _rowRef.refMeta;
	Row.prototype.refCombo = _rowRef.refCombo;
	Row.prototype.refDate = _rowRef.refDate;
	Row.prototype.refEnum = _rowRef.refEnum;

	//rowSelect
	Row.prototype.toggleSelect = _rowRowSelect.toggleSelect;
	Row.prototype.singleSelect = _rowRowSelect.singleSelect;
	Row.prototype.multiSelect = _rowRowSelect.multiSelect;

	//simpleData
	Row.prototype.setSimpleData = _rowSimpleData.setSimpleData;

	//util
	Row.prototype.formatValue = _rowUtil.formatValue;

	Row.STATUS = {
	    NORMAL: 'nrm',
	    UPDATE: 'upd',
	    NEW: 'new',
	    DELETE: 'del',
	    FALSE_DELETE: 'fdel'
	};

	/*
	 * 生成随机行id
	 * @private
	 */
	Row.getRandomRowId = function () {
	    var _id = setTimeout(function () {});
	    return _id + '';
	};

	exports.Row = Row;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.updateRow = exports.setData = exports.setChildSimpleDataByRowId = exports.setChildValue = exports.setValue = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : kero dataTable row getData
	                                                                                                                                                                                                                                                                               * Author : liuyk(liuyk@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date   : 2016-08-08 13:54:01
	                                                                                                                                                                                                                                                                               */


	var _rowUtil = __webpack_require__(62);

	var _util = __webpack_require__(9);

	/**
	*设置row中某一列的值
	*/
	var setValue = function setValue(fieldName, value, ctx, options) {

	    if (arguments.length === 1) {
	        value = fieldName;
	        fieldName = '$data';
	    }
	    var oldValue = this.getValue(fieldName);
	    if (typeof oldValue == 'undefined' || oldValue === null) oldValue = '';
	    if ((0, _rowUtil.eq)(oldValue, value)) return;
	    var event = {
	        eventType: 'dataTableEvent',
	        dataTable: this.parent.id,
	        rowId: this.rowId,
	        field: fieldName,
	        oldValue: oldValue,
	        newValue: value,
	        ctx: ctx || ""
	    };
	    var flag = this.parent.triggerReturn(DataTable.ON_BEFORE_VALUE_CHANGE, event);
	    if (!flag) {
	        (0, _rowUtil._triggerChange)(this, fieldName, oldValue, ctx);
	        return;
	    }
	    (0, _rowUtil._getField)(this, fieldName)['value'] = value;
	    (0, _rowUtil._triggerChange)(this, fieldName, oldValue, ctx);
	};

	var setChildValue = function setChildValue(fieldName, value) {
	    var nameArr = fieldName.split('.');
	    var _name = nameArr[0];
	    var _field = this.data[_name]; //_field保存当前_name对应的数据
	    for (var i = 0, count = nameArr.length; i < count; i++) {
	        //最后一级
	        if (i == count - 1) {
	            if (_field['value'] instanceof u.DataTable) {
	                //暂不处理
	            } else {
	                this.setValue(fieldName, value);
	            }
	        } else {
	            if (_field && _field['value'] instanceof u.DataTable) {
	                var row = _field['value'].getCurrentRow();
	                if (row) row.setChildValue(fieldName.replace(_name + '.', ''), value);
	            } else {
	                _name = nameArr[i + 1];
	                _field = _field[_name]; //多层嵌套时_field取子项对应的数据
	            }
	        }
	    }
	};

	var setChildSimpleDataByRowId = function setChildSimpleDataByRowId(rowId, data) {
	    var rowIdArr = rowId.split('.');
	    var rowIdLength = rowIdArr.length;
	    if (rowIdLength > 1) {
	        var _childField = rowIdArr[0]; //子表字段
	        var _childObj = this.data[_childField]; // 子表字段存放的obj
	        if (_childObj && _childObj['value'] instanceof u.DataTable) {
	            var rowId = rowIdArr[1];
	            var row = null;
	            if (rowId) row = _childObj['value'].getRowByRowId(rowId);
	            if (row) {
	                if (rowIdArr.length == 2) {
	                    row.setSimpleData(data);
	                } else {
	                    row.setChildSimpleDataByRowId(fieldName.replace(_childField + '.' + rowId + '.', ''), data);
	                }
	            }
	        }
	    }
	};

	/**
	 * [_setData description]
	 * @param {[type]} sourceData
	 * @param {[type]} targetData
	 * @param {[type]} subscribe
	 * @param {[type]} parentKey  [父项key，数据项为数组时获取meta值用]
	 */
	var _setData = function _setData(rowObj, sourceData, targetData, subscribe, parentKey, options) {
	    for (var key in sourceData) {

	        // 判断是否要放到dataTable中
	        if (options && !options.fieldFlag) {
	            if (!rowObj.parent.getMeta(key)) {
	                continue;
	            }
	        }
	        var _parentKey = parentKey || null;
	        //if (targetData[key]) {
	        targetData[key] = targetData[key] || {};
	        var valueObj = sourceData[key];

	        // if (typeof valueObj != 'object'){
	        //     if(typeof options == 'object'){
	        //         if(options.fieldFlag) {
	        //             rowObj.parent.createField(key);
	        //         }
	        //     }
	        // }

	        //if (typeof this.parent.meta[key] === 'undefined') continue;
	        if (valueObj == null || (typeof valueObj === 'undefined' ? 'undefined' : _typeof(valueObj)) != 'object') {
	            // 子表的话只有valueObj为datatable的时候才赋值
	            if (!targetData[key].isChild) {
	                targetData[key]['value'] = rowObj.formatValue(key, valueObj);
	            }
	            if (subscribe === true && oldValue !== targetData[key]['value']) {
	                (0, _rowUtil._triggerChange)(rowObj, key, oldValue);
	            }
	        } else {
	            if (valueObj.error) {
	                if (u.showMessageDialog) u.showMessageDialog({ title: "警告", msg: valueObj.error, backdrop: true });else alert(valueObj.error);
	            } else if (valueObj.value || valueObj.value === null || valueObj.meta || valueObj.value === '' || valueObj.value === '0' || valueObj.value === 0) {
	                var oldValue = targetData[key]['value'];
	                targetData[key]['value'] = rowObj.formatValue(key, valueObj.value);
	                if (subscribe === true && oldValue !== targetData[key]['value']) {
	                    (0, _rowUtil._triggerChange)(rowObj, key, oldValue);
	                }
	                for (var k in valueObj.meta) {
	                    rowObj.setMeta(key, k, valueObj.meta[k]);
	                }
	            } else if ((0, _util.isArray)(valueObj)) {
	                targetData[key].isChild = true;
	                //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
	                var _key = _parentKey == null ? key : _parentKey + '.' + key;
	                var ns = rowObj.parent.ns === '' ? key : rowObj.parent.ns + '.' + _key;
	                if (rowObj.parent.meta[_key]) {
	                    var meta = rowObj.parent.meta[_key]['meta'];
	                    targetData[key].value = new u.DataTable({ root: rowObj.parent.root, ns: ns, meta: meta });
	                    targetData[key].value.setSimpleData(valueObj);
	                }
	            } else {
	                _parentKey = _parentKey == null ? key : _parentKey + '.' + key;
	                _setData(rowObj, valueObj, targetData[key], null, _parentKey, options);
	            }
	        }
	        //}
	    }
	};

	/**
	 *设置Row数据
	 *@subscribe 是否触发监听
	 */
	var setData = function setData(data, subscribe, options) {
	    this.status = data.status;
	    var sourceData = data.data,
	        targetData = this.data;
	    if (this.parent.root.strict != true) {
	        _setData(this, sourceData, targetData, subscribe, null, options);
	        return;
	    }

	    // strict 为true 时 ，定义dataTable的时候必须定义所有字段信息才能设置数据。
	    var meta = this.parent.meta;
	    for (var key in meta) {
	        var oldValue = newValue = null;
	        //子数据
	        if (meta[key]['type'] && meta[key]['type'] === 'child') {
	            targetData[key].isChild = true;
	            //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
	            var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key;
	            var meta = this.parent.meta[key]['meta'];
	            targetData[key].value = new u.DataTable({ root: this.parent.root, ns: ns, meta: meta });
	            if (_typeof(sourceData[key]) === 'object') targetData[key].value.setSimpleData(sourceData[key]);
	        }
	        //存在多级关系
	        else if (key.indexOf('.') != -1) {
	                var keys = key.split('.');
	                var _fieldValue = sourceData;
	                var _targetField = targetData;
	                for (var i = 0; i < keys.length; i++) {
	                    _fieldValue = _fieldValue || {};
	                    _fieldValue = _fieldValue[keys[i]];
	                    _targetField = _targetField[keys[i]];
	                }
	                oldValue = _targetField['value'];
	                _targetField['value'] = this.formatValue(key, _fieldValue);
	                newValue = _targetField['value'];
	            }
	            // 通过 setSimpleData 设置的数据
	            else if (sourceData[key] == null || _typeof(sourceData[key]) != 'object') {
	                    oldValue = targetData[key]['value'];
	                    targetData[key]['value'] = this.formatValue(key, sourceData[key]);
	                    newValue = targetData[key]['value'];
	                } else {
	                    var valueObj = sourceData[key];
	                    if (valueObj.error) {
	                        if (u.showMessageDialog) u.showMessageDialog({ title: "警告", msg: valueObj.error, backdrop: true });else alert(valueObj.error);
	                    } else if (valueObj.value || valueObj.value === null || valueObj.meta) {
	                        oldValue = targetData[key]['value'];
	                        targetData[key]['value'] = this.formatValue(key, valueObj.value);
	                        newValue = targetData[key]['value'];
	                        for (var k in valueObj.meta) {
	                            this.setMeta(key, k, valueObj.meta[k]);
	                        }
	                    }
	                }
	        if (subscribe === true && oldValue !== newValue) {
	            (0, _rowUtil._triggerChange)(this, key, oldValue);
	        }
	    }
	};

	var updateRow = function updateRow(row) {
	    this.setData(row);
	};

	exports.setValue = setValue;
	exports.setChildValue = setChildValue;
	exports.setChildSimpleDataByRowId = setChildSimpleDataByRowId;
	exports.setData = setData;
	exports.updateRow = updateRow;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports._findField = exports._getField = exports.formatValue = exports._triggerChange = exports._dateToUTCString = exports.eq = undefined;

	var _util = __webpack_require__(9);

	var eq = function eq(a, b) {
	    if ((a === null || a === undefined || a === '') && (b === null || b === undefined || b === '')) return true;
	    //判断输入的值是否相等，a,b是字符串直接比较这两个值即可，没必要判断是否是数据，判断是否是数据使用parseFloat转换有时精度不准（431027199110.078573） 
	    //if (isNumber(a) && isNumber(b) && parseFloat(a) == parseFloat(b)) return true;
	    if (a + '' == b + '') return true;
	    return false;
	}; /**
	    * Module : kero dataTable row util
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-08-08 13:54:01
	    */


	var _formatDate = function _formatDate(value) {
	    if (!value) return value;
	    var date = new Date();
	    date.setTime(value);
	    //如果不能转为Date 直接返回原值
	    if (isNaN(date)) {
	        return value;
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
	    var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds; //+ "." + mill;
	    return formatString;
	};

	var _dateToUTCString = function _dateToUTCString(date) {
	    if (!date) return '';
	    if (typeof date === 'number') return date;
	    if (date.indexOf("-") > -1) date = date.replace(/\-/g, "/");
	    var utcString = Date.parse(date);
	    if (isNaN(utcString)) return "";
	    return utcString;
	};

	var _triggerChange = function _triggerChange(rowObj, fieldName, oldValue, ctx) {
	    _getField(rowObj, fieldName).changed = true;
	    if (rowObj.status != Row.STATUS.NEW) rowObj.status = Row.STATUS.UPDATE;
	    if (rowObj.valueChange[fieldName]) rowObj.valueChange[fieldName](-rowObj.valueChange[fieldName]());
	    if (rowObj.parent.getCurrentRow() == rowObj && rowObj.parent.valueChange[fieldName]) {
	        rowObj.parent.valueChange[fieldName](-rowObj.parent.valueChange[fieldName]());
	    }
	    if (rowObj.parent.ns) {
	        var fName = rowObj.parent.ns + '.' + fieldName;
	        if (rowObj.parent.root.valueChange[fName]) rowObj.parent.root.valueChange[fName](-rowObj.parent.root.valueChange[fName]());
	    }

	    var event = {
	        eventType: 'dataTableEvent',
	        dataTable: rowObj.parent.id,
	        rowId: rowObj.rowId,
	        field: fieldName,
	        oldValue: oldValue,
	        newValue: rowObj.getValue(fieldName),
	        ctx: ctx || "",
	        rowObj: rowObj
	    };
	    rowObj.parent.trigger(DataTable.ON_VALUE_CHANGE, event);
	    rowObj.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, event);
	    if (rowObj == rowObj.parent.getCurrentRow()) rowObj.parent.trigger(fieldName + "." + DataTable.ON_CURRENT_VALUE_CHANGE, event);

	    // 对于多级字表需要触发顶层div的valuechange事件
	    if (rowObj.parent.ns) {
	        event.fullField = fName;
	        event.ns = rowObj.parent.ns;
	        rowObj.parent.root.trigger(DataTable.ON_VALUE_CHANGE, event);
	        rowObj.parent.root.trigger(fName + "." + DataTable.ON_VALUE_CHANGE, event);
	    }
	};

	/**
	 * 格式化数据值
	 * @private
	 * @param {Object} field
	 * @param {Object} value
	 */
	var formatValue = function formatValue(field, value) {
	    var type = this.parent.getMeta(field, 'type');
	    if (!type) return value;
	    if (type == 'date' || type == 'datetime') {
	        return _formatDate(value);
	    }
	    return value;
	};

	var _findField = function _findField(rowObj, fieldName) {
	    var rat = rowObj.data[fieldName];
	    if (!rat) {
	        var fnames = fieldName.split('.'); //多级field
	        if (fnames.length > 1) {
	            var tempField = rowObj.data;
	            for (var i = 0; i < fnames.length; i++) {
	                tempField = tempField[fnames[i]];
	                if (tempField.value instanceof DataTable) {
	                    var row = tempField.value.getCurrentRow();
	                    if (row) {
	                        tempField = row.data;
	                    }
	                }
	                if (!tempField) {
	                    break;
	                }
	            }
	            rat = tempField;
	        }
	    }
	    return rat || null;
	};

	var _getField = function _getField(rowObj, fieldName) {
	    var rat = _findField(rowObj, fieldName);
	    if (!rat) {
	        var msg = 'field:' + fieldName + ' not exist in dataTable:' + rowObj.parent.root.id + '!';
	        throw new Error(msg);
	    }
	    return rat;
	};

	exports.eq = eq;
	exports._dateToUTCString = _dateToUTCString;
	exports._triggerChange = _triggerChange;
	exports.formatValue = formatValue;
	exports._getField = _getField;
	exports._findField = _findField;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getEmptyData = exports.getData = exports.getChildValue = exports.getValue = undefined;

	var _rowUtil = __webpack_require__(62);

	/**
	 *获取row中某一列的值
	 */
	var getValue = function getValue(fieldName) {
	    return (0, _rowUtil._getField)(this, fieldName)['value'];
	};

	/**
	 * 获取子表值 ，如果fieldName对应了一个子表，返回该子表的行数组
	 * @param fieldName
	 */
	/**
	 * Module : kero dataTable row getData
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 13:54:01
	 */
	var getChildValue = function getChildValue(fieldName) {
	    var nameArr = fieldName.split('.');
	    var _name = nameArr[0];
	    for (var i = 0, count = nameArr.length; i < count; i++) {
	        var _value = this.getValue(_name);
	        //最后一级
	        if (i == count - 1) {
	            if (_value instanceof u.DataTable) {
	                return _value.rows.peek();
	            } else {
	                return _value;
	            }
	        } else {
	            if (_value instanceof u.DataTable) {
	                _value = _value.getCurrentRow();
	                if (!_value) return '';else return _value.getChildValue(fieldName.replace(_name + '.', ''));
	            } else {
	                _name = _name + '.' + nameArr[i + 1];
	            }
	        }
	    }
	    return '';
	};

	/**
	 * @private
	 * 提交数据到后台
	 */
	var getData = function getData() {
	    var data = ko.toJS(this.data);
	    var meta = this.parent.getMeta();
	    for (var key in meta) {
	        if (meta[key] && meta[key].type) {
	            if (meta[key].type == 'date' || meta[key].type == 'datetime') {
	                if (key.indexOf('.') > 0) {
	                    //大于0说明是多级json
	                    var keys = key.split('.');
	                    var _keyValue = data;
	                    for (var i = 0, count = keys.length; i < count; i++) {
	                        _keyValue = _keyValue[keys[i]];
	                    }
	                    _keyValue.value = (0, _rowUtil._dateToUTCString)(_keyValue.value);
	                } else {
	                    data[key].value = (0, _rowUtil._dateToUTCString)(data[key].value);
	                }
	            } else if (meta[key].type == 'child') {
	                var chiddt = this.getValue(key),
	                    rs = chiddt.rows(),
	                    cds = [];
	                for (var i = 0; i < rs.length; i++) {
	                    cds.push(rs[i].getData());
	                }
	                data[key].value = JSON.stringify(cds);
	            }
	        }
	    }
	    return { 'id': this.rowId, 'status': this.status, data: data };
	};

	var getEmptyData = function getEmptyData() {
	    return { 'id': this.rowId, 'status': this.status, data: {} };
	};

	exports.getValue = getValue;
	exports.getChildValue = getChildValue;
	exports.getData = getData;
	exports.getEmptyData = getEmptyData;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getMeta = undefined;

	var _rowUtil = __webpack_require__(62);

	/**
	 *获取row中某一列的属性
	 */
	var getMeta = function getMeta(fieldName, key, fetchParent) {
	    if (arguments.length == 0) {
	        var mt = {};
	        for (var k in this.data) {
	            mt[k] = this.data[k].meta ? this.data[k].meta : {};
	        }
	        return mt;
	    }
	    var meta = (0, _rowUtil._getField)(this, fieldName).meta;
	    if (meta && meta[key] !== undefined && meta[key] !== null && meta[key] !== '') return meta[key];else if (typeof fetchParent == 'undefined' || fetchParent != false) return this.parent.getMeta(fieldName, key);
	    return undefined;
	}; /**
	    * Module : kero dataTable row getMeta
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-08-08 13:54:01
	    */

	exports.getMeta = getMeta;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getSimpleData = exports.formatValueFun = undefined;

	var _rowUtil = __webpack_require__(62);

	var _util = __webpack_require__(9);

	/**
	 * Module : kero dataTable row getSimpleData
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 13:54:01
	 */
	var _getSimpleData = function _getSimpleData(rowObj, data) {
	    var _data = {};
	    var meta = rowObj.parent.getMeta() || {};
	    for (var key in data) {
	        if (key === 'meta' || (0, _util.isEmptyObject)(data[key])) {
	            continue;
	        } else if (data[key].isChild) {
	            _data[key] = data[key].value ? data[key].value.getSimpleData() : {};
	        } else if (key === '$data') {
	            //处理一维数组： [1,2,3]
	            _data = data[key].value;
	        } else if (typeof data[key].value !== 'undefined') {
	            //如果类型为boolean，无论值为false、true都应该等于他本身
	            if (meta[key] && meta[key].type === 'boolean') {
	                _data[key] = data[key].value ? true : false; //默认值可能是null
	            } else {
	                _data[key] = data[key].value;
	            }
	            if (meta[key] && meta[key].type) {
	                var obj = {
	                    meta: meta,
	                    data: data,
	                    key: key
	                };
	                _data[key] = rowObj.formatValueFun(obj, rowObj.parent.dateNoConvert);
	            }
	        } else if (!data[key].value) {
	            _data[key] = data[key].value;
	        } else {
	            _data[key] = _getSimpleData(rowObj, data[key]);
	        }
	    }
	    return _data;
	};

	var formatValueFun = function formatValueFun(obj, isDateNoConvert) {
	    var meta = obj.meta,
	        data = obj.data,
	        key = obj.key;
	    if (!isDateNoConvert && (meta[key].type == 'date' || meta[key].type == 'datetime')) {
	        return (0, _rowUtil._dateToUTCString)(data[key].value);
	    }
	    return data[key].value;
	};

	var getSimpleData = function getSimpleData(options) {
	    options = options || {};
	    var fields = options['fields'] || null;
	    var meta = this.parent.getMeta();
	    var data = this.data;
	    var _data = _getSimpleData(this, data); //{};
	    var _fieldsData = {};
	    if (fields) {
	        for (var key in _data) {
	            if (fields.indexOf(key) != -1) {
	                _fieldsData[key] = _data[key];
	            }
	        }
	        return _fieldsData;
	    }
	    return _data;
	};

	exports.formatValueFun = formatValueFun;
	exports.getSimpleData = getSimpleData;

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Module : kero dataTable row init
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 13:54:01
	 */

	/**
	* Row初始化方法
	* @private
	*/
	var init = function init() {
	    var meta = this.parent.meta;

	    for (var key in meta) {
	        var targetData;
	        if (key.indexOf('.') > 0) {
	            var keys = key.split('.');
	            targetData = this.data[keys[0]] = this.data[keys[0]] || {};
	            for (var i = 1; i < keys.length; i++) {
	                targetData[keys[i]] = targetData[keys[i]] || {};
	                targetData = targetData[keys[i]];
	            }
	        } else {
	            this.data[key] = this.data[key] || {};
	            targetData = this.data[key];
	        }
	        targetData.value = null;
	        //this.data[key] = {}
	        //处理子表
	        if (meta[key]['type'] && meta[key]['type'] === 'child') {
	            targetData.isChild = true;
	            //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
	            var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key;
	            targetData.value = new u.DataTable({ root: this.parent.root, ns: ns, meta: meta[key]['meta'] });
	        }
	        //添加默认值
	        else if (meta[key]['default']) {
	                var defaults = meta[key]['default'];
	                if ((typeof defaults === 'undefined' ? 'undefined' : _typeof(defaults)) === 'object') {
	                    for (var k in defaults) {
	                        if (k == 'value') {
	                            if (typeof defaults[k] === 'function') targetData.value = this.formatValue(key, defaults[k]());else targetData.value = this.formatValue(key, defaults[k]);
	                        } else {
	                            targetData.meta = targetData.meta || {};
	                            targetData.meta[k] = defaults[k];
	                        }
	                    }
	                } else {
	                    if (typeof defaults === 'function') targetData.value = this.formatValue(key, defaults());else targetData.value = this.formatValue(key, defaults);
	                }
	            }
	    }
	};

	exports.init = init;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setMeta = undefined;

	var _rowUtil = __webpack_require__(62);

	/**
	 *设置row中某一列的属性
	 */
	var setMeta = function setMeta(fieldName, key, value) {
	    var meta = (0, _rowUtil._getField)(this, fieldName).meta;
	    if (!meta) meta = (0, _rowUtil._getField)(this, fieldName).meta = {};
	    var oldValue = meta[key];
	    if ((0, _rowUtil.eq)(oldValue, value)) return;
	    meta[key] = value;
	    //this.metaChange(- this.metaChange())
	    if (this.metaChange[fieldName + '.' + key]) {
	        this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
	    }

	    if (key == 'enable') this.parent.enableChange(-this.parent.enableChange());
	    if (this.parent.getCurrentRow() == this) {
	        if (this.parent.metaChange[fieldName + '.' + key]) this.parent.metaChange[fieldName + '.' + key](-this.parent.metaChange[fieldName + '.' + key]());
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
	}; /**
	    * Module : kero dataTable row meta
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-08-08 13:54:01
	    */
	exports.setMeta = setMeta;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.refEnum = exports.refDate = exports.refCombo = exports.refMeta = exports.ref = undefined;

	var _util = __webpack_require__(9);

	var _dateUtils = __webpack_require__(69);

	var _rowUtil = __webpack_require__(62);

	var ref = function ref(fieldName) {
	    this.parent.createField(fieldName);
	    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
	    return ko.pureComputed({
	        read: function read() {
	            this.valueChange[fieldName]();
	            this.currentRowChange();
	            return this.getChildValue(fieldName);
	            //var value = this._getField(fieldName)['value'];
	            //return value;
	        },
	        write: function write(value) {
	            this.setChildValue(fieldName, value);
	            //this.setValue(fieldName, value)
	        },
	        owner: this
	    });
	}; /**
	    * Module : kero dataTable row ref
	    * Author : liuyk(liuyk@yonyou.com)
	    * Date   : 2016-08-08 13:54:01
	    */


	var refMeta = function refMeta(fieldName, key) {
	    if (!this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key] = ko.observable(1);
	    return ko.pureComputed({
	        read: function read() {
	            this.metaChange[fieldName + '.' + key]();
	            return this.getMeta(fieldName, key);
	        },
	        write: function write(value) {
	            this.setMeta(fieldName, key, value);
	        },
	        owner: this
	    });
	};
	var refCombo = function refCombo(fieldName, datasource) {
	    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
	    return ko.pureComputed({
	        read: function read() {
	            this.valueChange[fieldName]();
	            this.currentRowChange();
	            var ds = (0, _util.getJSObject)(this.parent.parent, datasource);
	            if ((0, _rowUtil._getField)(this, fieldName)['value'] === undefined || (0, _rowUtil._getField)(this, fieldName)['value'] === "") return "";
	            var v = (0, _rowUtil._getField)(this, fieldName)['value'];
	            var valArr = typeof v === 'string' ? v.split(',') : [v];

	            var nameArr = [];

	            for (var i = 0, length = ds.length; i < length; i++) {
	                for (var j = 0; j < valArr.length; j++) {
	                    var value = ds[i]['pk'] || ds[i]['value'] || '';
	                    if (value == valArr[j]) {
	                        nameArr.push(ds[i].name);
	                    }
	                }
	            }

	            return nameArr.toString();
	        },
	        write: function write(value) {

	            this.setValue(fieldName, value);
	        },
	        owner: this
	    });
	};
	var refDate = function refDate(fieldName, format) {
	    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
	    return ko.pureComputed({
	        read: function read() {
	            this.valueChange[fieldName]();
	            this.currentRowChange();
	            if (!(0, _rowUtil._getField)(this, fieldName)['value']) return "";
	            var valArr = (0, _rowUtil._getField)(this, fieldName)['value'];
	            if (!valArr) return "";
	            valArr = _dateUtils.date.format(valArr, format); //moment(valArr).format(format)
	            return valArr;
	        },
	        write: function write(value) {

	            this.setValue(fieldName, value);
	        },
	        owner: this
	    });
	};

	// 刘云燕提交
	var refEnum = function refEnum(fieldName) {
	    this.parent.createField(fieldName);
	    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
	    return ko.pureComputed({
	        read: function read() {
	            this.valueChange[fieldName]();
	            this.currentRowChange();
	            if (!(0, _rowUtil._getField)(this, fieldName)['value']) return "";
	            var valArr = (0, _rowUtil._getField)(this, fieldName)['value'];
	            if (!valArr) return "";
	            if (valArr == "N") valArr = "否";else if (valArr == "Y") valArr = "是";
	            return valArr;
	        },
	        write: function write(value) {

	            this.setValue(fieldName, value);
	        },
	        owner: this
	    });
	};

	exports.ref = ref;
	exports.refMeta = refMeta;
	exports.refCombo = refCombo;
	exports.refDate = refDate;
	exports.refEnum = refEnum;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.date = undefined;

	var _core = __webpack_require__(70);

	var _util = __webpack_require__(9);

	var _i18n = __webpack_require__(72);

	var u = {}; /**
	             * Module : Sparrow date util
	             * Author : Kvkens(yueming@yonyou.com)
	             * Date	  : 2016-08-06 13:37:20
	             */

	u.date = {

		/**
	  * 多语言处理
	  */
		//TODO 后续放到多语文件中
		_dateLocale: {
			'zh-CN': {
				months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
				monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
				weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
				weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
				weekdaysMin: '日_一_二_三_四_五_六'.split('_')
			},
			'en-US': {
				months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
				monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
				weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thurday_Friday_Saturday'.split('_'),
				weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
				weekdaysMin: 'S_M_T_W_T_F_S'.split('_')
			}
		},
		_jsonLocale: {
			months: (0, _i18n.trans)('date.months', "一月\n二月\n三月\n四月\n五月\n六月\n七月\n八月\n九月\n十月\n十一月\n十二月").split('\n'),
			monthsShort: (0, _i18n.trans)('date.monthsShort', "1月\n2月\n3月\n4月\n5月\n6月\n7月\n8月\n9月\n10月\n11月\n12月").split('\n'),
			weekdays: (0, _i18n.trans)('date.weekdays', "星期日\n星期一\n星期二\n星期三\n星期四\n星期五\n星期六").split('\n'),
			weekdaysShort: (0, _i18n.trans)('date.weekdaysShort', "周日\n周一\n周二\n周三\n周四\n周五\n周六").split('\n'),
			weekdaysMin: (0, _i18n.trans)('date.weekdaysMin', "日\n一\n二\n三\n四\n五\n六").split('\n'),
			defaultMonth: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		},

		_formattingTokens: /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYY|YY|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,

		leftZeroFill: function leftZeroFill(number, targetLength, forceSign) {
			var output = '' + Math.abs(number),
			    sign = number >= 0;
			while (output.length < targetLength) {
				output = '0' + output;
			}
			return (sign ? forceSign ? '+' : '' : '-') + output;
		},

		_formats: {
			//year
			YY: function YY(date) {
				return u.date.leftZeroFill(date.getFullYear() % 100, 2);
			},
			YYYY: function YYYY(date) {
				return date.getFullYear();
			},
			//month
			M: function M(date) {
				return date.getMonth() + 1;
			},
			MM: function MM(date) {
				var m = u.date._formats.M(date);
				return u.date.leftZeroFill(m, 2);
			},
			MMM: function MMM(date, language) {
				var m = date.getMonth();
				// return u.date._dateLocale[language].monthsShort[m];
				return u.date._jsonLocale.monthsShort[m];
			},
			MMMM: function MMMM(date, language) {
				var m = date.getMonth();
				// return u.date._dateLocale[language].months[m];
				return u.date._jsonLocale.months[m];
			},
			//date
			D: function D(date) {
				return date.getDate();
			},
			DD: function DD(date) {
				var d = u.date._formats.D(date);
				return u.date.leftZeroFill(d, 2);
			},
			// weekday
			d: function d(date) {
				return date.getDay();
			},
			dd: function dd(date, language) {
				var d = u.date._formats.d(date);
				// return u.date._dateLocale[language].weekdaysMin[d];
				return u.date._jsonLocale.weekdaysMin[d];
			},
			ddd: function ddd(date, language) {
				var d = u.date._formats.d(date);
				// return u.date._dateLocale[language].weekdaysShort[d];
				return u.date._jsonLocale.weekdaysShort[d];
			},
			dddd: function dddd(date, language) {
				var d = u.date._formats.d(date);
				// return u.date._dateLocale[language].weekdays[d];
				return u.date._jsonLocale.weekdays[d];
			},
			// am pm
			a: function a(date) {
				if (date.getHours() > 12) {
					return 'pm';
				} else {
					return 'am';
				}
			},
			//hour
			h: function h(date) {
				var h = date.getHours();
				h = h > 12 ? h - 12 : h;
				return h;
			},
			hh: function hh(date) {
				var h = u.date._formats.h(date);
				return u.date.leftZeroFill(h, 2);
			},
			H: function H(date) {
				return date.getHours();
			},
			HH: function HH(date) {
				return u.date.leftZeroFill(date.getHours(), 2);
			},
			// minutes
			m: function m(date) {
				return date.getMinutes();
			},
			mm: function mm(date) {
				return u.date.leftZeroFill(date.getMinutes(), 2);
			},
			//seconds
			s: function s(date) {
				return date.getSeconds();
			},
			ss: function ss(date) {
				return u.date.leftZeroFill(date.getSeconds(), 2);
			}
		},

		/**
	  * 日期格式化
	  * @param date
	  * @param formatString
	  */
		format: function format(date, formatString, language) {
			if (!date) return ''; // renturn date 改为 return '',因：setFormat初始会赋值为undefined,造成二次选择报错
			var array = formatString.match(u.date._formattingTokens),
			    i,
			    length,
			    output = '';
			var _date = u.date.getDateObj(date);
			if (!_date) return date;
			language = language || _core.core.getLanguages();
			for (i = 0, length = array.length; i < length; i++) {
				if (u.date._formats[array[i]]) {
					output += u.date._formats[array[i]](_date, language);
				} else {
					output += array[i];
				}
			}
			return output;
		},

		_addOrSubtract: function _addOrSubtract(date, period, value, isAdding) {
			var times = date.getTime(),
			    d = date.getDate(),
			    m = date.getMonth(),
			    _date = u.date.getDateObj(date);
			if (period === 'ms') {
				times = times + value * isAdding;
				_date.setTime(times);
			} else if (period == 's') {
				times = times + value * 1000 * isAdding;
				_date.setTime(times);
			} else if (period == 'm') {
				times = times + value * 60000 * isAdding;
				_date.setTime(times);
			} else if (period == 'h') {
				times = times + value * 3600000 * isAdding;
				_date.setTime(times);
			} else if (period == 'd') {
				d = d + value * isAdding;
				_date.setDate(d);
			} else if (period == 'w') {
				d = d + value * 7 * isAdding;
				_date.setDate(d);
			} else if (period == 'M') {
				m = m + value * isAdding;
				_date.setMonth(m);
			} else if (period == 'y') {
				m = m + value * 12 * isAdding;
				_date.setMonth(m);
			}
			return _date;
		},

		add: function add(date, period, value) {
			return u.date._addOrSubtract(date, period, value, 1);
		},
		sub: function sub(date, period, value) {
			return u.date._addOrSubtract(date, period, value, -1);
		},
		getDateObj: function getDateObj(value) {
			if (!value || typeof value == 'undefined') return value;
			var dateFlag = false;
			var _date = new Date((0, _util.dateFormat)(value));
			if (isNaN(_date)) {
				// IE的话对"2016-2-13 12:13:22"进行处理
				var index1, index2, index3, s1, s2, s3, s4;
				if (value.indexOf) {
					index1 = value.indexOf('-');
					index2 = value.indexOf(':');
					index3 = value.indexOf(' ');
					if (index1 > 0 || index2 > 0 || index3 > 0) {
						_date = new Date();
						if (index3 > 0) {
							s3 = value.split(' ');
							s1 = s3[0].split('-');
							s2 = s3[1].split(':');
							s4 = s3[2];
						} else if (index1 > 0) {
							s1 = value.split('-');
						} else if (index2 > 0) {
							s2 = value.split(':');
						}
						if (s1 && s1.length > 0) {
							_date.setYear(s1[0]);
							_date.setMonth(parseInt(s1[1] - 1));
							_date.setDate(s1[2] ? s1[2] : 0);
							dateFlag = true;
						}
						if (s2 && s2.length > 0) {
							//解决ie和firefox等时间pm直接变am问题
							if (s4 == "pm") {
								s2[0] = s2[0] - -12;
							}
							_date.setHours(s2[0] ? s2[0] : 0);
							_date.setMinutes(s2[1] ? s2[1] : 0);
							_date.setSeconds(s2[2] ? s2[2] : 0);
							dateFlag = true;
						}
					} else {
						_date = new Date(parseInt(value));
						if (isNaN(_date)) {
							throw new TypeError('invalid Date parameter');
						} else {
							dateFlag = true;
						}
					}
				}
			} else {
				dateFlag = true;
			}
			if (dateFlag) return _date;else return null;
		}

	};

	var date = u.date;
	exports.date = date;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.core = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : Sparrow core context
	                                                                                                                                                                                                                                                                               * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-07-28 13:52:19
	                                                                                                                                                                                                                                                                               */


	var _extend = __webpack_require__(7);

	var _util = __webpack_require__(9);

	var _cookies = __webpack_require__(71);

	var _enumerables = __webpack_require__(8);

	var environment = {};
	/**
	 * client attributes
	 */
	var clientAttributes = {};

	var sessionAttributes = {};

	var fn = {};
	var maskerMeta = {
		'float': {
			precision: 2
		},
		'datetime': {
			format: 'YYYY-MM-DD HH:mm:ss',
			metaType: 'DateTimeFormatMeta',
			speratorSymbol: '-'
		},
		'time': {
			format: 'HH:mm'
		},
		'date': {
			format: 'YYYY-MM-DD'
		},
		'currency': {
			precision: 2,
			curSymbol: '￥'
		},
		'percent': {},
		'phoneNumber': {}
	};
	/**
	 * 获取环境信息
	 * @return {environment}
	 */
	fn.getEnvironment = function () {
		return (0, _util.createShellObject)(environment);
	};

	/**
	 * 获取客户端参数对象
	 * @return {clientAttributes}
	 */
	fn.getClientAttributes = function () {
		var exf = function exf() {};
		return (0, _util.createShellObject)(clientAttributes);
	};

	fn.setContextPath = function (contextPath) {
		return environment[IWEB_CONTEXT_PATH] = contextPath;
	};
	fn.getContextPath = function (contextPath) {
		return environment[IWEB_CONTEXT_PATH];
	};
	/**
	 * 设置客户端参数对象
	 * @param {Object} k 对象名称
	 * @param {Object} v 对象值(建议使用简单类型)
	 */
	fn.setClientAttribute = function (k, v) {
		clientAttributes[k] = v;
	};
	/**
	 * 获取会话级参数对象
	 * @return {clientAttributes}
	 */
	fn.getSessionAttributes = function () {
		var exf = function exf() {};
		return (0, _util.createShellObject)(sessionAttributes);
	};

	/**
	 * 设置会话级参数对象
	 * @param {Object} k 对象名称
	 * @param {Object} v 对象值(建议使用简单类型)
	 */
	fn.setSessionAttribute = function (k, v) {
		sessionAttributes[k] = v;
		(0, _cookies.setCookie)("ISES_" + k, v);
	};

	/**
	 * 移除客户端参数
	 * @param {Object} k 对象名称
	 */
	fn.removeClientAttribute = function (k) {
		clientAttributes[k] = null;
		execIgnoreError(function () {
			delete clientAttributes[k];
		});
	};

	/**
	 * 获取地区信息编码
	 */
	fn.getLocale = function () {
		return this.getEnvironment().locale;
	};

	/**
	 * 获取多语信息
	 */
	fn.getLanguages = function () {
		return this.getEnvironment().languages;
	};
	/**
	 * 收集环境信息(包括客户端参数)
	 * @return {Object}
	 */
	fn.collectEnvironment = function () {
		var _env = this.getEnvironment();
		var _ses = this.getSessionAttributes();

		for (var i in clientAttributes) {
			_ses[i] = clientAttributes[i];
		}
		_env.clientAttributes = _ses;
		return _env;
	};

	/**
	 * 设置数据格式信息
	 * @param {String} type
	 * @param {Object} meta
	 */
	fn.setMaskerMeta = function (type, meta) {
		if (typeof type == 'function') {
			getMetaFunc = type;
		} else {
			if (!maskerMeta[type]) maskerMeta[type] = meta;else {
				if ((typeof meta === 'undefined' ? 'undefined' : _typeof(meta)) != 'object') maskerMeta[type] = meta;else for (var key in meta) {
					maskerMeta[type][key] = meta[key];
				}
			}
		}
	};
	fn.getMaskerMeta = function (type) {
		if (typeof getMetaFunc == 'function') {
			var meta = getMetaFunc.call(this);
			return meta[type];
		} else return (0, _extend.extend)({}, maskerMeta[type]);
	};
	environment.languages = (0, _cookies.getCookie)(_enumerables.U_LANGUAGES) ? (0, _cookies.getCookie)(_enumerables.U_LANGUAGES).split(',') : navigator.language ? navigator.language : 'zh-CN';
	if (environment.languages == 'zh-cn') environment.languages = 'zh-CN';
	if (environment.languages == 'en-us') environment.languages = 'en-US';

	environment.theme = (0, _cookies.getCookie)(_enumerables.U_THEME);
	environment.locale = (0, _cookies.getCookie)(_enumerables.U_LOCALE);
	//environment.timezoneOffset = (new Date()).getTimezoneOffset()
	environment.usercode = (0, _cookies.getCookie)(_enumerables.U_USERCODE);
	//init session attribute
	document.cookie.replace(/ISES_(\w*)=([^;]*);?/ig, function (a, b, c) {
		sessionAttributes[b] = c;
	});

	var Core = function Core() {};
	Core.prototype = fn;

	var core = new Core();

	exports.core = core;

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Module : Sparrow cookies
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-27 21:46:50
	 */

	var setCookie = function setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure) {
		var sCookie = sName + "=" + encodeURIComponent(sValue);
		if (oExpires) sCookie += "; expires=" + oExpires.toGMTString();
		if (sPath) sCookie += "; path=" + sPath;
		if (sDomain) sCookie += "; domain=" + sDomain;
		if (bSecure) sCookie += "; secure=" + bSecure;
		document.cookie = sCookie;
	};

	var getCookie = function getCookie(sName) {
		var sRE = "(?:; )?" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);

		if (oRE.test(document.cookie)) {
			return decodeURIComponent(RegExp["$1"]);
		} else return null;
	};

	exports.setCookie = setCookie;
	exports.getCookie = getCookie;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.trans = undefined;

	var _cookies = __webpack_require__(71);

	var _enumerables = __webpack_require__(8);

	// 从datatable/src/compatiable/u/JsExtension.js抽取
	/**
	 * Module : Sparrow i18n
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-29 10:16:54
	 */
	//import {uuii18n} from '?';//缺失故修改为default值
	window.getCurrentJsPath = function () {
		var doc = document,
		    a = {},
		    expose = +new Date(),
		    rExtractUri = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/,
		    isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;
		// FF,Chrome
		if (doc.currentScript) {
			return doc.currentScript.src;
		}

		var stack;
		try {
			a.b();
		} catch (e) {
			stack = e.fileName || e.sourceURL || e.stack || e.stacktrace;
		}
		// IE10
		if (stack) {
			var absPath = rExtractUri.exec(stack)[1];
			if (absPath) {
				return absPath;
			}
		}

		// IE5-9
		for (var scripts = doc.scripts, i = scripts.length - 1, script; script = scripts[i--];) {
			if (script.className !== expose && script.readyState === 'interactive') {
				script.className = expose;
				// if less than ie 8, must get abs path by getAttribute(src, 4)
				return isLtIE8 ? script.getAttribute('src', 4) : script.src;
			}
		}
	};

	if (window.i18n) {
		var scriptPath = getCurrentJsPath(),
		    _temp = scriptPath.substr(0, scriptPath.lastIndexOf('/')),
		    __FOLDER__ = _temp.substr(0, _temp.lastIndexOf('/')),
		    resGetPath = u.i18nPath || __FOLDER__ + '/locales/__lng__/__ns__.json';
		i18n.init({
			postAsync: false,
			getAsync: false,
			fallbackLng: false,
			ns: { namespaces: ['uui-trans'] },
			lng: (0, _cookies.getCookie)(_enumerables.U_LOCALE) || 'zh',
			resGetPath: resGetPath
		});
	}

	var trans = function trans(key, dftValue) {
		return window.i18n ? i18n.t('uui-trans:' + key) : dftValue;
	};

	exports.trans = trans;

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : kero dataTable row rowSelect
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 13:54:01
	 */

	var toggleSelect = function toggleSelect(type) {
	    var index = this.parent.getRowIndex(this);
	    var selectindices = this.parent.getSelectedIndices();
	    if (selectindices.indexOf(index) != -1) {
	        this.parent.setRowUnSelect(index);
	    } else {
	        if (type === 'single') this.parent.setRowSelect(index);else this.parent.addRowSelect(index);
	    }
	};

	/**
	 * 行点击事件
	 */
	var singleSelect = function singleSelect() {
	    this.toggleSelect('single');
	};

	var multiSelect = function multiSelect() {
	    this.toggleSelect('multi');
	};

	exports.toggleSelect = toggleSelect;
	exports.singleSelect = singleSelect;
	exports.multiSelect = multiSelect;

/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Module : kero dataTable row simpleData
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date   : 2016-08-08 13:54:01
	 */

	var setSimpleData = function setSimpleData(data, status) {
	  var allData = {};
	  allData.data = data;
	  allData.status = status || 'nrm';
	  this.setData(allData, true);
	  this.currentRowChange(-this.currentRowChange());
	};

	exports.setSimpleData = setSimpleData;

/***/ }
/******/ ]);