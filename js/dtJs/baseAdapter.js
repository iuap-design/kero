/**
 * Module : Kero adapter 基类
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-08 15:31:46
 */
import {Class} from 'neoui-sparrow/lib/class';
import {getJSObject} from 'neoui-sparrow/lib/util';



/**
 * adapter基类
 */

var BaseAdapter = Class.create({
    /**
     *
     * @param comp
     * @param options ：
     *      el: '#content',  对应的dom元素
     *      options: {},     配置
     *      model:{}        模型，包括数据和事件
     */
    initialize: function (options) {
        //组合mixin中的方法
        for(var i in this.mixins){
            var mixin = this.mixins[i];
            for (var key in mixin['methods']){
                if (!this[key]){
                    this[key] = mixin['methods'][key];
                }
            }
        }

        //this.comp = comp;
        this.element = options['el'];
        this.options = options['options'];
        this.viewModel = options['model'];
        this.dataModel = null;
        this.mixins = this.mixins || [];
        this.parseDataModel();
        this.init();
        //执行mixin中的初始化方法
        for(var i in this.mixins){
            var mixin = this.mixins[i];
            if (mixin['init'])
                mixin.init.call(this);
        }

    },
    parseDataModel: function () {
        if (!this.options || !this.options["data"]) return;
        this.field = this.options["field"];
        var dtId = this.options["data"];
        this.dataModel = getJSObject(this.viewModel, this.options["data"]);
        if (this.dataModel){
            var opt = {};
            if (this.options.type === 'u-date'){
                opt.type = 'date'
            }
            if (this.field)
                this.dataModel.createField(this.field, opt);
        }
    },
    getOption: function(key){
        var rs = this.dataModel.getRowMeta(this.field, key);
        if (rs===0){
            return 0;
        }else {
            return rs || this.options[key];
        }
        
    },
    init: function(){

    }
});

export {BaseAdapter};
