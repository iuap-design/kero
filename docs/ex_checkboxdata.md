# 复选框

本例实现NeoUI组件checkbox数据绑定。


##Checkbox选中值

本例实现如下效果：

* 绑定默认数据
* 实现UI交互
* 利用checkedValue，修改默认选中值
* 利用setSimpleData，修改数据集默认值


<div class="example-content"><!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type.data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
	datasource:绑定数据
	checkedValue:表示元素为选中状态对应的value值
-->
<label  class="u-checkbox" for="checkbox-1" u-meta='{"id":"c1","type":"u-checkbox","data":"dt1","field":"f1","checkedValue":"ck1"}'>
    <input type="checkbox" id="checkbox-1"  value="test1" class="u-checkbox-input">
    <span class="u-checkbox-label">test1</span>
</label>
<label  class="u-checkbox" for="checkbox-2" u-meta='{"id":"c1","type":"u-checkbox","data":"dt1","field":"f1","checkedValue":"ck2"}'>
    <input type="checkbox" id="checkbox-2"  value="test2" class="u-checkbox-input" >
    <span class="u-checkbox-label">test2</span>
</label>
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
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
            f1:{}
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

// 创建空行,绑定默认值
var r = viewModel.dt1.createEmptyRow();
r.setValue('f1', "setVal");
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


// setSimpleData:设置对应数据集的value值，会覆盖原有数据,即覆盖之前setValue的默认值"setVal"
viewModel.dt1.setSimpleData([
    {"f1":"setSimpleData"}
]);
demoDiv.innerHTML = viewModel.dt1.getValue('f1');







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
	checkedValue:表示元素为选中状态对应的value值
-->
&lt;label  class="u-checkbox" for="checkbox-1" u-meta='{"id":"c1","type":"u-checkbox","data":"dt1","field":"f1","checkedValue":"ck1"}'>
    &lt;input type="checkbox" id="checkbox-1"  value="test1" class="u-checkbox-input">
    &lt;span class="u-checkbox-label">test1&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox" for="checkbox-2" u-meta='{"id":"c1","type":"u-checkbox","data":"dt1","field":"f1","checkedValue":"ck2"}'>
    &lt;input type="checkbox" id="checkbox-2"  value="test2" class="u-checkbox-input" >
    &lt;span class="u-checkbox-label">test2&lt;/span>
&lt;/label>
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
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
            f1:{}
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

// 创建空行,绑定默认值
var r = viewModel.dt1.createEmptyRow();
r.setValue('f1', "setVal");
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


// setSimpleData:设置对应数据集的value值，会覆盖原有数据,即覆盖之前setValue的默认值"setVal"
viewModel.dt1.setSimpleData([
    {"f1":"setSimpleData"}
]);
demoDiv.innerHTML = viewModel.dt1.getValue('f1');






</code></pre>
</div>
