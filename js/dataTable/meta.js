/**
 * Module : kero dataTable mete
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */


/**
 * 获取meta信息，先取row上的信息，没有时，取dataTable上的信息
 * @param {Object} fieldName
 * @param {Object} key
 * @param {Object} row
 */
var getMeta = function (fieldName, key) {
    if (arguments.length === 0)
        return this.meta;
    else if (arguments.length === 1)
        return this.meta[fieldName];

    if(this.meta[fieldName] && typeof this.meta[fieldName][key] !== 'undefined'){
        return this.meta[fieldName][key];
    }else{
        return null;
    }
    
}

var setMeta = function (fieldName, key, value) {
    if(!this.meta[fieldName])
        return;
    var oldValue = this.meta[fieldName][key]
    var currRow = this.getCurrentRow();
    this.meta[fieldName][key] = value
    if (this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
    //this.metaChange(- this.metaChange())
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
 * example: meta: {supplier: {meta: {precision:'3', default: '0239900x', display:'显示名称'}}}
 */
var updateMeta = function (meta) {
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
    //this.metaChange(- this.metaChange())
}

export {
	getMeta,
	setMeta,
    updateMeta
}