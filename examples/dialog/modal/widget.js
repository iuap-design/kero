  u.compMgr.apply({
        el:'body'
    })

	var msgBtn3 = document.body.querySelector("#msgDialogBtn3");
	u.on(msgBtn3,'click', function(){
		window.md = u.dialog({id:'testDialg',content:"#dialog_content",hasCloseMenu:true});
	});
	
	var okButton = document.body.querySelector(".u-msg-ok");
	u.on(okButton,'click', function(){
		alert('ok');
	});
	
	var cancelButton = document.body.querySelector(".u-msg-cancel");
	u.on(cancelButton,'click', function(){
		md.close();
	});