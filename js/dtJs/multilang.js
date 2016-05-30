+function($) {
	var Multilang = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			Multilang.superclass.initialize.apply(this, arguments)
			this.create()
			var multinfo =  iweb.Core.getLanguages()
			if(options.multinfo){
				multinfo = options.multinfo
			}

			var multidata = [];
			this.field = options.field;
			multinfo.lang_name =  options.field
			for(i = 0; i < multinfo.length; i++){
				if(i){
					multidata[i] =  this.dataModel.getValue(this.field + (i+1),this.dataTableRow)
				}else{
					multidata[i] =  this.dataModel.getValue(this.field,this.dataTableRow)
				}

			}


			this.multinfo = multinfo;
			this.multidata = multidata;
			$(element).multilang({"multinfo":multinfo, "multidata":multidata});

			this.$element = $(element)
			this.$element.on('change.u.multilang', function(event, valObj) {

				self.setModelValue(valObj)
			})
		},
		create: function() {
			var self = this
			if (this.dataModel) {
				//处理数据绑定
				if (this.hasDataTable) {
					//this.dataModel.ref(this.field).subscribe(function(value) {
					//		self.modelValueChange(value)
					//})
					this.dataModel.on($.DataTable.ON_CURRENT_ROW_CHANGE, function(event){
						self.modelValueChange();
					});

					//处理只读
					//this.dataModel.refEnable(this.field).subscribe(function(value){
					//	self.setEnable(value)
					//})
					this.dataModel.on(this.field + '.enable.' +  $.DataTable.ON_CURRENT_META_CHANGE, function(event){
						self.setEnable(event.newValue);
					});
					this.setEnable(this.dataModel.isEnable(this.field))
				} else {
					this.dataModel.subscribe(function(value) {
						self.modelValueChange(value)
					})
				}
				this.modelValueChange(this.hasDataTable ? this.dataModel.getValue(this.field) : this.dataModel())
//				this.modelValuelangChange(this.hasDataTable ? this.dataModel.getValue(this.fieldlang) : this.dataModel())
			}

		},
		parseDataModel: function() {
			if (!this.options || !this.options["data"]) return
			this.dataModel = $.getJSObject(this.viewModel, this.options["data"])
			if (this.dataModel instanceof $.DataTable) {
				this.hasDataTable = true
				this.field = this.options["field"]
				//			this.fieldlang = this.options["fieldlang"]
			}
		},
		//往模型上设置值
		setModelValue: function(valObj) {
			if (!this.dataModel) return
			if (this.hasDataTable) {

				this.dataModel.setValue(valObj.field, valObj.newValue)
				//			this.dataModel.setValue(this.fieldlang, valObj.lang)
			} else {
				this.dataModel(valObj.newValue)
			}
		},
		modelValueChange: function(value) {

			var self = this
			if(this.multidata){

				for(i = 0; i < self.multinfo.length; i++){
					if(i){
						self.multidata[i] = self.dataModel.getValue(self.field + (i+1),self.dataTableRow)
					}else{
						self.multidata[i] = self.dataModel.getValue(self.field,self.dataTableRow)
					}
				}
				this.$element.multilang({"multidata":self.multidata});

			}



			//this.dataModel.getValue(this.field,this.dataTableRow)
			//$(this.element).siblings('.multilang_body').children('input').val(value)

		},
		modelValuelangChange: function(value) {

		},
		Statics: {
			compName: 'multilang'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(Multilang)
}($);