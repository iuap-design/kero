var app,viewModel;
viewModel = {
    dt1: new u.DataTable({
        meta:{
            // 数据类型
            f1:{
                type:'string',
                maxLength:8
            }
        }
    })
};

app = u.createApp({
    el:'body',
    model:viewModel
});

var r = viewModel.dt1.createEmptyRow();
r.setValue('f1','Hello World');
