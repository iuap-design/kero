/**
 * Module : kero dataTable getMete
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */


/**
 * 获取meta信息，先取row上的信息，没有时，取dataTable上的信息
 * @param {Object} fieldName
 * @param {Object} key
 * @param {Object} row
 */
const getMeta = function (fieldName, key) {
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


const getRowMeta = function (fieldName, key) {
    var row = this.getCurrentRow()
    if (row)
        return row.getMeta(fieldName, key)
    else
        return this.getMeta(fieldName, key)
}

export {
	getMeta,
    getRowMeta
}