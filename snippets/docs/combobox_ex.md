# 下拉框

本例展示下拉框示例。

replaceExamp

[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/kero/combobox)


# API

## \# u-meta 属性

* type：`u-combobox`

* datasource
	* 类型： Array
	* 说明：设置下拉框的数据源，具体数组内容需要在viewmodel中定义，数组中的每个对象需要有value，name字段。其中name为下拉框的显示值，value为下拉框的真实值。
	* 用法：
	 
		```
	
		comboData:[{name:'cc',value:'03'},{name:'dd',value:'04'}]
	
		```

**注**：如果在开发时要求兼容ie8,ie9，datasource必须定义。　


u-meta基础api请参考[这里](http://design.yyuap.com/dist/pages/kero/moduleapi.html)



## \# ComboboxAdapter对象

* 类型：`Object`
* 说明： 获取ComboboxAdapter对象，可以通过此对象的一些方法来改变下拉框的效果状态。下面方法均是在此对象基础上调用的。
* 用法：`app.getComp('控件id值')；`



```

<div id="combo1" class="u-combo u-text u-label-floating" u-meta='{"id":"c1","type":"u-combobox","data":"dt1","field":"f1","datasource":"comboData"}'>
    <input class="u-input"/>
    <span class="u-combo-icon"></span>
</div>

var comboboxAObject = app.getComp('c1');//c1为在u-meta中定义的id值

```


## \# setEnable对象

* 类型： `Function`
* 说明： 设置下拉框是否可用。
* 参数：{Boolean} isEnable,isEnable=true时可用，isEnable=false时不可用
* 用法：

```
comboboxAObject.setEnable(true);//设置可用

```


相关内容：

[基础下拉框](http://design.yyuap.com/dist/pages/plugins/combobox.html)    

[下拉框在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)
