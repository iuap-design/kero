$(document).ready(function () {
    
	// 创建viewModel,包含主子表对应dataTable以及grid中使用的function变量
	viewModel = {
		// 主表对应的dataTable
        mainDataTable: new u.DataTable({
            meta: {
                "name": "",
                "tel": "",
                "email": "",
				"depart": "",
				"company": "",
            }
        }),
		// 子表对应的dataTable
		childDataTable: new u.DataTable({
            meta: {
                "name": "",
                "date": "",
                "type": "",
				"detail": "",
				"count": "",
            }
        }),
		//主表对应的表格控件选中行时执行的function
        mainGridRowSelect: function(obj){
			var filterName = obj.rowObj.value.name;
			var newData = filterData(childData,filterName);
			viewModel.childDataTable.removeAllRows();
			viewModel.childDataTable.setSimpleData(newData);
        }
    }

	// 创建主子表数据信息
	var mainData = [{
            email: "li@126.com",
            depart: "UAPweb",
            company: "UAP",
            name: '张三',
            tel: '13610068888'
        }, {
            email: "li@126.com",
            depart: "UAPweb",
            company: "UAP",
            name: '李四',
            tel: '13610068888'
        }, {
            email: "li@126.com",
            depart: "UAPweb",
            company: "UAP",
            name: '王五',
            tel: '13610068888'
        }, {
            email: "li@126.com",
            depart: "UAPweb",
            company: "UAP",
            name: '郭六',
            tel: '13610068888'
        }, {
            email: "li@126.com",
            depart: "UAPweb",
            company: "UAP",
            name: '田七',
            tel: '13610068888'
        }];
	var childData = [{
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '李四',
            count: '60'
        }, {
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '李四',
            count: '60'
        }, {
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '李四',
            count: '60'
        }, {
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '张三',
            count: '60'
        }, {
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '张三',
            count: '60'
        }, {
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '王五',
            count: '60'
        }, {
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '郭六',
            count: '60'
        }, {
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '郭六',
            count: '60'
        }, {
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '田七',
            count: '60'
        }, {
            date: "2015-05-15 00:00:00",
            type: "加班打车费用",
            detail: "加班",
            name: '田七',
            count: '60'
        }];
	/**
	 * 子表数据校验：
	 *  data: 子表数据集合
	 *  filtername: 过滤操作匹配值
	 */
	filterData = function(data,filtername){
        var temp = []
        for(var i in data){
            if(data[i].name === filtername){
                temp.push(data[i]);
            }
        }
        return temp;
    }
	// 创建app
	var app = u.createApp({
		el: 'body',
		model: viewModel
	});
	// 为主表添加数据
	viewModel.mainDataTable.setSimpleData(mainData);
});