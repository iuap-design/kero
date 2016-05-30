u.TextAreaAdapter = u.BaseAdapter.extend({
    mixins:[u.ValueMixin,u.EnableMixin, u.RequiredMixin, u.ValidateMixin],
    init: function () {
        var self = this;
        this.element = this.element.nodeName === 'TEXTAREA' ? this.element : this.element.querySelector('textarea');
        if (!this.element){
            throw new Error('not found TEXTAREA element, u-meta:' + JSON.stringify(this.options));
        };

        u.on(this.element, 'focus', function () {
            self.setShowValue(self.getValue())
        });
        u.on(this.element, 'blur', function () {
            self.setValue(self.element.value)
        })
    }
});

u.compMgr.addDataAdapter({
        adapter: u.TextAreaAdapter,
        name: 'textarea'
    })
