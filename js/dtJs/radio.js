u.RadioAdapter = u.BaseAdapter.extend({
    mixins: [u.ValueMixin, u.EnableMixin,u.RequiredMixin, u.ValidateMixin],
    init: function (options) {
        var self = this;
        //u.RadioAdapter.superclass.initialize.apply(this, arguments);
        this.dynamic = false;
        if(this.options['datasource'] || this.options['hasOther']){
            // 存在datasource或者有其他选项，将当前dom元素保存，以后用于复制新的dom元素
            this.radioTemplateArray = [];
            for (var i= 0, count = this.element.childNodes.length; i< count; i++){
                this.radioTemplateArray.push(this.element.childNodes[i]);
            }
        }
        if (this.options['datasource']) {
            this.dynamic = true;
            var datasource = u.getJSObject(this.viewModel, this.options['datasource']);
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

        // 如果存在其他
        if(this.options['hasOther']){
            var node = null;
            for(var j=0; j<this.radioTemplateArray.length; j++){
                this.element.appendChild(this.radioTemplateArray[j].cloneNode(true));
            }
            var LabelS = this.element.querySelectorAll('.u-radio');
            self.lastLabel = LabelS[LabelS.length -1];
            var allRadioS = this.element.querySelectorAll('[type=radio]');
            self.lastRadio = allRadioS[allRadioS.length -1];
            var nameDivs = this.element.querySelectorAll('.u-radio-label');
            self.lastNameDiv = nameDivs[nameDivs.length -1];
            self.lastNameDiv.innerHTML = '其他';
            self.otherInput = u.makeDOM('<input type="text" style="height:32px;box-sizing:border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;">');
            self.lastNameDiv.parentNode.appendChild(self.otherInput);
            self.lastRadio.value = '';
           

            var comp;
            if(self.lastLabel['u.Radio']) {
                comp = self.lastLabel['u.Radio'];
            } else {
                comp = new u.Radio(self.lastLabel);
            }
            self.lastLabel['u.Radio'] = comp;
            self.otherComp = comp;
            comp.on('change', function(){
                if (comp._btnElement.checked){
                    self.dataModel.setValue(self.field, comp._btnElement.value);
                }
            });
            
            u.on(self.otherInput,'blur',function(e){
                self.lastRadio.oldValue = self.lastRadio.value;
                self.lastRadio.value = this.value;
                self.otherComp.trigger('change');

            })
            u.on(self.otherInput,'click',function(e){
                u.stopEvent(e)
            })
        }

        this.dataModel.ref(this.field).subscribe(function(value) {
            self.modelValueChange(value)
        })


    },
    setComboData: function (comboData) {
        var self = this;
        // this.element.innerHTML = '';
        for (var i = 0, len = comboData.length; i < (len - 1); i++) {
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
        var fetch = false;
        if (this.dynamic){
            this.trueValue = value;
            this.element.querySelectorAll('.u-radio').forEach(function (ele) {
                var comp =  ele['u.Radio'];
                var inptuValue = comp._btnElement.value;
                if (inptuValue && inptuValue == value) {
                    fetch = true;
                    comp._btnElement.click();
                }
            })
        }else{
            if (this.eleValue == value){
                fetch = true;
                this.slice = true;
                this.comp._btnElement.click();
                this.slice = false;
            }
        }
        if(this.options.hasOther && !fetch && value){
            this.lastRadio.checked = true;
            this.otherInput.value = value;
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
