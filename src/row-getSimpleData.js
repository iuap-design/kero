/**
 * Module : kero dataTable row getSimpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
import {_dateToUTCString} from './row-util';
import {isEmptyObject} from 'tinper-sparrow/src/util';

// 获取数据的核心方法
const _getSimpleData = function(rowObj, data){
    var _data = {};
    var meta = rowObj.parent.getMeta() || {};
    for(var key in data){
        if (key === 'meta' || isEmptyObject(data[key])){
            continue;
        }else if (data[key].isChild) {
            _data[key] = data[key].value?data[key].value.getSimpleData():{};
        }else if (key === '$data'){  //处理一维数组： [1,2,3]
            _data = data[key].value
        }else if (typeof data[key].value !== 'undefined'){
           //如果类型为boolean，无论值为false、true都应该等于他本身
            if(meta[key] && meta[key].type==='boolean'){
                _data[key] = data[key].value?true:false;//默认值可能是null
            }else{
                _data[key] = data[key].value;
            }
            if (meta[key] && meta[key].type) {
                var obj = {
                    meta: meta,
                    data: data,
                    key: key
                }
                _data[key] = rowObj.formatValueFun(obj,rowObj.parent.dateNoConvert);

            }
        }else if(!data[key].value){
            _data[key] = data[key].value;
        }
        else{
            _data[key] = _getSimpleData(rowObj, data[key])
        }
    }
    return _data;

}

// 对于日期获取值时进行转换
const formatValueFun = function(obj,isDateNoConvert){
    var meta = obj.meta,data = obj.data, key = obj.key;
    if (!isDateNoConvert &&(meta[key].type == 'date' || meta[key].type == 'datetime')) {
        return  _dateToUTCString(data[key].value)
    }
    return data[key].value;
}

/**
 * 获取数据信息
 * @memberof Row
 * @param  {object} [options] 获取数据信息时的配置参数
 * @param  {array} [options.fields] 获取数据信息时是否制定字段值
 * @return {object}         数据信息
 * @example
 * row.getSimpleData()
 * row.getSimpleData({fields:['field1','field2']})
 */
const getSimpleData = function(options){
    options = options || {}
    var fields = options['fields'] || null;
    var meta = this.parent.getMeta();
    var data = this.data;
    var _data = _getSimpleData(this, data); //{};
    var _fieldsData = {};
    if (fields){
        for (var key in _data){
            if (fields.indexOf(key) != -1){
                _fieldsData[key] = _data[key];
            }
        }
        return _fieldsData;
    }
    return _data;

};

export {
    formatValueFun,
	getSimpleData
}
