define(['text!./widget.html'], function (template) {
  var init = function(refer){
		var viewModel = {
			sid : refer.params.sid,
			his :new u.DataTable({
				meta:{
					zdmc:{},
					jz:{},
					xz:{},
					xgsj:{}
				}
			})
		}	

		//加载grid数据
		refer.registerSubmitFunc(function(){
			return viewModel.his.getCurrentRow()
		})
		
		var app = u.createApp({
		    el: document.querySelector('#ref_his'),
		    model: viewModel
		})

		var data = {
			"rows": [
				{
					"status": "nrm",
					"data": {
						"zdmc": "本期支付额1",
						"jz": "12345",
						"xz":"54321",
						"xgsj": "2015-01-01"
					}
				},
				{
					"status": "nrm",
					"data": {
						"zdmc": "本期支付额2",
						"jz": "1111",
						"xz":"2222",
						"xgsj": "2015-01-01"
					}
				},		
				{
					"status": "nrm",
					"data": {
						"zdmc": "本期支付额3",
						"jz": "434343",
						"xz":"45454",
						"xgsj": "2015-01-01"
					
					}
				}
			],
			"pageIndex": 1,
			"pageSize": 10
		}

		viewModel.his.setData(data);


		
		// app.serverEvent().addDataTable('his').addParameter("sid",viewModel.sid).fire({
		// 	url: $ctx+'/evt/dispatch',
		// 	ctrl: 'iweb.SettlementController',
		// 	method: 'getHisData',
		// 	success: function(data) {
		// 		debugger;
		// 		data = JSON.parse(data);
		// 		if(data.msg=='none!'){
					
		// 			$.showMessageDialog({type:"info",title:"提示信息",msg:"无历史记录！",backdrop:true});
		// 			$('.cancelBtn').click()
		// 		}else{
		// 			viewModel.his.setData(data);
		// 		}
		// 	}
		// })
	}
  
  	
    return {
        template: template,
        init: init
    }
})

