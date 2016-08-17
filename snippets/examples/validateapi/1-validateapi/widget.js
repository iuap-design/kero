// JS

    var app,viewModel;
    var metaDt={
        meta: {
            base: {
                required:'true',
                nullMsg:'nullmsg',
                errorMsg:'error',
                validType:'integer',
                hasSuccess:'true',
                placement:'bottom',
                min:100,
                max:999
            }
        }
    };
    viewModel={
        dt1: new u.DataTable(metaDt)
    };

    app=u.createApp({
            el:'body',
            model:viewModel
        });
    var r = viewModel.dt1.createEmptyRow();
    viewModel.dt1.setRowSelect(0);



