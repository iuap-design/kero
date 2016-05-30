u.ComboboxAdapter = u.BaseAdapter.extend({
    mixins:[u.ValueMixin,u.EnableMixin, u.RequiredMixin, u.ValidateMixin],
    init: function () {
        var self = this;
        //u.ComboboxAdapter.superclass.initialize.apply(this, arguments);
        this.datasource = u.getJSObject(this.viewModel, this.options['datasource']);
        this.mutil = this.options.mutil || false;
        this.onlySelect = this.options.onlySelect || false;
        this.validType = 'combobox';
        this.comp = new u.Combo({el:this.element,mutilSelect:this.mutil,onlySelect:this.onlySelect});
        this.element['u.Combo'] = this.comp;
        if (this.datasource){
            this.comp.setComboData(this.datasource);
        }else{
            if(u.isIE8 || u.isIE9)
                alert("IE8/IE9必须设置datasource");
        }
        ////TODO 后续支持多选
        //if (this.mutil) {
        //    //$(this.comboEle).on("mutilSelect", function (event, value) {
        //    //    self.setValue(value)
        //    //})
        //}
        this.comp.on('select', function(event){
            // self.slice = true;
            // if(self.dataModel)
            //     self.dataModel.setValue(self.field, event.value);
            // self.slice = false;
            self.setValue(event.value);
        });
        //if(this.dataModel){
        //    this.dataModel.ref(this.field).subscribe(function(value) {
        //        self.modelValueChange(value)
        //    })
        //}
    },
    modelValueChange: function (value) {
        if (this.slice) return;
        //this.trueValue = value;
        if (value === null || typeof value == "undefined")
            value = "";
        this.comp.setValue(value);
        this.trueValue = this.formater ? this.formater.format(value) : value;
        //this.element.trueValue = this.trueValue;
        this.showValue = this.masker ? this.masker.format(this.trueValue).value : this.trueValue;
        this.setShowValue(this.showValue);
    },
    //setValue: function (value) {
    //    this.trueValue = value;
    //    this.slice = true;
    //    this.setModelValue(this.trueValue);
    //    this.slice = false;
    //},
    //getValue: function () {
    //    return this.trueValue
    //},
    setEnable: function (enable) {
        var self = this;
        if (enable === true || enable === 'true') {
            this.enable = true;
            this.element.removeAttribute('readonly');
            this.comp._input.removeAttribute('readonly');
            u.removeClass(this.element.parentNode,'disablecover');
            u.on(this.comp._input, 'focus', function (e) {
                self.comp.show(e);
                u.stopEvent(e);
            })
            if (this.comp.iconBtn){
                u.on(this.comp.iconBtn, 'click', function(e){
                    self.comp.show(e);
                    u.stopEvent(e);
                })
            }
        } else if (enable === false || enable === 'false') {
            this.enable = false;
            this.element.setAttribute('readonly', 'readonly');
            this.comp._input.setAttribute('readonly', 'readonly');
            u.addClass(this.element.parentNode,'disablecover');
            u.off(this.comp._input, 'focus')
            if (this.comp.iconBtn){
                u.off(this.comp.iconBtn, 'click')
            }
        }
    }
});

u.compMgr.addDataAdapter(
    {
        adapter: u.ComboboxAdapter,
        name: 'u-combobox'
    });




