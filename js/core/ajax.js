
var XmlHttp = {
  get : "get",
  post : "post",
  reqCount : 4,
  createXhr : function() {
    var xmlhttp = null;
    /*if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }*/
    if(u.isIE8){
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP  
    }else if(u.isIE){
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP
    }else if(window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  },
  ajax : function(_json) {
    var url = _json["url"];
    var callback = _json["success"];
    var async = (_json["async"] == undefined ? true : _json["async"]);
    var error = _json["error"];
    var params = _json["data"] || {};
    var method = (_json["type"] == undefined ? XmlHttp.post : _json["type"]).toLowerCase();
    var gzipFlag = params.compressType;
    url = XmlHttp.serializeUrl(url);
    params = XmlHttp.serializeParams(params);
    if (method == XmlHttp.get && params != null) {
      url += ("&" + params);
      params = null;  //如果是get请求,保证最终会执行send(null)
    }

    var xmlhttp = XmlHttp.createXhr();
    //xmlhttp.open(method, url+ escape(new Date()), async);
    xmlhttp.open(method, url, async);

    if (method == XmlHttp.post) {
      xmlhttp.setRequestHeader("Content-type",
          "application/x-www-form-urlencoded;charset=UTF-8");
    }

    var execount = 0;
    // 异步
    if (async) {
      // readyState 从 1~4发生4次变化
      xmlhttp.onreadystatechange = function() {
        execount++;
        // 等待readyState状态不再变化之后,再执行回调函数
        //if (execount == XmlHttp.reqCount) {// 火狐下存在问题，修改判断方式
        if(xmlhttp.readyState == XmlHttp.reqCount){
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
  execBack : function(xmlhttp, callback, error) {
    //if (xmlhttp.readyState == 4
     if (xmlhttp.status == 200 || xmlhttp.status == 304 || xmlhttp.readyState == 4) {
      callback(xmlhttp.responseText,xmlhttp.status, xmlhttp);
    } else {
      if (error) {
        error(xmlhttp.responseText,xmlhttp.status, xmlhttp);
      } else {
        var errorMsg = "no error callback function!";
        if(xmlhttp.responseText) {
          errorMsg = xmlhttp.responseText;
        }
        alert(errorMsg);
        // throw errorMsg;
      }
    }
  },
  serializeUrl : function(url) {
    var cache = "cache=" + Math.random();
    if (url.indexOf("?") > 0) {
      url += ("&" + cache);
    } else {
      url += ("?" + cache);
    }
    return url;
  },
  serializeParams : function(params) {
    var ud = undefined;
    if (ud == params || params == null || params == "") {
      return null;
    }
    if (params.constructor == Object) {
      var result = "";
      for ( var p in params) {
        result += (p + "=" + encodeURIComponent(params[p]) + "&");
      }
      return result.substring(0, result.length - 1);
    }
    return params;
  }
};

//if ($ && $.ajax)
//  u.ajax = $.ajax;
//else
  u.ajax = XmlHttp.ajax;


