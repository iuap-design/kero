/**
 * Created by dingrf on 2016/4/5.
 */

u.EnableMixin = {
    init: function(){
        var self = this;
        //处理只读
        this.dataModel.refEnable(this.field).subscribe(function(value) {
            self.setEnable(value);
        });
        this.setEnable(this.dataModel.isEnable(this.field));

    },
    methods:{
        setEnable: function(enable){
                if (enable === true || enable === 'true') {
                    this.enable = true;
                    this.element.removeAttribute('readonly');
                    u.removeClass(this.element.parentNode,'disablecover');
                } else if (enable === false || enable === 'false') {
                    this.enable = false;
                    this.element.setAttribute('readonly', 'readonly');
                    u.addClass(this.element.parentNode,'disablecover');
                }
        }
    }
}