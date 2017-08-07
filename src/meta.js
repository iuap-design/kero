/**
 * Module : kero dataTable mete
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */


/**
 * 设置meta信息
 * @memberof DataTable
 * @param {string} fieldName 需要设置meta信息的字段名
 * @param {string} key       meta信息的key
 * @param {string} value     meta信息的值
 * @example
 * datatable.setMeta('filed1','type','string')
 */
const setMeta = function(fieldName, key, value) {
    if (!this.meta[fieldName])
        return;
    var oldValue = this.meta[fieldName][key]
    var currRow = this.getCurrentRow();
    this.meta[fieldName][key] = value
    if (this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
    if (key == 'enable')
        this.enableChange(-this.enableChange())
    this.trigger(DataTable.ON_META_CHANGE, {
        eventType: 'dataTableEvent',
        dataTable: this.id,
        field: fieldName,
        meta: key,
        oldValue: oldValue,
        newValue: value
    });
    if (currRow && !currRow.getMeta(fieldName, key, false)) {
        this.trigger(fieldName + '.' + key + '.' + DataTable.ON_CURRENT_META_CHANGE, {
            eventType: 'dataTableEvent',
            dataTable: this.id,
            oldValue: oldValue,
            newValue: value
        });
    }
}


/**
 * 更新meta信息，需要在对应的控件中去监听事件，该方式是想去动态的更改Datatable中的this.options里面的属性的值的配置
 * @memberof DataTable
 * @param  {object} meta 需要更新的meta信息
 * @example
 * var metaObj = {supplier: {meta: {precision:'3', default: '0239900x', display:'显示名称'}}}
 * datatable.updateMeta(metaObj)
 */
const updateMeta = function(meta) {
    if (!meta) {
        return;
    }
    for (var fieldKey in meta) {
        for (var propKey in meta[fieldKey]) {
            var oldValue = this.meta[fieldKey][propKey]
            var newValue = meta[fieldKey][propKey]
            if (propKey === 'default') {
                if (!this.meta[fieldKey]['default']) {
                    this.meta[fieldKey]['default'] = {}
                }
                this.meta[fieldKey]['default'].value = meta[fieldKey][propKey]
            } else if (propKey === 'display') {
                if (!this.meta[fieldKey]['default']) {
                    this.meta[fieldKey]['default'] = {}
                }
                this.meta[fieldKey]['default'].display = meta[fieldKey][propKey]
            } else {
                this.meta[fieldKey][propKey] = meta[fieldKey][propKey]
            }
            if (this.metaChange[fieldKey + '.' + propKey])
                this.metaChange[fieldKey + '.' + propKey](-this.metaChange[fieldKey + '.' + propKey]());

            this.trigger(DataTable.ON_META_CHANGE, {
                eventType: 'dataTableEvent',
                dataTable: this.id,
                field: fieldKey,
                meta: propKey,
                oldValue: oldValue,
                newValue: newValue
            });
        }

    }
}




// 字段不存在时创建字段，fieldName为需要创建的字段
// options.meta为对应的meta信息
const createField = function(fieldName, options) {
    //字段不主动定义，则不创建
    if (this.root.strict == true)
        return;
    //有子表的情况不创建字段
    if (fieldName.indexOf('.') != -1) {
        var fNames = fieldName.split('.');
        var _name = fNames[0];
        for (var i = 0, count = fNames.length; i < count; i++) {
            if (this.meta[_name] && this.meta[_name]['type'] === 'child')
                return;
            if ((i + 1) < count)
                _name = _name + '.' + fNames[i + 1]
        }
    }
    if (!this.meta[fieldName]) {
        this.meta[fieldName] = {}
    }
    if (typeof options === 'object') {
        if (options['meta']) {
            for (var key in options['meta']) {
                //if (!this.meta[fieldName][key]){
                this.meta[fieldName]['meta'][key] = options['meta'][key];
                //}
            }
        } else {
            for (var key in options) {
                //if (!this.meta[fieldName][key]){
                this.meta[fieldName][key] = options[key];
                //}
            }
        }
    }
    // 在顶层dataTable上定义field信息
    if (this.root !== this) {
        var nsArr = this.ns.split('.')
        var _fieldMeta = this.root.meta
        for (var i = 0; i < nsArr.length; i++) {
            _fieldMeta[nsArr[i]] = _fieldMeta[nsArr[i]] || {}
            _fieldMeta[nsArr[i]]['type'] = _fieldMeta[nsArr[i]]['type'] || 'child';
            _fieldMeta[nsArr[i]]['meta'] = _fieldMeta[nsArr[i]]['meta'] || {};
            _fieldMeta = _fieldMeta[nsArr[i]]['meta'];
        }
        if (!_fieldMeta[fieldName]) {
            _fieldMeta[fieldName] = {}
        }
        if (typeof options === 'object') {
            for (var key in options) {
                if (!_fieldMeta[fieldName][key]) {
                    _fieldMeta[fieldName][key] = options[key];
                }
            }
        }
    }

}

export const metaFunObj = {
    setMeta: setMeta,
    updateMeta: updateMeta,
    createField: createField
}
