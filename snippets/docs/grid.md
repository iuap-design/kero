# 表格控件

表格控件将数据以表格的方式进行展示，同时提供了排序、交换列、数字列、复选、合计、自定义渲染、修改等复杂功能，满足了复杂场景下数据展示的需求。


# 依赖资源

http://design.yyuap.com/static/uui/latest/css/font-awesome.css

http://design.yyuap.com/static/uui/latest/css/u.css

http://design.yyuap.com/static/uui/latest/css/grid.css

http://design.yyuap.com/static/jquery/jquery-1.9.1.min.js

http://design.yyuap.com/static/uui/latest/js/u-polyfill.js

http://design.yyuap.com/static/uui/latest/js/u.js

http://design.yyuap.com/static/uui/latest/js/u-grid.js

# 如何使用

1、创建div

    <div id="gridTest1" u-meta='{"id":"grid1","data":"dataTable","type":"grid","multiSelect":true,"editable":true,"onBeforeClickFun":"onBeforeClickFun1"}'>
		<div options='{"field":"name","dataType":"String","title":"名","editType":"string","sortable":true,"canSwap":true}'></div>
	    <div options='{"field":"surname","dataType":"String","title":"姓氏","editType":"string" ,"renderType":"timeRender","sortable":true}'></div>
		<div options='{"field":"currency","dataType":"String","title":"余额","editType":"float","editOptions":{"validType":"float","precision":"3","max":10000},"sumCol":true}'></div>
	</div>

示例中#gridTest1为表格控件的顶层div，u-meta中为表格控件的属性设置，其中data为dataTable的变量名，type固定为grid。子项div对应的每个column的属性设置，如果要设置编辑控件的属性，需要将属性设置到editOptions中。

框架默认支持的editType如下：

- string
- integer
- checkbox
- combo
- radio
- float
- currency
- datetime
- date
- time
- url
- password
- percent

框架默认支持的renderType如下：

- booleanRender
- integerRender
- currencyRender
- floatRender
- comboRender
- dateRender
- dateTimeRender
- radioRender
- urlRender
- passwordRender
- percentRender

表格的详细API：http://design.yyuap.com/dist/pages/plugins/grid.html

2、创建viewModel
	
	$(document).ready(function () {
		viewModel = {
			dataTable: new u.dataTable({
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
	});

过程1中使用的dataTable以及grid中的function类型的变量都需要定义到viewModel中。
    
3、创建app

	var app = u.createApp({
        el: 'body',
        model: viewModel
    });

创建app的时候会根据传入的el对应的选择器查找dom元素，并将dom元素下的所有代码u-meta的元素解析为控件，model属性为对应之前定义的viewModel。

4、dataTable中添加数据

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

通过dataTable的setSimpleData方法将数据插入dataTable中。框架会自动将数据传入表格控件并显示。

# 示例

replaceExamp
