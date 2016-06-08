+function($) {

	/**
	 * Class Editor
	 * @param {[type]} document  [description]
	 * @param {[type]} options   [description]
	 * @param {[type]} viewModel [description]
	 */
	var Editor = $.InputComp.extend({
		initialize: function(element, options, viewModel) {
			
			this.element = element;
			this.id = options['id'];
			this.options = options;
			this.viewModel = viewModel;
			this.e_editor = this.id + "editor";
			this.render(this.options);
			
			Editor.superclass.initialize.apply(this, arguments)
			this.create()
			
			
		},
		
		render: function(data){
			var cols = data.cols || 80;
			var rows = data.rows || 10;
			var self = this
			var tpls = '<textarea cols="' + cols + '" id="'+ this.e_editor +'" name="editor" rows="' + rows + '"></textarea>';
			$(this.element).append(tpls);
			//this.element.append(tpls);
			$( '#'+this.e_editor ).ckeditor(); 
			var tmpeditor = CKEDITOR.instances[this.e_editor]
			this.tmpeditor = tmpeditor
			//tmpeditor.setData()
			this.tmpeditor.on('blur',function(){
			
				self.setValue(tmpeditor.getData())
			});
			
			this.tmpeditor.on('focus',function(){
				
				self.setShowValue(self.getValue())
			});
			
			//console.log(CKEDITOR.instances[this.e_editor].getData())
		},
		modelValueChange: function(value) {
			if (this.slice) return
			value = value || ""
			this.trueValue = value
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
		},
		setValue: function(value) {
			this.trueValue = value//this.formater.format(value)
			this.showValue = value//this.masker.format(value).value
			this.setShowValue(this.showValue)
			this.slice = true
			this.setModelValue(this.trueValue)
			this.slice = false
			this.trigger(Editor.EVENT_VALUE_CHANGE, this.trueValue)
		},
		getValue : function() {
			return this.trueValue
		},
		setShowValue : function(showValue) {
			this.showValue = showValue			
			this.element.value = showValue
			this.tmpeditor.setData(showValue)
		},
		getShowValue: function() {
			return this.showValue
		},
		getContent: function(){
			return $( '#'+this.e_editor ).html();
		},

		setContent: function(txt){
			$( '#'+this.e_editor ).html(txt);
		},

		Statics: {
			compName: 'editor'
		}
	});	

	if ($.compManager)
		$.compManager.addPlug(Editor)

}($);
