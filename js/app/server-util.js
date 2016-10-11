/**
 * Module : kero app serverEvent util
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-29 09:34:01
 */
import {each} from 'tinper-sparrow/js/util';
import {trigger} from 'tinper-sparrow/js/event';
import {env} from 'tinper-sparrow/js/env';

const setCompression = function (compression) {
    if (!env.isIE8 && !window.pako && compression == true)
        alert("can't compression, please include  pako!")
    else
        this.compression = compression
}

const addParameter = function (key, value) {
    this.params[key] = value
    return this
}

const setEvent = function (event) {
    this.event = _formatEvent(event)
    return this
}

var _formatEvent = function (event) {
    return event
}

const getData = function () {
    var envJson = ko.utils.stringifyJson(this.app.getEnvironment()),
        datasJson = ko.utils.stringifyJson(this.datas, function replacer(key, value) {
          if (typeof value === "undefined" || value == null) {
            return '';
          }
          return value;
        }),
        compressType = '',
        compression = false
    if (window.trimServerEventData) {
        datasJson = window.trimServerEventData(datasJson);
    }
    if (this.compression) {
        if (!env.isIE8 && window.pako) {
            envJson = encodeBase64(window.pako.gzip(envJson));
            datasJson = encodeBase64(window.pako.gzip(datasJson));
            compression = true
            compressType = 'gzip'
        }
    }
    return {
        environment: envJson,
        dataTables: datasJson,
        compression: compression,
        compressType: compressType
    }
}



const updateDom = function () {
    each(dom, function (i, n) {
        var vo = n.two
        var key = n.one;
        _updateDom(key, vo)
    });
}

//TODO 去除jQuery后有问题待修改
function _updateDom(key, vos) {
    for (var i in vos) {
        var vo = vos[i]
        for (var key in vo) {
            var props = vo[key]
            if (key == 'trigger') {
                trigger(key,props[0]);
            }
            else {
                if (u.isArray(props)) {
                    each(props, function (i, n) {
                        key[i](n)
                    });
                }
                else
                    try {
                        key[i](vo)
                    } catch (error) {
                        key[i](vo[i])
                    }
            }
        }
    }
}

export {
    setCompression,
    addParameter,
    setEvent,
    getData,
    updateDom
}