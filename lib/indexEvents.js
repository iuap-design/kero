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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Events = function Events() {
        _classCallCheck(this, Events);
    };

    var EventsProto = Events.prototype;
    Object.assign(EventsProto, _events.eventsFunObj);

    exports.Events = Events;
});