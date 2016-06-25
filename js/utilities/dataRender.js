/**
 * 处理数据显示格式
 */

u.floatRender = function (value, precision) {
    var trueValue = value;
    if (typeof value === 'undefined' || value === null)
        return value;
    //value 为 ko对象
    if (typeof value === 'function')
        trueValue = value();
    var maskerMeta = u.core.getMaskerMeta('float') || {};
    if (typeof precision === 'number')
        maskerMeta.precision = precision;
    var formater = new u.NumberFormater(maskerMeta.precision);
    var masker = new NumberMasker(maskerMeta);
    return masker.format(formater.format(trueValue)).value;
};

u.integerRender = function (value) {
    var trueValue = value;
    if (typeof value === 'undefined' || value === null)
        return value;
    //value 为 ko对象
    if (typeof value === 'function')
        trueValue = value();
    return trueValue
};

var _dateRender = function(value, format, type){
    var trueValue = value;
    if (typeof value === 'undefined' || value === null)
        return value
    //value 为 ko对象
    if (typeof value === 'function')
        trueValue = value()
    var maskerMeta = u.core.getMaskerMeta(type) || {}
    if (typeof format != 'undefined')
        maskerMeta.format = format
    var maskerValue = u.date.format(trueValue, maskerMeta.format);
    return maskerValue;
}

u.dateRender = function (value, format) {
    return _dateRender(value, format, 'date');
};

u.dateTimeRender = function (value, format) {
    return _dateRender(value, format, 'datetime');
};

u.timeRender = function (value, format) {
    return _dateRender(value, format, 'time');
};

u.percentRender = function (value) {
    var trueValue = value
    if (typeof value === 'undefined' || value === null)
        return value
    //value 为 ko对象
    if (typeof value === 'function')
        trueValue = value()
    var maskerMeta = u.core.getMaskerMeta('percent') || {}
    var masker = new PercentMasker(maskerMeta);
    var maskerValue = masker.format(trueValue);
    return (maskerValue && maskerValue.value) ? maskerValue.value : '';
};

u.dateToUTCString = function (date) {
    if (!date) return ''
    if (date.indexOf("-") > -1)
        date = date.replace(/\-/g, "/");
    var utcString = Date.parse(date);
    if (isNaN(utcString)) return "";
    return utcString;
}
