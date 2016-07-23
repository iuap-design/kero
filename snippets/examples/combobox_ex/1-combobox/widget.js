// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 * comboData:指定默认的下拉数据集
 */
var app, viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta: {
            f1: {},
            f2: {}
        }
    }),
    comboData:[{name:'cc',value:'03'},{name:'dd',value:'04'}]
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


/**
 * 修改viewModel默认绑定的数据值
 * @type {Array}
 */
var combo1Data = [{name:'cc1',value:'03'},{name:'dd1',value:'04'}];
var combo1Obj = document.getElementById('combo1')['u.Combo'];

combo1Obj.setComboData(combo1Data);

// 创建空行，设置默认值
var r = viewModel.dt1.createEmptyRow();
r.setValue('f1', "test1");
viewModel.dt1.setRowSelect(0);

