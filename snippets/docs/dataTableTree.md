# 使用dataTable进行树开发

**html：**


	<div id="treeTest" class="ztree" u-meta='{"id":"tree2","data":"dataTable1","type":"tree","multiSelect":"true","idField":"id","pidField":"pid","nameField":"title","setting":"treeSetting"}'></div>

u-meta属性说明：

|id| |树控件对应的id|

|type| |固定为tree，表示此处为树|

|data| |表格对应的dataTable|

|id| |构建树结构时的id对应的field|

|pid| |构建树结构时的pid对应的field|


更多树属性参见***


**js：**


	//定义数据模型
	var dataTable1 = new u.DataTable({
	    meta: {
	        idField: {type:'string'},
	        pidField: {type:'string'},
			field1: {type:'string'}
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
