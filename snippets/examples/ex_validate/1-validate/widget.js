// JS

var app,viewModel;

/**
 * viewModel 创建数据模型
 * dt1 创建的数据集
 * f1 创建数据集中的字段
 * type:指定数据对应的类型
 * otherSupportCode、otherSupportMoney、isValid、isDefault自定义验证条件
 * required:必填项
 * nullMsg:错误提示
 * default:默认显示值，可以定义字符串或函数返回值
 */
var metaDt={
    meta: {
        id: {
            type: 'string'
        },
        otherSupportCode: {
            type: 'string',
            required: true,
            nullMsg: '编码不能为空！'
        },
        otherSupportMoney: {
            type: 'float',
            required: true,
            nullMsg: '金额不能为空！'
        },
        isValid: {
            type: 'string',
            'default':'Y'
        },
        isDefault: {
            type: 'string',
            'default':function(){
                return 'abc';
            }
        }
    }
};
viewModel={
    dt1: new u.DataTable(metaDt)
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

// 创建空行
var r = viewModel.dt1.createEmptyRow();
viewModel.dt1.setRowSelect(0);





