u.CheckboxAdapter = u.BaseAdapter.extend({
    mixins: [u.ValueMixin, u.EnableMixin,u.RequiredMixin, u.ValidateMixin],
    init: function (options) {
        var self = this;
        // u.CheckboxAdapter.superclass.initialize.apply(this, arguments); 
        this.isGroup = this.options['isGroup'] === true || this.options['isGroup'] === 'true';
        if (this.options['datasource']) {
            this.isGroup = true;
            var datasource = u.getJSObject(this.viewModel, this.options['datasource']);
            this.checkboxTemplateArray = [];
            for (var i= 0, count = this.element.childNodes.length; i< count; i++){
                this.checkboxTemplateArray.push(this.element.childNodes[i]);
            }
            this.setComboData(datasource);
        }else{
            if(this.element['u.Checkbox']) {
                this.comp = this.element['u.Checkbox']
            } else {
                this.comp = new u.Checkbox(this.element);
                this.element['u.Checkbox'] = this.comp;
            }
            
            this.checkedValue =  this.options['checkedValue'] || this.comp._inputElement.value;
            this.unCheckedValue =  this.options["unCheckedValue"];

            this.comp.on('change', function(){
                if (self.slice) return;
                if(!self.dataModel) return;
                var modelValue = self.dataModel.getValue(self.field);
                modelValue = modelValue ? modelValue : '';
                if (self.isGroup) {
                    var valueArr = modelValue == '' ? [] : modelValue.split(',');

                    if (self.comp._inputElement.checked) {
                        valueArr.push(self.checkedValue)
                    } else {
                        var index = valueArr.indexOf(self.checkedValue);
                        valueArr.splice(index, 1);
                    }
                    self.dataModel.setValue(self.field, valueArr.join(','));
                }else{
                    if (self.comp._inputElement.checked) {
                        self.dataModel.setValue(self.field, self.checkedValue);
                    }else{
                        self.dataModel.setValue(self.field, self.unCheckedValue)
                    }
                }
            });
        }

        if(this.dataModel){
            this.dataModel.ref(this.field).subscribe(function(value) {
                self.modelValueChange(value)
            })
        }
    },
    setComboData: function (comboData) {
        var self = this;
        this.element.innerHTML = '';
        for (var i = 0, len = comboData.length; i < len; i++) {
            for(var j=0; j<this.checkboxTemplateArray.length; j++){
                this.element.appendChild(this.checkboxTemplateArray[j].cloneNode(true));
            }
        }
        var allCheck = this.element.querySelectorAll('[type=checkbox]');
        var allName = this.element.querySelectorAll('[data-role=name]');
        for (var k = 0; k < allCheck.length; k++) {
            allCheck[k].value = comboData[k].pk || comboData[k].value;
            allName[k].innerHTML = comboData[k].name
        }
        this.element.querySelectorAll('.u-checkbox').forEach(function (ele) {
            var comp;
            if(ele['u.Checkbox']) {
                comp = ele['u.Checkbox'];
            } else {
                comp = new u.Checkbox(ele);
            }
            ele['u.Checkbox'] = comp;
            comp.on('change', function(){
                if (self.slice) return;
                var modelValue = self.dataModel.getValue(self.field);
                modelValue = modelValue ? modelValue : '';
                var valueArr = modelValue == '' ? [] : modelValue.split(',');
                if (comp._inputElement.checked) {
                    valueArr.push(comp._inputElement.value)
                } else {
                    var index = valueArr.indexOf(comp._inputElement.value);
                    valueArr.splice(index, 1);
                }
                //self.slice = true;
                self.dataModel.setValue(self.field, valueArr.join(','));
                //self.slice = false;
            });
        })

    },
    modelValueChange: function (val) {
        var self = this;
        if (this.slice) return;
        if (this.isGroup){
            this.trueValue = val;
            this.element.querySelectorAll('.u-checkbox').forEach(function (ele) {
                var comp =  ele['u.Checkbox'];
                if (comp._inputElement.checked != (val + ',').indexOf(comp._inputElement.value) > -1){
                    self.slice = true;
                    comp.toggle();
                    self.slice = false;
                }
            })
        }else{
            if (this.comp._inputElement.checked != (val === this.checkedValue)){
                this.slice = true;
                this.comp.toggle();
                this.slice = false;
            }
        }
    },

    setEnable: function (enable) {
        this.enable = (enable === true || enable === 'true');
        if (this.isGroup){
            this.element.querySelectorAll('.u-checkbox').forEach(function (ele) {
                var comp =  ele['u.Checkbox'];
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
        adapter: u.CheckboxAdapter,
        name: 'u-checkbox'
    });
