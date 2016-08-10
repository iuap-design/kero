'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Module : kero dataTable events
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-30 14:34:01
 */

/**
 * 绑定事件
 * 支持的格式： 1. on(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
 * 2. on([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
 * 3. on({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
 */
var on = function on(name, _callback, one) {
    var self = this,
        origCb = _callback;
    if (Object.prototype.toString.call(name) == '[object Array]') {
        // 数组
        for (var i in name) {
            this.on(name[i], _callback);
        }
        return this;
    } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
        // map
        for (var key in name) {
            this.on(key, name[key]);
        }
        return this;
    }
    if (one) {
        _callback = function callback() {
            self.off(name, _callback);
            origCb.apply(this, arguments);
        };
    }
    name = name.toLowerCase();
    this._events || (this._events = {});
    var events = this._events[name] || (this._events[name] = []);
    events.push({
        callback: _callback
    });
    return this;
};

/**
 * 解绑事件
 * 
**/
var off = function off(name, callback) {
    if (Object.prototype.toString.call(name) == '[object Array]') {
        // 数组
        for (var i in name) {
            this.off(name[i], callback);
        }
        return this;
    } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
        // map
        for (var key in name) {
            this.off(key, name[key]);
        }
        return this;
    }
    var cbs = this._events[name];
    if (!cbs) return this;
    if (!callback) {
        // 解绑所有事件
        cbs = null;
    } else {
        for (var i = cbs.length - 1; i >= 0; i--) {
            if (cbs[i] == callback) {
                cbs.splice(i, 1);
            }
        }
    }
    return this;
};

/**
 * 
**/
var one = function one(name, callback) {
    this.on(name, callback, 1);
};

/**
 * 触发事件
 */
var trigger = function trigger(name) {
    name = name.toLowerCase();
    if (!this._events || !this._events[name]) return this;
    var args = Array.prototype.slice.call(arguments, 1);
    var events = this._events[name];
    for (var i = 0, count = events.length; i < count; i++) {
        events[i].callback.apply(this, args);
    }
    return this;
};

var getEvent = function getEvent(name) {
    name = name.toLowerCase();
    this._events || (this._events = {});
    return this._events[name];
};

exports.on = on;
exports.off = off;
exports.one = one;
exports.trigger = trigger;
exports.getEvent = getEvent;