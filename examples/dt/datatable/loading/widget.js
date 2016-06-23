//圆点加载条
var parLoad=document.getElementById('parentLoad');
var addBtn=document.getElementById('add');
var hideBtn=document.getElementById('hide');
var options={
	hasback:false,//不含有遮罩层
	parEle:parLoad//加载条的父元素
}
u.showLoader(options);
// 显示
u.on(addBtn,'click',function(){
	var centerContent='<i class="fa fa-cloud u-loader-centerContent"></i>';
	var opt1={
		hasback:true,
		hasDesc:true,//是否含有加载内容描述
		centerContent:centerContent
	};
	u.showLoader(opt1);
});
// 隐藏
u.on(hideBtn,'click',function(){
	u.hideLoader();
});
