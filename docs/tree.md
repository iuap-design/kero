# 树控件

树控件以ztree为核心，框架主要对关联datatable进行了处理。


# 依赖资源

http://design.yyuap.com/static/uui/latest/css/font-awesome.css

http://design.yyuap.com/static/uui/latest/css/u.css

http://design.yyuap.com/static/uui/latest/css/tree.css

http://design.yyuap.com/static/jquery/jquery-1.9.1.min.js

http://design.yyuap.com/static/uui/latest/js/u-polyfill.js

http://design.yyuap.com/static/uui/latest/js/u.js

http://design.yyuap.com/static/uui/latest/js/u-tree.js

# 如何使用

1、创建div

    <div id="treeTest" class="ztree" u-meta='{"id":"treeTest","data":"dataTable","type":"tree","idField":"id","pidField":"pid","nameField":"title","setting":"treeSetting"}'>
    </div>


示例中#treeTest为树控件的顶层div，u-meta中为树控件的属性设置，其中data为dataTable的变量名，type固定为tree，idField和pidField分别对应父子项结构中对应的field字段，nameField为显示信息对应的field，setting为viewModel中定义的ztree对应配置信息。


树的详细API：http://www.ztree.me/v3/api.php

2、创建viewModel
	
	$(document).ready(function () {
		viewModel = {
			dataTable: new u.DataTable({
	            meta: {
	                'id': {
	                    'value':""
	                },
	                'pid': {
	                    'value':""
	                },
	                'title':{
	                    'value':""
	                }
	            }
	        }),
	        treeSetting:{
	            view:{
	                showLine:false,
	                multiSelect:true
	            }
	        }
	        
		}
	});

过程1中使用的dataTable以及ztree对应配置信息都需要定义到viewModel中。
    
3、创建app

	var app = u.createApp({
        el: 'body',
        model: viewModel
    });

创建app的时候会根据传入的el对应的选择器查找dom元素，并将dom元素下的所有代码u-meta的元素解析为控件，model属性为对应之前定义的viewModel。

4、dataTable中添加数据

	var data = [{
                "id": "01",
                "pid": "root",
                "title": "f1"
            },{
                "id": "02",
                "pid": "root",
                "title": "f2"
            },{
                "id": "101",
                "pid": "01",
                "title": "f11"
            },{
                "id": "102",
                "pid": "01",
                "title": "f12"
            },{
                "id": "201",
                "pid": "02",
                "title": "f21"
            }]
    viewModel.dataTable.removeAllRows();
    viewModel.dataTable.setSimpleData(data);

通过dataTable的setSimpleData方法将数据插入dataTable中。框架会自动将数据传入树控件并显示。

# 示例



<div class="example-content"><div id="treeTest" class="ztree" u-meta='{"id":"tree2","data":"dataTable","type":"tree","idField":"id","pidField":"pid","nameField":"title","setting":"treeSetting"}'>
</div>
</div>
<div class="example-content ex-hide"><script>$(document).ready(function () {
    var viewModel = {
        dataTable: new u.DataTable({
            meta: {
                'id': {
                    'value':""
                },
                'pid': {
                    'value':""
                },
                'title':{
                    'value':""
                }
            }
        }),
        treeSetting:{
            view:{
                showLine:false,
                multiSelect:true
            }
        }
    };

    app = u.createApp({
        el: 'body',
        model: viewModel
    });

    var data = [{
                "id": "01",
                "pid": "root",
                "title": "f1"
            },{
                "id": "02",
                "pid": "root",
                "title": "f2"
            },{
                "id": "101",
                "pid": "01",
                "title": "f11"
            },{
                "id": "102",
                "pid": "01",
                "title": "f12"
            },{
                "id": "201",
                "pid": "02",
                "title": "f21"
            }]
    viewModel.dataTable.removeAllRows();
    viewModel.dataTable.setSimpleData(data);
});
</script></div>
<div class="examples-code"><pre><code>$(document).ready(function () {
    var viewModel = {
        dataTable: new u.DataTable({
            meta: {
                'id': {
                    'value':""
                },
                'pid': {
                    'value':""
                },
                'title':{
                    'value':""
                }
            }
        }),
        treeSetting:{
            view:{
                showLine:false,
                multiSelect:true
            }
        }
    };

    app = u.createApp({
        el: 'body',
        model: viewModel
    });

    var data = [{
                "id": "01",
                "pid": "root",
                "title": "f1"
            },{
                "id": "02",
                "pid": "root",
                "title": "f2"
            },{
                "id": "101",
                "pid": "01",
                "title": "f11"
            },{
                "id": "102",
                "pid": "01",
                "title": "f12"
            },{
                "id": "201",
                "pid": "02",
                "title": "f21"
            }]
    viewModel.dataTable.removeAllRows();
    viewModel.dataTable.setSimpleData(data);
});</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div id="treeTest" class="ztree" u-meta='{"id":"tree2","data":"dataTable","type":"tree","idField":"id","pidField":"pid","nameField":"title","setting":"treeSetting"}'>
&lt;/div>
</code></pre>
</div>

