u.StringAdapter = u.BaseAdapter.extend({
    mixins:[u.ValueMixin,u.EnableMixin, u.RequiredMixin, u.ValidateMixin],
    init: function(){
        var self = this;
        this.element = this.element.nodeName === 'INPUT' ? this.element : this.element.querySelector('input');
        if (!this.element){
            throw new Error('not found INPUT element, u-meta:' + JSON.stringify(this.options));
        };
        this.validType = this.options['validType'] || 'string';
        this.minLength = this.getOption('minLength');
        this.maxLength = this.getOption('maxLength');

        u.on(this.element, 'focus', function(){
            if(self.enable){
                self.setShowValue(self.getValue())
                try{
                    var e = event.srcElement; 
                    var r = e.createTextRange(); 
                    r.moveStart('character',e.value.length); 
                    r.collapse(true); 
                    r.select(); 
                }catch(e){
                }
            }
        })

        u.on(this.element, 'blur',function(e){
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
        adapter: u.StringAdapter,
        name: 'string'
    });

	
