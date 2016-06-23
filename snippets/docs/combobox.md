# combobox

	
	<div class="u-combo u-text" u-meta='{"id":"c1","data":"dt1","field":"f1","type":"u-combobox","datasource":"comboData"}'>
    	<input class="u-input"/>
	</div>

## # id
元素对应的id

## # data
元素对应的dateTable

## # field
元素对应的dateTable中的字段

## # type
元素对应的类型，此处u-combobox表示元素为下拉框

## # datasource
下拉选项对应的数据源，建议定义在viewModel中，也可定义在全局。示例如下

	comboData:[{name:'cc',value:'03'},{name:'dd',value:'04'}]
未定义datasource的情况，可参照示例在元素中添加options元素来定义下拉项。

