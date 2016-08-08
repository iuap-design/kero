(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _baseAdapter = __webpack_require__(1);
	
	console.log(_baseAdapter.BaseAdapter); /**
	                                        * Module : Kero webpack entry index
	                                        * Author : Kvkens(yueming@yonyou.com)
	                                        * Date	  : 2016-08-08 15:24:46
	                                        */
	
	//import { u } from 'neoui-sparrow';
	//console.log(u.addClass(document.querySelector("body"),"Wrap"));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BaseAdapter = undefined;
	
	var _class = __webpack_require__(2);
	
	var _util = __webpack_require__(3);
	
	/**
	 * adapter基类
	 */
	
	/**
	 * Module : Kero adapter 基类
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-08 15:31:46
	 */
	var BaseAdapter = _class.Class.create({
	    /**
	     *
	     * @param comp
	     * @param options ：
	     *      el: '#content',  对应的dom元素
	     *      options: {},     配置
	     *      model:{}        模型，包括数据和事件
	     */
	    initialize: function initialize(options) {
	        //组合mixin中的方法
	        for (var i in this.mixins) {
	            var mixin = this.mixins[i];
	            for (var key in mixin['methods']) {
	                if (!this[key]) {
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
	        for (var i in this.mixins) {
	            var mixin = this.mixins[i];
	            if (mixin['init']) mixin.init.call(this);
	        }
	    },
	    parseDataModel: function parseDataModel() {
	        if (!this.options || !this.options["data"]) return;
	        this.field = this.options["field"];
	        var dtId = this.options["data"];
	        this.dataModel = (0, _util.getJSObject)(this.viewModel, this.options["data"]);
	        if (this.dataModel) {
	            var opt = {};
	            if (this.options.type === 'u-date') {
	                opt.type = 'date';
	            }
	            if (this.field) this.dataModel.createField(this.field, opt);
	        }
	    },
	    getOption: function getOption(key) {
	        var rs = this.dataModel.getRowMeta(this.field, key);
	        if (rs === 0) {
	            return 0;
	        } else {
	            return rs || this.options[key];
	        }
	    },
	    init: function init() {}
	});
	
	exports.BaseAdapter = BaseAdapter;

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
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
	
	NodeList.prototype.forEach = Array.prototype.forEach;
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=kero.js.map