# 起步

## 引入Kero文件及相关依赖

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kero Getting Started</title>
</head>
<body>

  <script src="http://design.yyuap.com/static/jquery/jquery-1.9.1.min.js"></script>
  <!--引入knockout依赖-->
  <script src="http://design.yyuap.com/static/knockout/knockout-3.2.0.debug.js"></script>
  <!--引入核心js文件-->
  <script src="http://design.yyuap.com/static/uui/latest/js/u.js"></script>
</body>
</html>
```

## 兼容IE8

如需兼容IE8,需要在引入其他JS文件之前加载`u-polyfill.js`

```javascript
<!--[if lte IE 8]>
  <script src="http://design.yyuap.com/static/uui/latest/js/u-polyfill.js"></script>
<![endif]-->
```

## 快速上手

绑定数据




## Hello World示例


<div class="examples-code"><pre><code>
&lt;!-- HTML -->
&lt;div id="demo_div">&lt;/div></code></pre>
</div>


<pre class="examples-code"><code>
// JS
var app,viewModel;

/**
 * `viewModel = {...}`创建数据模型
 * `dt1` 创建名为`dt1`的`u.DataTable`数据集
 * `f1` 创建名为`f1`的字段，为`dt1`数据集的一个子集
 */
viewModel = {
    dt1: new u.DataTable({
        meta:{
            f1:{
                type:'string',
                maxLength:12
            }
        }
    })
};

/**
 * `app = u.createApp({...})`,页面初始化，创建框架服务
 * `el` 指定服务对应的顶层DOM
 * `setValue`进行赋值操作
 */
app = u.createApp({
    el:'body',
    model:viewModel
});

var r = viewModel.dt1.createEmptyRow();
r.setValue('f1','Hello World');

/**
 * getValue 获取字段对应的值
 */
var demoDiv = document.getElementById('demo_div');
var dtVal = viewModel.dt1.getValue('f1');
demoDiv.innerHTML = dtVal;</code></pre>

