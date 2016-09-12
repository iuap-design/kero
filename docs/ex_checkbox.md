# 复选框

本例实现NeoUI组件checkbox数据绑定。


##Checkbox

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
	datasource:绑定数据
-->
<div u-meta='{"id":"c1","type":"u-checkbox","data":"dt1","field":"f1","datasource":"checkboxData"}'>
    <label class="u-checkbox">
        <input type="checkbox" class="u-checkbox-input">
        <span class="u-checkbox-label" data-role="name"></span>
    </label>
</div>
<div id="demo_div"></div>
</div>
<div class="example-content ex-hide"><script>// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 * checkboxData:自定义数据，用于绑定数据
 */
var app, viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta: {
            f1: {}
        }
    }),
    checkboxData: [{value: 'test1', name: '产品一'}, {value: 'test2', name: '产品二'}]
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
r.setValue('f1', "test1");
viewModel.dt1.setRowSelect(0);

/**
 * getDtValue:#demo_div绑定‘f1’数据
 * viewModel.dt1.getValue:获取字段对应的值
 */
var demoDiv = document.getElementById('demo_div');
var demoCheckbox = document.querySelectorAll('.u-checkbox');

var getDtValue = function() {
    var dtVal = viewModel.dt1.getValue('f1');
    demoDiv.innerHTML = dtVal;
};

for(var i=0; i<demoCheckbox.length; i++){
	demoCheckbox[i].addEventListener('click',getDtValue);
}
getDtValue();







</script></div>
<div class="examples-code"><pre><code>&lt;!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type.data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	datasource:绑定数据
-->
&lt;div u-meta='{"id":"c1","type":"u-checkbox","data":"dt1","field":"f1","datasource":"checkboxData"}'>
    &lt;label class="u-checkbox">
        &lt;input type="checkbox" class="u-checkbox-input">
        &lt;span class="u-checkbox-label" data-role="name">&lt;/span>
    &lt;/label>
&lt;/div>
&lt;div id="demo_div">&lt;/div>
</code></pre>
</div>
<div class="examples-code"><pre><code>// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 * checkboxData:自定义数据，用于绑定数据
 */
var app, viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta: {
            f1: {}
        }
    }),
    checkboxData: [{value: 'test1', name: '产品一'}, {value: 'test2', name: '产品二'}]
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
r.setValue('f1', "test1");
viewModel.dt1.setRowSelect(0);

/**
 * getDtValue:#demo_div绑定‘f1’数据
 * viewModel.dt1.getValue:获取字段对应的值
 */
var demoDiv = document.getElementById('demo_div');
var demoCheckbox = document.querySelectorAll('.u-checkbox');

var getDtValue = function() {
    var dtVal = viewModel.dt1.getValue('f1');
    demoDiv.innerHTML = dtVal;
};

for(var i=0; i&lt;demoCheckbox.length; i++){
	demoCheckbox[i].addEventListener('click',getDtValue);
}
getDtValue();






</code></pre>
</div>


[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/kero/checkbox)

注意：

1、datasource对应的对象需要在数据模型viewModel中定义。

2、checkout选中的真实值会绑定到dataTable对应的字段上



相关内容：

[复选框](http://design.yyuap.com/dist/pages/global-style/checkbox.html)    

[复选框在grid中使用]()
