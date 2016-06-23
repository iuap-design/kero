# 使用dataTable进行表格开发

**html：**


	<div id="gridTest" u-meta='{"id":"grid1","type":"grid","data":"dataTable1","multiSelect":true,"editType":"form","showNumCol":true,"editable":true,"onRowSelected":"onRowSelected1"}'>
		<div options='{"field":"name","dataType":"String","title":"姓名","editOptions":{"id":"stringname","type":"string","maxLength":6},"editType":"string"}'></div>
		<div options='{"field":"time","dataType":"time","title":"时间","editType":"time" ,"renderType":"timeRender"}'></div>
	</div>

u-meta属性说明：

|id| |表格对应的id|

|type| |固定为grid，表示此处为表单|

|data| |表格对应的dataTable|


更多表格属性参见***

表格列options属性说明：

|filed| |表格列对应的field|

|dataType| |表格列对应的数据类型|

|title| |表格列表头显示内容|

更多表格列属性参见***

**js：**


	//定义数据模型
	var dataTable1 = new u.DataTable({
	    meta: {
	        name: {type:'string'},
	        time: {type:'time'}
	    }
	});
	
	//执行绑定
	u.createApp({
	    el: 'body',
	    model: dataTable1
	});

	//获取表单数据
	$.ajax({
	   type: 'get',
	   url: '/getdatas',
	   data:'',
	   async:false,
	   dataType:'JSON',
	   success: function(rs) {
			if(rs){
				datas=rs;
				//添加表单数据用于显示
				dataTable1.setSimpleData(datas);
	       	}
		}
	});
