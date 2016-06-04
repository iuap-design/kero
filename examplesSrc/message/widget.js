var msgBtn = document.body.querySelector("#msgBtn");
var errorBtn = document.body.querySelector("#errorBtn");
var warnBtn = document.body.querySelector("#warnBtn");
var rightInfo='<i class="fa fa-check-circle margin-r-5"></i>成功信息!!!';
u.on(msgBtn,'click', function(){ 
    u.showMessage({msg:rightInfo,position:"center"})
})

var errorInfo='<i class="fa fa-times-circle margin-r-5"></i>错误信息!!!'
u.on(errorBtn,'click', function(){ 
    u.showMessage({msg:errorInfo,position:"center",msgType:"error"})
})

var warningInfo='<i class="fa fa-exclamation-circle margin-r-5"></i>警告信息!!!';
u.on(warnBtn,'click', function(){ 
    u.showMessage({msg:warningInfo,position:"center",msgType:"warning"})
})