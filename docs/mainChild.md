# 主子表

# 依赖资源

http://design.yyuap.com/static/uui/latest/css/font-awesome.css

http://design.yyuap.com/static/uui/latest/css/u.css

http://design.yyuap.com/static/uui/latest/css/grid.css

http://design.yyuap.com/static/jquery/jquery-1.9.1.min.js

http://design.yyuap.com/static/uui/latest/js/u-polyfill.js

http://design.yyuap.com/static/uui/latest/js/u.js

http://design.yyuap.com/static/uui/latest/js/u-grid.js

# 如何使用

1、创建主子表DOM元素

	<div class="u-container-fluid u-widget-bg">
	    <div class="u-row">
		<div class="u-col-md-12">
		    <div class="u-widget  u-widget-right">
			<div class="u-widget-heading">
			    <div class="u-widget-title">主表</div>
			</div>
			<div class="u-widget-body" style="margin-bottom: 30px">
			    <div id="mainGridDiv" u-meta='{"id":"mainGrid","data":"mainDataTable","type":"grid","onRowSelected":"mainGridRowSelect"}'>
				<div options='{"field":"name","dataType":"String","title":"姓名"}'></div>
				<div options='{"field":"tel","dataType":"String","title":"手机"}'></div>
				<div options='{"field":"email","dataType":"String","title":"邮件"}'></div>
				<div options='{"field":"depart","dataType":"String","title":"部门"}'></div>
				<div options='{"field":"company","dataType":"String","title":"公司"}'></div>
			    </div>
			</div>
		    </div>
		</div>
		<div class="u-col-md-12">
		    <div class="u-widget  u-widget-right">
			<div class="u-widget-heading">
			    <div class="u-widget-title">子表</div>
			</div>
			<div class="u-widget-body" style="margin-bottom: 30px">
			    <div id="childGridDiv" u-meta='{"id":"childGrid","data":"childDataTable","type":"grid"}'>
				<div options='{"field":"name","dataType":"String","title":"报销人"}'></div>
				<div options='{"field":"date","dataType":"String","title":"日期"}'></div>
				<div options='{"field":"type","dataType":"String","title":"费用类型"}'></div>
				<div options='{"field":"detail","dataType":"String","title":"事由"}'></div>
				<div options='{"field":"count","dataType":"String","title":"报销金额"}'></div>
			    </div>
			</div>
		    </div>
		</div>
	    </div>
	</div>

DOM说明：#mainGridDiv 为主表对应的表格控件的顶层div，#childGridDiv为子表对应的表格控件的顶层div。
2、创建viewModel

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
 mainDataTable为主表对应的dataTable，childDataTable为子表对应的dataTable，mainGridRowSelect为主表对应的表格控件选中行时执行的function。
 3、创建子表过滤function

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
 4、创建app
 
	var app = u.createApp({
		el: 'body',
		model: viewModel
	});
	
5、创建主子表数据集合并为主表添加数据

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
    // 为主表添加数据
	viewModel.mainDataTable.setSimpleData(mainData);
# 示例



<div class="example-content"><div class="u-container-fluid u-widget-bg">
    <div class="u-row">
        <div class="u-col-md-12">
            <div class="u-widget  u-widget-right">
                <div class="u-widget-heading">
                    <div class="u-widget-title">主表</div>
                </div>
                <div class="u-widget-body" style="margin-bottom: 30px">
                    <div id="mainGridDiv" u-meta='{"id":"mainGrid","data":"mainDataTable","type":"grid","onRowSelected":"mainGridRowSelect"}'>
						<div options='{"field":"name","dataType":"String","title":"姓名"}'></div>
						<div options='{"field":"tel","dataType":"String","title":"手机"}'></div>
						<div options='{"field":"email","dataType":"String","title":"邮件"}'></div>
						<div options='{"field":"depart","dataType":"String","title":"部门"}'></div>
						<div options='{"field":"company","dataType":"String","title":"公司"}'></div>
					</div>
                </div>
            </div>
        </div>
        <div class="u-col-md-12">
            <div class="u-widget  u-widget-right">
                <div class="u-widget-heading">
                    <div class="u-widget-title">子表</div>
                </div>
                <div class="u-widget-body" style="margin-bottom: 30px">
                    <div id="childGridDiv" u-meta='{"id":"childGrid","data":"childDataTable","type":"grid"}'>
						<div options='{"field":"name","dataType":"String","title":"报销人"}'></div>
						<div options='{"field":"date","dataType":"String","title":"日期"}'></div>
						<div options='{"field":"type","dataType":"String","title":"费用类型"}'></div>
						<div options='{"field":"detail","dataType":"String","title":"事由"}'></div>
						<div options='{"field":"count","dataType":"String","title":"报销金额"}'></div>
					</div>
                </div>
            </div>
        </div>
    </div>
</div></div>
<div class="example-content ex-hide"><script>﻿$(document).ready(function () {
    
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
</script></div>
<div class="examples-code"><pre><code>&lt;div class="u-container-fluid u-widget-bg">
    &lt;div class="u-row">
        &lt;div class="u-col-md-12">
            &lt;div class="u-widget  u-widget-right">
                &lt;div class="u-widget-heading">
                    &lt;div class="u-widget-title">主表&lt;/div>
                &lt;/div>
                &lt;div class="u-widget-body" style="margin-bottom: 30px">
                    &lt;div id="mainGridDiv" u-meta='{"id":"mainGrid","data":"mainDataTable","type":"grid","onRowSelected":"mainGridRowSelect"}'>
						&lt;div options='{"field":"name","dataType":"String","title":"姓名"}'>&lt;/div>
						&lt;div options='{"field":"tel","dataType":"String","title":"手机"}'>&lt;/div>
						&lt;div options='{"field":"email","dataType":"String","title":"邮件"}'>&lt;/div>
						&lt;div options='{"field":"depart","dataType":"String","title":"部门"}'>&lt;/div>
						&lt;div options='{"field":"company","dataType":"String","title":"公司"}'>&lt;/div>
					&lt;/div>
                &lt;/div>
            &lt;/div>
        &lt;/div>
        &lt;div class="u-col-md-12">
            &lt;div class="u-widget  u-widget-right">
                &lt;div class="u-widget-heading">
                    &lt;div class="u-widget-title">子表&lt;/div>
                &lt;/div>
                &lt;div class="u-widget-body" style="margin-bottom: 30px">
                    &lt;div id="childGridDiv" u-meta='{"id":"childGrid","data":"childDataTable","type":"grid"}'>
						&lt;div options='{"field":"name","dataType":"String","title":"报销人"}'>&lt;/div>
						&lt;div options='{"field":"date","dataType":"String","title":"日期"}'>&lt;/div>
						&lt;div options='{"field":"type","dataType":"String","title":"费用类型"}'>&lt;/div>
						&lt;div options='{"field":"detail","dataType":"String","title":"事由"}'>&lt;/div>
						&lt;div options='{"field":"count","dataType":"String","title":"报销金额"}'>&lt;/div>
					&lt;/div>
                &lt;/div>
            &lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>﻿$(document).ready(function () {
    
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
});</code></pre>
</div>

