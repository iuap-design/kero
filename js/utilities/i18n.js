//
//if (window.i18n) {
//    var scriptPath = getCurrentJsPath(),
//        _temp = scriptPath.substr(0, scriptPath.lastIndexOf('/')),
//        __FOLDER__ = _temp.substr(0, _temp.lastIndexOf('/'))
//    u.uuii18n = u.extend({}, window.i18n)
//    u.uuii18n.init({
//        postAsync: false,
//        getAsync: false,
//        fallbackLng: false,
//        ns: {namespaces: ['uui-trans']},
//        resGetPath: __FOLDER__ + '/locales/__lng__/__ns__.json'
//    })
//}

window.trans = u.trans = function (key, dftValue) {
    return  u.uuii18n ?  u.uuii18n.t('uui-trans:' + key) : dftValue
}

