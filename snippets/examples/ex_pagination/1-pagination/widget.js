// JS

/**
 * viewModel 创建数据模型
 * listData 创建的数据集
 * enterprise、depart、name、sex 创建数据集中的字段
 * type:指定数据对应的类型
 */
var app;
var viewModel = {
    listData: new u.DataTable({
        meta: {
            enterprise: {type: 'string'},
            depart: {type: 'string'},
            name: {type: 'string'},
            sex: {type: 'string'}
        }
    })
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

//dataTable设置值
viewModel.listData.setSimpleData([
    {"enterprise": "用友","depart": "UE","name": "张紫琼","sex": "male"},
    {"enterprise": "阿里巴巴","depart": "测试","name": "张丽丹","sex": "female"}
]);



