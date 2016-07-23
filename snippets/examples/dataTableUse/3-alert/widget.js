// JS
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
