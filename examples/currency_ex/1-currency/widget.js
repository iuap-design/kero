// JS

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * min 指定最小输入值，本例为50
 * curSymbol 输入数据前自动添加符号类型，默认为"¥"
 */
var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta: {
            f1: {min:50},
            f2: {curSymbol:"$"}
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

// 创建空行
var r = viewModel.dt1.createEmptyRow();

