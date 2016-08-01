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
const on = function (name, callback, one) {
    var self = this, origCb = callback;
    if(Object.prototype.toString.call(name) == '[object Array]') {
        // 数组
        for(var i in name) {
            this.on(name[i], callback);
        }
        return this;
    } else if(typeof name == 'object'){
        // map
        for(var key in name) {
            this.on(key, name[key]);
        }
        return this;
    }
    if(one) {
        callback = function() {
            self.off(name, callback);
            origCb.apply(this, arguments);
        }
    }
    name = name.toLowerCase();
    this._events || (this._events = {});
    var events = this._events[name] || (this._events[name] = []);
    events.push({
        callback: callback
    })
    return this;
}

/**
 * 解绑事件
 * 
**/
const off = function (name, callback) {
    if(Object.prototype.toString.call(name) == '[object Array]') {
        // 数组
        for(var i in name) {
            this.off(name[i], callback);
        }
        return this;
    } else if(typeof name == 'object'){
        // map
        for(var key in name) {
            this.off(key, name[key]);
        }
        return this;
    }
    var cbs = this._events[name];
    if(!cbs) return this;
    if(!callback) {
        // 解绑所有事件
        cbs = null;
    } else {
        for(var i = cbs.length - 1;i >= 0; i--) {
            if(cbs[i] == callback) {
                cbs.splice(i, 1);
            }
        }
    }
    return this;
}

/**
 * 
**/
const one = function (name, callback) {
    this.on(name, callback, 1);
}

/**
 * 触发事件
 */
const trigger = function (name) {
    name = name.toLowerCase()
    if (!this._events || !this._events[name]) return this;
    var args = Array.prototype.slice.call(arguments, 1);
    var events = this._events[name];
    for (var i = 0, count = events.length; i < count; i++) {
        events[i].callback.apply(this, args);
    }
    return this;
}


const getEvent = function (name) {
    name = name.toLowerCase()
    this._events || (this._events = {})
    return this._events[name]
}

export {
    on,
    off,
    one,
    trigger,
    getEvent
}