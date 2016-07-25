// JS

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






