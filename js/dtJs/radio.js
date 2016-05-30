u.RadioAdapter = u.BaseAdapter.extend({
    mixins: [u.ValueMixin, u.EnableMixin,u.RequiredMixin, u.ValidateMixin],
    init: function (options) {
        var self = this;
        //u.RadioAdapter.superclass.initialize.apply(this, arguments);
        this.dynamic = false;
        if (this.options['datasource']) {
            this.dynamic = true;
            var datasource = u.getJSObject(this.viewModel, this.options['datasource']);

            this.radioTemplateArray = [];
            for (var i= 0, count = this.element.childNodes.length; i< count; i++){
                this.radioTemplateArray.push(this.element.childNodes[i]);
            }
            this.setComboData(datasource);
        } else {
            this.comp = new u.Radio(this.element);
            this.element['u.Radio'] = this.comp;
            this.eleValue = this.comp._btnElement.value;

            this.comp.on('change', function(event){
                if (self.slice) return;
                var modelValue = self.dataModel.getValue(self.field);
                //var valueArr = modelValue == '' ?  [] : modelValue.split(',');
                if (self.comp._btnElement.checked){
                    self.dataModel.setValue(self.field, self.eleValue);
                }
            });
        }

        this.dataModel.ref(this.field).subscribe(function(value) {
            self.modelValueChange(value)
        })


    },
    setComboData: function (comboData) {
        var self = this;
        this.element.innerHTML = '';
        for (var i = 0, len = comboData.length; i < len; i++) {
            for(var j=0; j<this.radioTemplateArray.length; j++){
                this.element.appendChild(this.radioTemplateArray[j].cloneNode(true));
            }
            //this.radioTemplate.clone().appendTo(this.element)
        }

        var allRadio = this.element.querySelectorAll('[type=radio]');
        var allName = this.element.querySelectorAll('.u-radio-label');
        for (var k = 0; k < allRadio.length; k++) {
            allRadio[k].value = comboData[k].pk || comboData[k].value;
            allName[k].innerHTML = comboData[k].name
        }

        this.radioInputName = allRadio[0].name;

        this.element.querySelectorAll('.u-radio').forEach(function (ele) {
            var comp = new u.Radio(ele);
            ele['u.Radio'] = comp;

            comp.on('change', function(event){
                if (comp._btnElement.checked){
                    self.dataModel.setValue(self.field, comp._btnElement.value);
                }
            });
        })
    },

    modelValueChange: function (value) {
        if (this.slice) return;
        if (this.dynamic){
            this.trueValue = value;
            this.element.querySelectorAll('.u-radio').forEach(function (ele) {
                var comp =  ele['u.Radio'];
                if (comp._btnElement.value == value) {
                    comp._btnElement.click();
                }
            })
        }else{
            if (this.eleValue == value){
                this.slice = true
                this.comp._btnElement.click();
                this.slice = false
            }
        }
    },

    setEnable: function (enable) {
        this.enable = (enable === true || enable === 'true');
        if (this.dynamic){
            this.element.querySelectorAll('.u-radio').forEach(function (ele) {
                var comp =  ele['u.Radio'];
                if (enable === true || enable === 'true'){
                    comp.enable();
                }else{
                    comp.disable();
                }
            })
        }else{
            if (this.enable){
                this.comp.enable();
            }else{
                this.comp.disable();
            }
        }
    }
})


u.compMgr.addDataAdapter(
    {
        adapter: u.RadioAdapter,
        name: 'u-radio'
    });
