/**
 * Module : kero app cache
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */

const setUserCache = function (key, value) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode)return;
    localStorage.setItem(userCode + key, value);
}

const getUserCache = function (key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode)return;
    return localStorage.getItem(userCode + key);
}

const removeUserCache = function (key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode)return;
    localStorage.removeItem(userCode + key);
}

const setCache = function (key, value) {
    localStorage.setItem(key, value);
}

const getCache = function (key) {
    return localStorage.getItem(key);
}

const removeCache = function (key) {
    localStorage.removeItem(key)
}

const setSessionCache = function (key, value) {
    sessionStorage.setItem(key, value)
}

const getSessionCache = function (key) {
    return sessionStorage.getItem(key)
}

const removeSessionCache = function (key) {
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