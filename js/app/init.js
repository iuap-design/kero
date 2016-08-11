/**
 * Module : kero app init
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */
import {compMgr} from 'neoui-sparrow/js/compMgr';
import {each, isArray} from 'neoui-sparrow/js/util';
import {hotkeys} from 'neoui-sparrow/js/util/hotKeys';

const init = function (viewModel, element, doApplyBindings) {
    var self = this;
    element = element || document.body;
    if (!isArray(element)) {
        element = [element];
    }
    this.elements = element;
    each(this.elements, function (i, element) {
        if (typeof element === 'string'){
            element = document.querySelector(element);
        }
        if(element){
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                var options = JSON.parse(ele.getAttribute('u-meta'));
                options['type'] = options['type'] || 'string';
                if (options && options['type']) {
                    if (self.adjustFunc)
                        self.adjustFunc.call(self, options);
                    var comp = compMgr.createDataAdapter({el:ele,options:options,model:viewModel,app:self});
                    ele['u-meta'] = comp;
                }
            })
        }

        if (hotkeys)
            hotkeys.scan(element);
            if (typeof doApplyBindings == 'undefined' || doApplyBindings == true)
                ko.applyBindings(viewModel, element);
        compMgr.updateComp(element);
    });

    _getDataTables(this, viewModel);
}

const _getDataTables = function (app, viewModel) {
    for (var key in viewModel) {
        if (viewModel[key] && viewModel[key] instanceof u.DataTable) {
            viewModel[key].id = key
            viewModel[key].parent = viewModel
            app.addDataTable(viewModel[key])
        }
    }
}

export {
    init
}