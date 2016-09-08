/**
 * Module : Kero webpack entry events index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */


 //相关依赖导入
import {
	on,
    off,
    one,
    trigger,
    getEvent
} from './events';

class Events{
    constructor(){

    }
}

Events.prototype.on = on;
Events.prototype.off = off;
Events.prototype.one = one;
Events.prototype.trigger = trigger;
Events.prototype.getEvent = getEvent;

export {
   Events
}
