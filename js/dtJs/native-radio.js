u.NativeRadioAdapter = u.BaseAdapter.extend({
    mixins: [u.ValueMixin, u.EnableMixin],
    init: function () {
        this.isDynamic = false;
        //如果存在datasource，动态创建radio
        if (this.options['datasource']) {
            this.isDynamic = true;
            var datasource = u.getJSObject(this.viewModel, this.options['datasource']);
            //if(!u.isArray(datasource)) return;

            this.radioTemplateArray = [];
            for (var i= 0, count = this.element.childNodes.length; i< count; i++){
                this.radioTemplateArray.push(this.element.childNodes[i]);
            }
            this.setComboData(datasource);
        } else {
        }
    },
    setComboData: function (comboData) {
        var self = this;
        //if(!this.radioTemplate.is(":radio")) return;
        this.element.innerHTML = '';
        for (var i = 0, len = comboData.length; i < len; i++) {
            for(var j=0; j<this.radioTemplateArray.length; j++){
                this.element.appendChild(this.radioTemplateArray[j].cloneNode(true));
            }
            //this.radioTemplate.clone().appendTo(this.element)
        }

        var allRadio = this.element.querySelectorAll('[type=radio]');
        var allName = this.element.querySelectorAll('[data-role=name]');
        for (var k = 0; k < allRadio.length; k++) {
            allRadio[k].value = comboData[k].pk || comboData[k].value;
            allName[k].innerHTML = comboData[k].name
        }

        this.radioInputName = allRadio[0].name;

        this.element.querySelectorAll('[type=radio][name="'+ this.radioInputName +'"]').forEach(function (ele) {
            u.on(ele, 'click', function () {
                if (this.checked) {
                    self.setValue(this.value);
                }

            })
        })
    },
    modelValueChange: function (value) {
        if (this.slice) return;
        this.setValue(value)
    },
    setValue: function (value) {
        this.trueValue = value;
        this.element.querySelectorAll('[type=radio][name="'+ this.radioInputName +'"]').forEach(function (ele) {
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
    adapter: u.NativeRadioAdapter,
    name: 'radio'
});
