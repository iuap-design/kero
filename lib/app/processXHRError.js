'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processXHRError = undefined;

var _neouiMessage = require('neoui/lib/neoui-message');

var processXHRError = function processXHRError(rsl, state, xhr) {
    if (typeof rsl === 'string') rsl = JSON.parse(rsl);
    if (xhr.getResponseHeader && xhr.getResponseHeader("X-Error")) {
        (0, _neouiMessage.showMessageDialog)({ type: "info", title: "提示", msg: rsl["message"], backdrop: true });
        if (rsl["operate"]) {
            eval(rsl["operate"]);
        }
        return false;
    }
    return true;
}; /**
    * Module : kero app processXHRError
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-07-29 09:34:01
    */
exports.processXHRError = processXHRError;