# 自定义验证

本例实现自定义验证。


##Validate

本例实现如下效果：

* 验证非空
* 验证数据格式
* 绑定默认数值（类placeholder）


<div class="example-content"><!-- 
	HTML
	u-meta:框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 
	id,type.data,field为必选项
	id:创建组件唯一标识
	type:创建组件对应的类型
	data:指定数据模型中的数据集
	field:绑定数据集中对应的字段
-->
<div class="u-form-group">
    <label>验证输入不为空且需要为数值</label>
    <div class="u-input-group u-has-feedback" u-meta='{"type":"u-text","data":"dt1","field":"otherSupportMoney"}'>
        <div class="u-input-group-before" style="color: red;">*</div>
        <input type="text" class="u-form-control">
    </div>
    <label>验证编码不能为空：</label>
    <div class="u-input-group u-has-feedback" u-meta='{"type":"u-text","data":"dt1","field":"otherSupportCode"}'>
        <div class="u-input-group-before" style="color: red;">*</div>
        <input type="text" class="u-form-control">
    </div>
    <label>显示默认值：</label>
    <div class="u-input-group u-has-feedback" u-meta='{"type":"u-text","data":"dt1","field":"isValid"}'>
        <div class="u-input-group-before" style="color: red;">*</div>
        <input type="text" class="u-form-control">
    </div>
    <label>显示默认值(函数)：</label>
    <div class="u-input-group u-has-feedback" u-meta='{"type":"u-text","data":"dt1","field":"isDefault"}'>
        <div class="u-input-group-before" style="color: red;">*</div>
        <input type="text" class="u-form-control">
    </div>
</div>
</div>
<div class="example-content ex-hide"><script>// JS

var app,viewModel;

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 * otherSupportCode、otherSupportMoney、isValid、isDefault自定义验证条件
 * required:必填项
 * nullMsg:错误提示
 * default:默认显示值，可以定义字符串或函数返回值
 */
var metaDt={
    meta: {
        id: {
            type: 'string'
        },
        otherSupportCode: {
            type: 'string',
            required: true,
            nullMsg: '编码不能为空！'
        },
        otherSupportMoney: {
            type: 'float',
            required: true,
            nullMsg: '金额不能为空！'
        },
        isValid: {
            type: 'string',
            'default':'Y'
        },
        isDefault: {
            type: 'string',
            'default':function(){
                return 'abc';
            }
        }
    }
};
viewModel={
    dt1: new u.DataTable(metaDt)
};

/**
 * app 创建框架服务
 * el 指定服务对应的顶层DOM
 * model 指定服务对应的数据模型
 */
app=u.createApp({
        el:'body',
        model:viewModel
    });

// 创建空行
var r = viewModel.dt1.createEmptyRow();
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
&lt;div class="u-form-group">
    &lt;label>验证输入不为空且需要为数值&lt;/label>
    &lt;div class="u-input-group u-has-feedback" u-meta='{"type":"u-text","data":"dt1","field":"otherSupportMoney"}'>
        &lt;div class="u-input-group-before" style="color: red;">*&lt;/div>
        &lt;input type="text" class="u-form-control">
    &lt;/div>
    &lt;label>验证编码不能为空：&lt;/label>
    &lt;div class="u-input-group u-has-feedback" u-meta='{"type":"u-text","data":"dt1","field":"otherSupportCode"}'>
        &lt;div class="u-input-group-before" style="color: red;">*&lt;/div>
        &lt;input type="text" class="u-form-control">
    &lt;/div>
    &lt;label>显示默认值：&lt;/label>
    &lt;div class="u-input-group u-has-feedback" u-meta='{"type":"u-text","data":"dt1","field":"isValid"}'>
        &lt;div class="u-input-group-before" style="color: red;">*&lt;/div>
        &lt;input type="text" class="u-form-control">
    &lt;/div>
    &lt;label>显示默认值(函数)：&lt;/label>
    &lt;div class="u-input-group u-has-feedback" u-meta='{"type":"u-text","data":"dt1","field":"isDefault"}'>
        &lt;div class="u-input-group-before" style="color: red;">*&lt;/div>
        &lt;input type="text" class="u-form-control">
    &lt;/div>
&lt;/div>
</code></pre>
</div>
<div class="examples-code"><pre><code>// JS

var app,viewModel;

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 * otherSupportCode、otherSupportMoney、isValid、isDefault自定义验证条件
 * required:必填项
 * nullMsg:错误提示
 * default:默认显示值，可以定义字符串或函数返回值
 */
var metaDt={
    meta: {
        id: {
            type: 'string'
        },
        otherSupportCode: {
            type: 'string',
            required: true,
            nullMsg: '编码不能为空！'
        },
        otherSupportMoney: {
            type: 'float',
            required: true,
            nullMsg: '金额不能为空！'
        },
        isValid: {
            type: 'string',
            'default':'Y'
        },
        isDefault: {
            type: 'string',
            'default':function(){
                return 'abc';
            }
        }
    }
};
viewModel={
    dt1: new u.DataTable(metaDt)
};

/**
 * app 创建框架服务
 * el 指定服务对应的顶层DOM
 * model 指定服务对应的数据模型
 */
app=u.createApp({
        el:'body',
        model:viewModel
    });

// 创建空行
var r = viewModel.dt1.createEmptyRow();
viewModel.dt1.setRowSelect(0);





</code></pre>
</div>
