// JS
var app, viewModel;
viewModel = {
    dt2: new u.DataTable({
        meta: {
            f2: {
                type:'date',
                format:'YYYY-MM-DD'
            },
            f3: {
                type:'date',
                format:'YYYY/MM/DD'
            }
        }
    })
}

app = u.createApp({
    el: 'body',
    model: viewModel
});

var r = viewModel.dt2.createEmptyRow();
r.setValue('f2', "2016-6-30 12:13:22");
r.setValue('f3', "2016-2-13 4:58:58");
