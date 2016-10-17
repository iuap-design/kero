# 复选框

本例实现NeoUI组件checkbox数据绑定。

replaceExamp

[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/kero/checkbox)

**注意**：

1、datasource对应的对象需要在数据模型viewModel中定义。

2、checkout选中的真实值会绑定到dataTable对应的字段上


# API

## \# u-meta 属性

* type：`u-checkbox`

* datasource
	* 类型： Array
	* 说明：设置复选框的数据源，具体数组内容需要在viewmodel中定义，数组中的每个对象需要有value，name字段。其中name为复选框的显示值，value为复选框的真实值。
	* 用法：
	 
		```
	
		checkboxData: [{value: 'test1', name: '产品一'}, {value: 'test2', name: '产品二'}]
	
		```
* unCheckedValue
	* 类型： String
	* 说明：复选框未选中的值
* checkedValue
	* 类型：　String 
	* 说明：复选框选中的值，当行对象中的字段值与checkedValue值相同时，复选框就会选中，否则为未选中状态。
* hasOther
	* 类型：Boolean
	* 说明：是否含有其他复选框，当hasOther为true时，复选框会自动多一个显示值为“其他”的复选框和一个输入框，输入框默认是不可输入的，当复选框选中时，输入框可输入，存放该复选框的真实值。默认为false。


u-meta基础api请参考[这里](http://design.yyuap.com/dist/pages/kero/moduleapi.html)



## \# CheckboxAdapter对象

* 类型：`Object`
* 说明： 获取checkboxAdapter对象，可以通过此对象的一些方法来改变复选框的效果状态。下面方法均是在此对象基础上调用的。
* 用法：`app.getComp('控件id值')；`



```

<div u-meta='{"id":"c1","type":"u-checkbox","data":"dt1","field":"f1","datasource":"cehckboxData"}'>
    <label class="u-checkbox">
        <input type="checkbox" class="u-checkbox-input">
        <span class="u-checkbox-label" data-role="name"></span>
    </label>
</div>


var checkboxAObject = app.getComp('c1');//c1为在u-meta中定义的id值

```


## \# setEnable对象

* 类型： `Function`
* 说明： 设置复选框是否可用。
* 参数：{Boolean} isEnable,isEnable=true时可用，isEnable=false时不可用
* 用法：

```
checkboxAObject.setEnable(true);//设置可用

```



相关内容：

[复选框](http://design.yyuap.com/dist/pages/global-style/checkbox.html)    

[复选框在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)
