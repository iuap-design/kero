u.compMgr.apply({
    el:'body'
})

var msgBtn = document.body.querySelector("#msgDialogBtn");
u.on(msgBtn, 'click', function() {
    //            u.showMessage("HELLO!!!");
    u.messageDialog({ msg: "HELLO!!!", title: "测试提示", btnText: "OK!" });
})
