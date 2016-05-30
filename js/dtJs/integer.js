u.IntegerAdapter = u.BaseAdapter.extend({
    mixins:[u.ValueMixin,u.EnableMixin, u.RequiredMixin, u.ValidateMixin],
    init: function () {
        var self = this;
        this.element = this.element.nodeName === 'INPUT' ? this.element : this.element.querySelector('input');
        if (!this.element){
            throw new Error('not found INPUT element, u-meta:' + JSON.stringify(this.options));
        };
        this.validType = this.options['validType'] || 'integer';
        this.max = this.options['max'];
        this.min = this.options['min'];
        this.maxNotEq = this.options['maxNotEq'];
        this.minNotEq = this.options['minNotEq'];
        this.maxLength = this.options['maxLength'] ? options['maxLength'] : 25;
        this.minLength = this.options['mixLength'] ? options['mixLength'] : 0;
        if (this.dataModel) {
            this.min = this.dataModel.getMeta(this.field, "min") !== undefined ? this.dataModel.getMeta(this.field, "min") : this.min;
            this.max = this.dataModel.getMeta(this.field, "max") !== undefined ? this.dataModel.getMeta(this.field, "max") : this.max;
            this.minNotEq = this.dataModel.getMeta(this.field, "minNotEq") !== undefined ? this.dataModel.getMeta(this.field, "minNotEq") : this.minNotEq;
            this.maxNotEq = this.dataModel.getMeta(this.field, "maxNotEq") !== undefined ? this.dataModel.getMeta(this.field, "maxNotEq") : this.maxNotEq;
            this.minLength = u.isNumber(this.dataModel.getMeta(this.field, "minLength")) ? this.dataModel.getMeta(this.field, "minLength") : this.minLength;
            this.maxLength = u.isNumber(this.dataModel.getMeta(this.field, "maxLength")) ? this.dataModel.getMeta(this.field, "maxLength") : this.maxLength;
        }
        u.on(this.element, 'focus', function(){
            if(self.enable){
                self.setShowValue(self.getValue())
            }
        })

        u.on(this.element, 'blur',function(){
            if(self.enable){
                if (!self.doValidate() && self._needClean()) {
                    if (self.required && (self.element.value === null || self.element.value === undefined || self.element.value === '')) {
                        // 因必输项清空导致检验没通过的情况
                        self.setValue('')
                    } else {
                        self.element.value = self.getShowValue()
                    }
                }
                else
                    self.setValue(self.element.value)
            }
        });
    }
});
u.compMgr.addDataAdapter({
        adapter: u.IntegerAdapter,
        name: 'integer'
    });

