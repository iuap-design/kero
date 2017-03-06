/**
 * Module : kero dataTable page getMeta
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 获取指定行的meta信息
 * @param  {number} rowIndex  行索引
 * @param  {string} fieldName 需要获取的字段
 * @param  {string} key       需要获取的字段指定meta信息
 * @return {object}           meta信息
 * @example
 * page.getRowMeta(1,'field1','type')
 */
const getRowMeta = function (rowIndex, fieldName, metaName) {
    var row = this.rows[rowIndex]
    if (row) {
        var meta = row[fieldName].meta
        if (!meta)
            return null
        else
            return meta[metaName]
    }
    return null
}

export{
	getRowMeta
}
