/**
 * Created by dingrf on 2015-11-18.
 */


window.u = window.u || {};
var u = window.u;

u.polyfill = true;
u._addClass = function(element,value){
    var classes, cur, clazz, i, finalValue,rclass = /[\t\r\n\f]/g,
        proceed = typeof value === "string" && value,rnotwhite = (/\S+/g);

    if ( proceed ) {
        // The disjunction here is for better compressibility (see removeClass)
        classes = ( value || "" ).match( rnotwhite ) || [];

        cur = element.nodeType === 1 && ( element.className ?
                ( " " + element.className + " " ).replace( rclass, " " ) : " ");
        if ( cur ) {
            i = 0;
            while ( (clazz = classes[i++]) ) {
                if ( cur.indexOf( " " + clazz + " " ) < 0 ) {cur += clazz + " ";}
            }
            // only assign if different to avoid unneeded rendering.
            finalValue = (cur + "").trim();
            if ( element.className !== finalValue ) {
                element.className = finalValue;
            }
        }
    }
    return this;
};

u._removeClass = function(element, value) {
    var classes, cur, clazz, j, finalValue,rnotwhite = (/\S+/g),rclass = /[\t\r\n\f]/g,
        proceed = arguments.length === 0 || typeof value === "string" && value;

    if ( proceed ) {
        classes = ( value || "" ).match( rnotwhite ) || [];

        // This expression is here for better compressibility (see addClass)
        cur = element.nodeType === 1 && ( element.className ?
                ( " " + element.className + " " ).replace( rclass, " " ) :"");
        if ( cur ) {
            j = 0;
            while ( (clazz = classes[j++]) ) {
                // Remove *all* instances
                while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
                    cur = cur.replace( " " + clazz + " ", " " );
                }
            }

            // only assign if different to avoid unneeded rendering.
            finalValue = value ? (cur + "").trim() : "";
            if ( element.className !== finalValue ) {
                element.className = finalValue;
            }
        }
    }
    return this;
};

u._hasClass = function(element,value){
    var rclass = /[\t\r\n\f]/g;
    if ( element.nodeType === 1 && (" " + element.className + " ").replace(rclass, " ").indexOf( value ) >= 0 ) {
        return true;
    }
    return false;
};

u._toggleClass = function(element, value){
    if ( u._hasClass(element, value) ) {
        u._removeClass(element, value);
    } else {
        u._addClass(element, value);
    }
}

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s*(\b.*\b|)\s*$/, "$1");
    };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj)
                return i;
        }
        return -1;
    };
}

if (!Array.prototype.remove) {
	Array.prototype.remove = function(index) {
		if (index < 0 || index > this.length) {
			alert("index out of bound");
			return;
		}
		this.splice(index, 1);
	};
}
// 遍历数组,执行函数
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn) {
        for (var i = 0, len = this.length; i < len; i++) {
            fn(this[i], i, this);
        }
    };
}

if(!NodeList.prototype.forEach)
    NodeList.prototype.forEach = Array.prototype.forEach;

    
function isDomElement(obj) {
    if (window['HTMLElement']) {
        return obj instanceof HTMLElement;
    } else {
        return obj && obj.tagName && obj.nodeType === 1;
    }
}
/*IE8的querySelectorAll返回的对象不是Array也不是NodeList，不能调用forEach，因此重写此方法*/
/* 此处没有IE8标识，因此使用HTMLElement来进行判断*/
if(!window['HTMLElement']){
    var _querySelectorAll = Element.prototype.querySelectorAll;
    Element.prototype.querySelectorAll = function(selector) {
        var result = _querySelectorAll.call(this,selector);
        if(!isDomElement(this)){
            return result;
        }
        var resArr = [];
        for(var i = 0;i < result.length;i++){
            resArr.push(result[i]);
        }
        return resArr;
    }

    var _docquerySelectorAll = document.querySelectorAll;
    document.querySelectorAll = function(selector) {
        try{
            var result = _docquerySelectorAll.call(this,selector);
            var resArr = [];
            if(result.length > 0){
                for(var i = 0;i < result.length;i++){
                    resArr.push(result[i]);
                }
                return resArr;
            }else{
                return result;
            }
            
        }catch(e){

        }
        
    }
}

if(!Element.prototype.addEventListener){
    Element.prototype.addEventListener = function(event,fun){
        var tag = this;
        this.attachEvent("on"+event,function(){
            fun.apply(tag,arguments);//这里是关键
        });
    }
}


// 绑定环境
if(typeof Function.prototype.bind !== 'function'){
    Function.prototype.bind = function(context){
        var fn = this;
        var args = [];
        for(var i = 1, len = arguments.length; i < len; i ++){
            args.push(arguments[i]);
        }

        return function(){
            // for(var j = 1, len = arguments.length; j < len; j ++){
            //     args.push(arguments[j]);
            // }
            return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
        };
    };
}

// 获取当前js文件的路径
	window.getCurrentJsPath = function() {
		var doc = document,
		a = {},
		expose = +new Date(),
		rExtractUri = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/,
		isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;
		// FF,Chrome
		if (doc.currentScript){
			return doc.currentScript.src;
		}

		var stack;
		try{
			a.b();
		}
		catch(e){
			stack = e.fileName || e.sourceURL || e.stack || e.stacktrace;
		}
		// IE10
		if (stack){
			var absPath = rExtractUri.exec(stack)[1];
			if (absPath){
				return absPath;
			}
		}

		// IE5-9
		for(var scripts = doc.scripts,
			i = scripts.length - 1,
			script; script = scripts[i--];){
			if (script.className !== expose && script.readyState === 'interactive'){
				script.className = expose;
				// if less than ie 8, must get abs path by getAttribute(src, 4)
				return isLtIE8 ? script.getAttribute('src', 4) : script.src;
			}
		}
	};
	
	window.encodeBase64 = function(str){
		var c1, c2, c3;
                var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";                
                var i = 0, len= str.length, string = '';

                while (i < len){
                        c1 = str[i++] & 0xff;
                        if (i == len){
                                string += base64EncodeChars.charAt(c1 >> 2);
                                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                                string += "==";
                                break;
                        }
                        c2 = str[i++];
                        if (i == len){
                                string += base64EncodeChars.charAt(c1 >> 2);
                                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                                string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                                string += "=";
                                break;
                        }
                        c3 = str[i++];
                        string += base64EncodeChars.charAt(c1 >> 2);
                        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                        string += base64EncodeChars.charAt(c3 & 0x3F)
                }
        return string
	};