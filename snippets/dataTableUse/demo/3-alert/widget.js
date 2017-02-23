// JS
var app,viewModel3;
viewModel3 = {
    dt3: new u.DataTable({
        meta:{
            f1:{
                type:'string'
            }
        }
    })
};

app = u.createApp({
    el:'#demo3',
    model:viewModel3
});

var r = viewModel3.dt3.createEmptyRow();
r.setValue('f1','test');

// 绑定时间触发
viewModel3.dt3.on('valueChange', function(event){
    var oldValue = event.oldValue;
    var newValue = event.newValue;
    alert('dataTable原始值为:' + oldValue +'\n' + 'dataTable现在值为:' + newValue);
});
