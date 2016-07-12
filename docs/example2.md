# 基本示例 - 双向绑定

本例通过展示input输入信息，同步在页面显示内容，展示如何进行双向绑定。


##双向绑定

javascript片段同`hello world`示例，html片段说明

* `u-meta='{"type":"string","data":"dt1","field":"f1"}'`
* `u-meta`用于标识`input`输入框绑定`DataTable`实例
* `"type":"string"`指定输入框的内容格式为`string`字符串
* `"data":"dt1","field":"f1"`绑定`dt1`下的`f1`表单

<div class="example-content"><script>var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
            // 数据类型
            f1:{
                type:'string',
                maxLength:8
            }
        }
    })
};

app = u.createApp({
    el:'body',
    model:viewModel
});

var r = viewModel.dt1.createEmptyRow();
r.setValue('f1','Hello World');

</script></div>
<div class="example-content"><input  u-meta='{"type":"string","data":"dt1","field":"f1"}' />
<div  data-bind="text:dt1.ref('f1')"></div>
</div>
<div class="examples-code"><pre><code>var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
            // 数据类型
            f1:{
                type:'string',
                maxLength:8
            }
        }
    })
};

app = u.createApp({
    el:'body',
    model:viewModel
});

var r = viewModel.dt1.createEmptyRow();
r.setValue('f1','Hello World');
</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;input  u-meta='{"type":"string","data":"dt1","field":"f1"}' />
&lt;div  data-bind="text:dt1.ref('f1')">&lt;/div></code></pre>
</div>
