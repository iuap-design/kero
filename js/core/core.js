
var U_LANGUAGES = "i_languages";
var U_THEME = "u_theme";
var U_LOCALE = "u_locale";
var U_USERCODE = "usercode";
var enumerables = true,enumerablesTest = {toString: 1},toString = Object.prototype.toString;

for (var i in enumerablesTest) {
	enumerables = null;
}
if (enumerables) {
	enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
		'toLocaleString', 'toString', 'constructor'];
}

window.u = window.u || {};
//window.$ = {}
var u = window.u;
//var $ = u;

u.enumerables = enumerables;
/**
 * 复制对象属性
 *
 * @param {Object}  目标对象
 * @param {config} 源对象
 */
u.extend = function(object, config) {
	var args = arguments,options;
	if(args.length > 1){
		for(var len=1; len<args.length; len++){
			options = args[len];
			if (object && options && typeof options === 'object') {
				var i, j, k;
				for (i in options) {
					object[i] = options[i];
				}
				if (enumerables) {
					for (j = enumerables.length; j--;) {
						k = enumerables[j];
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

u.extend(u, {
	setCookie: function (sName, sValue, oExpires, sPath, sDomain, bSecure) {
		var sCookie = sName + "=" + encodeURIComponent(sValue);
		if (oExpires)
			sCookie += "; expires=" + oExpires.toGMTString();
		if (sPath)
			sCookie += "; path=" + sPath;
		if (sDomain)
			sCookie += "; domain=" + sDomain;
		if (bSecure)
			sCookie += "; secure=" + bSecure;
		document.cookie = sCookie;
	},
	getCookie: function (sName) {
		var sRE = "(?:; )?" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);

		if (oRE.test(document.cookie)) {
			return decodeURIComponent(RegExp["$1"]);
		} else
			return null;
	},
	/**
	 * 创建一个带壳的对象,防止外部修改
	 * @param {Object} proto
	 */
	createShellObject: function (proto) {
		var exf = function () {
		}
		exf.prototype = proto;
		return new exf();
	},
	execIgnoreError: function (a, b, c) {
		try {
			a.call(b, c);
		} catch (e) {
		}
	},
	on: function (element, eventName,child,listener) {
		if(!element)
			return;
		if(arguments.length < 4){
			listener = child;
			child = undefined;
		}else{
			var childlistener = function(e){
				if(!e){
					return;
				}
				var tmpchildren = element.querySelectorAll(child)
				tmpchildren.forEach(function(node){
					if(node == e.target){
							listener.call(e.target,e)
					}
				})
			}
		}
		//capture = capture || false;

		if(!element["uEvent"]){
			//在dom上添加记录区
			element["uEvent"] = {}
		}
		//判断是否元素上是否用通过on方法填加进去的事件
		if(!element["uEvent"][eventName]){
			element["uEvent"][eventName] = [child?childlistener:listener]
			if(u.event && u.event[eventName] && u.event[eventName].setup){
				u.event[eventName].setup.call(element);
			}
			element["uEvent"][eventName+'fn'] = function(e){
												//火狐下有问题修改判断
												if(!e)
													e = typeof event != 'undefined' && event?event:window.event;
												element["uEvent"][eventName].forEach(function(fn){
													try{
														e.target = e.target || e.srcElement;//兼容IE8
													}catch(e){
													}
													if(fn)
														fn.call(element,e)
												})
											}
			if (element.addEventListener) {  // 用于支持DOM的浏览器
				element.addEventListener(eventName, element["uEvent"][eventName+'fn']);
			} else if (element.attachEvent) {  // 用于IE浏览器
				element.attachEvent("on" + eventName,element["uEvent"][eventName+'fn'] );
			} else {  // 用于其它浏览器
				element["on" + eventName] = element["uEvent"][eventName+'fn']
			}
		}else{
			//如果有就直接往元素的记录区添加事件
			var lis = child?childlistener:listener;
			var hasLis = false;
			element["uEvent"][eventName].forEach(function(fn){
				if(fn == lis){
					hasLis = true;
				}
			});
			if(!hasLis){
				element["uEvent"][eventName].push(child?childlistener:listener)
			}
		}

	},
	off: function(element, eventName, listener){
		//删除事件数组
		if(listener){
			if(element && element["uEvent"] && element["uEvent"][eventName]){
				element["uEvent"][eventName].forEach(function(fn,i){
					if(fn == listener){
						element["uEvent"][eventName].splice(i,1);
					}
				});
			}
			return;
		}
		var eventfn = element["uEvent"][eventName+'fn']
		if (element.removeEventListener) {  // 用于支持DOM的浏览器
			element.removeEventListener(eventName,eventfn );
		} else if (element.removeEvent) {  // 用于IE浏览器
			element.removeEvent("on" + eventName, eventfn);
		} else {  // 用于其它浏览器
			delete element["on" + eventName]
		}
		if(u.event && u.event[eventName] && u.event[eventName].teardown){
			u.event[eventName].teardown.call(element);
		}
		element["uEvent"][eventName] = undefined
		element["uEvent"][eventName+'fn'] = undefined


	},
	trigger:function(element,eventName){
		if(element["uEvent"] && element["uEvent"][eventName]){
			element["uEvent"][eventName+'fn']()
		}
	},
	/**
	 * 增加样式
	 * @param value
	 * @returns {*}
	 */
	addClass: function (element, value) {
		if (typeof element.classList === 'undefined') {
			if(u._addClass)
				u._addClass(element, value);
		} else {
			element.classList.add(value);
		}
		return u;
	},
	removeClass: function (element, value) {
		if (typeof element.classList === 'undefined') {
			if(u._removeClass)
				u._removeClass(element, value);
		} else {
			element.classList.remove(value);
		}
		return u;
	},
	hasClass: function(element, value){
		if (!element) return false;
		if (element.nodeName && (element.nodeName === '#text'||element.nodeName === '#comment')) return false;
		if (typeof element.classList === 'undefined') {
			if(u._hasClass)
				return u._hasClass(element,value);
			return false;
		}else{
			return element.classList.contains(value);
		}
	},
	toggleClass: function(element,value){
		if (typeof element.classList === 'undefined') {
			return u._toggleClass(element,value);
		}else{
			return element.classList.toggle(value);
		}
	},
	closest: function(element, selector) {
		var tmp = element;
		while(tmp != null &&!u.hasClass(tmp, selector) && tmp != document.body ) {
		  tmp = tmp.parentNode;
		}
		if(tmp == document.body) return null;
		return tmp;
	},
	css:function(element,csstext,val){
		if(csstext instanceof Object){
			for(var k in csstext){
				var tmpcss = csstext[k]
				if(["width","height","top","bottom","left","right"].indexOf(k) > -1 && u.isNumber(tmpcss) ){
					tmpcss = tmpcss + "px"
				}
				element.style[k] = tmpcss
			}
		}else{
			if(arguments.length > 2){
				element.style[csstext] = val
			}else{
				return u.getStyle(element,csstext)
			}
		}

	},
	wrap:function(element,parent){
		var p = u.makeDOM(parent)
			element.parentNode.insertBefore(p,element)
			p.appendChild(element)
	},
	getStyle:function(element,key){
		//不要在循环里用
		var allCSS
		if(window.getComputedStyle){
			allCSS = window.getComputedStyle(element)
		}else{
			allCSS = element.currentStyle
		}
		if(allCSS[key] !== undefined){
			return allCSS[key]
		}else{
			return ""
		}
	},
	/**
	 * 统一zindex值, 不同控件每次显示时都取最大的zindex，防止显示错乱
	 */
	getZIndex: function(){
		if (!u.globalZIndex){
			u.globalZIndex = 2000;
		}
		return u.globalZIndex ++;
	},
	makeDOM: function(htmlString){
		var tempDiv = document.createElement("div");
		tempDiv.innerHTML = htmlString;
		var _dom = tempDiv.children[0];
		return _dom;
	},
	/**
	 * element
	 */
	makeModal : function(element,parEle){
	    var overlayDiv = document.createElement('div');
	    u.addClass(overlayDiv, 'u-overlay');
	    overlayDiv.style.zIndex = u.getZIndex();
	    // 如果有父元素则插入到父元素上，没有则添加到body上
	    if(parEle&&parEle!=document.body){
	    	u.addClass(overlayDiv, 'hasPar');
	    	parEle.appendChild(overlayDiv);
	    }else{
	    	document.body.appendChild(overlayDiv)
	    }
	    
	    element.style.zIndex = u.getZIndex();
	    u.on(overlayDiv, 'click', function(e){
	        u.stopEvent(e);
	    })
	    return overlayDiv;
	},
	getOffset : function(Node, offset){
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
	    if(Node.offsetParent)
	    	return u.getOffset(Node.offsetParent, offset);
	    else
	    	return offset;
	},
	getScroll:function(Node, offset){
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
	    if(Node.parentNode)
	    	return u.getScroll(Node.parentNode, offset);
	    else
	    	return offset;
	},
	showPanelByEle:function(obj){
		var ele = obj.ele,panel = obj.panel,position = obj.position,
			off = u.getOffset(ele),scroll = u.getScroll(ele),
			offLeft = off.left,offTop = off.top,
			scrollLeft = scroll.left,scrollTop = scroll.top,
			eleWidth = ele.offsetWidth,eleHeight = ele.offsetHeight,
			panelWidth = panel.offsetWidth,panelHeight = panel.offsetHeight,
			bodyWidth = document.body.clientWidth,bodyHeight = document.body.clientHeight,
			position = position || 'top',
			left = offLeft - scrollLeft,top = offTop - scrollTop;
			// 基准点为Ele的左上角
			// 后续根据需要完善
		if(position == 'left'){
			left=left-panelWidth;
			top=top+(eleHeight - panelHeight)/2;
		}else if(position == 'right'){
			left=left+eleWidth;
			top=top+(eleHeight - panelHeight)/2;
		}else if(position == 'top'||position == 'topCenter'){
			left = left + (eleWidth - panelWidth)/2;
			top = top - panelHeight;
		}else if(position == 'bottom'||position == 'bottomCenter'){
			left = left+ (eleWidth - panelWidth)/2;
			top = top + eleHeight;
		}else if(position == 'bottomLeft'){
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
	},

	/**
	 * 阻止冒泡
	 */
	stopEvent: function(e){
		if(typeof(e) != "undefined") {
			if (e.stopPropagation)
				e.stopPropagation();
			else {
				e.cancelBubble = true;
			}
			//阻止默认浏览器动作(W3C)
			if (e && e.preventDefault)
				e.preventDefault();
			//IE中阻止函数器默认动作的方式
			else
				window.event.returnValue = false;
		}
	},
	getFunction: function(target, val){
		if (!val || typeof val == 'function') return val
		if (typeof target[val] == 'function')
			return target[val]
		else if (typeof window[val] == 'function')
			return window[val]
		else if (val.indexOf('.') != -1){
			var func = u.getJSObject(target, val)
			if (typeof func == 'function') return func
			func = u.getJSObject(window, val)
			if (typeof func == 'function') return func
		}
		return val
	},
	getJSObject: function(target, names) {
		if(!names) {
			return;
		}
		if (typeof names == 'object')
			return names
		var nameArr = names.split('.')
		var obj = target
		for (var i = 0; i < nameArr.length; i++) {
			obj = obj[nameArr[i]]
			if (!obj) return null
		}
		return obj
	},
	isDate: function(input){
		return Object.prototype.toString.call(input) === '[object Date]' ||
				input instanceof Date;
	},
	isNumber : function(obj){
		//return obj === +obj
		return (obj - parseFloat( obj ) + 1) >= 0;
	},
	isArray: Array.isArray || function (val) {
		return Object.prototype.toString.call(val) === '[object Array]';
	},
	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},
	inArray :function(node,arr){


	  if(!arr instanceof Array){
		throw "arguments is not Array";
	  }

	  for(var i=0,k=arr.length;i<k;i++){
		if(node==arr[i]){
		  return true;
		}
	  }

	  return false;
	},
	each: function(obj,callback){
		if(obj.forEach){
			obj.forEach(function(v,k){callback(k,v)})

		}else if(obj instanceof Object){
			for(var k in obj){
				callback(k,obj[k])
			}
		}else{
			return
		}

	}

});

//core context
(function() {
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
		'time':{
			format:'HH:mm'
		},
		'date':{
			format:'YYYY-MM-DD'
		},
		'currency':{
			precision: 2,
			curSymbol: '￥'
		},
		'percent':{

		}
	};
	/**
	 * 获取环境信息
	 * @return {environment}
	 */
	fn.getEnvironment = function() {
		return u.createShellObject(environment);
	};

	/**
	 * 获取客户端参数对象
	 * @return {clientAttributes}
	 */
	fn.getClientAttributes = function() {
		var exf = function() {}
		return u.createShellObject(clientAttributes);
	}


	fn.setContextPath = function(contextPath) {
		return environment[IWEB_CONTEXT_PATH] = contextPath
	}
	fn.getContextPath = function(contextPath) {
		return environment[IWEB_CONTEXT_PATH]
	}
	/**
	 * 设置客户端参数对象
	 * @param {Object} k 对象名称
	 * @param {Object} v 对象值(建议使用简单类型)
	 */
	fn.setClientAttribute = function(k, v) {
		clientAttributes[k] = v;
	}
	/**
	 * 获取会话级参数对象
	 * @return {clientAttributes}
	 */
	fn.getSessionAttributes = function() {
		var exf = function() {}
		return u.createShellObject(sessionAttributes);
	}

	/**
	 * 设置会话级参数对象
	 * @param {Object} k 对象名称
	 * @param {Object} v 对象值(建议使用简单类型)
	 */
	fn.setSessionAttribute = function(k, v) {
		sessionAttributes[k] = v;
		setCookie("ISES_" + k, v);
	}

	/**
	 * 移除客户端参数
	 * @param {Object} k 对象名称
	 */
	fn.removeClientAttribute = function(k) {
		clientAttributes[k] = null;
		execIgnoreError(function() {
			delete clientAttributes[k];
		})
	}

		/**
		 * 获取地区信息编码
		 */
		fn.getLocale = function() {
			return this.getEnvironment().locale
		}

	/**
	 * 获取多语信息
	 */
	fn.getLanguages = function(){
		return this.getEnvironment().languages
	};
	/**
	 * 收集环境信息(包括客户端参数)
	 * @return {Object}
	 */
	fn.collectEnvironment = function() {
		var _env = this.getEnvironment();
		var _ses = this.getSessionAttributes();

		for (var i in clientAttributes) {
			_ses[i] = clientAttributes[i];
		}
		_env.clientAttributes = _ses;
		return _env
	}

	/**
	 * 设置数据格式信息
	 * @param {String} type
	 * @param {Object} meta
	 */
	fn.setMaskerMeta = function(type, meta) {
		if (typeof type == 'function'){
			getMetaFunc = type;
		}else{
			if (!maskerMeta[type])
				maskerMeta[type] = meta;
			else{
				if (typeof meta != 'object')
					maskerMeta[type] = meta;
				else
					for (var key in meta){
						maskerMeta[type][key] = meta[key];
					}
			}
		}
	};
	fn.getMaskerMeta = function(type) {
		if (typeof getMetaFunc == 'function'){
			var meta = getMetaFunc.call(this);
			return meta[type];
		}else
			return u.extend({}, maskerMeta[type]);
	};
	environment.languages = u.getCookie(U_LANGUAGES) ? u.getCookie(U_LANGUAGES).split(',') : navigator.language ? navigator.language : 'zh-CN';
	if(environment.languages == 'zh-cn')
		environment.languages = 'zh-CN'
	if(environment.languages == 'en-us')
		environment.languages = 'en-US'

	environment.theme = u.getCookie(U_THEME);
	environment.locale = u.getCookie(U_LOCALE);
	//environment.timezoneOffset = (new Date()).getTimezoneOffset()
	environment.usercode = u.getCookie(U_USERCODE);
	//init session attribute
	document.cookie.replace(/ISES_(\w*)=([^;]*);?/ig, function(a, b, c) {
		sessionAttributes[b] = c;
	});


	var Core = function() {};
	Core.prototype = fn;

	u.core = new Core();

})();

u.extend(u, {
	isIE:  false,
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

(function(){
	var userAgent = navigator.userAgent,
			rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
			rFirefox = /(firefox)\/([\w.]+)/,
			rOpera = /(opera).+version\/([\w.]+)/,
			rChrome = /(chrome)\/([\w.]+)/,
			rSafari = /version\/([\w.]+).*(safari)/,
			version,
			ua = userAgent.toLowerCase(),
			s,
			browserMatch = { browser : "", version : ''},
			match = rMsie.exec(ua);

	if (match != null) {
		browserMatch =  { browser : "IE", version : match[2] || "0" };
	}
	match = rFirefox.exec(ua);
	if (match != null) {
		browserMatch =  { browser : match[1] || "", version : match[2] || "0" };
	}
	match = rOpera.exec(ua);
	if (match != null) {
		browserMatch =  { browser : match[1] || "", version : match[2] || "0" };
	}
	match = rChrome.exec(ua);
	if (match != null) {
		browserMatch =  { browser : match[1] || "", version : match[2] || "0" };
	}
	match = rSafari.exec(ua);
	if (match != null) {
		browserMatch =  { browser : match[2] || "", version : match[1] || "0" };
	}
	if (match != null) {
		browserMatch =  { browser : "", version : "0" };
	}


	if (s=ua.match(/opera.([\d.]+)/)) {
		u.isOpera = true;
	}else if(browserMatch.browser=="IE"&&browserMatch.version==11){
		u.isIE11 = true;
		u.isIE = true;
	}else if (s=ua.match(/chrome\/([\d.]+)/)) {
		u.isChrome = true;
		u.isStandard = true;
	} else if (s=ua.match(/version\/([\d.]+).*safari/)) {
		u.isSafari = true;
		u.isStandard = true;
	} else if (s=ua.match(/gecko/)) {
		//add by licza : support XULRunner
		u.isFF = true;
		u.isStandard = true;
	} else if (s=ua.match(/msie ([\d.]+)/)) {
		u.isIE = true;
	}

	else if (s=ua.match(/firefox\/([\d.]+)/)) {
		u.isFF = true;
		u.isStandard = true;
	}
	if (ua.match(/webkit\/([\d.]+)/)) {
		u.isWebkit = true;
	}
	if (ua.match(/ipad/i)){
		u.isIOS = true;
		u.isIPAD = true;
		u.isStandard = true;
	}
	if (ua.match(/iphone/i)){
		u.isIOS = true;
		u.isIphone = true;
	}

	if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")){
		//u.isIOS = true;
		u.isMac = true;
	}

	if((navigator.platform == "Win32") || (navigator.platform == "Windows") || (navigator.platform == "Win64")){
		u.isWin = true;
	}

	if((navigator.platform == "X11") && !u.isWin && !u.isMac){
		u.isUnix = true;
	}
	 if((String(navigator.platform).indexOf("Linux") > -1)){
    	u.isLinux = true;
    }
    
    if(ua.indexOf('Android') > -1 || ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('adr') > -1){
    	u.isAndroid = true;
    }

	u.version = version ? (browserMatch.version ?  browserMatch.version : 0) : 0;
	if (u.isIE) {
		var intVersion = parseInt(u.version);
		var mode = document.documentMode;
		if(mode == null){
			if (intVersion == 6 || intVersion == 7) {
				u.isIE8_BEFORE = true;
			}
		}
		else{
			if(mode == 7){
				u.isIE8_BEFORE = true;
			}
			else if (mode == 8) {
				u.isIE8 = true;
			}
			else if (mode == 9) {
				u.isIE9 = true;
				u.isSTANDARD = true;
			}
			else if (mode == 10) {
				u.isIE10 = true;
				u.isSTANDARD = true;
				u.isIE10_ABOVE = true;
			}
			else{
				u.isSTANDARD = true;
			}
			if (intVersion == 8) {
				u.isIE8_CORE = true;
			}
			else if (intVersion == 9) {
				u.isIE9_CORE = true;
			}
			else if(browserMatch.version==11){
				u.isIE11 = true;
			}
			else{

			}
		}
	}
	if("ontouchend" in document) {
		u.hasTouch = true;
	}
	if(u.isIOS || u.isAndroid)
		u.isMobile = true;
})();

if (u.isIE8_BEFORE){
	alert('uui 不支持IE8以前的浏览器版本，请更新IE浏览器或使用其它浏览器！')
	throw new Error('uui 不支持IE8以前的浏览器版本，请更新IE浏览器或使用其它浏览器！');
}
if (u.isIE8 && !u.polyfill){
	alert('IE8浏览器中使用uui 必须在u.js之前引入u-polyfill.js!');
	throw new Error('IE8浏览器中使用uui 必须在uui之前引入u-polyfill.js!');
}
//TODO 兼容 后面去掉
//u.Core = u.core;
window.iweb = {};
window.iweb.Core = u.core;
window.iweb.browser = {
	isIE: u.isIE,
	isFF: u.isFF,
	isOpera: u.isOpera,
	isChrome: u.isChrome,
	isSafari: u.isSafari,
	isWebkit: u.isWebkit,
	isIE8_BEFORE: u.isIE8_BEFORE,
	isIE8: u.isIE8,
	isIE8_CORE: u.isIE8_CORE,
	isIE9: u.isIE9,
	isIE9_CORE: u.isIE9_CORE,
	isIE10: u.isIE10,
	isIE10_ABOVE: u.isIE10_ABOVE,
	isIE11: u.isIE11,
	isIOS: u.isIOS,
	isIphone: u.isIphone,
	isIPAD: u.isIPAD,
	isStandard: u.isStandard,
	version: 0,
	isWin: u.isWin,
	isUnix: u.isUnix, 
	isLinux: u.isLinux,
	isAndroid: u.isAndroid,
	isMac: u.isMac,
	hasTouch: u.hasTouch
};

u.isDomElement = function(obj) {
    if (window['HTMLElement']) {
        return obj instanceof HTMLElement;
    } else {
        return obj && obj.tagName && obj.nodeType === 1;
    }
}