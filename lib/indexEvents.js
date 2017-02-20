'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = undefined;

var _events = require('./events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Module : Kero webpack entry events index
                                                                                                                                                           * Author : liuyk(liuyuekai@yonyou.com)
                                                                                                                                                           * Date   : 2016-08-09 15:24:46
                                                                                                                                                           */

//相关依赖导入


var Events = function Events() {
  _classCallCheck(this, Events);
};

Events.prototype.on = _events.on;
Events.prototype.off = _events.off;
Events.prototype.one = _events.one;
Events.prototype.trigger = _events.trigger;
Events.prototype.getEvent = _events.getEvent;

exports.Events = Events;