# 日期时间选择

本例展示:日期时间UI控件绑定默认数据。

replaceExamp

[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/kero/datetime)

注意：

1、`u-datepicker`元素中format用来定义日期的显示格式，具体定义请参考UI控件中的[日期](http://design.yyuap.com/dist/pages/plugins/date.html)中的定义



# API

## \# u-meta 属性

* type：`u-date`或者`u-datetime`。默认为`u-date`
	* `u-date`:年-月-日
	* `u-datetime`：年-月-日 时：分：秒


* beforeValueChangeFun
	* 类型： String
	* 说明：用户自定义点击确认按钮触发的事件。其值代表函数名称，此函数在viewModel中定义。其中参数为当前用户选择的时间。

* format
	* 类型：String
	* 说明：日期的显示格式。具体请参考[日期控件](http://design.yyuap.com/dist/pages/plugins/date.html)。默认显示"YYYY-MM-DD HH:mm:ss"
* startField
	* 类型：String
	* 说明：日期的起始时间

* endField
	* 类型：String
	* 说明：日期的结束日期


u-meta基础api请参考[这里](http://design.yyuap.com/dist/pages/kero/moduleapi.html)



## \# DateTimeAdapter对象

* 类型：`Object`
* 说明： 获取DateTimeAdapter对象，可以通过此对象的一些方法来改变日期控件的效果状态。下面方法均是在此对象基础上调用的。
* 用法：`app.getComp('控件id值')；`



```

<div class='u-datepicker' u-meta='{"id":"udatetime","type":"u-datetime","data":"dt1","field":"f1","format":"YYYY-MM-DD HH:mm"}'>
    <input class="u-input" type="text">
    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
    </span>
</div>


var dateTimeAObject = app.getComp('udatetime');//udatetime为在u-meta中定义的id值

```

## \# setEnable对象

* 类型： `Function`
* 说明： 设置日期控件是否可用。
* 参数：{Boolean} isEnable,isEnable=true时可用，isEnable=false时不可用
* 用法：

```
dateTimeAObject.setEnable(true);//设置可用

```



相关内容：

[基础日期控件](http://design.yyuap.com/dist/pages/plugins/date.html)    

[日期控件在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)