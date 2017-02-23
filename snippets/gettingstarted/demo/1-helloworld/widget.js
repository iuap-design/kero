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
demoDiv.innerHTML = dtVal;