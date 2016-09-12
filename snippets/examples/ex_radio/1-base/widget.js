
// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 * radiodata:自定义单选框数据，用于绑定数据
 */
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
        f1:{},
        f2:{}
        }
     }),
    radiodata:[{value:'01',name:'男'},{value:'02',name:'女'}]
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
r.setValue('f1',"01");
viewModel.dt1.setRowSelect(0);