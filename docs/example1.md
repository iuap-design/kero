# 基本示例 - 数据绑定

本例通过简单的前端页面显示Hello World，展示如何进行数据绑定。


##Hello World

使用`data-bind`绑定数据。

js内容解读

* `viewModel = {...}`创建`u.DataTable`实例集合
* `dt1` 创建名为`dt1`的`u.DataTable`实例集合
* `f1` 定义名为`f1`的实例中某一条件组合，为`dt1`的一个子集
* `app = u.createApp({...})`,页面初始化
* `setValue`绑定数据

html内容解读

* `data-bind`进行数据绑定
* `"text:dt1.ref('f1')">`指定绑定的实例集合：`dt1`下的`f1`

<div class="example-content"><div data-bind="text:dt1.ref('f1')"></div></div>
<div class="example-content ex-hide"><script>var app,viewModel;
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
<div class="examples-code"><pre><code>&lt;div data-bind="text:dt1.ref('f1')">&lt;/div></code></pre>
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
