// JS
var app,viewModel;
/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 */
viewModel = {
    dt1: new u.DataTable({
        meta:{
            f1:{
            	type:'string'
            }
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

// 数据集dt1创建空行，并为字符f1赋值'Hello World'
var r = viewModel.dt1.createEmptyRow();
r.setValue('f1','Hello World');


/**
 * 数据集发生改变时，将#demo_input数据显示在#demo_div中
 * @return {[type]} [description]
 */
var demoInput = document.getElementById('demo_input');
var demoDiv = document.getElementById('demo_div');

var getDtValue = function() {
	var dtVal = viewModel.dt1.getValue('f1');
	demoDiv.innerHTML = dtVal;
};
demoInput.addEventListener('blur',getDtValue);
getDtValue();