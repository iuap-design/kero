/**
 * Module : kero app validate
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */

import {env} from 'tinper-sparrow/js/env';
import {getOffset} from 'tinper-sparrow/js/dom';
/**
 * 控件数据校验
 * @param {Object} element
 */
const compsValidate = function (element, retUnpass) {
    var comps = this.getComps(element),
        passed = true,
        unpassed=[];
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].doValidate){
            var result = comps[i].doValidate({trueValue:true,showMsg:true});
            result = typeof result === 'object' ? result['passed'] : result;
            passed = result && passed;
            if(!result) unpassed.push(comps[i])
        }
    }
    if(retUnpass) return unpassed;
    return passed
}

const compsValidateMultiParam = function(options){
    var element = options.element,
        comps = this.getComps(element),
        passed = true,
        showMsg = options.showMsg,
        notPassedArr = new Array();
    for(var i = 0; i < comps.length; i++){
        if (comps[i].doValidate){
            var result = comps[i].doValidate({trueValue:true, showMsg:showMsg});
            // 如果passed为true,result.passed为false说明第一次出现错误校验
            if(passed && !result.passed){
                var off= getOffset(comps[i].element);
                //滚动到第一次出现错误的地方
                window.scrollTo(0,off.top-30);
                if(env.isIPAD){ // ipad上面云表单提交校验的时候没有滚动到对应位置
                    window.top.scrollTo(0,off.top-30);
                }
            }
            passed = result.passed && passed;
            if(!result.passed){
                notPassedArr.push(result);
            }
        }
    }
    return {passed:passed,
            notPassedArr:notPassedArr}; 
}

export {
	compsValidate,
	compsValidateMultiParam
}