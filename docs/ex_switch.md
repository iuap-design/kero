# 开关

本例实现UI控件switch的数据绑定。


## Switch

本例实现如下效果：
<div class="example-content">
<!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type,data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型,单选框对应的type为u-switch
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	checkedValue:打开值
	unCheckedValue：关闭值
-->
<label class="u-switch" u-meta='{"id":"field1","type":"u-switch","data":"dt1","field":"f1","checkedValue":"男","unCheckedValue":"女"}'>
    <input type="checkbox" class="u-switch-input" />
    <span class="u-switch-label"></span>
</label></div>
<div class="example-content ex-hide"><script>// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 */
var app, viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta: {
            f1: {},
            f2: {}
        }
    })
};

/**
 * app 创建框架服务
 * el 指定服务对应的顶层DOM
 * model 指定服务对应的数据模型
 */
app = u.createApp({
    el: 'body',
    model: viewModel
});

// 创建空行,绑定默认值
var r = viewModel.dt1.createEmptyRow();
r.setValue('f1', '男');
</script></div>
<div class="examples-code"><pre><code>
&lt;!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type,data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型,单选框对应的type为u-switch
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	checkedValue:打开值
	unCheckedValue：关闭值
-->
&lt;label class="u-switch" u-meta='{"id":"field1","type":"u-switch","data":"dt1","field":"f1","checkedValue":"男","unCheckedValue":"女"}'>
    &lt;input type="checkbox" class="u-switch-input" />
    &lt;span class="u-switch-label">&lt;/span>
&lt;/label></code></pre>
</div>
<div class="examples-code"><pre><code>// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 */
var app, viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta: {
            f1: {},
            f2: {}
        }
    })
};

/**
 * app 创建框架服务
 * el 指定服务对应的顶层DOM
 * model 指定服务对应的数据模型
 */
app = u.createApp({
    el: 'body',
    model: viewModel
});

// 创建空行,绑定默认值
var r = viewModel.dt1.createEmptyRow();
r.setValue('f1', '男');</code></pre>
</div>


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