u.DateTimeAdapter = u.BaseAdapter.extend({
	mixins: [u.ValueMixin,u.EnableMixin,u.RequiredMixin, u.ValidateMixin],
	init: function (options) {
		var self = this,adapterType,format;
		// u.DateTimeAdapter.superclass.initialize.apply(this, arguments);
		if (this.options.type === 'u-date'){
			this.adapterType = 'date';
		}else{
			this.adapterType = 'datetime'
			u.addClass(this.element,'time');
		}

		this.maskerMeta = u.core.getMaskerMeta(this.adapterType) || {};
		this.maskerMeta.format = this.options['format'] || this.maskerMeta.format;
		if(this.dataModel){
			this.dataModel.on(this.field + '.format.' +  u.DataTable.ON_CURRENT_META_CHANGE, function(event){
				self.setFormat(event.newValue)
			});
		}
		
		if(this.dataModel && !this.options['format'])
			this.options.format = this.dataModel.getMeta(this.field, "format")

		if(!this.options['format']){
			if(this.options.type === 'u-date'){
				this.options.format = "YYYY-MM-DD";
			}else{
				this.options.format = "YYYY-MM-DD HH:mm:ss";
			}
		}
		format = this.options.format;
		this.maskerMeta.format = format || this.maskerMeta.format

		this.startField = this.options.startField?this.options.startField : this.dataModel.getMeta(this.field, "startField");
		
			
		// this.formater = new $.DateFormater(this.maskerMeta.format);
		// this.masker = new DateTimeMasker(this.maskerMeta);
		var op;
		if(u.isMobile){
			op = {
				theme:"ios",
				mode:"scroller",
				lang: "zh",  
				cancelText: null,
				onSelect:function(val){
					self.setValue(val);
				}
			}
			this._span = this.element.querySelector("span");
			this.element = this.element.querySelector("input");
			this.element.setAttribute('readonly','readonly');
			if (this._span){
		        u.on(this._span, 'click', function(e){
		            self.element.focus();
		            u.stopEvent(e);
		        });
		    }
			if(this.adapterType == 'date'){
				$(this.element).mobiscroll().date(op);
			}else{
				$(this.element).mobiscroll().datetime(op);
			}
		}else{
			this.comp = new u.DateTimePicker({el:this.element,format:this.maskerMeta.format,showFix:this.options.showFix});
		}
		
		this.element['u.DateTimePicker'] = this.comp;

		if(!u.isMobile){
			this.comp.on('select', function(event){
				self.setValue(event.value);
			});
		}
		if(this.dataModel){
			this.dataModel.ref(this.field).subscribe(function(value) {
				self.modelValueChange(value);
			});
			if(this.startField){
				this.dataModel.ref(this.startField).subscribe(function(value) {
					if(u.isMobile){
						var valueObj = u.date.getDateObj(value);
						op.minDate = valueObj;
						if(self.adapterType == 'date'){
							$(self.element).mobiscroll().date(op);
						}else{
							$(self.element).mobiscroll().datetime(op);
						}
						var nowDate = u.date.getDateObj(self.dataModel.getValue(self.field));
						if(nowDate < valueObj || !value){
							self.dataModel.setValue(self.field,'');
						}
					}else{
						self.comp.setStartDate(value);
						if(self.comp.date < u.date.getDateObj(value) || !value){
							self.dataModel.setValue(self.field,'');
						}
					}
					
				});
			}
			if(this.startField){
				var startValue = this.dataModel.getValue(this.startField);
				if(startValue){
					if(u.isMobile){
						op.minDate = u.date.getDateObj(startValue);
						if(this.adapterType == 'date'){
							$(this.element).mobiscroll().date(op);
						}else{
							$(this.element).mobiscroll().datetime(op);
						}
					}else{
						self.comp.setStartDate(startValue);
					}
				}
			}
			
		}
			
	},
	modelValueChange: function(value){
		if (this.slice) return;
		this.trueValue = value;
		if(u.isMobile){
			if(value){
				value = u.date.format(value,this.options.format);
				$(this.element).scroller('setDate', u.date.getDateObj(value), true);
			}
		}else{
			this.comp.setDate(value);
		}
		
	},
	setFormat: function(format){
		if (this.maskerMeta.format == format) return;
		this.options.format = format;
		this.maskerMeta.format = format;
		if(!u.isMobile)
			this.comp.setFormat(format);
		// this.formater = new $.DateFormater(this.maskerMeta.format);
		// this.masker = new DateTimeMasker(this.maskerMeta);
	},
	setValue: function (value) {
		value = u.date.format(value,this.options.format);
        this.trueValue = this.formater ? this.formater.format(value) : value;
        this.showValue = this.masker ? this.masker.format(this.trueValue).value : this.trueValue;
        this.setShowValue(this.showValue);
        this.slice = true;
        this.dataModel.setValue(this.field, this.trueValue);
        this.slice = false;
    },
    setEnable: function(enable){
        if (enable === true || enable === 'true') {
            this.enable = true;
            if(u.isMobile){
            	this.element.removeAttribute('disabled');
            }else{
            	this.comp._input.removeAttribute('readonly');
            }
            u.removeClass(this.element.parentNode,'disablecover');
        } else if (enable === false || enable === 'false') {
            this.enable = false;
            if(u.isMobile){
            	this.element.setAttribute('disabled','disabled');
            }else{
            	this.comp._input.setAttribute('readonly', 'readonly');
            }
            u.addClass(this.element.parentNode,'disablecover');
        }
        if(!u.isMobile)
        	this.comp.setEnable(enable);
    }

});

u.compMgr.addDataAdapter(
		{
			adapter: u.DateTimeAdapter,
			name: 'u-date'
		});

u.compMgr.addDataAdapter(
		{
			adapter: u.DateTimeAdapter,
			name: 'u-datetime'
		});
