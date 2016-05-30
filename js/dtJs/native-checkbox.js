u.NativeCheckAdapter = u.BaseAdapter.extend({
    mixins: [u.ValueMixin, u.EnableMixin],
    init: function () {
        var self = this;
        this.isGroup = false;
        //如果存在datasource，动态创建checkbox
        if (this.options['datasource']) {
            this.isGroup = true;
            var datasource = u.getJSObject(this.viewModel, this.options['datasource']);
            //if(!u.isArray(datasource)) return;

            this.checkboxTemplateArray = [];
            for (var i= 0, count = this.element.childNodes.length; i< count; i++){
                this.checkboxTemplateArray.push(this.element.childNodes[i]);
            }
            this.setComboData(datasource);
        } else {
            this.checkedValue =  this.options['checkedValue'] || 'Y';
            this.unCheckedValue =  this.options["unCheckedValue"] || 'N';
            u.on(this.element, 'click', function () {
                if (this.checked) {
                    self.dataModel.setValue(self.field, self.checkedValue);
                }else{
                    self.dataModel.setValue(self.field, self.unCheckedValue)
                }
            });
        }
    },
    setComboData: function (comboData) {
        var self = this;
        this.element.innerHTML = '';
        for (var i = 0, len = comboData.length; i < len; i++) {
            for(var j=0; j<this.checkboxTemplateArray.length; j++){
                this.element.appendChild(this.checkboxTemplateArray[j].cloneNode(true));
            }
            //this.radioTemplate.clone().appendTo(this.element)
        }

        var allCheck = this.element.querySelectorAll('[type=checkbox]');
        var allName = this.element.querySelectorAll('[data-role=name]');
        for (var k = 0; k < allCheck.length; k++) {
            allCheck[k].value = comboData[k].pk || comboData[k].value;
            allName[k].innerHTML = comboData[k].name
        }

        this.element.querySelectorAll('[type=checkbox]').forEach(function (ele) {
            u.on(ele, 'click', function () {
                var modelValue = self.dataModel.getValue(self.field);

                var valueArr = modelValue == '' ? [] : modelValue.split(',');

                if (this.checked) {
                    valueArr.push(this.value)
                } else {
                    var index = valueArr.indexOf(this.value);
                    valueArr.splice(index, 1);
                }
                self.slice = true;
                self.dataModel.setValue(self.field, valueArr.join(','));
                self.slice = false;

            })
        })
    },
    modelValueChange: function (val) {
        if (this.slice) return;
        if (this.isGroup){
            this.element.querySelectorAll('[type=checkbox]').forEach(function (ele) {
                if (ele.checked != (val + ',').indexOf(ele.value) > -1){
                    this.slice = true;
                    ele.checked = !ele.checked;
                    this.slice = false;
                }
            })
        }else{
            if (this.element.checked != (val === this.checkedValue)){
                this.slice = true;
                this.element.checked = !this.element.checked;
                this.slice = false;
            }
        }
    },
    setValue: function (value) {
        this.trueValue = value;
        this.element.querySelectorAll('[type=checkbox]').forEach(function (ele) {
            if (ele.value == value) {
                ele.checked = true;
            } else {
                ele.checked = false;
            }
        })
        this.slice = true;
        this.dataModel.setValue(this.field, this.trueValue);
        this.slice = false;
    },
    getValue: function () {
        return this.trueValue;
    },


});

u.compMgr.addDataAdapter({
    adapter: u.NativeCheckAdapter,
    name: 'checkbox'
});
