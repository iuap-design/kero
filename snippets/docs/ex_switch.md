# 开关

本例实现UI控件switch的数据绑定。

replaceExamp

[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/kero/switch)



# API

## \# u-meta 属性

* type：`u-switch`

* unCheckedValue
	* 类型： String
	* 说明：开关未选中的值
* checkedValue
	* 类型：　String 
	* 说明：开关选中的值，当行对象中的字段值与checkedValue值相同时，开关就会选中，否则为未选中状态。



u-meta基础api请参考[这里](http://design.yyuap.com/dist/pages/kero/moduleapi.html)



## \# SwitchAdapter对象

* 类型：`Object`
* 说明： 获取switchAdapter对象，可以通过此对象的一些方法来改变开关的效果状态。下面方法均是在此对象基础上调用的。
* 用法：`app.getComp('控件id值')；`



```

<label class="u-switch" u-meta='{"id":"s1","type":"u-switch","data":"dt1","field":"f1","checkedValue":"男","unCheckedValue":"女"}'>
    <input type="checkbox" class="u-switch-input" />
    <span class="u-switch-label"></span>
</label>


var switchAObject = app.getComp('s1');//s1为在u-meta中定义的id值

```


## \# setEnable对象

* 类型： `Function`
* 说明： 设置开关是否可用。
* 参数：{Boolean} isEnable,isEnable=true时可用，isEnable=false时不可用
* 用法：

```
switchAObject.setEnable(true);//设置可用

```



相关内容：

[基础开关](http://design.yyuap.com/dist/pages/plugins/jsswitch.html)    
[开关在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)