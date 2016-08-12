'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = undefined;

var _compMgr = require('neoui-sparrow/js/compMgr');

var _util = require('neoui-sparrow/js/util');

var _hotKeys = require('neoui-sparrow/js/util/hotKeys');

var init = function init(viewModel, element, doApplyBindings) {
    var self = this;
    element = element || document.body;
    if (!(0, _util.isArray)(element)) {
        element = [element];
    }
    this.elements = element;
    (0, _util.each)(this.elements, function (i, element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                var options = JSON.parse(ele.getAttribute('u-meta'));
                options['type'] = options['type'] || 'string';
                if (options && options['type']) {
                    if (self.adjustFunc) self.adjustFunc.call(self, options);
                    var comp = _compMgr.compMgr.createDataAdapter({ el: ele, options: options, model: viewModel, app: self });
                    ele['u-meta'] = comp;
                }
            });
        }

        if (_hotKeys.hotkeys) _hotKeys.hotkeys.scan(element);
        if (typeof doApplyBindings == 'undefined' || doApplyBindings == true) ko.applyBindings(viewModel, element);
        _compMgr.compMgr.updateComp(element);
    });

    _getDataTables(this, viewModel);
}; /**
    * Module : kero app init
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-07-29 09:34:01
    */


var _getDataTables = function _getDataTables(app, viewModel) {
    for (var key in viewModel) {
        if (viewModel[key] && viewModel[key] instanceof u.DataTable) {
            viewModel[key].id = key;
            viewModel[key].parent = viewModel;
            app.addDataTable(viewModel[key]);
        }
    }
};

exports.init = init;