/**
 * Created by dingrf on 2016/4/6.
 */


u.ValueMixin = {
    init: function(){
        var self = this;
        this.dataModel.ref(this.field).subscribe(function(value) {
            self.modelValueChange(value)
        });
        this.modelValueChange(this.dataModel.getValue(this.field));

    },
    methods:{
        /**
         * 模型数据改变
         * @param {Object} value
         */
        modelValueChange: function (value) {
            if (this.slice) return;
            if (value === null || typeof value == "undefined")
                value = "";
            this.trueValue = this.formater ? this.formater.format(value) : value;
            //this.element.trueValue = this.trueValue;
            this.showValue = this.masker ? this.masker.format(this.trueValue).value : this.trueValue;
            this.setShowValue(this.showValue);

            //this.trueValue = value;
            //this.showValue = value;
            //this.setShowValue(this.showValue);
        },

        ///**
        // * 设置模型值
        // * @param {Object} value
        // */
        //setModelValue: function (value) {
        //    if (!this.dataModel) return;
        //    this.dataModel.setValue(this.field, value)
        //},
        /**
         * 设置控件值
         * @param {Object} value
         */
        setValue: function (value) {
            this.trueValue = this.formater ? this.formater.format(value) : value;
            this.showValue = this.masker ? this.masker.format(this.trueValue).value : this.trueValue;
            this.setShowValue(this.showValue);
            this.slice = true;
            this.dataModel.setValue(this.field, this.trueValue);
            this.slice = false;
        },
        /**
         * 取控件的值
         */
        getValue: function () {
            return this.trueValue;
        },
        setShowValue: function (showValue) {
            this.showValue = showValue;
            this.element.value = showValue;
            this.element.title = showValue;

        },
        getShowValue: function () {
            return this.showValue
        },
        setModelValue: function (value) {
            if (!this.dataModel) return
            this.dataModel.setValue(this.field, value)
        },
    }
}