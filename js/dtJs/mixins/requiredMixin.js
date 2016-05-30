/**
 * Created by dingrf on 2016/4/6.
 */

u.RequiredMixin = {
    init: function(){
        var self = this;
        this.required = this.getOption('required');
        this.dataModel.refRowMeta(this.field, "required").subscribe(function(value) {
            self.setRequired(event.newValue);
        });
        //this.setRequired(this.dataModel.getMeta(this.field, "required"));

    },
    methods:{
        setRequired: function (required) {
            if (required === true || required === 'true') {
                this.required = true;
            } else if (required === false || required === 'false') {
                this.required = false;
            }
        },
    }
}