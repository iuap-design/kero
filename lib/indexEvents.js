/**
 * Module : Kero webpack entry events index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */

//相关依赖导入
import { eventsFunObj } from './events';

var Events = function Events() {
    babelHelpers.classCallCheck(this, Events);
};

var EventsProto = Events.prototype;
Object.assign(EventsProto, eventsFunObj);

export { Events };