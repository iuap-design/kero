$(document).ready(function () {
    var viewModel = {
        dataTable: new u.DataTable({
            meta: {
                'id': {
                    'value':""
                },
                'pid': {
                    'value':""
                },
                'title':{
                    'value':""
                }
            }
        }),
        treeSetting:{
            view:{
                showLine:false,
                multiSelect:true
            }
        }
    };

    app = u.createApp({
        el: 'body',
        model: viewModel
    });

    var data = [{
                "id": "01",
                "pid": "root",
                "title": "f1"
            },{
                "id": "02",
                "pid": "root",
                "title": "f2"
            },{
                "id": "101",
                "pid": "01",
                "title": "f11"
            },{
                "id": "102",
                "pid": "01",
                "title": "f12"
            },{
                "id": "201",
                "pid": "02",
                "title": "f21"
            }]
    viewModel.dataTable.removeAllRows();
    viewModel.dataTable.setSimpleData(data);
});