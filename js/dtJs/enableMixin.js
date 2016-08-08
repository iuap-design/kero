/**
 * Module : Kero Enable Mixin
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-08 16:32:54
 */
import {addClass,removeClass} from 'neoui-sparrow/lib/dom';

var EnableMixin = {
    init: function(){
        var self = this;
        //处理只读
        if (this.options['enable'] && (this.options['enable'] == 'false' || this.options['enable'] == false)){
            this.setEnable(false);
        }else {
            this.dataModel.refEnable(this.field).subscribe(function (value) {
                self.setEnable(value);
            });
            this.setEnable(this.dataModel.isEnable(this.field));
        }
    },
    methods:{
        setEnable: function(enable){
                if (enable === true || enable === 'true') {
                    this.enable = true;
                    this.element.removeAttribute('readonly');
                    removeClass(this.element.parentNode,'disablecover');
                } else if (enable === false || enable === 'false') {
                    this.enable = false;
                    this.element.setAttribute('readonly', 'readonly');
                    addClass(this.element.parentNode,'disablecover');
                }
        }
    }
}

export {EnableMixin};
