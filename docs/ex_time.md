# 时间选择

本例时间UI控件绑定默认数据。


##Year

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
-->
<div class="" u-meta='{"id":"t2","type":"u-time","data":"dt1","field":"f2"}'>
    <input class="u-input"/>
</div></div>
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
            f1: {type:'datetime'},
            f2: {type:'string'}
        }
    }),
}

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
r.setValue('f1', "2016-2-7 12:32:34");
r.setValue('f2', "12:32:34");
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
-->
&lt;div class="" u-meta='{"id":"t2","type":"u-time","data":"dt1","field":"f2"}'>
    &lt;input class="u-input"/>
&lt;/div></code></pre>
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
            f1: {type:'datetime'},
            f2: {type:'string'}
        }
    }),
}

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
r.setValue('f1', "2016-2-7 12:32:34");
r.setValue('f2', "12:32:34");
viewModel.dt1.setRowSelect(0);


</code></pre>
</div>
