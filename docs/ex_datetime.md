# 日期时间选择

本例展示:日期时间UI控件绑定默认数据。


##Datetime

本例实现如下效果：

* 绑定默认数据
* 实现UI交互



<div class="example-content"><!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type.data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	format:日期控件特有属性。type为u-date时format默认为“YYYY-MM-DD”，type为u-datetime时format默认为“YYYY-MM-DD HH:mm:ss”
-->
<div class='u-datepicker' u-meta='{"id":"udatetime","type":"u-datetime","data":"dt1","field":"f1","format":"YYYY-MM-DD HH:mm"}'>
    <input class="u-input" type="text">
    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
	</span>
</div>
</div>
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
            f1: {type:'datetime'}
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
r.setValue('f1', "2016-2-13 4:58:58");
viewModel.dt1.setRowSelect(0);



</script></div>
<div class="examples-code"><pre><code>&lt;!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type.data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	format:日期控件特有属性。type为u-date时format默认为“YYYY-MM-DD”，type为u-datetime时format默认为“YYYY-MM-DD HH:mm:ss”
-->
&lt;div class='u-datepicker' u-meta='{"id":"udatetime","type":"u-datetime","data":"dt1","field":"f1","format":"YYYY-MM-DD HH:mm"}'>
    &lt;input class="u-input" type="text">
    &lt;span class="input-group-addon">&lt;span class="glyphicon glyphicon-calendar">&lt;/span>
	&lt;/span>
&lt;/div>
</code></pre>
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
            f1: {type:'datetime'}
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
r.setValue('f1', "2016-2-13 4:58:58");
viewModel.dt1.setRowSelect(0);


</code></pre>
</div>
