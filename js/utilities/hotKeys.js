var _hotkeys = {};
_hotkeys.special_keys = {
    27: 'esc', 9: 'tab', 32: 'space', 13: 'enter', 8: 'backspace', 145: 'scroll', 20: 'capslock',
    144: 'numlock', 19: 'pause', 45: 'insert', 36: 'home', 46: 'del', 35: 'end', 33: 'pageup',
    34: 'pagedown', 37: 'left', 38: 'up', 39: 'right', 40: 'down', 112: 'f1', 113: 'f2', 114: 'f3',
    115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12'
};

_hotkeys.shift_nums = {
    "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
    "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ":", "'": "\"", ",": "<",
    ".": ">", "/": "?", "\\": "|"
};

_hotkeys.add = function (combi, options, callback) {
    if (u.isFunction(options)) {
        callback = options;
        options = {};
    }
    var opt = {},
        defaults = {type: 'keydown', propagate: false, disableInInput: false, target: document.body, checkParent: true},
        that = this;
    opt = u.extend(opt, defaults, options || {});
    combi = combi.toLowerCase();

    // inspect if keystroke matches
    var inspector = function (event) {
        //event = $.event.fix(event); // jQuery event normalization.
        var element = this//event.target;
        // @ TextNode -> nodeType == 3
        element = (element.nodeType == 3) ? element.parentNode : element;

        if (opt['disableInInput']) { // Disable shortcut keys in Input, Textarea fields
            var target = element;//$(element);
            if (target.tagName == "INPUT" || target.tagName == "TEXTAREA") {
                return;
            }
        }
        var code = event.which,
            type = event.type,
            character = String.fromCharCode(code).toLowerCase(),
            special = that.special_keys[code],
            shift = event.shiftKey,
            ctrl = event.ctrlKey,
            alt = event.altKey,
            propagate = true, // default behaivour
            mapPoint = null;

        // in opera + safari, the event.target is unpredictable.
        // for example: 'keydown' might be associated with HtmlBodyElement
        // or the element where you last clicked with your mouse.
        if (opt.checkParent) {
//              while (!that.all[element] && element.parentNode){
            while (!element['u.hotkeys'] && element.parentNode) {
                element = element.parentNode;
            }
        }

//          var cbMap = that.all[element].events[type].callbackMap;
        var cbMap = element['u.hotkeys'].events[type].callbackMap;
        if (!shift && !ctrl && !alt) { // No Modifiers
            mapPoint = cbMap[special] || cbMap[character]
        }
        // deals with combinaitons (alt|ctrl|shift+anything)
        else {
            var modif = '';
            if (alt) modif += 'alt+';
            if (ctrl) modif += 'ctrl+';
            if (shift) modif += 'shift+';
            // modifiers + special keys or modifiers + characters or modifiers + shift characters
            mapPoint = cbMap[modif + special] || cbMap[modif + character] || cbMap[modif + that.shift_nums[character]]
        }
        if (mapPoint) {
            mapPoint.cb(event);
            if (!mapPoint.propagate) {
                event.stopPropagation();
                event.preventDefault();
                return false;
            }
        }
    };
    // first hook for this element
    var data = opt.target['u.hotkeys'];
    if (!data) {
        opt.target['u.hotkeys'] =  data = {events: {}};
    }
//      if (!_hotkeys.all[opt.target]){
//          _hotkeys.all[opt.target] = {events:{}};
//      }
    if (!data.events[opt.type]) {
        data.events[opt.type] = {callbackMap: {}};
        u.on(opt.target, opt.type, inspector);
        //$.event.add(opt.target, opt.type, inspector);
    }
//      if (!_hotkeys.all[opt.target].events[opt.type]){
//          _hotkeys.all[opt.target].events[opt.type] = {callbackMap: {}}
//          $.event.add(opt.target, opt.type, inspector);
//      }
    data.events[opt.type].callbackMap[combi] = {cb: callback, propagate: opt.propagate};
//      _hotkeys.all[opt.target].events[opt.type].callbackMap[combi] =  {cb: callback, propagate:opt.propagate};
    return u.hotkeys;
};
_hotkeys.remove = function (exp, opt) {
    opt = opt || {};
    target = opt.target || document.body;
    type = opt.type || 'keydown';
    exp = exp.toLowerCase();

    delete target['u.hotkeys'].events[type].callbackMap[exp];
};

_hotkeys.scan = function (element, target) {
    element = element || document.body;
    element.querySelectorAll('[u-enter]').forEach(function(el){
        var enterValue = el.getAttribute('u-enter');
        if (!enterValue) return;
        if (enterValue.substring(0, 1) == '#')
            u.hotkeys.add('enter', {target: this}, function () {
                var _el = element.querySelector(enterValue);
                if (_el){
                    _el.focus();
                }
            });
        else {
            target = target || window
            var func = u.getFunction(target, enterValue)
            u.hotkeys.add('enter', {target: this}, function () {
                func.call(this)
            })
        }
    });
    element.querySelectorAll('[u-hotkey]').forEach(function(el){
        var hotkey = el.getAttribute('u-hotkey');
        if (!hotkey) return;
        u.hotkeys.add(hotkey, function () {
            el.click();
        })

    });
}

u.hotkeys = _hotkeys;
