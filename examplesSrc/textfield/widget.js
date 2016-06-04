var mustinDom=document.querySelectorAll('.must-in input');
var mustinlen=mustinDom.length;
var checkInput=function(){
    //console.log(this+'---'+this.previousSibling+'----'+this.previousSibling.innerHTML);
    if(this.value.length>0){
        this.previousElementSibling.innerHTML='';
    }else{
        this.previousElementSibling.innerHTML='*';
    }
}
if(mustinlen>0){
    for(var i=0;i<mustinlen;i++){
        
        u.on(mustinDom[i],'blur',checkInput);

        u.on(mustinDom[i],'keydown',function(){
        	this.previousElementSibling.innerHTML='';
        });
    }
}
