//TODO 后续提供

+function($) {


	var CheckboxGroupComp = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			var self = this
			this.pks = [];
			CheckboxGroupComp.superclass.initialize.apply(this, arguments)
			this.validType = 'checkboxGroup'
			var datasource = $.getJSObject(viewModel, options['datasource'])
			
			if(!$.isArray(datasource)) return;
			
			var checkboxTemplate = $(this.element).children();
			
			if(!checkboxTemplate.is(":checkbox"))return;
			
			for(var i=0,len = (datasource.length-1);i<len;i++){
				checkboxTemplate.clone().appendTo(this.element)
			}
			
			var allCheckbox =  $(this.element).children('[type=checkbox]');
			var allName = $(this.element).children('[data-role=name]');
			for(var k=0;k<allCheckbox.length;k++){
				allCheckbox[k].value = datasource[k].pk
				allName[k].innerHTML = datasource[k].name
				this.pks.push(datasource[k].pk)
			}
			
	        this.valArr = [];
			this.create()
			
			$(this.element).find(":checkbox").each(function() {
				$(this).on('click', function() {
					
					if(self.valArr.length == 0){
						if(this.checked){
							self.valArr.push(this.value)
						}
					}else{
						if(this.checked){
							var mark = null;
							for(var i=0;i<self.valArr.length;i++){
								if(this.value == self.valArr[i]){
									mark = i;
								}
							}
							
							if(mark == null){
								self.valArr.push(this.value)
							}
							
						}else{
							
							for(var k=0;k<self.valArr.length;k++){
								if(this.value == self.valArr[k]){
									self.valArr.splice(k,1)
								}
							}
							
						}
					}
					//填值
					self.setValue(self.valArr.toString())
					
				})
			})
		},

		modelValueChange: function(val) {
			if (this.slice) return
			
           if(val !='' && val != null){
           	 this.valArr = val.split(',');
           }
           
           this.setValue(val)
		},
		setValue: function(val) {
			this.trueValue = val
			if(val == '' || val == null){
				var manualVal = ''
			}else{
				manualVal = val.split(',');
			}
			
			var pks = this.pks.slice();
			for(var k=0;k<pks.length;k++){
				var pk = pks[k]
				if(manualVal.indexOf(pk) !== -1){
					pks.splice(k,1);
					--k;
				}
				
			}
			
			$(this.element).find(":checkbox").each(function() {
//				for(var i=0;i<manualVal.length;i++){
//             	    if(this.value == manualVal[i]){
//             	    	this.checked = true;
//             	    }
//             }
				
				if(manualVal.indexOf(this.value) !== -1){
					this.checked = true
				}
				
				if(pks.indexOf(this.value) !== -1){
					this.checked = false
				}
			})
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(CheckboxGroupComp.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue: function() {
			return this.trueValue
		},

		Statics: {
			compName: 'checkboxGroup'
		}
	})

	if ($.compManager)
		$.compManager.addPlug(CheckboxGroupComp)

}($);
