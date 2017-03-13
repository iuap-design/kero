<a name="Row"></a>

## Row : <code>object</code>
前端数据模型行对象


* [Row](#Row) : <code>object</code>
    * _instance_
        * [.rowId](#Row+rowId) : <code>string</code>
        * [.status](#Row+status) : <code>string</code>
        * [.parent](#Row+parent)
    * _static_
        * [.setValue(fieldName, value, [ctx])](#Row.setValue)
        * [.setData(data, [subscribe], [options])](#Row.setData)
        * [.getValue(fieldName)](#Row.getValue) ⇒ <code>string</code>
        * [.getData()](#Row.getData) ⇒ <code>object</code>
        * [.getSimpleData([options])](#Row.getSimpleData) ⇒ <code>object</code>
        * [.setSimpleData(data, [status])](#Row.setSimpleData)
        * [.toggleSelect([type])](#Row.toggleSelect)
        * [.getMeta(fieldName, key, [fetchParent])](#Row.getMeta) ⇒ <code>string</code>
        * [.setMeta(fieldName, key, value)](#Row.setMeta)
        * [.ref(fieldName)](#Row.ref)
        * [.refMeta(fieldName, key)](#Row.refMeta)
        * [.refCombo(fieldName, datasource)](#Row.refCombo)
        * [.refDate(fieldName, format)](#Row.refDate)

<a name="Row+rowId"></a>

### row.rowId : <code>string</code>
当前行的唯一标识

<a name="Row+status"></a>

### row.status : <code>string</code>
当前行的状态
Row.STATUS.NORMAL('nrm') ：前后端都存在并且保持一致
Row.STATUS.UPDATE('upd') ：前后端都存在并且前端进行了修改
Row.STATUS.NEW('new') ：后端不存在，前端存在的数据
Row.STATUS.DELETE('del') ：后端请求返回的状态，前端判断为此状态则将数据删除
Row.STATUS.FALSE_DELETE('fdel') ：后端存在，前端不存在的数据

**Default**: <code>&quot;Row.STATUS.NEW&quot;</code>  
<a name="Row+parent"></a>

### row.parent
当前行对应的DataTable对象

<a name="Row.setValue"></a>

### Row.setValue(fieldName, value, [ctx])
设置对应字段的值


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 需要设置的字段 |
| value | <code>string</code> | 需要设置的值 |
| [ctx] | <code>\*</code> | 自定义属性，在valuechange监听传入对象中可通过ctx获取此处设置 |

**Example**  
```js
row.setValue('filed1','value1') // 设置字段值
row.setValue('filed1','value1','ctx') //设置字段值，同时传入自定义数据
```
<a name="Row.setData"></a>

### Row.setData(data, [subscribe], [options])
设置row的数据信息


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| data | <code>object</code> | 需要设置的配置信息 |
| [subscribe] | <code>boolean</code> | 是否触发监听，true表示触发监听 |
| [options] | <code>object</code> | 设置数据信息是的配置参数 |
| [options.fieldFlag] | <code>boolean</code> | 未设置的meta是否进行存储，如果为true则未设置的meta也进行存储 var data = {   filed1:'value1',   field2:'value2' } row.setData(data) row.setData(data,false) row.setData(data),false,{fieldFlag:true}) |

<a name="Row.getValue"></a>

### Row.getValue(fieldName) ⇒ <code>string</code>
获取row中某一字段的值

**返回值**: <code>string</code> - 字段值  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 字段名 |

**Example**  
```js
row.getValue('field1')
```
<a name="Row.getData"></a>

### Row.getData() ⇒ <code>object</code>
获取数据信息

**返回值**: <code>object</code> - 格式如下：{'id': this.rowId, 'status': this.status, data: data}  
**Example**  
```js
row.getData()
```
<a name="Row.getSimpleData"></a>

### Row.getSimpleData([options]) ⇒ <code>object</code>
获取数据信息

**返回值**: <code>object</code> - 数据信息  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| [options] | <code>object</code> | 获取数据信息时的配置参数 |
| [options.fields] | <code>array</code> | 获取数据信息时是否制定字段值 |

**Example**  
```js
row.getSimpleData()
row.getSimpleData({fields:['field1','field2']})
```
<a name="Row.setSimpleData"></a>

### Row.setSimpleData(data, [status])
设置数据, 只设置字段值


| 参数 | 类型 | Default | 描述 |
| --- | --- | --- | --- |
| data | <code>object</code> |  | 数据信息 |
| [status] | <code>boject</code> | <code>nrm</code> | 数据行状态 |

**Example**  
```js
var data = {
  filed1:'value1',
  field2:'value2'
}
datatable.setSimpleData(data)
datatable.setSimpleData(data,'upd')
```
<a name="Row.toggleSelect"></a>

### Row.toggleSelect([type])
切换数据行的选中状态


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| [type] | <code>boolean</code> | 执行选中操作时，如果为single则取消其他行的选中状态，否则只修改当前行的选中状态 |

**Example**  
```js
row.toggleSelect()
row.toggleSelect('single')
row.toggleSelect('multi')
```
<a name="Row.getMeta"></a>

### Row.getMeta(fieldName, key, [fetchParent]) ⇒ <code>string</code>
获取字段的属性

**返回值**: <code>string</code> - 属性值  

| 参数 | 类型 | Default | 描述 |
| --- | --- | --- | --- |
| fieldName | <code>string</code> |  | 字段名 |
| key | <code>string</code> |  | 属性名 |
| [fetchParent] | <code>boolean</code> | <code>false</code> | 未定义时是否去DataTable对象查找，为true则未定义时去DataTable对象查找 |

**Example**  
```js
row.getMeta('field1','type')
row.getMeta('field1','type',true)
```
<a name="Row.setMeta"></a>

### Row.setMeta(fieldName, key, value)
设置meta信息


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 需要设置meta信息的字段名 |
| key | <code>string</code> | meta信息的key |
| value | <code>string</code> | meta信息的值 |

**Example**  
```js
row.setMeta('filed1','type','string')
```
<a name="Row.ref"></a>

### Row.ref(fieldName)
为某个字段绑定监听，当字段发生改变时触发对应方法


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 绑定的字段名 |

**Example**  
```js
row.ref('field1').subscribe(function(){})
```
<a name="Row.refMeta"></a>

### Row.refMeta(fieldName, key)
绑定字段属性，当字段属性发生改变时触发对应方法


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 绑定的字段名 |
| key | <code>string</code> | 绑定的属性key |

**Example**  
```js
row.refMeta('field1','type').subscribe(function(){})
```
<a name="Row.refCombo"></a>

### Row.refCombo(fieldName, datasource)
为某个字段绑定监听，当字段发生改变时触发对应方法，针对下拉字段根据key转化为对应的value


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 绑定的字段名 |
| datasource | <code>string</code> | 下拉数据源变量名 |

**Example**  
```js
row.refCombo('field1','source1').subscribe(function(){})
```
<a name="Row.refDate"></a>

### Row.refDate(fieldName, format)
为某个字段绑定监听，当字段发生改变时触发对应方法，针对日期字段进行格式化


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 绑定的字段名 |
| format | <code>string</code> | 格式化规则 |

**Example**  
```js
row.refDate('field1','YYYY-MM-DD').subscribe(function(){})
```
