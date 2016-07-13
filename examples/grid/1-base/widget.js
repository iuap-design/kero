$(document).ready(function () {
    viewModel = {
        dataTable: new u.DataTable({
            meta: {
                "name": "",
                "time":"",
                "currency": ""
            }
        }, this),

        onBeforeClickFun1:function(obj){
            obj.gridObj.setGridEditType('default');
            return true;
        },
    }

    var app = u.createApp({
        el: 'body',
        model: viewModel
    });

    var data = [{
                "name": "赵四",
                "time": "12:22:00",
                "currency": "200"
            }, {
                "name": "王一",
                "time": "04:44:22",
                "currency": "300"
            }]
    viewModel.dataTable.removeAllRows();
    viewModel.dataTable.setSimpleData(data);
});