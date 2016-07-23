# 基本设置

设置基本的校验、格式化、添加事件监听。

## 校验


在创建dataTable时进行校验设置

```
/**
 ## 校验类型说明：
 *  precision: 精度
 *  max: 数字最大值
 *  min: 数字最小值
 *  maxLength: string最大长度
 *  minLength: string最小长度
 *  required: 必填
 */
   
var dataTable1 = new u.DataTable({
    meta:{
    f1:{type:'string',maxLength:8,minLength:3},
    f2:{type:'float', precision:2,max:500,min:100},
    f3:{type:'integer', required:true,regExp:/^[0-9]{6}$/},
    f4:{type:'string',required:true}

});
```



---

## 格式化

示例如下：​

```
var dataTable1 = new u.DataTable({
    meta:{
    f1:{type:'date',format:'YYYY-MM-DD'},
    f2:{type:'date',format:'YYYY/MM/DD'}
});
```


---


## 添加事件监听

示例如下：

```
//数据改变监听
dataTable1.on('valueChange',function(event){
	var field = event.field,
		rowId = event.rowId,
		oldValue = event.oldValue,
		newValue = event.newValue;
});
```

更多设置参见 [u.DataTable](http://design.yyuap.com/dist/pages/kero/udatatable.html)
---

## Example


##示例：input输入框

输入长度6-12字符之间


<div class="example-content"><!-- HTML -->
<input u-meta='{"data":"dt1","field":"f1"}' /></div>
<div class="example-content ex-hide"><script>// JS
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
            f1:{
                type:'string',
                minLength:6,
                maxLength:12
            }
        }
    })
};

app = u.createApp({
    el:'body',
    model:viewModel
});

var r = viewModel.dt1.createEmptyRow();
r.setValue('f1','test txt');

</script></div>
<div class="examples-code"><pre><code>&lt;!-- HTML -->
&lt;input u-meta='{"data":"dt1","field":"f1"}' /></code></pre>
</div>
<div class="examples-code"><pre><code>// JS
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
            f1:{
                type:'string',
                minLength:6,
                maxLength:12
            }
        }
    })
};

app = u.createApp({
    el:'body',
    model:viewModel
});

var r = viewModel.dt1.createEmptyRow();
r.setValue('f1','test txt');
</code></pre>
</div>

##示例：时间、日期指定格式

输入指定格式


<div class="example-content"><!-- HTML -->
<div class='u-datepicker' u-meta='{"data":"dt2","field":"f2"}'>
    <input class="u-input" type="text">
</div>

<br>

<div class='u-datepicker' u-meta='{"data":"dt2","field":"f3",}'>
    <input class="u-input" type="text">
    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
	</span>
</div></div>
<div class="example-content ex-hide"><script>// JS
var app, viewModel;
viewModel = {
    dt2: new u.DataTable({
        meta: {
            f2: {
                type:'date',
                format:'YYYY-MM-DD'
            },
            f3: {
                type:'date',
                format:'YYYY/MM/DD'
            }
        }
    })
}

app = u.createApp({
    el: 'body',
    model: viewModel
});

var r = viewModel.dt2.createEmptyRow();
r.setValue('f2', "2016-6-30 12:13:22");
r.setValue('f3', "2016-2-13 4:58:58");

</script></div>
<div class="examples-code"><pre><code>&lt;!-- HTML -->
&lt;div class='u-datepicker' u-meta='{"data":"dt2","field":"f2"}'>
    &lt;input class="u-input" type="text">
&lt;/div>

&lt;br>

&lt;div class='u-datepicker' u-meta='{"data":"dt2","field":"f3",}'>
    &lt;input class="u-input" type="text">
    &lt;span class="input-group-addon">&lt;span class="glyphicon glyphicon-calendar">&lt;/span>
	&lt;/span>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>// JS
var app, viewModel;
viewModel = {
    dt2: new u.DataTable({
        meta: {
            f2: {
                type:'date',
                format:'YYYY-MM-DD'
            },
            f3: {
                type:'date',
                format:'YYYY/MM/DD'
            }
        }
    })
}

app = u.createApp({
    el: 'body',
    model: viewModel
});

var r = viewModel.dt2.createEmptyRow();
r.setValue('f2', "2016-6-30 12:13:22");
r.setValue('f3', "2016-2-13 4:58:58");
</code></pre>
</div>

##示例：input输入框

input输入值变化后，弹框提示


<div class="example-content"><!-- HTML -->
<input u-meta='{"data":"dt3","field":"f1"}' /></div>
<div class="example-content ex-hide"><script>// JS
var app,viewModel;
viewModel = {
    dt3: new u.DataTable({
        meta:{
            f1:{
                type:'string'
            }
        }
    })
};

app = u.createApp({
    el:'body',
    model:viewModel
});

var r = viewModel.dt3.createEmptyRow();
r.setValue('f1','test');

// 绑定时间触发
viewModel.dt3.on('valueChange', function(){
    var oldValue = event.oldValue;
    var newValue = event.newValue;
    alert('dataTable原始值为:' + oldValue +'\n' + 'dataTable现在值为:' + newValue);
});

</script></div>
<div class="examples-code"><pre><code>// JS
var app,viewModel;
viewModel = {
    dt3: new u.DataTable({
        meta:{
            f1:{
                type:'string'
            }
        }
    })
};

app = u.createApp({
    el:'body',
    model:viewModel
});

var r = viewModel.dt3.createEmptyRow();
r.setValue('f1','test');

// 绑定时间触发
viewModel.dt3.on('valueChange', function(){
    var oldValue = event.oldValue;
    var newValue = event.newValue;
    alert('dataTable原始值为:' + oldValue +'\n' + 'dataTable现在值为:' + newValue);
});
</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;!-- HTML -->
&lt;input u-meta='{"data":"dt3","field":"f1"}' /></code></pre>
</div>




