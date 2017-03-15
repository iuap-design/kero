(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.rowInit = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /***
     * Module : kero dataTable row init
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-08 13:54:01
     */

    // row的初始化方法
    const init = function () {
        var meta = this.parent.meta;

        for (var key in meta) {
            var targetData;
            if (key.indexOf('.') > 0) {
                var keys = key.split('.');
                targetData = this.data[keys[0]] = this.data[keys[0]] || {};
                for (var i = 1; i < keys.length; i++) {
                    targetData[keys[i]] = targetData[keys[i]] || {};
                    targetData = targetData[keys[i]];
                }
            } else {
                this.data[key] = this.data[key] || {};
                targetData = this.data[key];
            }
            targetData.value = null;
            //this.data[key] = {}
            //处理子表
            if (meta[key]['type'] && meta[key]['type'] === 'child') {
                targetData.isChild = true;
                //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
                var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key;
                targetData.value = new u.DataTable({
                    root: this.parent.root,
                    ns: ns,
                    meta: meta[key]['meta']
                });
            }
            //添加默认值
            else if (meta[key]['default']) {
                    var defaults = meta[key]['default'];
                    if (typeof defaults === 'object') {
                        for (var k in defaults) {
                            if (k == 'value') {
                                if (typeof defaults[k] === 'function') targetData.value = this.formatValue(key, defaults[k]());else targetData.value = this.formatValue(key, defaults[k]);
                            } else {
                                targetData.meta = targetData.meta || {};
                                targetData.meta[k] = defaults[k];
                            }
                        }
                    } else {
                        if (typeof defaults === 'function') targetData.value = this.formatValue(key, defaults());else targetData.value = this.formatValue(key, defaults);
                    }
                }
        }
    };

    const rowInitFunObj = exports.rowInitFunObj = {
        init: init
    };
});