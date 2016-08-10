'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setEnable = undefined;

var _util = require('neoui-sparrow/lib/util');

var setEnable = function setEnable(enable) {
    (0, _util.each)(this.elements, function (i, element) {
        if (element) {
            element.querySelectorAll('[u-meta]').each(function () {
                if (this['u-meta']) {
                    var comp = this['u-meta'];
                    if (comp.setEnable) comp.setEnable(enable);
                }
            });
        }
    });
}; /**
    * Module : kero app util
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-07-29 09:34:01
    */

exports.setEnable = setEnable;