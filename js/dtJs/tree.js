u.TreeAdapter = u.BaseAdapter.extend({
	
	initialize: function(options) {
		var opt = options['options'] || {},
				viewModel = options['model'];
		var element = typeof options['el'] === 'string' ? document.querySelector(options['el']) : options['el'];
		var app = options['app'];
		this.id = opt['id'];
		options = opt;
		
		var oThis = this;
		this.dataTable = u.getJSObject(viewModel, options["data"]);
		this.element = element;
		this.$element = $(element);
		this.id = options['id'];
		this.element.id = this.id;
		this.options = options;
		this.events = $.extend(true, {}, options.events);
		var treeSettingDefault = {
			//			async: {  //缓加载
			//				enable: oThis.options.asyncFlag,
			//				url: oThis.options.asyncFun
			//			},
			data: {
				simpleData: {
					enable: true
				}
			},
			check: {
				chkboxType: {
					"Y": "",
					"N": ""
				}
			},
			callback: {
				//点击前
				beforeClick: function(e, id, node) {
					if (oThis.events.beforeClick) {
						u.getFunction(viewModel, oThis.events.beforeClick)(e, id, node);
					}
				},
				// 选中/取消选中事件
				onCheck: function(e, id, node) {

					var nodes= oThis.tree.getChangeCheckedNodes();
					for(var i=0 ;i<nodes.length;i++){
						// 获取到节点的idValue
						var idValue=nodes[i].id;
						// 根据idValue查找到对应数据的rowId
						var rowId = oThis.getRowIdByIdValue(idValue);
						var index = oThis.dataTable.getIndexByRowId(rowId);
						if (nodes[i].checked) {
							// 选中数据行
							nodes[i].checkedOld = true;
							if (oThis.tree.setting.view.selectedMulti == true) {
								oThis.dataTable.addRowsSelect([index]);
							} else {
								oThis.dataTable.setRowSelect(index);
							}
						} else {
							nodes[i].checkedOld = false;
							oThis.dataTable.setRowUnSelect(index);
						}
					}
				},
				// 单选时点击触发选中
				onClick: function(e, id, node) {
					//点击时取消所有超链接效果
					$('#'+id+' li').removeClass('focusNode');
					$('#'+id+' a').removeClass('focusNode');
					//添加focusNode样式
					$('#'+node.tId).addClass('focusNode');
					$('#'+node.tId+'_a').addClass('focusNode');
					if (oThis.tree.setting.view.selectedMulti != true) {
						// 获取到节点的idValue
						var idValue = node.id;
						// 根据idValue查找到对应数据的rowId
						var rowId = oThis.getRowIdByIdValue(idValue);
						var index = oThis.dataTable.getIndexByRowId(rowId);
						oThis.dataTable.setRowSelect(index);
						if (oThis.events.onClick) {
							u.getFunction(viewModel, oThis.events.onClick)(e, id, node);
						}
					}

				}
			}

		};

		var setting = {};
		if (this.options.setting) {
			//if (typeof(JSON) == "undefined")
			//	setting = eval("(" + this.options.setting + ")");
			//else
				setting = u.getJSObject(viewModel, this.options.setting) || u.getJSObject(window, this.options.setting);
		}

		// 遍历callback先执行默认之后再执行用户自定义的。
		var callbackObj = treeSettingDefault.callback;
		var userCallbackObj = setting.callback;
		for(var f in callbackObj){
			var fun = callbackObj[f],
				userFun = userCallbackObj && userCallbackObj[f];
			if(userFun){
				var newF = function(){
					fun.apply(this,arguments);
					userFun.apply(this,arguments);
				}
				userCallbackObj[f] = newF;
			}
		}


		var treeSetting = $.extend(true,{}, treeSettingDefault, setting);

		var treeData = [];
		// 根据idField、pidField、nameField构建ztree所需data
		var data = this.dataTable.rows();
		if (data.length > 0) {
			if (this.options.codeTree) {
				// 首先按照string进行排序
				data.sort(function(a, b) {
					var aObj = a.data;
					var bObj = b.data;
					var v1 = aObj[oThis.options.idField].value + '';
					var v2 = bObj[oThis.options.idField].value + '';
					try {
						return v1.localeCompare(v2);
					} catch (e) {
						return 0;
					}
				});
				var idArr = new Array();
				$.each(data, function() {
					var dataObj = this.data;
					var idValue = dataObj[oThis.options.idField].value;
					idArr.push(idValue);
				});
				var preValue = '';
				$.each(data, function() {
					var value = {};
					var dataObj = this.data;
					var idValue = dataObj[oThis.options.idField].value;
					var nameValue = dataObj[oThis.options.nameField].value;
					var pidValue = '';
					var startFlag = -1;
					// 如果当前值包含上一个值则上一个值为pid
					if (preValue != '') {
						var startFlag = idValue.indexOf(preValue);
					}
					if (startFlag == 0) {
						pidValue = preValue;
					} else {
						for (var i = 1; i < preValue.length; i++) {
							var s = preValue.substr(0, i);
							var f = idValue.indexOf(s);
							if (f == 0) {
								var index = $.inArray(s, idArr);
								if (index > 0 || index == 0) {
									pidValue = s;
								}
							} else {
								break;
							}
						}

					}
					value['id'] = idValue;
					value['pId'] = pidValue;
					value['name'] = nameValue;

					treeData.push(value);
					preValue = idValue;
				});
			} else {
				var values = new Array();
				$.each(data, function() {
					var value = {};
					var dataObj = this.data;
					var idValue = dataObj[oThis.options.idField].value;
					var pidValue = dataObj[oThis.options.pidField].value;
					var nameValue = dataObj[oThis.options.nameField].value;

					value['id'] = idValue;
					value['pId'] = pidValue;
					value['name'] = nameValue;
					treeData.push(value);
				});
			}
		}

		this.tree = $.fn.zTree.init(this.$element, treeSetting, treeData);


		// dataTable事件
		this.dataTable.on(u.DataTable.ON_ROW_SELECT, function(event) {
			/*index转化为grid的index*/
			$.each(event.rowIds, function() {
				var row = oThis.dataTable.getRowByRowId(this);
				var dataObj = row.data;
				var idValue = dataObj[oThis.options.idField].value;
				var node = oThis.tree.getNodeByParam('id', idValue);
				if (oThis.tree.setting.view.selectedMulti == true  && !node.checked) {
					oThis.tree.checkNode(node,true,false,true);
				} else {
					oThis.tree.selectNode(node, false);
				}
			});
		});

		this.dataTable.on(u.DataTable.ON_ROW_UNSELECT, function(event) {
			/*index转化为grid的index*/
			$.each(event.rowIds, function() {
				var row = oThis.dataTable.getRowByRowId(this);
				var dataObj = row.data;
				var idValue = dataObj[oThis.options.idField].value;
				var node = oThis.tree.getNodeByParam('id', idValue);
				if (oThis.tree.setting.view.selectedMulti == true && node.checked) {
					oThis.tree.checkNode(node,false,true,true);
				} else {
					oThis.tree.cancelSelectedNode(node)
				}
			});
		});

		this.dataTable.on(u.DataTable.ON_INSERT, function(event) {
			//var gridRows = new Array();
			var dataArray=[],nodes=[];
			var hasChild=false;//是否含有子节点
			$.each(event.rows, function() {
				var value = {},hasPar=false;
				var dataObj = this.data;
				var idValue = dataObj[oThis.options.idField].value;
				var pidValue = dataObj[oThis.options.pidField].value;
				var nameValue = dataObj[oThis.options.nameField].value;
				value['id'] = idValue;
				value['pId'] = pidValue;
				value['name'] = nameValue;
				var childNode=oThis.tree.getNodeByParam('pid', idValue);
				var pNode = oThis.tree.getNodeByParam('id', pidValue);
				if(childNode&&childNode.length>0){
					hasChild=true;
				}
				if(pNode&&pNode.length>0){
					hasPar=true;
					//oThis.tree.addNodes(pNode, value, true);
				}
				if(!hasChild&&hasPar){//不存在子节点,存在父节点之间插入
					oThis.tree.addNodes(pNode, value, true);
				}else{
					dataArray.push(value);
				}
				
			})
			if(!hasChild){//如果没有子节点，将当前节点作为根节点之间插入
				nodes=oThis.tree.transformTozTreeNodes(dataArray);
				oThis.tree.addNodes(null, nodes, true);
			}else{//如果含有子节点,重新渲染
				
			}
		});


		this.dataTable.on(u.DataTable.ON_DELETE, function(event) {
			/*index转化为grid的index*/
			var gridIndexs = new Array();
			if (this.deleteRows.length > 0) {

				for (var i = 0; i < this.deleteRows.length; i++) {
					var row = this.deleteRows[i];
					var dataObj = row.data;
					var idValue = dataObj[oThis.options.idField].value;
					var node = oThis.tree.getNodeByParam('id', idValue);
					oThis.tree.removeNode(node)
				}

			}
		});

		this.dataTable.on(u.DataTable.ON_DELETE_ALL, function(event) {
			var nodes = oThis.tree.getNodes();
			for (var i = 0, l = nodes.length; i < l; i++) {
				var node = oThis.tree.getNodeByParam('id', nodes[i].id);
				oThis.tree.removeNode(node);
				i--;
				l = nodes.length;
			}
		});

		// 加载数据,只考虑viewModel传入grid
		this.dataTable.on(u.DataTable.ON_LOAD, function(data) {
			var data = oThis.dataTable.rows();
			if (data.length > 0) {
				var values = new Array();
				$.each(data, function() {
					var value = {};
					var dataObj = this.data;
					var idValue = dataObj[oThis.options.idField].value;
					var pidValue = dataObj[oThis.options.pidField].value;
					var nameValue = dataObj[oThis.options.nameField].value;

					value['id'] = idValue;
					value['pId'] = pidValue;
					value['name'] = nameValue;
					treeData.push(value);
				});
			}

			this.tree = $.fn.zTree.init(this.$element, treeSetting, treeData);
		});

		this.dataTable.on(u.DataTable.ON_VALUE_CHANGE, function(event) {
			var row = oThis.dataTable.getRowByRowId(event.rowId);
			if (!row) return
			var treeArray=oThis.tree.getNodes();
			var id = row.getValue(oThis.options.idField)
			var node = oThis.tree.getNodeByParam('id', id);
			if(!node&&treeArray){//如果node为null则取树数组的最后一个节点

				node=treeArray[treeArray.length-1];
			}
			var field = event.field;
			var value = event.newValue;
			if(oThis.options.idField==field&&node){
				node.id=value;
				oThis.tree.updateNode(node);
			}
			if (oThis.options.nameField == field&&node){
				node.name = value
				oThis.tree.updateNode(node)
			}
			else if (oThis.options.pidField == field){
				var targetNode = oThis.tree.getNodeByParam('id', value);
				oThis.tree.moveNode(targetNode, node,"inner")				
			}
		});	

		// 通过树id获取dataTable的rowId
		this.getRowIdByIdValue = function(idValue) {
			var oThis = this;
			var rowId = null;
			$.each(this.dataTable.rows(), function() {
				var dataObj = this.data;
				var id = this.rowId;
				if (dataObj[oThis.options.idField].value == idValue) {
					rowId = id;
				}
			})
			return rowId;
		}

		return this;
	},

	getName : function() {
		return 'tree'
	}


});

u.compMgr.addDataAdapter(
    {
        adapter: u.TreeAdapter,
        name: 'tree'
        //dataType: 'float'
    })