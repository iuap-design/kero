/**
 * Module : kero dataTable row getMeta
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */

import {
    rowUtilFunObj
} from './row-util';

/**
 * 获取字段的属性
 * @memberof Row
 * @param  {string} fieldName   字段名
 * @param  {string} key         属性名
 * @param  {boolean} [fetchParent=false] 未定义时是否去DataTable对象查找，为true则未定义时去DataTable对象查找
 * @return {string}             属性值
 * @example
 * row.getMeta('field1','type')
 * row.getMeta('field1','type',true)
 */
const getMeta = function(fieldName, key, fetchParent) {
    if (arguments.length == 0) {
        var mt = {}
        for (var k in this.data) {
            mt[k] = this.data[k].meta ? this.data[k].meta : {}
        }
        return mt
    }
    var meta = rowUtilFunObj._getField(this, fieldName).meta
    if (meta && meta[key] !== undefined && meta[key] !== null && meta[key] !== '')
        return meta[key]
    else if (typeof fetchParent == 'undefined' || fetchParent != false)
        return this.parent.getMeta(fieldName, key)
    return undefined;
}

export const rowGetMetaFunObj = {
    getMeta: getMeta
}
