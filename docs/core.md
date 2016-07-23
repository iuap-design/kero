# 基础api

## # isIE

* 说明：

  判断是否为IE浏览器

* 类型：

  Boolean

* 用法:

  ```
  u.isIE //IE浏览器返回true,其他返回false
  
  ```

## # isFF

* 说明：

  判断是否为火狐浏览器
* 类型：

  Boolean

## # isOpera

* 说明：

  判断是否为Opera浏览器
* 类型：

  Boolean

## # isChrome

* 说明：

  判断是否为Chrome浏览器
* 类型：

  Boolean

## # isSafari

* 说明：

  判断是否为Safari浏览器
* 类型：

  Boolean

## # isWebkit

* 说明：

  判断是否为Webkit内核浏览器
* 类型：

  Boolean

## # isIE8_BEFORE

* 说明：

  判断是否为IE8之前的浏览器
* 类型：

  Boolean

## # isIE8

* 说明：

  判断是否为IE8浏览器
* 类型：

  Boolean

## # isIE8_CORE

* 说明：

  判断是否为IE8内核浏览器
* 类型：

  Boolean

## # isIE9

* 说明：

  判断是否为IE9浏览器
* 类型：

  Boolean

## # isIE9_CORE

* 说明：

  判断是否为IE9内核浏览器
* 类型：

  Boolean

## # isIE10

* 说明：

  判断是否为IE10浏览器
* 类型：

  Boolean

## # isIE11

* 说明：

  判断是否为IE11浏览器
* 类型：

  Boolean

## # isIOS

* 说明：

  判断是否为IOS系统
* 类型：

  Boolean

## # isIphone

* 说明：

  判断是否为iphone浏览器
* 类型：

  Boolean

## # isIPAD

* 说明：

  判断是否为ipad浏览器
* 类型：

  Boolean

## # isWin

* 说明：

  判断是否为window系统
* 类型：

  Boolean

## # isUnix

* 说明：

  判断是否为unix系统
* 类型：

  Boolean

## # isLinux

* 说明：

  判断是否为linux系统
* 类型：

  Boolean

## # isAndroid

* 说明：

  判断是否为安卓系统
* 类型：

  Boolean

## # isMac

* 说明：

  判断是否为MAC
* 类型：

  Boolean

## # hasTouch

* 说明：

  判断是否存在touch事件
* 类型：

  Boolean



# 方法
## # extend(object, config)
* 说明：

  复制对象属性

* 参数：
  * {Object} object：必需。目标对象
  * {Object} config：必需。源对象
* 返回值：

  {Object}复制之后的object
* 用法：
  ​	
  	var obj1 = {
  		id : 'id',
  		name : 'name'
  	}
  	var obj2 = {
  		code : 'code',
  		name : 'newName'
  	}
  	u.extend(obj1, obj2); //obj1为{id: "id", name: "newName", code: "code"}

## # setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure)
* 说明：

  设置cookie属性

* 参数：
  * {String} sName：必需。规定 cookie 的名称。
  * {String} sValue：必需。规定 cookie 的值。
  * {String} oExpires：可选。规定 cookie 的有效期。
  * {String} sPath：可选。规定 cookie 的服务器路径。
  * {String} sDomain：可选。规定 cookie 的域名。
  * {String} bSecure：可选。规定是否通过安全的 HTTPS 连接来传输 cookie。
* 返回值：

  无
* 用法：
  ​	
  ​	
  	u.setCookie('COOKIENAME', 'COOKIVALUE'); //设置cookie的COOKIENAME为COOKIVALUE

## # getCookie(sName)
* 说明：

  获取cookie属性


* 参数：
  * {String} sName：必需。获取 cookie 的名称。
* 返回值：

  cookie中sName对应的属性
* 用法：
  ​	
  ​	
  	u.getCookie('COOKIENAME'); //获取cookie的COOKIENAME


## # on(element,eventName,child,listener)
* 说明：

  为HTML元素绑定事件

* 参数：
  * {HTMLElement} element：必需。需要绑定事件的HTML元素。
  * {String} eventName：必需。绑定事件的事件名称。
  * {String} child：可选。选择器，是否为element的子元素进行事件绑定。
  * {function} listener：必需。触发事件时执行的function。
* 返回值：

  无
* 用法：
  ​	
  	u.on(window, 'resize', function(){
  		alert('resizeFun')
  	});

## # off(element,eventName,listener)
* 说明：

  为HTML元素取消事件绑定

* 参数：
  * {HTMLElement} element：必需。取消绑定事件的HTML元素。
  * {String} eventName：必需。绑定事件的事件名称。
  * {function} listener：可选。取消绑定的function，如果传入则只取消此function的绑定，对其他function不进行改变。
* 返回值：

  无
* 用法：
  ​	
  	u.off(window, 'resize');


## # trigger(element,eventName)
* 说明：

  触发HTML元素的事件绑定

* 参数：
  * {HTMLElement} element：必需。触发绑定事件的HTML元素。
  * {String} eventName：必需。触发绑定事件的事件名称。
* 返回值：

  无
* 用法：
  ​	
  	u.trigger(window, 'resize');

## # addClass(element,value)
* 说明：

  为HTML元素添加样式

* 参数：
  * {HTMLElement} element：必需。需要添加样式的HTML元素。
  * {String} value：必需。添加的样式名。
* 返回值：

  无
* 用法：
  ​	
  	u.addClass(document.getElementById('id1'), 'add-class');

## # removeClass(element,value)
* 说明：

  为HTML元素删除样式

* 参数：
  * {HTMLElement} element：必需。需要删除样式的HTML元素。
  * {String} value：必需。删除的样式名。
* 返回值：

  无
* 用法：
  ​	
  	u.removeClass(document.getElementById('id1'), 'add-class');

## # hasClass(element,value)
* 说明：

  判断HTML元素是否存在某样式

* 参数：
  * {HTMLElement} element：必需。进行判断的HTML元素。
  * {String} value：必需。进行判断的样式名。
* 返回值：

  {Boolean}存在样式则返回true，不存在样式则返回false
* 用法：
  ​	
  	u.hasClass(document.getElementById('id1'), 'add-class');

## # toggleClass(element,value)
* 说明：

  判断HTML元素是否存在某样式，存在则删除此样式，否则添加此样式

* 参数：
  * {HTMLElement} element：必需。进行判断的HTML元素。
  * {String} value：必需。进行判断的样式名。
* 返回值：

  {Boolean}执行完方法之后，如果存在样式则返回true，不存在样式则返回false
* 用法：
  ​	
  	u.toggleClass(document.getElementById('id1'), 'add-class');

## # css(element,csstext,val)
* 说明：

  为HTML元素添加css样式属性。传入2个参数且第二个参数为字符串时获取HTML元素的css样式属性。

* 参数：
  * {HTMLElement} element：必需。进行判断的HTML元素。
  * {String}/{Object} csstext：必需。传入值为String时表示要添加的css属性名称，传入值为Object时表示要添加的css属性名称及属性值组成的Object对象。
  * {String} value：csstext为String时必需。需要添加的css属性值。
* 返回值：

  设置css样式属性时返回值为空。

  获取css样式属性时返回值为对应的css样式属性值。
* 用法：
  ​	
  	u.css(document.getElementById('id1'), 'width','200px');	 //设置宽度为200px
  	u.css(document.getElementById('id1'), {width:'500px'}); // 设置宽度为500px
  	u.css(document.getElementById('id1'), 'width'); // 获取宽度

## # wrap(element,parent)
* 说明：

  将HTML元素添加到某HTML元素中。

* 参数：
  * {HTMLElement} element：必需。被添加的HTML元素。
  * {String}/{HTMLElement} parent：必需。作为父项的HTML元素。
* 返回值：

  无
* 用法：
  ​	
  	u.wrap(document.getElementById('id1'), '<div></div>');	 
  	u.wrap(document.getElementById('id1'), document.getElementById('id2'));


## # getStyle(element,key)
* 说明：

  获取HTML元素的style属性。

* 参数：
  * {HTMLElement} element：必需。HTML元素。
  * {String} key：必需。需要获取的style属性名称。
* 返回值：

  HTML元素的style属性值
* 用法：
  ​	
  	u.getStyle(document.getElementById('id1'), 'width');	 

## # getZIndex()
* 说明：

  统一zindex值, 不同控件每次显示时都取最大的zindex，防止显示错乱

* 参数：

  无

* 返回值：

  新的zindex最大值
* 用法：
  ​	
  	u.getZIndex();	 


## # makeDOM(htmlString)
* 说明：

  创建HTML元素

* 参数：

  * {String} htmlString：必需。需要创建的HTML元素对应的html字符串。

* 返回值：

  创建之后的HTML元素
* 用法：
  ​	
  	u.makeDOM('<div></div>');	 

## # stopEvent(e)
* 说明：

  阻止事件传播，兼容不同浏览器

* 参数：

  * {Event} e：必需。需要阻止传播的事件。

* 返回值：

  无
* 用法：
  ​	
  	u.stopEvent(e);	 


## # getFunction(target, val)
* 说明：

  获取function

* 参数：

  * {Object} target：必需。function定义的上下文。
  * {String} value：必需。function名称。
* 返回值：

  {function}获取到的function
* 用法：
  ​	
  	u.getFunction(window,'funName1');	 


## # getJSObject(target, names)
* 说明：

  获取Object对象

* 参数：

  * {Object} target：必需。Object定义的上下文。
  * {String} names：必需。Objcet名称。
* 返回值：

  {Object}获取到的Object
* 用法：
  ​	
  	u.getJSObject(window,'funName1'); //获取window对象上的funName1对象

## # isDate(obj)
* 说明：

  判断传入对象是否为Date对象

* 参数：

  * {Object} obj：必需。需要进行判断的对象。
* 返回值：

  {Boolean}传入对象为Date对象返回true否则返回false
* 用法：
  ​	
  	u.isDate(new Date());	 

## # isNumber(obj)
* 说明：

  判断传入对象是否为Number对象

* 参数：

  * {Object} obj：必需。需要进行判断的对象。
* 返回值：

  {Boolean}传入对象为Number对象返回true否则返回false
* 用法：
  ​	
  	u.isNumber('123');

## # isArray(obj)
* 说明：

  判断传入对象是否为数组对象

* 参数：

  * {Object} obj：必需。需要进行判断的对象。
* 返回值：

  {Boolean}传入对象为数组对象返回true否则返回false
* 用法：
  ​	
  	u.isArray(['1','2']);


## # isEmptyObject(obj)
* 说明：

  判断传入对象是否为空对象

* 参数：

  * {Object} obj：必需。需要进行判断的对象。
* 返回值：

  {Boolean}传入对象为空对象返回true否则返回false
* 用法：
  ​	
  	u.isEmptyObject({id:'id'});


## # inArray(node,arr)
* 说明：

  判断元素是否在数组中

* 参数：

  * {Object} node：必需。需要进行判断的元素。
  * {Array} arr：必需。需要进行判断的数组。
* 返回值：

  {Boolean}如果数组中存在元素则返回true，否则返回false。
* 用法：
  ​	
  	u.inArray('a1',['a2','a3']);

## # each(obj,callback)
* 说明：

  遍历传入的obj执行callback方法

* 参数：

  * {Object}/{Array} obj：必需。需要进行遍历的对象或数组。
  * {function} callback：必需。需要执行的function。
* 返回值：

  无
* 用法：
  ​	
  	var tmpdata = [];
  	u.each(target_div.querySelectorAll(".m_context"),function(i,node){
  			tmpdata[i] = node.innerHTML
  		})
  	//遍历将class为m_context的HTML的内容翻入数组tmpdata中。