/**
 * Created by dingrf on 2016/4/6.
 */

u.ValidateMixin = {
    init: function(){
        this.placement = this.getOption('placement');
        this.tipId = this.getOption('tipId');
        this.errorMsg = this.getOption('errorMsg');
        this.nullMsg = this.getOption('nullMsg');
        this.regExp = this.getOption('regExp');
        this.successId=this.getOption('successId');

        // if (this.validType) {
            this.validate = new u.Validate({
                el: this.element,
                single: true,
                validMode: 'manually',
                required: this.required,
                validType: this.validType,
                placement: this.placement,
                tipId: this.tipId,
                successId:this.successId,
                errorMsg: this.errorMsg,
                nullMsg: this.nullMsg,
                maxLength: this.maxLength,
                minLength: this.minLength,
                max: this.max,
                min: this.min,
                maxNotEq: this.maxNotEq,
                minNotEq: this.minNotEq,
                reg: this.regExp
            });
        // };

    },
    methods:{
        /**
         *校验
         */
        doValidate: function (options) {
            if (this.validate) {
                if (options && options['trueValue'] === true) {
                    options['showMsg'] = options['showMsg'] || false;
                    return this.validate.check({pValue: this.getValue(), showMsg: options['showMsg']});
                }
                else
                    return this.validate.check()
            } else {
                return {passed:true}
            }
        },
        /**
         * 是否需要清除数据
         */
        _needClean: function () {
            if (this.validate)
                return this.validate._needClean();
            else return false
        }
    }
}