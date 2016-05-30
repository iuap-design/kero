+function($) {

/**
 * link控件
 */
	var LinkComp = u.BaseComponent.extend({
		initialize: function(element, options, viewModel) {
			$.InputComp.superclass.initialize.apply(this, arguments)
			this.dataModel = null
			this.hasDataTable = false
			this.enable = true
			this.parseDataModel()
			if(options['click']){
				var clickFunc  = $.getJSObject(viewModel, options['click'])
				this.on('click', clickFunc)
			}
				
			this.create()
		},
		create: function() {
			var self = this
			if (this.dataModel) {
				//处理数据绑定
				if (this.hasDataTable) {
					//this.dataModel.ref(this.field).subscribe(function(value) {
					//		self.modelValueChange(value)
					//})
					this.dataModel.on(this.field + '.' +  $.DataTable.ON_CURRENT_VALUE_CHANGE, function(event){
						self.modelValueChange(event.newValue);
					});

					//处理只读
					//this.dataModel.refEnable(this.field).subscribe(function(value){
					//	self.setEnable(value)
					//})
					this.dataModel.on(this.field + '.enable.' +  $.DataTable.ON_CURRENT_META_CHANGE, function(event){
						self.setEnable(event.newValue);
					});

					this.dataModel.on($.DataTable.ON_CURRENT_ROW_CHANGE, function(){
						var row = self.dataModel.getCurrentRow();
						if (!row){
							self.modelValueChange('');
							self.setEnable(false);
						}else{
							self.modelValueChange(row.getValue(self.field));
						}
					});


					this.setEnable(this.dataModel.isEnable(this.field))
				} else {
					this.dataModel.subscribe(function(value) {
						self.modelValueChange(value)
					});
				}
				this.modelValueChange(this.hasDataTable ? this.dataModel.getValue(this.field) : this.dataModel())
			}
			$(this.element).on('click', function(){
				if (self.enable)
					self.trigger('click', {field:self.field,dataTable:self.dataModel})
			})
		},
		/**
		 * 模型数据改变
		 * @param {Object} value
		 */
		modelValueChange: function(value) {
			this.setValue(value)
		},

		/**
		 * @private
		 */
		parseDataModel: function() {
			if (!this.options || !this.options["data"]) return
			this.dataModel = $.getJSObject(this.viewModel, this.options["data"])
			if (this.dataModel instanceof $.DataTable) {
				this.hasDataTable = true
				this.field = this.options["field"]
			}
		},
		/**
		 * 设置控件值
		 * @param {Object} value
		 */
		setValue: function(value) {
			this.value = value
			$(this.element).html(value)
		},
		/**
		 * 取控件的值
		 */
		getValue: function() {
			return this.value
		},
//		setUrl: function(url){
//			
//		},
//		getUrl: function(){
//			
//		}

		setEnable: function(enable){
			if(enable === true || enable === 'true'){
				this.enable = true
				$(this.element).css('cursor', 'pointer')	
			}	
			else if(enable === false || enable === 'false'){	
				this.enable = false			
				$(this.element).css('cursor', 'not-allowed')
			}	
		},

		Statics: {
			compName: 'link'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(LinkComp)

}($);
