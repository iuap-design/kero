'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateDom = exports.getData = exports.setEvent = exports.addParameter = exports.setCompression = undefined;

var _util = require('neoui-sparrow/js/util');

var _event = require('neoui-sparrow/js/event');

/**
 * Module : kero app serverEvent util
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */
var setCompression = function setCompression(compression) {
    if (!iweb.browser.isIE8 && !window.pako && compression == true) iweb.log.error("can't compression, please include  pako!");else this.compression = compression;
};

var addParameter = function addParameter(key, value) {
    this.params[key] = value;
    return this;
};

var setEvent = function setEvent(event) {
    this.event = _formatEvent(event);
    return this;
};

var _formatEvent = function _formatEvent(event) {
    return event;
};

var getData = function getData() {
    var envJson = ko.utils.stringifyJson(this.app.getEnvironment()),
        datasJson = ko.utils.stringifyJson(this.datas, function replacer(key, value) {
        if (typeof value === "undefined" || value == null) {
            return '';
        }
        return value;
    }),
        compressType = '',
        compression = false;
    if (window.trimServerEventData) {
        datasJson = window.trimServerEventData(datasJson);
    }
    if (this.compression) {
        if (!iweb.browser.isIE8 && window.pako) {
            envJson = encodeBase64(window.pako.gzip(envJson));
            datasJson = encodeBase64(window.pako.gzip(datasJson));
            compression = true;
            compressType = 'gzip';
        }
    }
    return {
        environment: envJson,
        dataTables: datasJson,
        compression: compression,
        compressType: compressType
    };
};

var updateDom = function updateDom() {
    (0, _util.each)(dom, function (i, n) {
        var vo = n.two;
        var key = n.one;
        _updateDom(key, vo);
    });
};

//TODO 去除jQuery后有问题待修改
function _updateDom(key, vos) {
    for (var i in vos) {
        var vo = vos[i];
        for (var key in vo) {
            var props = vo[key];
            if (key == 'trigger') {
                (0, _event.trigger)(key, props[0]);
            } else {
                if (u.isArray(props)) {
                    (0, _util.each)(props, function (i, n) {
                        key[i](n);
                    });
                } else try {
                    key[i](vo);
                } catch (error) {
                    key[i](vo[i]);
                }
            }
        }
    }
}

exports.setCompression = setCompression;
exports.addParameter = addParameter;
exports.setEvent = setEvent;
exports.getData = getData;
exports.updateDom = updateDom;