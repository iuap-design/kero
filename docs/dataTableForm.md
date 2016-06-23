# 使用dataTable进行表单开发

**html：**


	<form action="#">
		<div class="u-text" u-meta='{"id":"id1","data":"dataTable1","field":"field1","type":"string"}'>
			<input class="u-input" type="text" id='id1'>
            <label class="u-label">字符</label>
		</div>
		<div class="u-text" u-meta='{"id":"id2","data":"dataTable1","field":"field2","type":"float"}'>
			<input class="u-input" type="text" id='id2'>
            <label class="u-label">数字</label>
		</div>
	</form>
u-meta属性说明：

|id| |表单项对应的id|

|data| |表单项对应的dataTable|

|field| |表单项对应的field|

|type| |表单项对应的类型，目前支持的类型包括：string、float、percent、textarea、u-text、u-checkbox、u-combobox、u-date、u-radio|

**js：**


	//定义数据模型
	var dataTable1 = new u.DataTable({
	    meta: {
	        field1: {type:'string'},
	        field2: {type:'number'}
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
	       }
	    }
	});

	//添加表单数据用于显示
	dataTable1.setSimpleData(datas);
	
	//选中添加的数据进行显示
	dataTable1.setRowSelect(0);
