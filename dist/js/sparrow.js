/** 
 * neoui-sparrow v1.1.11
 * sparrow.js
 * author : Yonyou FED
 * homepage : https://github.com/iuap-design/sparrow#readme
 * bugs : https://github.com/iuap-design/sparrow/issues
 **/ 
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.u = undefined;
	
	var _extend = __webpack_require__(1);
	
	var _cookies = __webpack_require__(3);
	
	var _util = __webpack_require__(4);
	
	var _env = __webpack_require__(5);
	
	var _event = __webpack_require__(6);
	
	var _dom = __webpack_require__(7);
	
	var _class = __webpack_require__(8);
	
	var _core = __webpack_require__(9);
	
	var _compMgr = __webpack_require__(10);
	
	var _BaseComponent = __webpack_require__(11);
	
	var _ajax = __webpack_require__(12);
	
	var _dataRender = __webpack_require__(13);
	
	var _formater = __webpack_require__(14);
	
	var _dateUtils = __webpack_require__(16);
	
	var _masker = __webpack_require__(15);
	
	var _hotKeys = __webpack_require__(17);
	
	var _ripple = __webpack_require__(18);
	
	var _rsautils = __webpack_require__(19);
	
	var _i18n = __webpack_require__(20);
	
	//公开接口、属性对外暴露
	var api = {
		ajax: _ajax.ajax,
		extend: _extend.extend,
		setCookie: _cookies.setCookie,
		getCookie: _cookies.getCookie,
		createShellObject: _util.createShellObject,
		execIgnoreError: _util.execIgnoreError,
		getFunction: _util.getFunction,
		getJSObject: _util.getJSObject,
		isDate: _util.isDate,
		isNumber: _util.isNumber,
		isArray: _util.isArray,
		isEmptyObject: _util.isEmptyObject,
		inArray: _util.inArray,
		isDomElement: _util.isDomElement,
		each: _util.each,
		on: _event.on,
		off: _event.off,
		trigger: _event.trigger,
		stopEvent: _event.stopEvent,
		event: _event.event,
		addClass: _dom.addClass,
		removeClass: _dom.removeClass,
		hasClass: _dom.hasClass,
		toggleClass: _dom.toggleClass,
		closest: _dom.closest,
		css: _dom.css,
		wrap: _dom.wrap,
		getStyle: _dom.getStyle,
		getZIndex: _dom.getZIndex,
		makeDOM: _dom.makeDOM,
		makeModal: _dom.makeModal,
		getOffset: _dom.getOffset,
		getScroll: _dom.getScroll,
		showPanelByEle: _dom.showPanelByEle,
		Class: _class.Class,
		core: _core.core,
		compMgr: _compMgr.compMgr,
		BaseComponent: _BaseComponent.BaseComponent,
		floatRender: _dataRender.floatRender,
		integerRender: _dataRender.integerRender,
		dateRender: _dataRender.dateRender,
		dateTimeRender: _dataRender.dateTimeRender,
		timeRender: _dataRender.timeRender,
		percentRender: _dataRender.percentRender,
		dateToUTCString: _dataRender.dateToUTCString,
		date: _dateUtils.date,
		NumberFormater: _formater.NumberFormater,
		DateFormater: _formater.DateFormater,
		AddressMasker: _masker.AddressMasker,
		NumberMasker: _masker.NumberMasker,
		CurrencyMasker: _masker.CurrencyMasker,
		PercentMasker: _masker.PercentMasker,
		hotkeys: _hotKeys.hotkeys,
		Ripple: _ripple.Ripple,
		RSAUtils: _rsautils.RSAUtils,
		BigInt: _rsautils.BigInt,
		BarrettMu: _rsautils.BarrettMu,
		twoDigit: _rsautils.twoDigit,
		trans: _i18n.trans
	}; /**
	    * Module : Sparrow entry index
	    * Author : Kvkens(yueming@yonyou.com)
	    * Date	  : 2016-08-04 09:48:36
	    */
	
	(0, _extend.extend)(api, _env.env);
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			_compMgr.compMgr.updateComp();
		});
	}
	// export api;
	//export default api;
	exports.u = api;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.extend = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * Module : Sparrow extend
	                                                                                                                                                                                                                                                   * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                   * Date	  : 2016-07-27 21:46:50
	                                                                                                                                                                                                                                                   */
	
	var _enumerables = __webpack_require__(2);
	
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
/* 2 */
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
/* 3 */
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
/* 4 */
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.env = undefined;
	
	var _extend = __webpack_require__(1);
	
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
		isIOS: false,
		isIphone: false,
		isIPAD: false,
		isStandard: false,
		version: 0,
		isWin: false,
		isUnix: false,
		isLinux: false,
		isAndroid: false,
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
		if (match != null) {
			browserMatch = {
				browser: "",
				version: "0"
			};
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
				} else {}
			}
		}
		if ("ontouchend" in document) {
			u.hasTouch = true;
		}
		if (u.isIOS || u.isAndroid) u.isMobile = true;
	})();
	
	var env = u;
	exports.env = env;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.event = exports.stopEvent = exports.trigger = exports.off = exports.on = undefined;
	
	var _env = __webpack_require__(5);
	
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
					} catch (e) {}
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
		var eventfn = element["uEvent"][eventName + 'fn'];
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
		element["uEvent"][eventName] = undefined;
		element["uEvent"][eventName + 'fn'] = undefined;
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.showPanelByEle = exports.getScroll = exports.getOffset = exports.makeModal = exports.makeDOM = exports.getZIndex = exports.getStyle = exports.wrap = exports.css = exports.closest = exports.toggleClass = exports.hasClass = exports.removeClass = exports.addClass = undefined;
	
	var _event = __webpack_require__(6);
	
	/**
	 * 元素增加指定样式
	 * @param value
	 * @returns {*}
	 */
	var addClass = function addClass(element, value) {
		if (typeof element.classList === 'undefined') {
			if (u._addClass) u._addClass(element, value);
		} else {
			element.classList.add(value);
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
	 * Date	  : 2016-07-27 21:46:50
	 */
	var removeClass = function removeClass(element, value) {
		if (typeof element.classList === 'undefined') {
			if (u._removeClass) u._removeClass(element, value);
		} else {
			element.classList.remove(value);
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
			if (u._hasClass) return u._hasClass(element, value);
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
		addClass(overlayDiv, 'u-overlay');
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
		offset.top += Node.scrollTop;
		offset.left += Node.scrollLeft;
		if (Node.parentNode) return getScroll(Node.parentNode, offset);else return offset;
	};
	var showPanelByEle = function showPanelByEle(obj) {
		var ele = obj.ele,
		    panel = obj.panel,
		    position = obj.position,
		    off = getOffset(ele),
		    scroll = getScroll(ele),
		    offLeft = off.left,
		    offTop = off.top,
		    scrollLeft = scroll.left,
		    scrollTop = scroll.top,
		    eleWidth = ele.offsetWidth,
		    eleHeight = ele.offsetHeight,
		    panelWidth = panel.offsetWidth,
		    panelHeight = panel.offsetHeight,
		    bodyWidth = document.body.clientWidth,
		    bodyHeight = document.body.clientHeight,
		    position = position || 'top',
		    left = offLeft - scrollLeft,
		    top = offTop - scrollTop;
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
	
		// if((left + panelWidth) > bodyWidth)
		//     left = bodyWidth - panelWidth;
		// if(left < 0)
		//     left = 0;
	
		// if((top + panelHeight) > bodyHeight)
		//     top = bodyHeight - panelHeight;
		// if(top < 0)
		//     top = 0;
		panel.style.left = left + 'px';
		panel.style.top = top + 'px';
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

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.core = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * Module : Sparrow core context
	                                                                                                                                                                                                                                                   * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                   * Date	  : 2016-07-28 13:52:19
	                                                                                                                                                                                                                                                   */
	
	
	var _extend = __webpack_require__(1);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	var _util = __webpack_require__(4);
	
	var _cookies = __webpack_require__(3);
	
	var _enumerables = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
		'percent': {}
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
		} else return (0, _extend2.default)({}, maskerMeta[type]);
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.compMgr = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * Module : Sparrow compMgr
	                                                                                                                                                                                                                                                   * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                   * Date	  : 2016-07-28 18:41:06
	                                                                                                                                                                                                                                                   */
	
	var _dom = __webpack_require__(7);
	
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
	                var comp = CompMgr.createDataAdapter({ el: element, options: options, model: model });
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
	            callbacks: []
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
	        for (var n = 0; n < this.registeredControls.length; n++) {
	            _upgradeDomInternal(this.registeredControls[n].className, null, ele);
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BaseComponent = undefined;
	
	var _class = __webpack_require__(8);
	
	var _util = __webpack_require__(4);
	
	var _event = __webpack_require__(6);
	
	var _compMgr = __webpack_require__(10);
	
	/**
	 * Module : Sparrow base component
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-28 18:45:08
	 */
	
	var BaseComponent = _class.Class.create({
	    initialize: function initialize(element) {
	        if ((0, _util.isDomElement)(element)) {
	            this.element = element;
	            this.options = {};
	        } else {
	            this.element = element['el'];
	            this.options = element;
	        }
	        this.element = typeof this.element === 'string' ? document.querySelector(this.element) : this.element;
	
	        this.compType = this.compType || this.constructor.compType;
	        this.element[this.compType] = this;
	        this.element['init'] = true;
	        this.init();
	    },
	    /**
	     * 绑定事件
	     * @param {String} name
	     * @param {Function} callback
	     */
	    on: function on(name, callback) {
	        name = name.toLowerCase();
	        this._events || (this._events = {});
	        var events = this._events[name] || (this._events[name] = []);
	        events.push({
	            callback: callback
	        });
	        return this;
	    },
	    /**
	     * 触发事件
	     * @param {String} name
	     */
	    trigger: function trigger(name) {
	        name = name.toLowerCase();
	        if (!this._events || !this._events[name]) return this;
	        var args = Array.prototype.slice.call(arguments, 1);
	        var events = this._events[name];
	        for (var i = 0, count = events.length; i < count; i++) {
	            events[i].callback.apply(this, args);
	        }
	        return this;
	    },
	    /**
	     * 初始化
	     */
	    init: function init() {},
	    /**
	     * 渲染控件
	     */
	    render: function render() {},
	    /**
	     * 销毁控件
	     */
	    destroy: function destroy() {
	        delete this.element['comp'];
	        this.element.innerHTML = '';
	    },
	    /**
	     * 增加dom事件
	     * @param {String} name
	     * @param {Function} callback
	     */
	    addDomEvent: function addDomEvent(name, callback) {
	        (0, _event.on)(this.element, name, callback);
	        return this;
	    },
	    /**
	     * 移除dom事件
	     * @param {String} name
	     */
	    removeDomEvent: function removeDomEvent(name, callback) {
	        (0, _event.off)(this.element, name, callback);
	        return this;
	    },
	    setEnable: function setEnable(enable) {
	        return this;
	    },
	    /**
	     * 判断是否为DOM事件
	     */
	    isDomEvent: function isDomEvent(eventName) {
	        if (this.element['on' + eventName] === undefined) return false;else return true;
	    },
	    createDateAdapter: function createDateAdapter(options) {
	        var opt = options['options'],
	            model = options['model'];
	        var Adapter = _compMgr.compMgr.getDataAdapter(this.compType, opt['dataType']);
	        if (Adapter) {
	            this.dataAdapter = new Adapter(this, options);
	        }
	    },
	    Statics: {
	        compName: '',
	        EVENT_VALUE_CHANGE: 'valueChange',
	        getName: function getName() {
	            return this.compName;
	        }
	    }
	});
	
	function adjustDataType(options) {
	    var types = ['integer', 'float', 'currency', 'percent', 'string', 'textarea'];
	    var _type = options['type'],
	        _dataType = options['dataType'];
	    if (types.indexOf(_type) != -1) {
	        options['dataType'] = _type;
	        options['type'] = 'originText';
	    }
	}
	
	var BaseComponent = BaseComponent;
	
	exports.BaseComponent = BaseComponent;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ajax = undefined;
	
	var _env = __webpack_require__(5);
	
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.dateToUTCString = exports.percentRender = exports.timeRender = exports.dateTimeRender = exports.dateRender = exports.integerRender = exports.floatRender = undefined;
	
	var _core = __webpack_require__(9);
	
	var _formater = __webpack_require__(14);
	
	var _masker = __webpack_require__(15);
	
	var _dateUtils = __webpack_require__(16);
	
	/**
	 * Module : Sparrow data display formater
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-28 15:39:01
	 */
	var floatRender = function floatRender(value, precision) {
		var trueValue = value;
		if (typeof value === 'undefined' || value === null) return value;
		//value 为 ko对象
		if (typeof value === 'function') trueValue = value();
		var maskerMeta = _core.core.getMaskerMeta('float') || {};
		if (typeof precision === 'number') maskerMeta.precision = precision;
		var formater = new _formater.NumberFormater(maskerMeta.precision);
		var masker = new _masker.NumberMasker(maskerMeta);
		return masker.format(formater.format(trueValue)).value;
	};
	
	var integerRender = function integerRender(value) {
		var trueValue = value;
		if (typeof value === 'undefined' || value === null) return value;
		//value 为 ko对象
		if (typeof value === 'function') trueValue = value();
		return trueValue;
	};
	
	var _dateRender = function _dateRender(value, format, type) {
		var trueValue = value;
		if (typeof value === 'undefined' || value === null) return value;
		//value 为 ko对象
		if (typeof value === 'function') trueValue = value();
		var maskerMeta = _core.core.getMaskerMeta(type) || {};
		if (typeof format != 'undefined') maskerMeta.format = format;
		var maskerValue = _dateUtils.date.format(trueValue, maskerMeta.format);
		return maskerValue;
	};
	
	var dateRender = function dateRender(value, format) {
		return _dateRender(value, format, 'date');
	};
	
	var dateTimeRender = function dateTimeRender(value, format) {
		return _dateRender(value, format, 'datetime');
	};
	
	var timeRender = function timeRender(value, format) {
		return _dateRender(value, format, 'time');
	};
	
	var percentRender = function percentRender(value) {
		var trueValue = value;
		if (typeof value === 'undefined' || value === null) return value;
		//value 为 ko对象
		if (typeof value === 'function') trueValue = value();
		var maskerMeta = _core.core.getMaskerMeta('percent') || {};
		var masker = new _masker.PercentMasker(maskerMeta);
		var maskerValue = masker.format(trueValue);
		return maskerValue && maskerValue.value ? maskerValue.value : '';
	};
	
	var dateToUTCString = function dateToUTCString(date) {
		if (!date) return '';
		if (date.indexOf("-") > -1) date = date.replace(/\-/g, "/");
		var utcString = Date.parse(date);
		if (isNaN(utcString)) return "";
		return utcString;
	};
	
	exports.floatRender = floatRender;
	exports.integerRender = integerRender;
	exports.dateRender = dateRender;
	exports.dateTimeRender = dateTimeRender;
	exports.timeRender = timeRender;
	exports.percentRender = percentRender;
	exports.dateToUTCString = dateToUTCString;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DateFormater = exports.NumberFormater = undefined;
	
	var _util = __webpack_require__(4);
	
	function NumberFormater(precision) {
	    this.precision = precision;
	} /**
	   * Module : Sparrow data formater tools
	   * Author : Kvkens(yueming@yonyou.com)
	   * Date	  : 2016-07-28 15:39:01
	   */
	;
	
	NumberFormater.prototype.update = function (precision) {
	    this.precision = precision;
	};
	
	NumberFormater.prototype.format = function (value) {
	    if (!(0, _util.isNumber)(value)) return "";
	
	    // 以0开头的数字将其前面的0去掉
	    while ((value + "").charAt(0) == "0" && value.length > 1 && (value + "").indexOf('0.') != 0) {
	        value = value.substring(1);
	    }
	    var result = value;
	    if ((0, _util.isNumber)(this.precision)) {
	        if (window.BigNumber) {
	            // 已经引入BigNumber
	            result = new BigNumber(value).toFixed(this.precision);
	        } else {
	            var digit = parseFloat(value);
	            // 解决toFixed四舍五入问题，如1.345
	            result = (Math.round(digit * Math.pow(10, this.precision)) / Math.pow(10, this.precision)).toFixed(this.precision);
	        }
	        if (result == "NaN") return "";
	    }
	
	    return result;
	};
	
	function DateFormater(pattern) {
	    this.pattern = pattern;
	};
	
	DateFormater.prototype.update = function (pattern) {
	    this.pattern = pattern;
	};
	
	DateFormater.prototype.format = function (value) {
	    return moment(value).format(this.pattern);
	};
	
	//var NumberFormater = NumberFormater;
	//var DateFormater = DateFormater;
	exports.NumberFormater = NumberFormater;
	exports.DateFormater = DateFormater;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PercentMasker = exports.CurrencyMasker = exports.NumberMasker = exports.AddressMasker = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * Module : Sparrow abstract formater class
	                                                                                                                                                                                                                                                   * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                   * Date	  : 2016-07-28 19:35:26
	                                                                                                                                                                                                                                                   */
	
	var _extend = __webpack_require__(1);
	
	function AbstractMasker() {};
	
	AbstractMasker.prototype.format = function (obj) {
		if (obj == null) return null;
	
		var fObj = this.formatArgument(obj);
		return this.innerFormat(fObj);
	};
	
	/**
	 * 统一被格式化对象结构
	 *
	 * @param obj
	 * @return
	 */
	AbstractMasker.prototype.formatArgument = function (obj) {};
	
	/**
	 * 格式化
	 *
	 * @param obj
	 * @return
	 */
	AbstractMasker.prototype.innerFormat = function (obj) {};
	
	/**
	 * 拆分算法格式化虚基类
	 */
	AbstractSplitMasker.prototype = new AbstractMasker();
	
	function AbstractSplitMasker() {};
	AbstractSplitMasker.prototype.elements = new Array();
	AbstractSplitMasker.prototype.format = function (obj) {
		if (obj == null) return null;
	
		var fObj = this.formatArgument(obj);
		return this.innerFormat(fObj);
	};
	
	/**
	 * 统一被格式化对象结构
	 *
	 * @param obj
	 * @return
	 */
	AbstractSplitMasker.prototype.formatArgument = function (obj) {
		return obj;
	};
	
	/**
	 * 格式化
	 *
	 * @param obj
	 * @return
	 */
	AbstractSplitMasker.prototype.innerFormat = function (obj) {
		if (obj == null || obj == "") return new FormatResult(obj);
		this.doSplit();
		var result = "";
		//dingrf 去掉concat合并数组的方式，换用多维数组来实现 提高效率
		result = this.getElementsValue(this.elements, obj);
	
		return new FormatResult(result);
	};
	
	/**
	 * 合并多维数组中的elementValue
	 * @param {} element
	 * @param {} obj
	 * @return {}
	 */
	AbstractSplitMasker.prototype.getElementsValue = function (element, obj) {
		var result = "";
		if (element instanceof Array) {
			for (var i = 0; i < element.length; i++) {
				result = result + this.getElementsValue(element[i], obj);
			}
		} else {
			if (element.getValue) result = element.getValue(obj);
		}
		return result;
	};
	
	AbstractSplitMasker.prototype.getExpress = function () {};
	
	AbstractSplitMasker.prototype.doSplit = function () {
		var express = this.getExpress();
		if (this.elements == null || this.elements.length == 0) this.elements = this.doQuotation(express, this.getSeperators(), this.getReplaceds(), 0);
	};
	
	/**
	 * 处理引号
	 *
	 * @param express
	 * @param seperators
	 * @param replaced
	 * @param curSeperator
	 * @param obj
	 * @param result
	 */
	AbstractSplitMasker.prototype.doQuotation = function (express, seperators, replaced, curSeperator) {
		if (express.length == 0) return null;
		var elements = new Array();
		var pattern = new RegExp('".*?"', "g");
		var fromIndex = 0;
		var result;
		do {
			result = pattern.exec(express);
			if (result != null) {
				var i = result.index;
				var j = pattern.lastIndex;
				if (i != j) {
					if (fromIndex < i) {
						var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator);
						if (childElements != null && childElements.length > 0) {
							//						elements = elements.concat(childElements);
							elements.push(childElements);
						}
					}
				}
				elements.push(new StringElement(express.substring(i + 1, j - 1)));
				fromIndex = j;
			}
		} while (result != null);
	
		if (fromIndex < express.length) {
			var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator);
			if (childElements != null && childElements.length > 0)
				//			elements = elements.concat(childElements);
				elements.push(childElements);
		}
		return elements;
	};
	
	/**
	 * 处理其它分隔符
	 *
	 * @param express
	 * @param seperators
	 * @param replaced
	 * @param curSeperator
	 * @param obj
	 * @param result
	 */
	AbstractSplitMasker.prototype.doSeperator = function (express, seperators, replaced, curSeperator) {
		if (curSeperator >= seperators.length) {
			var elements = new Array();
			elements.push(this.getVarElement(express));
			return elements;
		}
	
		if (express.length == 0) return null;
		var fromIndex = 0;
		var elements = new Array();
		var pattern = new RegExp(seperators[curSeperator], "g");
		var result;
		do {
			result = pattern.exec(express);
			if (result != null) {
				var i = result.index;
				var j = pattern.lastIndex;
				if (i != j) {
					if (fromIndex < i) {
						var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator + 1);
						if (childElements != null && childElements.length > 0)
							//						elements = elements.concat(childElements);
							elements.push(childElements);
					}
	
					if (replaced[curSeperator] != null) {
						elements.push(new StringElement(replaced[curSeperator]));
					} else {
						elements.push(new StringElement(express.substring(i, j)));
					}
					fromIndex = j;
				}
			}
		} while (result != null);
	
		if (fromIndex < express.length) {
			var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator + 1);
			if (childElements != null && childElements.length > 0)
				//			elements = elements.concat(childElements);
				elements.push(childElements);
		}
		return elements;
	};
	
	/**
	 * 地址格式
	 */
	AddressMasker.prototype = new AbstractSplitMasker();
	
	function AddressMasker(formatMeta) {
		this.update(formatMeta);
	};
	
	AddressMasker.prototype.update = function (formatMeta) {
		this.formatMeta = (0, _extend.extend)({}, AddressMasker.DefaultFormatMeta, formatMeta);
	};
	
	AddressMasker.prototype.getExpress = function () {
		return this.formatMeta.express;
	};
	
	AddressMasker.prototype.getReplaceds = function () {
		return [this.formatMeta.separator];
	};
	
	AddressMasker.prototype.getSeperators = function () {
		return ["(\\s)+?"];
	};
	
	AddressMasker.prototype.getVarElement = function (express) {
		var ex = {};
	
		if (express == "C") ex.getValue = function (obj) {
			return obj.country;
		};
	
		if (express == "S") ex.getValue = function (obj) {
			return obj.state;
		};
	
		if (express == "T") ex.getValue = function (obj) {
			return obj.city;
		};
	
		if (express == "D") ex.getValue = function (obj) {
			return obj.section;
		};
	
		if (express == "R") ex.getValue = function (obj) {
			return obj.road;
		};
	
		if (express == "P") ex.getValue = function (obj) {
			return obj.postcode;
		};
	
		if (_typeof(ex.getValue) == undefined) return new StringElement(express);else return ex;
	};
	
	AddressMasker.prototype.formatArgument = function (obj) {
		return obj;
	};
	
	/**
	 * <b> 数字格式化  </b>
	 *
	 * <p> 格式化数字
	 *
	 * </p>
	 *
	 * Create at 2009-3-20 上午08:50:32
	 *
	 * @author bq
	 * @since V6.0
	 */
	NumberMasker.prototype = new AbstractMasker();
	NumberMasker.prototype.formatMeta = null;
	
	/**
	 *构造方法
	 */
	function NumberMasker(formatMeta) {
		this.update(formatMeta);
	};
	
	NumberMasker.prototype.update = function (formatMeta) {
		this.formatMeta = (0, _extend.extend)({}, NumberMasker.DefaultFormatMeta, formatMeta);
	};
	
	/**
	 *格式化对象
	 */
	NumberMasker.prototype.innerFormat = function (obj) {
		var dValue, express, seperatorIndex, strValue;
		dValue = obj.value;
		if (dValue > 0) {
			express = this.formatMeta.positiveFormat;
			strValue = dValue + '';
		} else if (dValue < 0) {
			express = this.formatMeta.negativeFormat;
			strValue = (dValue + '').substr(1, (dValue + '').length - 1);
		} else {
			express = this.formatMeta.positiveFormat;
			strValue = dValue + '';
		}
		seperatorIndex = strValue.indexOf('.');
		strValue = this.setTheSeperator(strValue, seperatorIndex);
		strValue = this.setTheMark(strValue, seperatorIndex);
		var color = null;
		if (dValue < 0 && this.formatMeta.isNegRed) {
			color = "FF0000";
		}
		return new FormatResult(express.replaceAll('n', strValue), color);
	};
	/**
	 *设置标记
	 */
	NumberMasker.prototype.setTheMark = function (str, seperatorIndex) {
		var endIndex, first, index;
		if (!this.formatMeta.isMarkEnable) return str;
		if (seperatorIndex <= 0) seperatorIndex = str.length;
		first = str.charCodeAt(0);
		endIndex = 0;
		if (first == 45) endIndex = 1;
		index = seperatorIndex - 3;
		while (index > endIndex) {
			str = str.substr(0, index - 0) + this.formatMeta.markSymbol + str.substr(index, str.length - index);
			index = index - 3;
		}
		return str;
	};
	NumberMasker.prototype.setTheSeperator = function (str, seperatorIndex) {
		var ca;
		if (seperatorIndex > 0) {
			ca = NumberMasker.toCharArray(str);
			//ca[seperatorIndex] = NumberMasker.toCharArray(this.formatMeta.pointSymbol)[0];
			ca[seperatorIndex] = this.formatMeta.pointSymbol;
			str = ca.join('');
		}
		return str;
	};
	/**
	 * 将字符串转换成char数组
	 * @param {} str
	 * @return {}
	 */
	NumberMasker.toCharArray = function (str) {
		var str = str.split("");
		var charArray = new Array();
		for (var i = 0; i < str.length; i++) {
			charArray.push(str[i]);
		}
		return charArray;
	};
	
	/**
	 *默认构造方法
	 */
	NumberMasker.prototype.formatArgument = function (obj) {
		var numberObj = {};
		numberObj.value = obj;
		return numberObj;
	};
	
	/**
	 * 货币格式
	 */
	CurrencyMasker.prototype = new NumberMasker();
	CurrencyMasker.prototype.formatMeta = null;
	
	function CurrencyMasker(formatMeta) {
		this.update(formatMeta);
	};
	
	CurrencyMasker.prototype.update = function (formatMeta) {
		this.formatMeta = (0, _extend.extend)({}, CurrencyMasker.DefaultFormatMeta, formatMeta);
	};
	
	/**
	 * 重载格式方法
	 * @param {} obj
	 * @return {}
	 */
	CurrencyMasker.prototype.innerFormat = function (obj) {
		if (!obj.value) {
			return { value: "" };
		}
		var fo = new NumberMasker(this.formatMeta).innerFormat(obj);
		fo.value = this.formatMeta.curSymbol + fo.value; //fo.value.replace("$", this.formatMeta.curSymbol);
		return fo;
	};
	
	PercentMasker.prototype = new NumberMasker();
	
	function PercentMasker(formatMeta) {
		this.update(formatMeta);
	};
	
	PercentMasker.prototype.update = function (formatMeta) {
		this.formatMeta = (0, _extend.extend)({}, NumberMasker.DefaultFormatMeta, formatMeta);
	};
	
	PercentMasker.prototype.formatArgument = function (obj) {
		return obj;
	};
	
	PercentMasker.prototype.innerFormat = function (value) {
		var val = "";
		if (value != "") {
			var obj = new NumberMasker(this.formatMeta).innerFormat({ value: value }).value;
			// 获取obj保留几位小数位,obj小数位-2为显示小数位
			var objStr = String(obj);
			var objPrecision = objStr.length - objStr.indexOf(".") - 1;
			var showPrecision = objPrecision - 2;
			if (showPrecision < 0) {
				showPrecision = 0;
			}
			val = parseFloat(obj) * 100;
			val = (val * Math.pow(10, showPrecision) / Math.pow(10, showPrecision)).toFixed(showPrecision);
			val = val + "%";
		}
		return {
			value: val
		};
	};
	
	/**
	 * 将结果输出成HTML代码
	 * @param {} result
	 * @return {String}
	 */
	function toColorfulString(result) {
		var color;
		if (!result) {
			return '';
		}
		if (result.color == null) {
			return result.value;
		}
		color = result.color;
		return '<font color="' + color + '">' + result.value + '<\/font>';
	};
	
	/**
	 * 格式解析后形成的单个格式单元
	 * 适用于基于拆分算法的AbstractSplitFormat，表示拆分后的变量单元
	 */
	StringElement.prototype = new Object();
	
	function StringElement(value) {
		this.value = value;
	};
	StringElement.prototype.value = "";
	
	StringElement.prototype.getValue = function (obj) {
		return this.value;
	};
	/**
	 *格式结果
	 */
	FormatResult.prototype = new Object();
	/**
	 *默认构造方法
	 */
	function FormatResult(value, color) {
		this.value = value;
		this.color = color;
	};
	
	NumberMasker.DefaultFormatMeta = {
		isNegRed: true,
		isMarkEnable: true,
		markSymbol: ",",
		pointSymbol: ".",
		positiveFormat: "n",
		negativeFormat: "-n"
	};
	
	CurrencyMasker.DefaultFormatMeta = (0, _extend.extend)({}, NumberMasker.DefaultFormatMeta, {
		//curSymbol: "",
		positiveFormat: "n",
		negativeFormat: "-n"
	});
	
	AddressMasker.defaultFormatMeta = {
		express: "C S T R P",
		separator: " "
	};
	
	exports.AddressMasker = AddressMasker;
	exports.NumberMasker = NumberMasker;
	exports.CurrencyMasker = CurrencyMasker;
	exports.PercentMasker = PercentMasker;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.date = undefined;
	
	var _core = __webpack_require__(9);
	
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
				return u.date._dateLocale[language].monthsShort[m];
			},
			MMMM: function MMMM(date, language) {
				var m = date.getMonth();
				return u.date._dateLocale[language].months[m];
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
				return u.date._dateLocale[language].weekdaysMin[d];
			},
			ddd: function ddd(date, language) {
				var d = u.date._formats.d(date);
				return u.date._dateLocale[language].weekdaysShort[d];
			},
			dddd: function dddd(date, language) {
				var d = u.date._formats.d(date);
				return u.date._dateLocale[language].weekdays[d];
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
			if (!date) return date;
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
				_date.setMonth(d);
			} else if (period == 'y') {
				m = m + value * 12 * isAdding;
				_date.setMonth(d);
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
			var _date = new Date(value);
			if (isNaN(_date)) {
				// IE的话对"2016-2-13 12:13:22"进行处理
				var index1, index2, index3, s1, s2, s3;
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.hotkeys = undefined;
	
	var _class = __webpack_require__(8);
	
	var _extend = __webpack_require__(1);
	
	var _util = __webpack_require__(4);
	
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.URipple = exports.Ripple = undefined;
	
	var _env = __webpack_require__(5);
	
	var _dom = __webpack_require__(7);
	
	var _event = __webpack_require__(6);
	
	var URipple = function URipple(element) {
	  if (_env.isIE8) return;
	  this._element = element;
	
	  // Initialize instance.
	  this.init();
	};
	//window['URipple'] = URipple;
	
	/**
	 * Module : Sparrow ripple
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-29 08:42:13
	 */
	
	URipple.prototype._down = function (event) {
	  if (_env.isIE8) return;
	  if (!this._rippleElement.style.width && !this._rippleElement.style.height) {
	    var rect = this._element.getBoundingClientRect();
	    this.rippleSize_ = Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 2 + 2;
	    this._rippleElement.style.width = this.rippleSize_ + 'px';
	    this._rippleElement.style.height = this.rippleSize_ + 'px';
	  }
	
	  (0, _dom.addClass)(this._rippleElement, 'is-visible');
	
	  if (event.type === 'mousedown' && this._ignoringMouseDown) {
	    this._ignoringMouseDown = false;
	  } else {
	    if (event.type === 'touchstart') {
	      this._ignoringMouseDown = true;
	    }
	    var frameCount = this.getFrameCount();
	    if (frameCount > 0) {
	      return;
	    }
	    this.setFrameCount(1);
	    var t = event.currentTarget || event.target || event.srcElement;
	    var bound = t.getBoundingClientRect();
	    var x;
	    var y;
	    // Check if we are handling a keyboard click.
	    if (event.clientX === 0 && event.clientY === 0) {
	      x = Math.round(bound.width / 2);
	      y = Math.round(bound.height / 2);
	    } else {
	      var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
	      var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
	      x = Math.round(clientX - bound.left);
	      y = Math.round(clientY - bound.top);
	    }
	    this.setRippleXY(x, y);
	    this.setRippleStyles(true);
	    if (window.requestAnimationFrame) window.requestAnimationFrame(this.animFrameHandler.bind(this));
	  }
	};
	
	/**
	 * Handle mouse / finger up on element.
	 *
	 * @param {Event} event The event that fired.
	 * @private
	 */
	URipple.prototype._up = function (event) {
	  if (_env.isIE8) return;
	  var self = this;
	  // Don't fire for the artificial "mouseup" generated by a double-click.
	  if (event && event.detail !== 2) {
	    (0, _dom.removeClass)(this._rippleElement, 'is-visible');
	  }
	  // Allow a repaint to occur before removing this class, so the animation
	  // shows for tap events, which seem to trigger a mouseup too soon after
	  // mousedown.
	  window.setTimeout(function () {
	    (0, _dom.removeClass)(self._rippleElement, 'is-visible');
	  }, 0);
	};
	
	/**
	     * Getter for frameCount_.
	     * @return {number} the frame count.
	     */
	URipple.prototype.getFrameCount = function () {
	  if (_env.isIE8) return;
	  return this.frameCount_;
	};
	/**
	     * Setter for frameCount_.
	     * @param {number} fC the frame count.
	     */
	URipple.prototype.setFrameCount = function (fC) {
	  if (_env.isIE8) return;
	  this.frameCount_ = fC;
	};
	
	/**
	     * Getter for _rippleElement.
	     * @return {Element} the ripple element.
	     */
	URipple.prototype.getRippleElement = function () {
	  if (_env.isIE8) return;
	  return this._rippleElement;
	};
	
	/**
	 * Sets the ripple X and Y coordinates.
	 * @param  {number} newX the new X coordinate
	 * @param  {number} newY the new Y coordinate
	 */
	URipple.prototype.setRippleXY = function (newX, newY) {
	  if (_env.isIE8) return;
	  this.x_ = newX;
	  this.y_ = newY;
	};
	
	/**
	 * Sets the ripple styles.
	 * @param  {boolean} start whether or not this is the start frame.
	 */
	URipple.prototype.setRippleStyles = function (start) {
	  if (_env.isIE8) return;
	  if (this._rippleElement !== null) {
	    var transformString;
	    var scale;
	    var size;
	    var offset = 'translate(' + this.x_ + 'px, ' + this.y_ + 'px)';
	
	    if (start) {
	      scale = 'scale(0.0001, 0.0001)';
	      size = '1px';
	    } else {
	      scale = '';
	      size = this.rippleSize_ + 'px';
	    }
	
	    transformString = 'translate(-50%, -50%) ' + offset + scale;
	
	    this._rippleElement.style.webkitTransform = transformString;
	    this._rippleElement.style.msTransform = transformString;
	    this._rippleElement.style.transform = transformString;
	
	    if (start) {
	      (0, _dom.removeClass)(this._rippleElement, 'is-animating');
	    } else {
	      (0, _dom.addClass)(this._rippleElement, 'is-animating');
	    }
	  }
	};
	
	/**
	   * Handles an animation frame.
	   */
	URipple.prototype.animFrameHandler = function () {
	  if (_env.isIE8) return;
	  if (this.frameCount_-- > 0) {
	    window.requestAnimationFrame(this.animFrameHandler.bind(this));
	  } else {
	    this.setRippleStyles(false);
	  }
	};
	
	/**
	 * Initialize element.
	 */
	URipple.prototype.init = function () {
	  if (_env.isIE8) return;
	  var self = this;
	  if (this._element) {
	    this._rippleElement = this._element.querySelector('.u-ripple');
	    if (!this._rippleElement) {
	      this._rippleElement = document.createElement('span');
	      (0, _dom.addClass)(this._rippleElement, 'u-ripple');
	      this._element.appendChild(this._rippleElement);
	      this._element.style.overflow = 'hidden';
	      this._element.style.position = 'relative';
	    }
	    this.frameCount_ = 0;
	    this.rippleSize_ = 0;
	    this.x_ = 0;
	    this.y_ = 0;
	
	    // Touch start produces a compat mouse down event, which would cause a
	    // second ripples. To avoid that, we use this property to ignore the first
	    // mouse down after a touch start.
	    this._ignoringMouseDown = false;
	    (0, _event.on)(this._element, 'mousedown', function (e) {
	      self._down(e);
	    });
	    (0, _event.on)(this._element, 'touchstart', function (e) {
	      self._down(e);
	    });
	
	    (0, _event.on)(this._element, 'mouseup', function (e) {
	      self._up(e);
	    });
	    (0, _event.on)(this._element, 'mouseleave', function (e) {
	      self._up(e);
	    });
	    (0, _event.on)(this._element, 'touchend', function (e) {
	      self._up(e);
	    });
	    (0, _event.on)(this._element, 'blur', function (e) {
	      self._up(e);
	    });
	  }
	};
	
	var Ripple = URipple;
	
	exports.Ripple = Ripple;
	exports.URipple = URipple;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Module : Sparrow rsa utils
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-29 09:14:38
	 */
	/*
	 * RSAUtils.encryptedString({exponent: 'xxxxx', modulus: 'xxxxx', text: 'xxxxx'})
	 * RSAUtils.decryptedString({exponent: 'xxxxx', modulus: 'xxxxx', text: 'xxxxx'})
	 */
	
	var RSAUtils = {};
	var biRadixBase = 2;
	var biRadixBits = 16;
	var bitsPerDigit = biRadixBits;
	var biRadix = 1 << 16; // = 2^16 = 65536
	var biHalfRadix = biRadix >>> 1;
	var biRadixSquared = biRadix * biRadix;
	var maxDigitVal = biRadix - 1;
	var maxInteger = 9999999999999998;
	
	//maxDigits:
	//Change this to accommodate your largest number size. Use setMaxDigits()
	//to change it!
	//
	//In general, if you're working with numbers of size N bits, you'll need 2*N
	//bits of storage. Each digit holds 16 bits. So, a 1024-bit key will need
	//
	//1024 * 2 / 16 = 128 digits of storage.
	//
	var maxDigits;
	var ZERO_ARRAY;
	var bigZero, bigOne;
	
	var BigInt = function BigInt(flag) {
	    if (typeof flag == "boolean" && flag == true) {
	        this.digits = null;
	    } else {
	        this.digits = ZERO_ARRAY.slice(0);
	    }
	    this.isNeg = false;
	};
	
	RSAUtils.setMaxDigits = function (value) {
	    maxDigits = value;
	    ZERO_ARRAY = new Array(maxDigits);
	    for (var iza = 0; iza < ZERO_ARRAY.length; iza++) {
	        ZERO_ARRAY[iza] = 0;
	    }bigZero = new BigInt();
	    bigOne = new BigInt();
	    bigOne.digits[0] = 1;
	};
	RSAUtils.setMaxDigits(20);
	
	//The maximum number of digits in base 10 you can convert to an
	//integer without JavaScript throwing up on you.
	var dpl10 = 15;
	
	RSAUtils.biFromNumber = function (i) {
	    var result = new BigInt();
	    result.isNeg = i < 0;
	    i = Math.abs(i);
	    var j = 0;
	    while (i > 0) {
	        result.digits[j++] = i & maxDigitVal;
	        i = Math.floor(i / biRadix);
	    }
	    return result;
	};
	
	//lr10 = 10 ^ dpl10
	var lr10 = RSAUtils.biFromNumber(1000000000000000);
	
	RSAUtils.biFromDecimal = function (s) {
	    var isNeg = s.charAt(0) == '-';
	    var i = isNeg ? 1 : 0;
	    var result;
	    // Skip leading zeros.
	    while (i < s.length && s.charAt(i) == '0') {
	        ++i;
	    }if (i == s.length) {
	        result = new BigInt();
	    } else {
	        var digitCount = s.length - i;
	        var fgl = digitCount % dpl10;
	        if (fgl == 0) fgl = dpl10;
	        result = RSAUtils.biFromNumber(Number(s.substr(i, fgl)));
	        i += fgl;
	        while (i < s.length) {
	            result = RSAUtils.biAdd(RSAUtils.biMultiply(result, lr10), RSAUtils.biFromNumber(Number(s.substr(i, dpl10))));
	            i += dpl10;
	        }
	        result.isNeg = isNeg;
	    }
	    return result;
	};
	
	RSAUtils.biCopy = function (bi) {
	    var result = new BigInt(true);
	    result.digits = bi.digits.slice(0);
	    result.isNeg = bi.isNeg;
	    return result;
	};
	
	RSAUtils.reverseStr = function (s) {
	    var result = "";
	    for (var i = s.length - 1; i > -1; --i) {
	        result += s.charAt(i);
	    }
	    return result;
	};
	
	var hexatrigesimalToChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	
	RSAUtils.biToString = function (x, radix) {
	    // 2 <= radix <= 36
	    var b = new BigInt();
	    b.digits[0] = radix;
	    var qr = RSAUtils.biDivideModulo(x, b);
	    var result = hexatrigesimalToChar[qr[1].digits[0]];
	    while (RSAUtils.biCompare(qr[0], bigZero) == 1) {
	        qr = RSAUtils.biDivideModulo(qr[0], b);
	        digit = qr[1].digits[0];
	        result += hexatrigesimalToChar[qr[1].digits[0]];
	    }
	    return (x.isNeg ? "-" : "") + RSAUtils.reverseStr(result);
	};
	
	RSAUtils.biToDecimal = function (x) {
	    var b = new BigInt();
	    b.digits[0] = 10;
	    var qr = RSAUtils.biDivideModulo(x, b);
	    var result = String(qr[1].digits[0]);
	    while (RSAUtils.biCompare(qr[0], bigZero) == 1) {
	        qr = RSAUtils.biDivideModulo(qr[0], b);
	        result += String(qr[1].digits[0]);
	    }
	    return (x.isNeg ? "-" : "") + RSAUtils.reverseStr(result);
	};
	
	var hexToChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	
	RSAUtils.digitToHex = function (n) {
	    var mask = 0xf;
	    var result = "";
	    for (var i = 0; i < 4; ++i) {
	        result += hexToChar[n & mask];
	        n >>>= 4;
	    }
	    return RSAUtils.reverseStr(result);
	};
	
	RSAUtils.biToHex = function (x) {
	    var result = "";
	    var n = RSAUtils.biHighIndex(x);
	    for (var i = RSAUtils.biHighIndex(x); i > -1; --i) {
	        result += RSAUtils.digitToHex(x.digits[i]);
	    }
	    return result;
	};
	
	RSAUtils.charToHex = function (c) {
	    var ZERO = 48;
	    var NINE = ZERO + 9;
	    var littleA = 97;
	    var littleZ = littleA + 25;
	    var bigA = 65;
	    var bigZ = 65 + 25;
	    var result;
	
	    if (c >= ZERO && c <= NINE) {
	        result = c - ZERO;
	    } else if (c >= bigA && c <= bigZ) {
	        result = 10 + c - bigA;
	    } else if (c >= littleA && c <= littleZ) {
	        result = 10 + c - littleA;
	    } else {
	        result = 0;
	    }
	    return result;
	};
	
	RSAUtils.hexToDigit = function (s) {
	    var result = 0;
	    var sl = Math.min(s.length, 4);
	    for (var i = 0; i < sl; ++i) {
	        result <<= 4;
	        result |= RSAUtils.charToHex(s.charCodeAt(i));
	    }
	    return result;
	};
	
	RSAUtils.biFromHex = function (s) {
	    var result = new BigInt();
	    var sl = s.length;
	    for (var i = sl, j = 0; i > 0; i -= 4, ++j) {
	        result.digits[j] = RSAUtils.hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)));
	    }
	    return result;
	};
	
	RSAUtils.biFromString = function (s, radix) {
	    var isNeg = s.charAt(0) == '-';
	    var istop = isNeg ? 1 : 0;
	    var result = new BigInt();
	    var place = new BigInt();
	    place.digits[0] = 1; // radix^0
	    for (var i = s.length - 1; i >= istop; i--) {
	        var c = s.charCodeAt(i);
	        var digit = RSAUtils.charToHex(c);
	        var biDigit = RSAUtils.biMultiplyDigit(place, digit);
	        result = RSAUtils.biAdd(result, biDigit);
	        place = RSAUtils.biMultiplyDigit(place, radix);
	    }
	    result.isNeg = isNeg;
	    return result;
	};
	
	RSAUtils.biDump = function (b) {
	    return (b.isNeg ? "-" : "") + b.digits.join(" ");
	};
	
	RSAUtils.biAdd = function (x, y) {
	    var result;
	
	    if (x.isNeg != y.isNeg) {
	        y.isNeg = !y.isNeg;
	        result = RSAUtils.biSubtract(x, y);
	        y.isNeg = !y.isNeg;
	    } else {
	        result = new BigInt();
	        var c = 0;
	        var n;
	        for (var i = 0; i < x.digits.length; ++i) {
	            n = x.digits[i] + y.digits[i] + c;
	            result.digits[i] = n % biRadix;
	            c = Number(n >= biRadix);
	        }
	        result.isNeg = x.isNeg;
	    }
	    return result;
	};
	
	RSAUtils.biSubtract = function (x, y) {
	    var result;
	    if (x.isNeg != y.isNeg) {
	        y.isNeg = !y.isNeg;
	        result = RSAUtils.biAdd(x, y);
	        y.isNeg = !y.isNeg;
	    } else {
	        result = new BigInt();
	        var n, c;
	        c = 0;
	        for (var i = 0; i < x.digits.length; ++i) {
	            n = x.digits[i] - y.digits[i] + c;
	            result.digits[i] = n % biRadix;
	            // Stupid non-conforming modulus operation.
	            if (result.digits[i] < 0) result.digits[i] += biRadix;
	            c = 0 - Number(n < 0);
	        }
	        // Fix up the negative sign, if any.
	        if (c == -1) {
	            c = 0;
	            for (var i = 0; i < x.digits.length; ++i) {
	                n = 0 - result.digits[i] + c;
	                result.digits[i] = n % biRadix;
	                // Stupid non-conforming modulus operation.
	                if (result.digits[i] < 0) result.digits[i] += biRadix;
	                c = 0 - Number(n < 0);
	            }
	            // Result is opposite sign of arguments.
	            result.isNeg = !x.isNeg;
	        } else {
	            // Result is same sign.
	            result.isNeg = x.isNeg;
	        }
	    }
	    return result;
	};
	
	RSAUtils.biHighIndex = function (x) {
	    var result = x.digits.length - 1;
	    while (result > 0 && x.digits[result] == 0) {
	        --result;
	    }return result;
	};
	
	RSAUtils.biNumBits = function (x) {
	    var n = RSAUtils.biHighIndex(x);
	    var d = x.digits[n];
	    var m = (n + 1) * bitsPerDigit;
	    var result;
	    for (result = m; result > m - bitsPerDigit; --result) {
	        if ((d & 0x8000) != 0) break;
	        d <<= 1;
	    }
	    return result;
	};
	
	RSAUtils.biMultiply = function (x, y) {
	    var result = new BigInt();
	    var c;
	    var n = RSAUtils.biHighIndex(x);
	    var t = RSAUtils.biHighIndex(y);
	    var u, uv, k;
	
	    for (var i = 0; i <= t; ++i) {
	        c = 0;
	        k = i;
	        for (var j = 0; j <= n; ++j, ++k) {
	            uv = result.digits[k] + x.digits[j] * y.digits[i] + c;
	            result.digits[k] = uv & maxDigitVal;
	            c = uv >>> biRadixBits;
	            //c = Math.floor(uv / biRadix);
	        }
	        result.digits[i + n + 1] = c;
	    }
	    // Someone give me a logical xor, please.
	    result.isNeg = x.isNeg != y.isNeg;
	    return result;
	};
	
	RSAUtils.biMultiplyDigit = function (x, y) {
	    var n, c, uv;
	
	    var result = new BigInt();
	    n = RSAUtils.biHighIndex(x);
	    c = 0;
	    for (var j = 0; j <= n; ++j) {
	        uv = result.digits[j] + x.digits[j] * y + c;
	        result.digits[j] = uv & maxDigitVal;
	        c = uv >>> biRadixBits;
	        //c = Math.floor(uv / biRadix);
	    }
	    result.digits[1 + n] = c;
	    return result;
	};
	
	RSAUtils.arrayCopy = function (src, srcStart, dest, destStart, n) {
	    var m = Math.min(srcStart + n, src.length);
	    for (var i = srcStart, j = destStart; i < m; ++i, ++j) {
	        dest[j] = src[i];
	    }
	};
	
	var highBitMasks = [0x0000, 0x8000, 0xC000, 0xE000, 0xF000, 0xF800, 0xFC00, 0xFE00, 0xFF00, 0xFF80, 0xFFC0, 0xFFE0, 0xFFF0, 0xFFF8, 0xFFFC, 0xFFFE, 0xFFFF];
	
	RSAUtils.biShiftLeft = function (x, n) {
	    var digitCount = Math.floor(n / bitsPerDigit);
	    var result = new BigInt();
	    RSAUtils.arrayCopy(x.digits, 0, result.digits, digitCount, result.digits.length - digitCount);
	    var bits = n % bitsPerDigit;
	    var rightBits = bitsPerDigit - bits;
	    for (var i = result.digits.length - 1, i1 = i - 1; i > 0; --i, --i1) {
	        result.digits[i] = result.digits[i] << bits & maxDigitVal | (result.digits[i1] & highBitMasks[bits]) >>> rightBits;
	    }
	    result.digits[0] = result.digits[i] << bits & maxDigitVal;
	    result.isNeg = x.isNeg;
	    return result;
	};
	
	var lowBitMasks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];
	
	RSAUtils.biShiftRight = function (x, n) {
	    var digitCount = Math.floor(n / bitsPerDigit);
	    var result = new BigInt();
	    RSAUtils.arrayCopy(x.digits, digitCount, result.digits, 0, x.digits.length - digitCount);
	    var bits = n % bitsPerDigit;
	    var leftBits = bitsPerDigit - bits;
	    for (var i = 0, i1 = i + 1; i < result.digits.length - 1; ++i, ++i1) {
	        result.digits[i] = result.digits[i] >>> bits | (result.digits[i1] & lowBitMasks[bits]) << leftBits;
	    }
	    result.digits[result.digits.length - 1] >>>= bits;
	    result.isNeg = x.isNeg;
	    return result;
	};
	
	RSAUtils.biMultiplyByRadixPower = function (x, n) {
	    var result = new BigInt();
	    RSAUtils.arrayCopy(x.digits, 0, result.digits, n, result.digits.length - n);
	    return result;
	};
	
	RSAUtils.biDivideByRadixPower = function (x, n) {
	    var result = new BigInt();
	    RSAUtils.arrayCopy(x.digits, n, result.digits, 0, result.digits.length - n);
	    return result;
	};
	
	RSAUtils.biModuloByRadixPower = function (x, n) {
	    var result = new BigInt();
	    RSAUtils.arrayCopy(x.digits, 0, result.digits, 0, n);
	    return result;
	};
	
	RSAUtils.biCompare = function (x, y) {
	    if (x.isNeg != y.isNeg) {
	        return 1 - 2 * Number(x.isNeg);
	    }
	    for (var i = x.digits.length - 1; i >= 0; --i) {
	        if (x.digits[i] != y.digits[i]) {
	            if (x.isNeg) {
	                return 1 - 2 * Number(x.digits[i] > y.digits[i]);
	            } else {
	                return 1 - 2 * Number(x.digits[i] < y.digits[i]);
	            }
	        }
	    }
	    return 0;
	};
	
	RSAUtils.biDivideModulo = function (x, y) {
	    var nb = RSAUtils.biNumBits(x);
	    var tb = RSAUtils.biNumBits(y);
	    var origYIsNeg = y.isNeg;
	    var q, r;
	    if (nb < tb) {
	        // |x| < |y|
	        if (x.isNeg) {
	            q = RSAUtils.biCopy(bigOne);
	            q.isNeg = !y.isNeg;
	            x.isNeg = false;
	            y.isNeg = false;
	            r = biSubtract(y, x);
	            // Restore signs, 'cause they're references.
	            x.isNeg = true;
	            y.isNeg = origYIsNeg;
	        } else {
	            q = new BigInt();
	            r = RSAUtils.biCopy(x);
	        }
	        return [q, r];
	    }
	
	    q = new BigInt();
	    r = x;
	
	    // Normalize Y.
	    var t = Math.ceil(tb / bitsPerDigit) - 1;
	    var lambda = 0;
	    while (y.digits[t] < biHalfRadix) {
	        y = RSAUtils.biShiftLeft(y, 1);
	        ++lambda;
	        ++tb;
	        t = Math.ceil(tb / bitsPerDigit) - 1;
	    }
	    // Shift r over to keep the quotient constant. We'll shift the
	    // remainder back at the end.
	    r = RSAUtils.biShiftLeft(r, lambda);
	    nb += lambda; // Update the bit count for x.
	    var n = Math.ceil(nb / bitsPerDigit) - 1;
	
	    var b = RSAUtils.biMultiplyByRadixPower(y, n - t);
	    while (RSAUtils.biCompare(r, b) != -1) {
	        ++q.digits[n - t];
	        r = RSAUtils.biSubtract(r, b);
	    }
	    for (var i = n; i > t; --i) {
	        var ri = i >= r.digits.length ? 0 : r.digits[i];
	        var ri1 = i - 1 >= r.digits.length ? 0 : r.digits[i - 1];
	        var ri2 = i - 2 >= r.digits.length ? 0 : r.digits[i - 2];
	        var yt = t >= y.digits.length ? 0 : y.digits[t];
	        var yt1 = t - 1 >= y.digits.length ? 0 : y.digits[t - 1];
	        if (ri == yt) {
	            q.digits[i - t - 1] = maxDigitVal;
	        } else {
	            q.digits[i - t - 1] = Math.floor((ri * biRadix + ri1) / yt);
	        }
	
	        var c1 = q.digits[i - t - 1] * (yt * biRadix + yt1);
	        var c2 = ri * biRadixSquared + (ri1 * biRadix + ri2);
	        while (c1 > c2) {
	            --q.digits[i - t - 1];
	            c1 = q.digits[i - t - 1] * (yt * biRadix | yt1);
	            c2 = ri * biRadix * biRadix + (ri1 * biRadix + ri2);
	        }
	
	        b = RSAUtils.biMultiplyByRadixPower(y, i - t - 1);
	        r = RSAUtils.biSubtract(r, RSAUtils.biMultiplyDigit(b, q.digits[i - t - 1]));
	        if (r.isNeg) {
	            r = RSAUtils.biAdd(r, b);
	            --q.digits[i - t - 1];
	        }
	    }
	    r = RSAUtils.biShiftRight(r, lambda);
	    // Fiddle with the signs and stuff to make sure that 0 <= r < y.
	    q.isNeg = x.isNeg != origYIsNeg;
	    if (x.isNeg) {
	        if (origYIsNeg) {
	            q = RSAUtils.biAdd(q, bigOne);
	        } else {
	            q = RSAUtils.biSubtract(q, bigOne);
	        }
	        y = RSAUtils.biShiftRight(y, lambda);
	        r = RSAUtils.biSubtract(y, r);
	    }
	    // Check for the unbelievably stupid degenerate case of r == -0.
	    if (r.digits[0] == 0 && RSAUtils.biHighIndex(r) == 0) r.isNeg = false;
	
	    return [q, r];
	};
	
	RSAUtils.biDivide = function (x, y) {
	    return RSAUtils.biDivideModulo(x, y)[0];
	};
	
	RSAUtils.biModulo = function (x, y) {
	    return RSAUtils.biDivideModulo(x, y)[1];
	};
	
	RSAUtils.biMultiplyMod = function (x, y, m) {
	    return RSAUtils.biModulo(RSAUtils.biMultiply(x, y), m);
	};
	
	RSAUtils.biPow = function (x, y) {
	    var result = bigOne;
	    var a = x;
	    while (true) {
	        if ((y & 1) != 0) result = RSAUtils.biMultiply(result, a);
	        y >>= 1;
	        if (y == 0) break;
	        a = RSAUtils.biMultiply(a, a);
	    }
	    return result;
	};
	
	RSAUtils.biPowMod = function (x, y, m) {
	    var result = bigOne;
	    var a = x;
	    var k = y;
	    while (true) {
	        if ((k.digits[0] & 1) != 0) result = RSAUtils.biMultiplyMod(result, a, m);
	        k = RSAUtils.biShiftRight(k, 1);
	        if (k.digits[0] == 0 && RSAUtils.biHighIndex(k) == 0) break;
	        a = RSAUtils.biMultiplyMod(a, a, m);
	    }
	    return result;
	};
	
	var BarrettMu = function BarrettMu(m) {
	    this.modulus = RSAUtils.biCopy(m);
	    this.k = RSAUtils.biHighIndex(this.modulus) + 1;
	    var b2k = new BigInt();
	    b2k.digits[2 * this.k] = 1; // b2k = b^(2k)
	    this.mu = RSAUtils.biDivide(b2k, this.modulus);
	    this.bkplus1 = new BigInt();
	    this.bkplus1.digits[this.k + 1] = 1; // bkplus1 = b^(k+1)
	    this.modulo = BarrettMu_modulo;
	    this.multiplyMod = BarrettMu_multiplyMod;
	    this.powMod = BarrettMu_powMod;
	};
	
	function BarrettMu_modulo(x) {
	    var $dmath = RSAUtils;
	    var q1 = $dmath.biDivideByRadixPower(x, this.k - 1);
	    var q2 = $dmath.biMultiply(q1, this.mu);
	    var q3 = $dmath.biDivideByRadixPower(q2, this.k + 1);
	    var r1 = $dmath.biModuloByRadixPower(x, this.k + 1);
	    var r2term = $dmath.biMultiply(q3, this.modulus);
	    var r2 = $dmath.biModuloByRadixPower(r2term, this.k + 1);
	    var r = $dmath.biSubtract(r1, r2);
	    if (r.isNeg) {
	        r = $dmath.biAdd(r, this.bkplus1);
	    }
	    var rgtem = $dmath.biCompare(r, this.modulus) >= 0;
	    while (rgtem) {
	        r = $dmath.biSubtract(r, this.modulus);
	        rgtem = $dmath.biCompare(r, this.modulus) >= 0;
	    }
	    return r;
	}
	
	function BarrettMu_multiplyMod(x, y) {
	    /*
	     x = this.modulo(x);
	     y = this.modulo(y);
	     */
	    var xy = RSAUtils.biMultiply(x, y);
	    return this.modulo(xy);
	}
	
	function BarrettMu_powMod(x, y) {
	    var result = new BigInt();
	    result.digits[0] = 1;
	    var a = x;
	    var k = y;
	    while (true) {
	        if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
	        k = RSAUtils.biShiftRight(k, 1);
	        if (k.digits[0] == 0 && RSAUtils.biHighIndex(k) == 0) break;
	        a = this.multiplyMod(a, a);
	    }
	    return result;
	}
	
	var RSAKeyPair = function RSAKeyPair(encryptionExponent, decryptionExponent, modulus) {
	    var $dmath = RSAUtils;
	    this.e = $dmath.biFromHex(encryptionExponent);
	    this.d = $dmath.biFromHex(decryptionExponent);
	    this.m = $dmath.biFromHex(modulus);
	    // We can do two bytes per digit, so
	    // chunkSize = 2 * (number of digits in modulus - 1).
	    // Since biHighIndex returns the high index, not the number of digits, 1 has
	    // already been subtracted.
	    this.chunkSize = 2 * $dmath.biHighIndex(this.m);
	    this.radix = 16;
	    this.barrett = new BarrettMu(this.m);
	};
	
	RSAUtils.getKeyPair = function (encryptionExponent, decryptionExponent, modulus) {
	    return new RSAKeyPair(encryptionExponent, decryptionExponent, modulus);
	};
	
	var twoDigit = function twoDigit(n) {
	    return (n < 10 ? "0" : "") + String(n);
	};
	
	// Altered by Rob Saunders (rob@robsaunders.net). New routine pads the
	// string after it has been converted to an array. This fixes an
	// incompatibility with Flash MX's ActionScript.
	RSAUtils._encryptedString = function (key, s) {
	    var a = [];
	    var sl = s.length;
	    var i = 0;
	    while (i < sl) {
	        a[i] = s.charCodeAt(i);
	        i++;
	    }
	
	    while (a.length % key.chunkSize != 0) {
	        a[i++] = 0;
	    }
	
	    var al = a.length;
	    var result = "";
	    var j, k, block;
	    for (i = 0; i < al; i += key.chunkSize) {
	        block = new BigInt();
	        j = 0;
	        for (k = i; k < i + key.chunkSize; ++j, k++) {
	            block.digits[j] = a[k];
	            block.digits[j] += a[k] << 8;
	        }
	        var crypt = key.barrett.powMod(block, key.e);
	        var text = key.radix == 16 ? RSAUtils.biToHex(crypt) : RSAUtils.biToString(crypt, key.radix);
	        result += text + " ";
	    }
	    return result.substring(0, result.length - 1); // Remove last space.
	};
	
	RSAUtils._decryptedString = function (key, s) {
	    var blocks = s.split(" ");
	    var result = "";
	    var i, j, block;
	    for (i = 0; i < blocks.length; ++i) {
	        var bi;
	        if (key.radix == 16) {
	            bi = RSAUtils.biFromHex(blocks[i]);
	        } else {
	            bi = RSAUtils.biFromString(blocks[i], key.radix);
	        }
	        block = key.barrett.powMod(bi, key.d);
	        for (j = 0; j <= RSAUtils.biHighIndex(block); ++j) {
	            result += String.fromCharCode(block.digits[j] & 255, block.digits[j] >> 8);
	        }
	    }
	    // Remove trailing null, if any.
	    if (result.charCodeAt(result.length - 1) == 0) {
	        result = result.substring(0, result.length - 1);
	    }
	    return result;
	};
	
	RSAUtils.setMaxDigits(130);
	
	RSAUtils.encryptedString = function (options) {
	    var text = options.text;
	    if (options.exponent && options.modulus) {
	        var key = RSAUtils.getKeyPair(options.exponent, '', options.modulus);
	        text = RSAUtils._encryptedString(key, options.text);
	    }
	    return text;
	};
	
	RSAUtils.decryptedString = function (options) {
	    var text = options.text;
	    if (options.exponent && options.modulus) {
	        var key = RSAUtils.getKeyPair('', options.exponent, options.modulus);
	        text = RSAUtils._decryptedString(key, options.text);
	    }
	    return text;
	};
	
	exports.RSAUtils = RSAUtils;
	exports.BigInt = BigInt;
	exports.BarrettMu = BarrettMu;
	exports.twoDigit = twoDigit;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Module : Sparrow i18n
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-29 10:16:54
	 */
	//import {uuii18n} from '?';//缺失故修改为default值
	var trans = function trans(key, dftValue) {
	  //return  uuii18n ?  uuii18n.t('uui-trans:' + key) : dftValue;
	  return dftValue;
	};
	
	exports.trans = trans;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=sparrow.js.map