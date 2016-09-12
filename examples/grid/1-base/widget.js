$(document).ready(function () {
	// 创建viewModel,包含dataTable以及grid中使用的function变量
    viewModel = {
        dataTable: new u.DataTable({
            meta: {
                "name": "",
                "surname":"",
                "currency": ""
            }
        }),
		// 表格点击行之前触发的事件
        onBeforeClickFun1:function(obj){
            obj.gridObj.setGridEditType('default');
            return true;
        },
    }
	// 创建APP
    app = u.createApp({
        el: 'body',
        model: viewModel
    });
	// 添加数据到dataTable中
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