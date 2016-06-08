var refer1btn = document.querySelector('#refer1 .u-form-control-feedback'),
	refer1input = document.querySelector('#refer1 .u-form-control');
u.on(refer1btn, 'click', function(his) {
	require(['./demos/ui/refer/refer/his/widget'], function(his) {
		u.refer({
			params:{'sid':'xxx'},
			title:'修改记录',
			isPOPMode: true,
			contentId: 'his_ref',
			width: '600px',
			pageUrl: './refer/his/his',
			module: his,
			onOk: function(selRow) {
				refer1input.value = selRow.getValue('zdmc');
			}
		})	
	});
	
})