# 表格控件校验说明

使用表格控件进行编辑的过程中，需要对输入内容进行一定的校验。本文档针对表格控件如何与框架中的校验规则进行关联进行说明。

# 加入校验规则

本文档中的说明以基础说明为基础，只增加校验相关说明。

	<div id="gridTest1" u-meta='{"id":"grid1","data":"dataTable","type":"grid","multiSelect":true,"editable":true,"onBeforeClickFun":"onBeforeClickFun1"}'>
		<div options='{"field":"name","dataType":"String","title":"名","editType":"string","sortable":true,"canSwap":true,"editOptions":{"validType":"string","maxLength":6}}'></div>
	    <div options='{"field":"surname","dataType":"String","title":"姓氏","editType":"string" ,"renderType":"timeRender","sortable":true,"editOptions":{"validType":"string","required":true}}'></div>
		<div options='{"field":"currency","dataType":"String","title":"余额","editType":"float","editOptions":{"validType":"float","precision":"3","max":10000},"sumCol":true}'></div>
	</div>

在column的editOptions属性中进行校验规则的设置。validType为框架内置的校验规则，同时可以设置其他校验属性。详细的校验规则参照文档：后续补充。


# 整体校验

表格整体输入完成之后，如果需要对表格中的所有信息进行一次性校验可以通过以下方式实现。

	app.compsValidateMultiParam({element:$('body')[0]})

返回值为object，其中属性passed表示校验结果是否通过，true表示全部校验通过，false表示校验不通过。属性notPassedArr表示校验不通过的组件数组，其中Msg为校验失败原因，comp为校验失败的组件。
	
