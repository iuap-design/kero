'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processXHRError = undefined;

var _neouiMessage = require('neoui/lib/neoui-message');

var processXHRError = function processXHRError(self, rsl, state, xhr) {
    if (typeof rsl === 'string') rsl = JSON.parse(rsl);
    if (xhr.getResponseHeader && xhr.getResponseHeader("X-Error")) {
        if (self.orignError) self.orignError.call(self, rsl, state, xhr);else {
            if (_neouiMessage.showMessageDialog) (0, _neouiMessage.showMessageDialog)({ type: "info", title: "提示", msg: rsl["message"], backdrop: true });else alert(rsl["message"]);
            if (rsl["operate"]) {
                eval(rsl["operate"]);
            }
        }
        return false;
    }
    return true;
}; /**
    * Module : kero app serverEvent processXHRError
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-07-29 09:34:01
    */

exports.processXHRError = processXHRError;