u.SwitchAdapter = u.BaseAdapter.extend({
    initialize: function (options) {
        var self = this;
        u.SwitchAdapter.superclass.initialize.apply(this, arguments);

        this.comp = new u.Switch(this.element);
        this.element['u.Switch'] = this.comp;
        this.checkedValue =  this.options['checkedValue'] || this.comp._inputElement.value;
        this.unCheckedValue =  this.options["unCheckedValue"];
        this.comp.on('change', function(event){
            if (self.slice) return;
            if (self.comp._inputElement.checked) {
                self.dataModel.setValue(self.field, self.checkedValue);
            }else{
                self.dataModel.setValue(self.field, self.unCheckedValue)
            }
        });

        this.dataModel.ref(this.field).subscribe(function(value) {
        	self.modelValueChange(value)
        })


    },

    modelValueChange: function (val) {
        if (this.slice) return;
        if (this.comp._inputElement.checked != (val === this.checkedValue)){
            this.slice = true;
            this.comp.toggle();
            this.slice = false;
        }

    },
    setEnable: function (enable) {
        if (enable === true || enable === 'true') {
            this.enable = true
        } else if (enable === false || enable === 'false') {
            this.enable = false
        }
    }
})


u.compMgr.addDataAdapter(
    {
        adapter: u.SwitchAdapter,
        name: 'u-switch'
    });
