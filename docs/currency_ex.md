# 输入转换

本例展示输入数字后转换为对应钱币。


##Currency

本例实现如下效果：

* 输入数字转为钱币
* 输入错误类型报错



<div class="example-content"><!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type.data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	datasource:绑定数据模型对应的数据
-->
人民币：
<input  u-meta='{"id":"f1","type":"currency","data":"dt1","field":"f1"}' />
美元：
<input  u-meta='{"id":"f2","type":"currency","data":"dt1","field":"f2"}' /></div>
<div class="example-content ex-hide"><script>// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * min 指定最小输入值，本例为50
 * curSymbol 输入数据前自动添加符号类型，默认为"¥"
 */
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta: {
            f1: {min:50},
            f2: {curSymbol:"$"}
        }
    })
};

/**
 * app 创建框架服务
 * el 指定服务对应的顶层DOM
 * model 指定服务对应的数据模型
 */
app = u.createApp({
    el:'body',
    model:viewModel
});

// 创建空行
var r = viewModel.dt1.createEmptyRow();


</script></div>
<div class="examples-code"><pre><code>&lt;!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type.data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	datasource:绑定数据模型对应的数据
-->
人民币：
&lt;input  u-meta='{"id":"f1","type":"currency","data":"dt1","field":"f1"}' />
美元：
&lt;input  u-meta='{"id":"f2","type":"currency","data":"dt1","field":"f2"}' /></code></pre>
</div>
<div class="examples-code"><pre><code>// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * min 指定最小输入值，本例为50
 * curSymbol 输入数据前自动添加符号类型，默认为"¥"
 */
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta: {
            f1: {min:50},
            f2: {curSymbol:"$"}
        }
    })
};

/**
 * app 创建框架服务
 * el 指定服务对应的顶层DOM
 * model 指定服务对应的数据模型
 */
app = u.createApp({
    el:'body',
    model:viewModel
});

// 创建空行
var r = viewModel.dt1.createEmptyRow();

</code></pre>
</div>
