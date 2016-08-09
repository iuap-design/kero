/**
 * Module : kero app processXHRError
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */
import {showMessageDialog} from 'neoui/lib/neoui-message';

const processXHRError = function (rsl, state, xhr) {
    if (typeof rsl === 'string')
        rsl = JSON.parse(rsl)
    if (xhr.getResponseHeader && xhr.getResponseHeader("X-Error")) {
        showMessageDialog({type: "info", title: "提示", msg: rsl["message"], backdrop: true});
        if (rsl["operate"]) {
            eval(rsl["operate"]);
        }
        return false;
    }
    return true;
};

export {
	processXHRError
}
