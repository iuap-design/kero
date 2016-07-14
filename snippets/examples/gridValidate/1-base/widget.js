$(document).ready(function () {
    viewModel = {
        dataTable: new u.DataTable({
            meta: {
                "name": "",
                "surname":"",
                "currency": ""
            }
        }, this),

        onBeforeClickFun1:function(obj){
            obj.gridObj.setGridEditType('default');
            return true;
        },
    }

    app = u.createApp({
        el: 'body',
        model: viewModel
    });

    var data = [{
                "name": "Teagan",
                "surname": "Prohaska",
                "currency": "200"
            }, {
                "name": "Andy",
                "surname": "Gaylord",
                "currency": "300"
            }]
    viewModel.dataTable.removeAllRows();
    viewModel.dataTable.setSimpleData(data);
});