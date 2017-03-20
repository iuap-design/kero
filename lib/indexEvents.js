(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './events'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./events'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.events);
        global.indexEvents = mod.exports;
    }
})(this, function (exports, _events) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Events = undefined;


    class Events {
        constructor() {}
    } /**
       * Module : Kero webpack entry events index
       * Author : liuyk(liuyuekai@yonyou.com)
       * Date   : 2016-08-09 15:24:46
       */

    //相关依赖导入


    const EventsProto = Events.prototype;
    Object.assign(EventsProto, _events.eventsFunObj);

    exports.Events = Events;
});