# 单选框

本例实现NeoUI组件radio的数据绑定。


实现效果如下：
<div class="example-content"><!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type.data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型,单选框对应的type为u-radio
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	datasource:绑定数据
-->
<div u-meta='{"id":"r1","type":"u-radio","data":"dt1","field":"f1","datasource":"radiodata"}'>
    <label  class="u-radio" >
        <input type="radio" class="u-radio-button" name="options">
        <span class="u-radio-label"></span>
    </label>
</div></div>
<div class="example-content ex-hide"><script>
// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 * radiodata:自定义单选框数据，用于绑定数据
 */
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
        f1:{},
        f2:{}
        }
     }),
    radiodata:[{value:'01',name:'男'},{value:'02',name:'女'}]
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

// 创建空行,绑定默认值
var r = viewModel.dt1.createEmptyRow();
r.setValue('f1',"01");
viewModel.dt1.setRowSelect(0);
</script></div>
<div class="examples-code"><pre><code>&lt;!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type.data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型,单选框对应的type为u-radio
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	datasource:绑定数据
-->
&lt;div u-meta='{"id":"r1","type":"u-radio","data":"dt1","field":"f1","datasource":"radiodata"}'>
    &lt;label  class="u-radio" >
        &lt;input type="radio" class="u-radio-button" name="options">
        &lt;span class="u-radio-label">&lt;/span>
    &lt;/label>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>
// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 * radiodata:自定义单选框数据，用于绑定数据
 */
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
        f1:{},
        f2:{}
        }
     }),
    radiodata:[{value:'01',name:'男'},{value:'02',name:'女'}]
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

// 创建空行,绑定默认值
var r = viewModel.dt1.createEmptyRow();
r.setValue('f1',"01");
viewModel.dt1.setRowSelect(0);</code></pre>
</div>


[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/kero/radio)

注意：

1、datasource对应的对象需要在数据模型viewModel中定义。

2、radio选中的真实值会绑定到dataTable对应的字段上



相关内容：

[基础单选框](http://design.yyuap.com/dist/pages/global-style/radio.html)    

[单选框在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)