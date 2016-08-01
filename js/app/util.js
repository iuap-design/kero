/**
 * Module : kero app util
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */


const setEnable = function (enable) {
    u.each(this.elements, function (i, element) {
        if(element){
            element.querySelectorAll('[u-meta]').each(function () {
                if (this['u-meta']) {
                    var comp = this['u-meta'];
                    if (comp.setEnable)
                        comp.setEnable(enable)
                }
            })
        }

    })
}

export {
	setEnable
}