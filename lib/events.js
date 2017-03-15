(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.events = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Module : kero DataTable events
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-07-30 14:34:01
     */

    /**
     * 为DataTable对象添加监听
     * @memberof DataTable
     * @param  {string|array|object}   name     针对不同用法分别对应监听名称、监听名称对应的数组、监听名称及对应的回调组成的对象
     * @param  {function} [callback] 监听对应的回调函数
     * @param  {boolean}   [one]      是否只执行一次监听，为true则表示只执行一次回调函数，否则每次触发监听都是执行回调函数
     * @return {DataTable}            当前的DataTable对象
     * @example
     * datatable.on(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
     * datatable.on([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
     * datatable.on({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
     */
    const on = function (name, callback, one) {
        var self = this,
            origCb = callback;
        if (Object.prototype.toString.call(name) == '[object Array]') {
            // 数组
            for (var i in name) {
                this.on(name[i], callback);
            }
            return this;
        } else if (typeof name == 'object') {
            // map
            for (var key in name) {
                this.on(key, name[key]);
            }
            return this;
        }
        if (one) {
            callback = function () {
                self.off(name, callback);
                origCb.apply(this, arguments);
            };
        }
        name = name.toLowerCase();
        this._events || (this._events = {});
        var events = this._events[name] || (this._events[name] = []);
        events.push({
            callback: callback
        });
        return this;
    };

    /**
     * 为DataTable对象取消监听
     * @memberof DataTable
     * @param  {string|array|object}   name     针对不同用法分别对应监听名称、监听名称对应的数组、监听名称及对应的回调组成的对象
     * @param  {function} [callback] 监听对应的回调函数
     * @return {DataTable}            当前的DataTable对象
     * @example
     * datatable.off(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
     * datatable.off([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
     * datatable.off({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
     */
    const off = function (name, callback) {
        name = name.toLowerCase();
        if (!this._events) return this;
        if (Object.prototype.toString.call(name) == '[object Array]') {
            // 数组
            for (var i in name) {
                this.off(name[i], callback);
            }
            return this;
        } else if (typeof name == 'object') {
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
     * 为DataTable对象添加只执行一次的监听
     * @memberof DataTable
     * @param  {string|array|object}   name     针对不同用法分别对应监听名称、监听名称对应的数组、监听名称及对应的回调组成的对象
     * @param  {function} [callback] 监听对应的回调函数
     * @example
     * datatable.one(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
     * datatable.one([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
     * datatable.one({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
     */
    const one = function (name, callback) {
        this.on(name, callback, 1);
    };

    /**
     * 触发DataTable对象绑定的事件监听
     * @memberof DataTable
     * @param  {string} name 需要触发的事件监听对应的名称
     * @return {DataTable}            当前的DataTable对象
     * @example
     * datatable.trigger('valuechange')
     */
    const trigger = function (name) {
        name = name.toLowerCase();
        if (!this._events || !this._events[name]) return this;
        var args = Array.prototype.slice.call(arguments, 1);
        var events = this._events[name];
        for (var i = 0, count = events.length; i < count; i++) {
            events[i].callback.apply(this, args);
        }
        return this;
    };

    // 带返回值的trigger，可以获取回调函数的返回值
    const triggerReturn = function (name) {
        name = name.toLowerCase();
        if (!this._events || !this._events[name]) return this;
        var args = Array.prototype.slice.call(arguments, 1);
        var events = this._events[name];
        var flag = true;
        for (var i = 0, count = events.length; i < count; i++) {
            flag = flag && events[i].callback.apply(this, args);
        }
        return flag;
    };

    // 获取监听名称对应的回调函数
    const getEvent = function (name) {
        name = name.toLowerCase();
        this._events || (this._events = {});
        return this._events[name];
    };

    const eventsFunObj = exports.eventsFunObj = {
        on: on,
        off: off,
        one: one,
        trigger: trigger,
        triggerReturn: triggerReturn,
        getEvent: getEvent
    };
});