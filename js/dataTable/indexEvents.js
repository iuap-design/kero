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
        this.on = on;
        this.off = off;
        this.one = one;
        this.trigger = trigger;
        this.getEvent = getEvent;
    }
}

export {
   Events 
}