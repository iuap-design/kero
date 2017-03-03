<a name="DataTable"></a>

## DataTable : <code>object</code>
前端数据模型对象


* [DataTable](#DataTable) : <code>object</code>
    * _instance_
        * [.id](#DataTable+id) : <code>string</code>
        * [.strict](#DataTable+strict) : <code>boolean</code>
        * [.meta](#DataTable+meta) : <code>object</code>
        * [.enable](#DataTable+enable) : <code>boolean</code>
        * [.pageSize](#DataTable+pageSize) : <code>number</code>
        * [.pageIndex](#DataTable+pageIndex) : <code>number</code>
        * [.totalPages](#DataTable+totalPages) : <code>number</code>
        * [.pageCache](#DataTable+pageCache) : <code>boolean</code>
        * [.params](#DataTable+params) : <code>object</code>
        * [.master](#DataTable+master) : <code>string</code>
        * [.dateNoConvert](#DataTable+dateNoConvert) : <code>boolean</code>
    * _static_
        * [.copyRow(index, row)](#DataTable.copyRow)
        * [.copyRows(index, rows)](#DataTable.copyRows)
        * [.setData(data, options)](#DataTable.setData)
        * [.setValue(fieldName, value, [row], [ctx])](#DataTable.setValue)

<a name="DataTable+id"></a>

### dataTable.id : <code>string</code>
DataTable对应的唯一标识

<a name="DataTable+strict"></a>

### dataTable.strict : <code>boolean</code>
在设置数据时是否自动创建对应字段，如果为true则不自动创建，如果为false则自动创建缺失的字段

**Default**: <code>false</code>  
<a name="DataTable+meta"></a>

### dataTable.meta : <code>object</code>
DataTable的所有字段属性信息

<a name="DataTable+enable"></a>

### dataTable.enable : <code>boolean</code>
DataTable的是否支持编辑功能

**Default**: <code>true</code>  
<a name="DataTable+pageSize"></a>

### dataTable.pageSize : <code>number</code>
DataTable支持翻页功能时每页显示数据条数

**Default**: <code>20</code>  
<a name="DataTable+pageIndex"></a>

### dataTable.pageIndex : <code>number</code>
DataTable支持翻页功能时当前页码

**Default**: <code>0</code>  
<a name="DataTable+totalPages"></a>

### dataTable.totalPages : <code>number</code>
DataTable支持翻页功能时总页数

**Default**: <code>0</code>  
<a name="DataTable+pageCache"></a>

### dataTable.pageCache : <code>boolean</code>
DataTable的是否支持前端缓存，支持前端缓存则前端会存储所有页的数据信息，否则只保存当前页的数据信息。如果使用前端缓存则需要使用框架封装的fire方法来与后台进行交互

**Default**: <code>false</code>  
<a name="DataTable+params"></a>

### dataTable.params : <code>object</code>
使用者自定义的属性合集，框架内部不会针对此属性进行特殊处理，仅用于设置及获取

<a name="DataTable+master"></a>

### dataTable.master : <code>string</code>
使用者自定义的属性，框架内部不会针对此属性进行特殊处理，仅用于设置及获取。

<a name="DataTable+dateNoConvert"></a>

### dataTable.dateNoConvert : <code>boolean</code>
通过getSimpleData获取数据时，日期字段是否转化为long型，如果为true时不进行转化，为false时转化为long型

**Default**: <code>false</code>  
<a name="DataTable.copyRow"></a>

### DataTable.copyRow(index, row)
在指定index位置插入单条数据行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> | 数据行插入之后的位置 |
| row | <code>object</code> | 数据行信息 |

**Example**  
```js
var row = {   field1:'value1'}datatable.copyRow(1,row)
```
<a name="DataTable.copyRows"></a>

### DataTable.copyRows(index, rows)
在指定index位置插入多条数据行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> | 数据行插入之后的位置 |
| rows | <code>array</code> | 存储数据行信息的数组 |

**Example**  
```js
var row1 = {   field1:'value1'}var row2 = {   field1:'value1'}datatable.copyRow(1,【row1,row2】)
```
<a name="DataTable.setData"></a>

### DataTable.setData(data, options)
设置数据信息


| 参数 | 类型 | Default | 描述 |
| --- | --- | --- | --- |
| data | <code>object</code> |  | 需要设置的数据信息，必须包含rows或者pages属性 |
| [data.rows] | <code>array</code> |  | 数据信息中的行信息数组 |
| [data.pages] | <code>array</code> |  | 数据信息中的page对象数组 |
| [data.pageIndex] | <code>number</code> | <code>DataTable对象当前的页码</code> | 数据信息中的当前页码 |
| [data.pageSize] | <code>number</code> | <code>DataTable对象当前的每页显示条数</code> | 数据信息中的每页显示条数 |
| [data.totalPages] | <code>number</code> | <code>DataTable对象当前的总页数</code> | 数据信息中的总页数 |
| [data.totalRow] | <code>number</code> | <code>如果存在rows则为rows的长度，否则为DataTable对象当前的总条数</code> | 数据信息中的总条数 |
| [data.select] | <code>number</code> |  | 数据信息中的选中行行号 |
| [data.focus] | <code>number</code> |  | 数据信息中的focus行行号 |
| options | <code>object</code> |  | 设置数据时的配置参数 |
| options.unSelect | <code>boolean</code> | <code>false</code> | 是否默认选中第一行，如果为true则不选中第一行，否则选中第一行 |

**Example**  
```js
var data = {   rows:[{     filed1:'value1',     field2:'value2'   },{     filed1:'value11',     field2:'value21'   }],   select:0,}datatable.setData(data,{ unSelect:true})
```
<a name="DataTable.setValue"></a>

### DataTable.setValue(fieldName, value, [row], [ctx])
设置对应行对应字段的值


| 参数 | 类型 | Default | 描述 |
| --- | --- | --- | --- |
| fieldName | <code>string</code> |  | 需要设置的字段 |
| value | <code>string</code> |  | 需要设置的值 |
| [row] | <code>u.row</code> | <code>当前行</code> | 需要设置的u.row对象， |
| [ctx] | <code>\*</code> |  | 自定义属性，在valuechange监听传入对象中可通过ctx获取此处设置 |

**Example**  
```js
datatable.setValue('filed1','value1')var row = datatable.getRow(1)datatable.setValue('filed1','value1',row)datatable.setValue('filed1','value1',row,'any')
```
