u.GridAdapter = u.BaseAdapter.extend({
	
	initialize: function(options) {
		// 初始options中包含grid的属性设置，还需要增加dataSource、columns、transMap以及事件处理

		var opt = options['options'] || {},
				viewModel = options['model'];
		var element = typeof options['el'] === 'string' ? document.querySelector(options['el']) : options['el'];
		var app = options['app'];
		this.id = opt['id'];
		options = opt;

		var oThis = this;
		var compDiv = null;
		var comp = null;
		this.dataTable = u.getJSObject(viewModel, options["data"]);
		this.element = element;
		this.$element = $(element);
		this.editComponentDiv = {};
		this.editComponent = {};
		this.id = options['id'];
		this.gridOptions = options;


		
		// 在html中将函数类参数进行处理
		this.gridOptions.onBeforeRowSelected = u.getFunction(viewModel,this.gridOptions.onBeforeRowSelected);
		this.gridOptions.onRowSelected = u.getFunction(viewModel,this.gridOptions.onRowSelected);
		this.gridOptions.onBeforeRowUnSelected = u.getFunction(viewModel,this.gridOptions.onBeforeRowUnSelected);
		this.gridOptions.onRowUnSelected = u.getFunction(viewModel,this.gridOptions.onRowUnSelected);
		this.gridOptions.onBeforeAllRowSelected = u.getFunction(viewModel,this.gridOptions.onBeforeAllRowSelected);
		this.gridOptions.onAllRowSelected = u.getFunction(viewModel,this.gridOptions.onAllRowSelected);
		this.gridOptions.onBeforeAllRowUnSelected = u.getFunction(viewModel,this.gridOptions.onBeforeAllRowUnSelected);
		this.gridOptions.onAllRowUnSelected = u.getFunction(viewModel,this.gridOptions.onAllRowUnSelected);
		this.gridOptions.onBeforeRowFocus = u.getFunction(viewModel,this.gridOptions.onBeforeRowFocus);
		this.gridOptions.onRowFocus = u.getFunction(viewModel,this.gridOptions.onRowFocus);
		this.gridOptions.onBeforeRowUnFocus = u.getFunction(viewModel,this.gridOptions.onBeforeRowUnFocus);
		this.gridOptions.onRowUnFocus = u.getFunction(viewModel,this.gridOptions.onRowUnFocus);
		this.gridOptions.onDblClickFun = u.getFunction(viewModel,this.gridOptions.onDblClickFun);
		this.gridOptions.onValueChange = u.getFunction(viewModel,this.gridOptions.onValueChange);
		this.gridOptions.onBeforeClickFun = u.getFunction(viewModel,this.gridOptions.onBeforeClickFun);
		this.gridOptions.onBeforeEditFun = u.getFunction(viewModel,this.gridOptions.onBeforeEditFun);
		this.gridOptions.onRowHover = u.getFunction(viewModel,this.gridOptions.onRowHover);
		this.gridOptions.afterCreate = u.getFunction(viewModel,this.gridOptions.afterCreate);

		/*扩展onBeforeEditFun，如果点击的是单选或者复选的话则不执行原有的编辑处理，直接通过此js进行处理*/
		var customOnBeforeEditFun = this.gridOptions.onBeforeEditFun;
		var newOnBeforeEditFun = function(obj){
			var colIndex = obj.colIndex;
			var $tr = obj.$tr;
			
			if($($tr.find('td')[colIndex]).find('[type=radio]').length > 0 || $($tr.find('td')[colIndex]).find('[type=checkbox]').length > 0){
				return false;
			}else{
				if(typeof customOnBeforeEditFun == 'function'){
					return customOnBeforeEditFun(obj);
				}else{
					return true;
				}
			}
		}
		this.gridOptions.onBeforeEditFun = newOnBeforeEditFun;
		/*
		 * 处理column参数  item
		 * div子项div存储column信息
		 */
		var columns = [];
		$("div",this.$element).each(function() {
			var ops = $(this).attr('options')
			if(typeof(ops) == "undefined")
				var column = eval("(" + ops+")");
			else
				var column = JSON.parse(ops);
			// 处理精度，以dataTable的精度为准
			
			/*处理editType*/
			var eType = u.getFunction(viewModel, column.editType);
			var rType = u.getFunction(viewModel, column.renderType);
			var afterEType = u.getFunction(viewModel, column.afterEType);
			var afterRType = u.getFunction(viewModel, column.afterRType);
			var sumRenderType = u.getFunction(viewModel, column.sumRenderType);
			column.sumRenderType = sumRenderType;
			var eOptions = {};
			if(column.editOptions){
				if(typeof(column.editOptions) == "undefined")
					var eOptions = eval("(" + column.editOptions +")");
				else
					var eOptions = column.editOptions;
			}
			eOptions.data = options['data']
			eOptions.field = column['field']
			// 默认按照string处理
			if(eType == '')
					eType = 'string';
			if(eType == 'string' || eType == 'integer' || eType == 'checkbox' || eType == 'combo' || eType == 'radio' || eType == 'float' || eType == 'currency' || eType == 'datetime'|| eType == 'date' || eType == 'time' || eType == 'url' || eType == 'password' || eType == 'percent'){
				oThis.createDefaultEdit(eType,eOptions,options,viewModel,column);
				column.editType = function(obj){
					if(oThis.editComponentDiv[column.field] && oThis.editComponentDiv[column.field][0].childNodes.length > 0){
					}else{
						//IE8有问题，所以需要重新创建div,将上面的代码直接拷贝
						oThis.createDefaultEdit(eType,eOptions,options,viewModel,column);
					}
					var comp = oThis.editComponent[column.field]
					if (!comp){
						$(obj.element).parent().focus();
						return
					}
					obj.element.innerHTML = '';
					var row = oThis.getDataTableRow(obj.rowObj)
					$(obj.element).append(oThis.editComponentDiv[column.field]);
					if(comp.required) {
						$(obj.element).parent().parent().find('.u-grid-edit-mustFlag').show()
					}

					// checkbox 类型  此段逻辑不知道是什么，暂时注释掉
					// if($Div.find('.checkbox').length > 0) {
					// 	$Div.closest('.u-grid-edit-div').css({'position': 'absolute', 'left': '83px'});
					// 	$Div.closest('.u-grid-edit-whole-div').find('.u-grid-edit-label').css({'margin-left': '112px', 'text-align': 'left'})
					// }
					$(obj.element).parent().focus();
					comp.modelValueChange(obj.value);


					// 根据惊道需求增加editype之后的处理,此处只针对grid.js中的默认eType进行处理，非默认通过eType进行处理
					if(typeof afterEType == 'function'){
						afterEType.call(this,obj);
					}
				}
			}else if (typeof eType == 'function'){
				column.editType = eType;
			}
			
			if(rType == 'booleanRender'){
				column.renderType = function(obj){
					var checkStr = '';
					if(obj.value == 'Y'){
						checkStr = 'checked';
					}
					var htmlStr = '<input type="checkbox"   style="cursor:default;" ' + checkStr +'>'
					obj.element.innerHTML = htmlStr;

					var grid = obj.gridObj
					var datatable = grid.dataTable
					var rowId = obj.row.value['$_#_@_id'];

					var row = datatable.getRowByRowId(rowId);
					$(obj.element).find('input').on('click',function(){
						var value = this.checked?"Y":"N";
						var column = obj.gridCompColumn
						var field = column.options.field	
						row.setValue(field,value);
					})

					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if(rType == 'integerRender'){
				column.renderType = function(obj){
					var grid = obj.gridObj											
					var column = obj.gridCompColumn
					var field = column.options.field
					obj.element.innerHTML =  obj.value
					/*设置header为right*/
					$('#' + grid.options.id + '_header_table').find('th[field="'+field+'"]').css('text-align', 'right');
					$(obj.element).css('text-align', 'right')	
					$(obj.element).css('color', '#e33c37')
					$(obj.element).find('.u-grid-header-link').css('padding-right','3em')
					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if(rType == 'currencyRender'){
				column.renderType = function(obj){
					//需要处理精度
					
					var grid = obj.gridObj											
					var column = obj.gridCompColumn
					var field = column.options.field
					var rowIndex = obj.rowIndex
					var datatable = grid.dataTable
					var rowId =  $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
					var row = datatable.getRowByRowId(rowId);				
					if(!row)
						return;
					var rprec = row.getMeta(field, 'precision')
					var maskerMeta = iweb.Core.getMaskerMeta('float') || {}
					var precision = typeof(parseFloat(rprec)) == 'number' ? rprec : maskerMeta.precision;
					maskerMeta.precision = precision;

					maskerMeta.precision = precision || maskerMeta.precision
					var formater = new u.NumberFormater(maskerMeta.precision);
					var masker = new u.NumberMasker(maskerMeta);
					var svalue = masker.format(formater.format(obj.value)).value
					obj.element.innerHTML =  svalue
					/*设置header为right*/
					$('#' + grid.options.id + '_header_table').find('th[field="'+field+'"]').css('text-align', 'right');
					$(obj.element).css('text-align', 'right')
					$(obj.element).css('color', '#e33c37')
					$(obj.element).find('.u-grid-header-link').css('padding-right','3em')
					$(obj.element).attr('title', svalue)

					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if(rType == 'floatRender'){
				column.renderType = function(obj){
					//需要处理精度
					
					var grid = obj.gridObj											
					var column = obj.gridCompColumn
					var field = column.options.field
					var rowIndex = obj.rowIndex
					var datatable = grid.dataTable
					var rowId =  $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
					var row = datatable.getRowByRowId(rowId);				
					if(!row)
						return;
					var rprec =  row.getMeta(field, 'precision') || column.options.precision;
					var maskerMeta = iweb.Core.getMaskerMeta('float') || {}
					var precision = typeof(parseFloat(rprec)) == 'number' ? rprec : maskerMeta.precision;
					maskerMeta.precision = precision;

					var formater = new u.NumberFormater(maskerMeta.precision);
					var masker = new u.NumberMasker(maskerMeta);
					var svalue = masker.format(formater.format(obj.value)).value
					obj.element.innerHTML =  svalue 
					/*设置header为right*/
					$('#' + grid.options.id + '_header_table').find('th[field="'+field+'"]').css('text-align', 'right');
					$(obj.element).css('text-align', 'right')
					$(obj.element).css('color', '#e33c37')
					$(obj.element).find('.u-grid-header-link').css('padding-right','3em')
					$(obj.element).attr('title', svalue)

					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if(rType == 'comboRender'){
				column.renderType = function(obj){
				  
				  //需要将key转化为name
					var ds = u.getJSObject(viewModel, eOptions['datasource'])
				
					obj.element.innerHTML = '';
					if(nameArr){
						nameArr.length = 0
					}
					
					var valArr = obj.value.split(',')
					var nameArr = []
					for( var i=0,length=ds.length; i<length; i++){
                      for(var j=0; j<valArr.length;j++){
                      	  if(ds[i].value == valArr[j]){
                      	  	  nameArr.push(ds[i].name)
                      	  }
                      }
					}	
					var svalue = nameArr.toString()
					if(!svalue)
						svalue = obj.value;
					obj.element.innerHTML = svalue;
					$(obj.element).attr('title', svalue)
				  				  
				  	// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if(rType == 'dateRender'){
				//通过grid的dataType为Date format处理
				column.renderType = function(obj){
					var svalue =  u.dateRender(obj.value, obj.gridCompColumn.options['format']);
					obj.element.innerHTML = svalue;
					$(obj.element).attr('title', svalue)
					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if(rType == 'dateTimeRender'){
				//通过grid的dataType为DateTime format处理
				column.renderType = function(obj){
					var svalue = u.dateTimeRender(obj.value)
					obj.element.innerHTML = svalue;
					$(obj.element).attr('title', svalue)

					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if (typeof rType == 'function'){
				column.renderType =  rType
			}else if(rType == 'radioRender'){
				column.renderType = function(params){
					//debugger
					var ds = u.getJSObject(viewModel, eOptions['datasource'])
					var value = params.value
					var compDiv = $('<div class="u-grid-edit-item-radio"></div>');
					
					params.element.innerHTML = ""
					$(params.element).append(compDiv)

					for(var i = 0;i < ds.length;i++){
						if(ds[i].value==value)
							compDiv.append('<input name="'+column.field+params.row.value['$_#_@_id']+'" type="radio" value="'+ds[i].value +'" checked="true" /><i data-role="name">' +ds[i].name+ '</i>')
						else
							compDiv.append('<input name="'+column.field+params.row.value['$_#_@_id']+'" type="radio" value="'+ds[i].value +'"/><i data-role="name">' +ds[i].name+ '</i>')
					}
					compDiv.find(":radio").each(function() {

						$(this).on('click', function() {

							var val = this.value
							compDiv.find(":radio").each(function() {
								if (this.value == val) {
									this.checked = true;
								}else{
									this.checked = false;
								}
							})
							var grid = params.gridObj
							var column = params.gridCompColumn
							var field = column.options.field
							var datatable = grid.dataTable
							//var rowIndex = params.rowIndex
							//var tmprowId =  $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
							var rowId = params.row.value['$_#_@_id'];

							var row = datatable.getRowByRowId(rowId);

							row.setValue(field,val)
						})
					})
//					var comp = new $.compManager.plugs.radio(compDiv[0],eOptions,viewModel);					
//					for( var i=0,length=rdo.length; i<length; i++){
//					   if(rdo[i].pk==value){
//					   	 obj.element.innerHTML = '<input type="radio" checked><i data-role="name">'+rdo[i].name+'</i>';
//					   	 break;
//					   }
//					}				
					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if(rType == 'urlRender'){
				//通过grid的dataType为DateTime format处理
				column.renderType = function(obj){
					obj.element.innerHTML = '<a href="' + obj.value + '" target="_blank">' + obj.value +'</a>';

					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if(rType == 'passwordRender'){
				//通过grid的dataType为DateTime format处理
				column.renderType = function(obj){
					obj.element.innerHTML = '<input type="password" disable="true" role="grid-for-edit" readonly="readonly" style="border:0px;background:none;padding:0px;" value="' + obj.value + '" title=""><span class="uf uf-eyeopen right-span" role="grid-for-edit"></span>';
					var span = obj.element.querySelector('span');
					var input = obj.element.querySelector('input');
					input.value = obj.value;
					$(span).on('click',function(){
						if(input.type == 'password'){
							input.type = 'text'
						}
						else{
							input.type = 'password'
						}
					})
					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}else if(rType == 'percentRender'){
				column.renderType = function(obj){
					//需要处理精度
					
					var grid = obj.gridObj											
					var column = obj.gridCompColumn
					var field = column.options.field
					var rowIndex = obj.rowIndex
					var datatable = grid.dataTable
					var rowId =  $(grid.dataSourceObj.rows[rowIndex].value).attr("$_#_@_id");
					var row = datatable.getRowByRowId(rowId);				
					if(!row)
						return;
					var rprec =  row.getMeta(field, 'precision') || column.options.precision;
					var maskerMeta = iweb.Core.getMaskerMeta('percent') || {}
					var precision = typeof(parseFloat(rprec)) == 'number' ? rprec : maskerMeta.precision;
					maskerMeta.precision = precision;
					if (maskerMeta.precision){
			            maskerMeta.precision = parseInt(maskerMeta.precision) + 2;
			        }

					var formater = new u.NumberFormater(maskerMeta.precision);
					var masker = new u.PercentMasker(maskerMeta)
					var svalue = masker.format(formater.format(obj.value)).value
					obj.element.innerHTML =  svalue
					$(obj.element).css('text-align', 'right')
					$(obj.element).attr('title', svalue)

					// 根据惊道需求增加renderType之后的处理,此处只针对grid.js中的默认render进行处理，非默认通过renderType进行处理
					if(typeof afterRType == 'function'){
						afterRType.call(this,obj);
					}
				}
			}

			var defineSumRenderType = column.sumRenderType;
			column.sumRenderType = function(obj){
				obj.value = parseFloat(obj.value);
				var grid = obj.gridObj											
				var column = obj.gridCompColumn
				var rprec = column.options.precision;
				var maskerMeta = iweb.Core.getMaskerMeta('float') || {}
				var precision = rprec == 0 || (rprec && typeof(parseFloat(rprec)) == 'number')? rprec : maskerMeta.precision;
				maskerMeta.precision = precision;

				var formater = new u.NumberFormater(maskerMeta.precision);
				var masker = new u.NumberMasker(maskerMeta);
				var svalue = masker.format(formater.format(obj.value)).value
				obj.element.innerHTML =  svalue
				$(obj.element).parent().css('text-align', 'right')
				$(obj.element).css('text-align', 'right')
				$(obj.element).attr('title', svalue)
				if(typeof defineSumRenderType == 'function')
					defineSumRenderType.call(grid,obj);
			}

			columns.push(column);	
		});
		
		if (app && app.adjustFunc)
			app.adjustFunc.call(app, {id: this.id, type:'gridColumn', columns:columns});

		this.gridOptions.columns = columns;
		
		
		/*
		 * 处理viewModel与grid之间的绑定
		 * 
		 */
		var onRowSelectedFun = this.gridOptions.onRowSelected; 
		// 选中
		this.gridOptions.onRowSelected = function(obj) {
			var rowId = oThis.grid.dataSourceObj.rows[obj.rowIndex].value['$_#_@_id'];
			var index = oThis.dataTable.getIndexByRowId(rowId);
			if(oThis.grid.options.multiSelect){
				oThis.dataTable.addRowsSelect([index]);
			}else{
				oThis.dataTable.setRowSelect(index);
			}
			
			if(onRowSelectedFun){
				onRowSelectedFun.call(oThis,obj);
			}
		};
		this.dataTable.on(u.DataTable.ON_ROW_SELECT, function(event) {
			/*index转化为grid的index*/
			$.each(event.rowIds, function() {
				var index = oThis.grid.getRowIndexByValue('$_#_@_id',this);
				var selectFlag = true;
				if(index > -1){
					selectFlag = oThis.grid.setRowSelect(parseInt(index));
					if(!selectFlag){
						oThis.dataTable.setRowUnSelect(oThis.dataTable.getIndexByRowId(this));
					}
				}
			});
		});
		
		//全选
		this.dataTable.on(u.DataTable.ON_ROW_ALLSELECT, function(event) {
			oThis.grid.setAllRowSelect()
		});
		
		//全返选
		this.dataTable.on(u.DataTable.ON_ROW_ALLUNSELECT, function(event) {
			oThis.grid.setAllRowUnSelect()
		});
		
		// 反选
		var onRowUnSelectedFun = this.gridOptions.onRowUnSelected; 
		this.gridOptions.onRowUnSelected = function(obj) {
			var rowId = oThis.grid.dataSourceObj.rows[obj.rowIndex].value['$_#_@_id'];
			var index = oThis.dataTable.getIndexByRowId(rowId);
			oThis.dataTable.setRowUnSelect(index);
			if(onRowUnSelectedFun){
				onRowUnSelectedFun.call(oThis,obj);
			}
		};
		this.dataTable.on(u.DataTable.ON_ROW_UNSELECT, function(event) {
			$.each(event.rowIds, function() {
				var index = oThis.grid.getRowIndexByValue('$_#_@_id',this);
				var unSelectFlag = true;
				if(index > -1){
					unSelectFlag = oThis.grid.setRowUnselect(parseInt(index));
					if(!unSelectFlag){
						if(oThis.grid.options.multiSelect){
							oThis.dataTable.addRowsSelect([oThis.dataTable.getIndexByRowId(this)]);
						}else{
							oThis.dataTable.setRowSelect(oThis.dataTable.getIndexByRowId(this));
						}
					}
				}
			});
		});
		
		var onRowFocusFun = this.gridOptions.onRowFocus; 
		// focus
		this.gridOptions.onRowFocus = function(obj) {
			var rowId = oThis.grid.dataSourceObj.rows[obj.rowIndex].value['$_#_@_id'];
			var index = oThis.dataTable.getIndexByRowId(rowId);
			
			if(oThis.grid.options.rowClickBan) {
				oThis.dataTable.setRowFocus(index, true);
			} else {
				oThis.dataTable.setRowFocus(index);
			}
			
			if(onRowFocusFun){
				onRowFocusFun.call(oThis,obj);
			}
		};
		this.dataTable.on(u.DataTable.ON_ROW_FOCUS, function(event) {
			/*index转化为grid的index*/
			var index = oThis.grid.getRowIndexByValue('$_#_@_id',event.rowId);
		
			var focusFlag = true;
			if(index > -1){
				focusFlag = oThis.grid.setRowFocus(parseInt(index));
				
				if(!focusFlag){
					oThis.dataTable.setRowUnFocus(oThis.dataTable.getIndexByRowId(event.rowId));
				}
			}
		});
		
		// 反focus
		var onRowUnFocusFun = this.gridOptions.onRowUnFocus; 
		this.gridOptions.onRowUnFocus = function(obj) {
			var rowId = oThis.grid.dataSourceObj.rows[obj.rowIndex].value['$_#_@_id'];
			var index = oThis.dataTable.getIndexByRowId(rowId);
			oThis.dataTable.setRowUnFocus(index);
			if(onRowUnFocusFun){
				onRowUnFocusFun.call(oThis,obj);
			}
		};
		this.dataTable.on(u.DataTable.ON_ROW_UNFOCUS, function(event) {
			var index = oThis.grid.getRowIndexByValue('$_#_@_id',event.rowId);
			var unFocusFlag = true;
			if(index > -1){
				unFocusFlag = oThis.grid.setRowUnFocus(parseInt(index));
				if(!unFocusFlag){
					oThis.dataTable.setRowFocus(oThis.dataTable.getIndexByRowId(event.rowId));
				}
			}
		});
		
		// 增行,只考虑viewModel传入grid
//		var onRowInsertFun = this.gridOptions.onRowInsert; 
//		this.gridOptions.onRowInsert = function(obj){
//			dataTable.insertRow(obj.index,obj.row);
//			if(onRowSelectedFun){
//				viewModel[onRowUnSelectedFun].call(grid,grid, row, rowindex);
//			}
//		};
		this.dataTable.on(u.DataTable.ON_INSERT, function(event) {
			var gridRows = new Array();
			$.each(event.rows,function(){
				var row = this.data;
				var id = this.rowId;
				var gridRow = {};
				for(var filed in row){
					gridRow[filed] = row[filed].value;
				}
				gridRow['$_#_@_id'] = id;
				gridRows.push(gridRow); 
			})
			oThis.grid.addRows(gridRows,event.index);
		});
		
		this.dataTable.on(u.DataTable.ON_UPDATE, function(event) {
			$.each(event.rows,function(){
				var row = this.data;
				var id = this.rowId;
				var gridRow = {};
				for(var filed in row){
					gridRow[filed] = row[filed].value;
				}
				gridRow['$_#_@_id'] = id;
				var index = oThis.grid.getRowIndexByValue('$_#_@_id',id);
				oThis.grid.updateRow(index,gridRow);
			})
			
		});		
		
		this.dataTable.on(u.DataTable.ON_VALUE_CHANGE, function(obj) {
	
			var id = obj.rowId;
			var index = oThis.grid.getRowIndexByValue('$_#_@_id',id);
			if(index == -1) {
				return;
			}
			var field = obj.field;
			var value = obj.newValue;
			oThis.grid.updateValueAt(index,field,value);
			//oThis.grid.editClose();
		});		
		
		// 删除行,只考虑viewModel传入grid
//		this.gridOptions.onRowDelete = function(obj){
//			dataTable.removeRow(obj.index);
//		};
		this.dataTable.on(u.DataTable.ON_DELETE, function(event) {
			/*index转化为grid的index*/
			var gridIndexs = new Array();
			$.each(event.rowIds, function() {
				var index = oThis.grid.getRowIndexByValue('$_#_@_id',this);
				gridIndexs.push(index);
			});
			oThis.grid.deleteRows(gridIndexs);
		});
		
		this.dataTable.on(u.DataTable.ON_DELETE_ALL, function(event) {
			oThis.grid.setDataSource({})
		});		
		
		// 数据改变
		var onValueChangeFun = this.gridOptions.onValueChange; 
		this.gridOptions.onValueChange = function(obj) {
			var row = oThis.getDataTableRow(oThis.grid.dataSourceObj.rows[obj.rowIndex].value)
			if(row){
				if($.type(obj.newValue) == 'object') {
					row.setValue(obj.field, obj.newValue.trueValue);
					row.setMeta(obj.field, 'display', obj.newValue.showValue);
				} else {
					row.setValue(obj.field,obj.newValue);
				}
			}
			if(onValueChangeFun){
				onValueChangeFun.call(oThis,obj);
			}
		};
		this.dataTable.on('valueChange', function(event) {
			var field = event.field,
				rowId = event.rowId,
				oldValue = event.oldValue,
				newValue = event.newValue;
			var rowIndex = oThis.grid.getRowIndexByValue('$_#_@_id',rowId);
			if(rowIndex > -1){
				oThis.grid.updateValueAt(rowIndex,field,newValue);	
			}
		});
		// 加载数据,只考虑viewModel传入grid
		this.dataTable.on(u.DataTable.ON_LOAD, function(data) {
			if(data.length > 0){
				var values = new Array();
				
				$.each(data, function() {
					var value = {};
					var dataObj = this.data;
					var id = this.rowId;
					for(var p in dataObj){
						var v = dataObj[p].value;
						value[p] = v;
					} 
					value['$_#_@_id'] = id;
					values.push(value);
				});
				var dataSource = {};
				dataSource['values'] = values;
				oThis.grid.setDataSource(dataSource);
			}
		});
		this.dataTable.on(u.DataTable.ON_ENABLE_CHANGE, function(enable) {		
			oThis.grid.setEditable(enable.enable);
		});

		this.dataTable.on(u.DataTable.ON_ROW_META_CHANGE, function(event){
			var field = event.field,
				meta = event.meta,
				row = event.row,
				newValue = event.newValue
			if (meta == 'required'){
				oThis.grid.setRequired(field, newValue)
			}
			if (meta == 'precision'){
				var comp = oThis.editComponent[field];
				if(comp) {
					comp.setPrecision(newValue)
				}

				var index = oThis.grid.getRowIndexByValue('$_#_@_id',row.rowId);
				if(index == -1) {
					return;
				}
				var value = row.getValue(field)

				oThis.grid.updateValueAt(index,field,value,true);
			}
		})

		this.dataTable.on(u.DataTable.ON_META_CHANGE, function(event){
			var field = event.field
			var meta = event.meta
			if (meta == 'precision'){
				oThis.grid.renderTypeFun({field:field})
			}
		})

		this.gridOptions.transMap = {
			ml_show_column:trans('gridComp.show_column', '显示/隐藏列'),
			ml_clear_set:trans('gridComp.clear_set', '清除设置'),
			ml_no_rows:trans('gridComp.no_rows', '无数据'),
			ml_sum:trans('gridComp.sum', '合计:'),
			ml_close:trans('gridComp.close', '关闭')
		}
		// 创建grid
		this.grid = $(element).grid(this.gridOptions);
		this.grid.dataTable = this.dataTable
		this.grid.viewModel = viewModel
		this.grid.gridModel = this
		
		
		
		//如果先插入数据再创建grid需要处理 load
		var data = this.dataTable.rows(); 
		if(data.length > 0){
			var values = new Array();
				
			$.each(data, function() {
				var value = {};
				var dataObj = this.data;
				var id = this.rowId;
				for(var p in dataObj){
					var v = dataObj[p].value;
					value[p] = v;
				} 
				value['$_#_@_id'] = id;
				values.push(value);
			});
			var dataSource = {};
			dataSource['values'] = values;
			oThis.grid.setDataSource(dataSource);
		}
		// 选中行
		var selectIndexs = this.dataTable.getSelectedIndexs();
		if(selectIndexs.length > 0){
			$.each(selectIndexs, function() {
				oThis.grid.setRowSelect(this);	
			});
		}
		
		return this;
	},
	
	getName: function() {
		return 'grid'
	},
	createDefaultEdit:function(eType,eOptions,options,viewModel,column){
		var oThis = this;
		if(eType == 'string'){
			compDiv = $('<div><input type="text" class="u-grid-edit-item-string"></div>');
			if(!options.editType || options.editType =="default" ){
				compDiv.addClass("eType-input")
			}
			eOptions.dataType = 'string';
			comp = new u.StringAdapter({
				el:compDiv[0],
				options:eOptions,
				model: viewModel
			});

		}else if(eType == 'integer'){
			compDiv = $('<div><input type="text" class="u-grid-edit-item-integer"></div>');
			if(!options.editType || options.editType =="default" ){
				compDiv.addClass("eType-input")
			}
			eOptions.dataType = 'integer';
			comp = new u.IntegerAdapter({
				el:compDiv[0],
				options:eOptions,
				model: viewModel
			});

			//comp = new $.compManager.plugs.integer(compDiv.find("input")[0],eOptions,viewModel);

		} else if(eType == 'checkbox'){
			compDiv = $('<div><input id="' + oThis.id + "_edit_field_" + column['field'] + '" type="checkbox" class="u-grid-edit-item-checkbox"></div>');
			//eOptions.dataType = 'integer';
			
			if($.CheckboxComp){
				comp = new $.CheckboxComp(compDiv.find("input")[0],eOptions,viewModel);
			}else{
				comp = new u.CheckboxAdapter({
					el:compDiv[0],
					options:eOptions,
					model: viewModel
				});
			}
			

			//comp = new $.compManager.plugs.check(compDiv.find("input")[0],eOptions,viewModel);

		}else if(eType == 'combo'){
			// compDiv = $('<div class="input-group  form_date u-grid-edit-item-comb"><div  type="text" class="form-control grid-combox"></div><i class="input-group-addon" ><i class="uf uf-anglearrowdown"></i></i></div>');
			compDiv = $('<div class="eType-input"><input type="text" class="u-grid-edit-item-float"></div>');
			//comp = new $.compManager.plugs.combo(compDiv[0],eOptions,viewModel);
			//comp = new u.Combobox({
			//	el:compDiv[0],
			//	options:eOptions,
			//	model: viewModel
			//});
			eOptions.showFix = true;
			if($.Combobox){ //兼容旧版本
				compDiv = $('<div class="input-group  form_date u-grid-edit-item-comb"><div  type="text" class="form-control grid-combox"></div><i class="input-group-addon" ><i class="uf uf-anglearrowdown"></i></i></div>');
				comp = new $.Combobox(compDiv[0],eOptions,viewModel)
			}else{
				comp = new u.ComboboxAdapter({
					el:compDiv[0],
					options:eOptions,
					model: viewModel
				});
				if(oThis.gridOptions.customEditPanelClass){
					if(oThis.gridOptions.customEditPanelClass.indexOf('u-combo-ul') < 0){
						oThis.gridOptions.customEditPanelClass += ',u-combo-ul';
					}
				}else{
					oThis.gridOptions.customEditPanelClass = 'u-combo-ul';
				}
			}

			
		}else if(eType == 'radio'){
			if(!options.editType || options.editType =="default" ){
				compDiv = null;
				comp = null;
			}else {
				compDiv = $('<div class="u-grid-edit-item-radio"><input type="radio" name="identity" /><i data-role="name"></i></div>');
				//comp = new $.compManager.plugs.radio(compDiv[0],eOptions,viewModel);
				comp = new u.RadioAdapter({
					el:compDiv[0],
					options:eOptions,
					model: viewModel
				});

			}
		}else if(eType == 'float'){
			compDiv = $('<div><input type="text" class="u-grid-edit-item-float"></div>');
			if(!options.editType || options.editType =="default" ){
				compDiv.addClass("eType-input")
			}
			//comp = new $.compManager.plugs.float(compDiv.find("input")[0],eOptions,viewModel);
			eOptions.dataType = 'float';
			comp = new u.FloatAdapter({
				el:compDiv[0],
				options:eOptions,
				model: viewModel
			});

		}else if(eType == 'currency'){
			compDiv = $('<div><input type="text" class="u-grid-edit-item-currency"></div>');
			if(!options.editType || options.editType =="default" ){
				compDiv.addClass("eType-input")
			}
			//comp = new $.compManager.plugs.currency(compDiv.find("input")[0],eOptions,viewModel);
			eOptions.dataType = 'currency';
			comp = new u.CurrencyAdapter({
				el:compDiv[0],
				options:eOptions,
				model: viewModel
			});

		}else if(eType == 'datetime'){
			compDiv = $('<div class="input-group u-grid-edit-item-datetime" ><input class="form-control" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div>');
			eOptions.showFix = true;
			//comp = new $.compManager.plugs.datetime(compDiv[0],eOptions,viewModel);
			if($.DateTime){
				comp = new $.DateTime(compDiv[0],eOptions,viewModel);
			}else{
				comp = new u.DateTimeAdapter({
					el:compDiv[0],
					options:eOptions,
					model: viewModel
				});
				if(oThis.gridOptions.customEditPanelClass){
					if(oThis.gridOptions.customEditPanelClass.indexOf('u-date-panel') < 0){
						oThis.gridOptions.customEditPanelClass += ',u-date-panel';
					}
				}else{
					oThis.gridOptions.customEditPanelClass = 'u-date-panel';
				}
			}

		}else if(eType == 'date'){
			compDiv = $('<div class="input-group u-grid-edit-item-date" ><input class="form-control" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div>');
			eOptions.showFix = true;
			//comp = new $.compManager.plugs.date(compDiv[0],eOptions,viewModel);
			if($.DateComp){
				comp = new $.DateComp(compDiv[0],eOptions,viewModel);
			}else{
				eOptions.type = 'u-date';
				comp = new u.DateTimeAdapter({
					el:compDiv[0],
					options:eOptions,
					model: viewModel
				});
				if(oThis.gridOptions.customEditPanelClass){
					if(oThis.gridOptions.customEditPanelClass.indexOf('u-date-panel') < 0){
						oThis.gridOptions.customEditPanelClass += ',u-date-panel';
					}
				}else{
					oThis.gridOptions.customEditPanelClass = 'u-date-panel';
				}
			}
			

		}else if(eType == 'url'){
			compDiv = $('<div><input type="text" class="u-grid-edit-item-string"></div>');
			if(!options.editType || options.editType =="default" ){
				compDiv.addClass("eType-input")
			}
			eOptions.dataType = 'url';
			comp = new u.UrlAdapter({
				el:compDiv[0],
				options:eOptions,
				model: viewModel
			});
			//$.compManager.plugs.string(compDiv.find("input")[0],eOptions,viewModel);

		}else if(eType == 'password'){
			compDiv = $('<div><input type="text" class="u-grid-edit-item-string"><span class="uf uf-eyeopen right-span"></span></div>');
			if(!options.editType || options.editType =="default" ){
				compDiv.addClass("eType-input")
			}
			eOptions.dataType = 'password';
			comp = new u.PassWordAdapter({
				el:compDiv[0],
				options:eOptions,
				model: viewModel
			});
			//$.compManager.plugs.string(compDiv.find("input")[0],eOptions,viewModel);

		}else if(eType == 'percent'){

			compDiv = $('<div><input type="text" class="u-grid-edit-item-float"></div>');
			if(!options.editType || options.editType =="default" ){
				compDiv.addClass("eType-input")
			}
			//comp = new $.compManager.plugs.float(compDiv.find("input")[0],eOptions,viewModel);
			eOptions.dataType = 'precent';
			comp = new u.PercentAdapter({
				el:compDiv[0],
				options:eOptions,
				model: viewModel
			});
		}
		// input输入blur时显示下一个编辑控件
		$('input',$(compDiv)).on('keydown',function(e){
			var keyCode = e.keyCode;
            if( e.keyCode == 13 || e.keyCode == 9){// 回车
            	this.blur(); //首先触发blur来将修改值反应到datatable中
                oThis.grid.nextEditShow();
                u.stopEvent(e);
            }
		});
		if (comp && comp.dataAdapter){
			comp = comp.dataAdapter;
		}

		oThis.editComponentDiv[column.field] = compDiv;
		oThis.editComponent[column.field] = comp;
	},
	
	
	
	/**
	 * 获取grid行对应的数据模型行对象
	 * @param {Object} gridRow
	 */
	getDataTableRow: function(gridRow){
		var rowId =  gridRow['$_#_@_id']
		var row = null
		var rowIndex = this.dataTable.getIndexByRowId(rowId)
		if(rowIndex > -1)
			row = this.dataTable.getRow(rowIndex);
		return row
	},
	
	setEnable: function(enable){
		this.grid.setEditable(enable);
	},
	
	setShowHeader: function(showHeader){
		this.grid.setShowHeader(showHeader);
	},
	
	// 传入要编辑的tr对应的jquery对象
	editRowFun: function(index){
		this.dataTable.setRowSelect(index);
		this.grid.editRowIndexFun(index);
	},
	/*
	grid校验之后不显示提示信息，只返回提示信息，由调用者主动处理
	传入参数：	trueValue 不处理
				showMsg 不处理
	返回：	passed 是否通过
			MsgObj 包含id以及提示信息，后续可扩展
			Msg 提示信息
	*/
	doValidate:function(options){
		var rows = this.grid.dataSourceObj.rows,
			gridColumnArr = this.grid.gridCompColumnArr,
			passed = true,
			MsgArr = new Array(),
			evalStr = '',
			rowMsg = '',
			wholeMsg = '',
			columnShowMsg = '';

		// 遍历所有列
		for(var j = 0; j < gridColumnArr.length;j++){
			// 遍历所有行
			var column = gridColumnArr[j],
				columnOptions = gridColumnArr[j].options,
				field = columnOptions.field,
				title = columnOptions.title,
				required = columnOptions.required,
				validType,placement,tipId,errorMsg,nullMsg,maxLength,minLength,
				max,min,maxNotEq,minNotEq,reg;
			if(columnOptions.editOptions){
				validType = columnOptions.editOptions.validType || '';
				placement = columnOptions.editOptions.placement || '';
				tipId = columnOptions.editOptions.tipId || '';
				errorMsg = columnOptions.editOptions.errorMsg || '';
				nullMsg = columnOptions.editOptions.nullMsg || '';
                maxLength = columnOptions.editOptions.maxLength || '';
                minLength = columnOptions.editOptions.minLength || '';
                max = columnOptions.editOptions.max || '';
                min = columnOptions.editOptions.min || '';
                maxNotEq = columnOptions.editOptions.maxNotEq || '';
                minNotEq = columnOptions.editOptions.minNotEq || '';
                reg = columnOptions.editOptions.regExp || '';
			}
				
            var columnPassedFlag = true,
                columnMsg = '';
            var validate = new u.Validate({
            	el:this.element,
                single: true,
                required: required,
                validType: validType,
                placement: placement,
                tipId: tipId,
                errorMsg: errorMsg,
                nullMsg: nullMsg,
                maxLength: maxLength,
                minLength: minLength,
                max: max,
                min: min,
                maxNotEq: maxNotEq,
                minNotEq: minNotEq,
                reg: reg
        	});
			for (var i = 0; i < rows.length; i++) {
				var value = rows[i].value[field];
            	var result = validate.check({pValue:value,showMsg:false});
            	passed = result.passed && passed;
            	if(!result.passed){
            		columnPassedFlag = false;
            		if(options.showMsg && columnMsg.indexOf(result.Msg) < 0){
            			columnMsg += result.Msg + ' ';
            		}
            		// 设置背景色
            		var index = this.grid.getIndexOfColumn(column);
            		var contentDiv = document.getElementById(this.grid.options.id + '_content_tbody');
            		var row = contentDiv.querySelectorAll('tr')[i];
            		var td = row.querySelectorAll('td')[index];
            		var div = td.querySelector('div')
            		u.addClass(td,'u-grid-err-td');
            		u.addClass(div,'u-grid-err-td');
            		evalStr = 'if(typeof obj' + i + ' == \'undefined\'){var obj' + i + '= {}; MsgArr.push(obj' + i + ');obj' + i + '.rowNum = ' + i + '; obj' + i + '.arr = new Array();}';
					eval(evalStr);
            		var msg = '(' + title + ')' + result.Msg + ';'; 
            		evalStr = 'obj' + i + '.arr.push(msg)';
            		eval(evalStr);
            	}
			}
			// 如果存在错误信息并且提示信息
			if(!columnPassedFlag && options.showMsg){
				columnShowMsg += title + ':' + columnMsg + '<br>';
			}
			
		}
		if(columnShowMsg)
			u.showMessage({msg:columnShowMsg,showSeconds:3})
		if(MsgArr.length > 0){
			MsgArr.sort(function(a1,a2){
				if(a1.rowNum > a2.rowNum)
					return 1
				else
					return -1
			})
		}

		for(var k = 0; k < MsgArr.length; k++){
			var rowNum = MsgArr[k].rowNum;
			rowMsg = MsgArr[k].arr.join('');
			wholeMsg += '第' + (rowNum + 1) + '行:' + rowMsg;
 		}

 		return {
 			passed:passed,
 			comp:this,
 			Msg:wholeMsg
 		}
	},
});

	//if ($.compManager)
	//	$.compManager.addPlug(Grid)


u.compMgr.addDataAdapter(
    {
        adapter: u.GridAdapter,
        name: 'grid'
        //dataType: 'float'
    })