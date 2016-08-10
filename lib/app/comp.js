'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showComp = exports.getComps = exports.getCompsByType = exports.getCompsByDataTable = exports.getComp = exports.createComp = undefined;

var _compMgr = require('neoui-sparrow/lib/compMgr');

var _util = require('neoui-sparrow/lib/util');

var _dom = require('neoui-sparrow/lib/dom');

var createComp = function createComp(ele, viewModel) {
    var options = JSON.parse(ele.getAttribute('u-meta'));
    if (options && options['type']) {
        var comp = _compMgr.compMgr.createDataAdapter({ el: ele, options: options, model: viewModel, app: this });
        ele['u-meta'] = comp;
    }
    return comp;
}; /**
    * Module : kero app comp
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-07-29 09:34:01
    */


var getComp = function getComp(compId) {
    var returnComp = null;
    (0, _util.each)(this.elements, function (i, element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                if (ele['u-meta']) {
                    var comp = ele['u-meta'];
                    if (comp.id === compId) {
                        returnComp = comp;
                        return false;
                    }
                }
            });
        }
    });
    return returnComp;
};

var getCompsByDataTable = function getCompsByDataTable(dataTableId, element) {
    var comps = this.getComps(element),
        targetComps = [];
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].dataModel && comps[i].dataModel['id'] == dataTableId || comps[i].dataTable && comps[i].dataTable['id'] == dataTableId) targetComps.push(comps[i]);
    }
    return targetComps;
};

/**
 * 根据类型获取控件
 * @param {String} type
 * @param {object} element
 */
var getCompsByType = function getCompsByType(type, element) {
    var elements = element ? element : this.elements;
    var returnComps = [];
    if (!(0, _util.isArray)(elements)) elements = [elements];
    (0, _util.each)(elements, function (i, element) {
        if (element) {
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                if (ele['u-meta']) {
                    var comp = ele['u-meta'];
                    if (comp && comp.type == type) returnComps.push(comp);
                }
            });
        }
    });
    return returnComps;
};

/**
 * 获取某区域中的所有控件
 * @param {object} element
 */
var getComps = function getComps(element) {
    var elements = element ? element : this.elements;
    var returnComps = [];
    if (typeof elements == 'string') {
        elements = document.querySelectorAll(elements);
    }
    if (!(0, _util.isArray)(elements) && !(elements instanceof NodeList)) elements = [elements];
    (0, _util.each)(elements, function (i, element) {
        if (element) {
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                if (ele['u-meta']) {
                    var comp = ele['u-meta'];
                    if (comp) returnComps.push(comp);
                }
            });
        }
    });
    return returnComps;
};

/**
 * 将comp显示到顶端（此方法只支持body上存在滚动条的情况）
 * @param {object} comp对象
 */
var showComp = function showComp(comp) {
    var ele = comp.element,
        off = (0, _dom.getOffset)(ele),
        scroll = (0, _dom.getScroll)(ele),
        top = off.top - scroll.top,
        bodyHeight = document.body.clientHeight,
        nowTop = document.body.scrollTop;
    if (top > bodyHeight || top < 0) {
        document.body.scrollTop = nowTop + top;
    }
};

exports.createComp = createComp;
exports.getComp = getComp;
exports.getCompsByDataTable = getCompsByDataTable;
exports.getCompsByType = getCompsByType;
exports.getComps = getComps;
exports.showComp = showComp;