# 单选框

本例实现NeoUI组件radio的数据绑定。

replaceExamp

[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/kero/radio)

**注意**：

1、datasource对应的对象需要在数据模型viewModel中定义。

2、radio选中的真实值会绑定到dataTable对应的字段上


# API

## \# u-meta 属性

* type：`u-radio`

* datasource
	* 类型： Array
	* 说明：设置单选框的数据源，具体数组内容需要在viewmodel中定义，数组中的每个对象需要有value，name字段。其中name为单选框的显示值，value为单选框的真实值。
	* 用法：
	 
		```
	
		radiodata:[{value:'01',name:'男'},{value:'02',name:'女'}]
	
		```
* hasOther
	* 类型：Boolean
	* 说明：是否含有其他单选框，当hasOther为true时，单选框会自动多一个显示值为“其他”的单选框和一个输入框，输入框默认是不可输入的，当单选框选中时，输入框可输入，存放该单选框的真实值。默认为false。


## \# radioAdapter对象

* 类型：`Object`
* 说明： 获取radioAdapter对象，可以通过此对象的一些方法来改变单选框的效果状态。下面方法均是在此对象基础上调用的。
* 用法：`app.getComp('控件id值')；`



```

<div u-meta='{"id":"r1","type":"u-radio","data":"dt1","field":"f1","datasource":"radiodata","hasOther":true}'>
	<label  class="u-radio" >
	    <input type="radio" class="u-radio-button" name="options">
	    <span class="u-radio-label"></span>
	</label>
</div>

var radioAObject = app.getComp('r1');//r1为在u-meta中定义的id值

```


## \# setEnable对象

* 类型： `Function`
* 说明： 设置单选框是否可用。
* 参数：{Boolean} isEnable,isEnable=true时可用，isEnable=false时不可用
* 用法：

```
radioAObject.setEnable(true);//设置可用

```



相关内容：

[基础单选框](http://design.yyuap.com/dist/pages/global-style/radio.html)    

[单选框在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)