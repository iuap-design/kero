/**
 * Module : kero dataTable simpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */
import {isArray} from 'tinper-sparrow/js/util';

/**
 * 设置数据, 只设置字段值
 * @param {array} data
 *options{} unSelect为true：不选中，为false则选中，默认选中0行
 */
const setSimpleData = function(data,options){
    this.removeAllRows();
    this.cachedPages = [];
    this.focusIndex(-1);
    this.selectedIndices([]);

    if (!data){
        // throw new Error("dataTable.setSimpleData param can't be null!");
        return;
    }

    var rows = [];
    if (!isArray(data))
        data = [data];
    for (var i =0; i< data.length; i++){
        var _data = data[i];
        /* 判断data中的字段在datatable中是否存在，如果不存在则创建 */
        // for(var f in _data){
        //     this.createField(f)
        // }
        if (typeof data[i] !== 'object')
            _data = {$data:data[i]}
        rows.push({
            status: Row.STATUS.NORMAL,
            data: _data
        })
    }
    var _data = {
        rows: rows
    }
    if(options) {
        if(typeof options.fieldFlag == undefined){
            options.fieldFlag = true;
        }
    }
    this.setData(_data,options);
};


/**
 * 追加数据
 * @param data
 */
const addSimpleData = function(data, status){
    if (!data){
        throw new Error("dataTable.addSimpleData param can't be null!");
    }
    if (!isArray(data))
        data = [data];
    for (var i =0; i< data.length; i++){
        var r = this.createEmptyRow();
        r.setSimpleData(data[i],status);
    }

}

export {
	setSimpleData,
	addSimpleData
}
