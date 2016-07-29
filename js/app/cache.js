/**
 * Module : kero app cache
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */

var setUserCache = function (key, value) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode)return;
    localStorage.setItem(userCode + key, value);
}

var getUserCache = function (key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode)return;
    return localStorage.getItem(userCode + key);
}

var removeUserCache = function (key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode)return;
    localStorage.removeItem(userCode + key);
}

var setCache = function (key, value) {
    localStorage.setItem(key, value);
}

var getCache = function (key) {
    return localStorage.getItem(key);
}

var removeCache = function (key) {
    localStorage.removeItem(key)
}

var setSessionCache = function (key, value) {
    sessionStorage.setItem(key, value)
}

var getSessionCache = function (key) {
    return sessionStorage.getItem(key)
}

var removeSessionCache = function (key) {
    sessionStorage.removeItem(key)
}

export {
    setUserCache,
    getUserCache,
    removeUserCache,
    setCache,
    getCache,
    removeCache,
    setSessionCache,
    getSessionCache,
    removeSessionCache
}