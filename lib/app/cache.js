"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : kero app cache
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */

var setUserCache = function setUserCache(key, value) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode) return;
    localStorage.setItem(userCode + key, value);
};

var getUserCache = function getUserCache(key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode) return;
    return localStorage.getItem(userCode + key);
};

var removeUserCache = function removeUserCache(key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode) return;
    localStorage.removeItem(userCode + key);
};

var setCache = function setCache(key, value) {
    localStorage.setItem(key, value);
};

var getCache = function getCache(key) {
    return localStorage.getItem(key);
};

var removeCache = function removeCache(key) {
    localStorage.removeItem(key);
};

var setSessionCache = function setSessionCache(key, value) {
    sessionStorage.setItem(key, value);
};

var getSessionCache = function getSessionCache(key) {
    return sessionStorage.getItem(key);
};

var removeSessionCache = function removeSessionCache(key) {
    sessionStorage.removeItem(key);
};

exports.setUserCache = setUserCache;
exports.getUserCache = getUserCache;
exports.removeUserCache = removeUserCache;
exports.setCache = setCache;
exports.getCache = getCache;
exports.removeCache = removeCache;
exports.setSessionCache = setSessionCache;
exports.getSessionCache = getSessionCache;
exports.removeSessionCache = removeSessionCache;