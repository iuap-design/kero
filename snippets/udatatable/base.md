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
        * [.isEnable([fieldName])](#DataTable.isEnable) ⇒ <code>boolean</code>
        * [.setEnable(enable)](#DataTable.setEnable)
        * [.getCurrentRow()](#DataTable.getCurrentRow) ⇒ <code>null</code> &#124; <code>u.Row</code>
        * [.getCurrentIndex()](#DataTable.getCurrentIndex) ⇒ <code>number</code>
        * [.getData()](#DataTable.getData) ⇒ <code>array</code>
        * [.getDataByRule(rule)](#DataTable.getDataByRule) ⇒ <code>array</code>
        * [.getRow(index)](#DataTable.getRow) ⇒ <code>object</code>
        * [.getRowByRowId(rowid)](#DataTable.getRowByRowId) ⇒ <code>Row</code>
        * [.getRowIndex(需要获取索引的row对象)](#DataTable.getRowIndex) ⇒ <code>\*</code>
        * [.getRowsByField(field, value)](#DataTable.getRowsByField) ⇒ <code>array</code>
        * [.getRowByField(field, value)](#DataTable.getRowByField) ⇒ <code>u.Row</code>
        * [.getAllRows()](#DataTable.getAllRows) ⇒ <code>array</code>
        * [.getAllPageRows()](#DataTable.getAllPageRows) ⇒ <code>array</code>
        * [.getChangedDatas(withEmptyRow)](#DataTable.getChangedDatas) ⇒ <code>array</code>
        * [.getChangedRows()](#DataTable.getChangedRows) ⇒ <code>array</code>
        * [.getValue(fieldName, [row])](#DataTable.getValue) ⇒ <code>string</code>
        * [.getIndexByRowId(rowId)](#DataTable.getIndexByRowId)
        * [.getAllDatas()](#DataTable.getAllDatas) ⇒ <code>array</code>
        * [.getRowIdsByIndices(indices)](#DataTable.getRowIdsByIndices) ⇒ <code>array</code>
        * [.getFocusRow()](#DataTable.getFocusRow) ⇒ <code>u.Row</code>
        * [.getFocusIndex()](#DataTable.getFocusIndex) ⇒ <code>number</code>
        * [.getMeta([fieldName], [key])](#DataTable.getMeta) ⇒ <code>object</code>
        * [.getRowMeta([fieldName], [key])](#DataTable.getRowMeta) ⇒ <code>object</code>
        * [.get参数(key)](#DataTable.get参数) ⇒ <code>\*</code>
        * [.getSelectedIndex()](#DataTable.getSelectedIndex) ⇒ <code>number</code>
        * [.getSelectedIndices()](#DataTable.getSelectedIndices) ⇒ <code>array</code>
        * [.getSelectedDatas([withEmptyRow])](#DataTable.getSelectedDatas) ⇒ <code>array</code>
        * [.getSelectedRows()](#DataTable.getSelectedRows) ⇒ <code>array</code>
        * [.getSimpleData([options])](#DataTable.getSimpleData) ⇒ <code>array</code>
        * [.setMeta(fieldName, key, value)](#DataTable.setMeta)
        * [.updateMeta(meta)](#DataTable.updateMeta)
        * [.add参数(key, value)](#DataTable.add参数)
        * [.add参数s(params)](#DataTable.add参数s)
        * [.refSelectedRows(fieldName)](#DataTable.refSelectedRows)
        * [.ref(fieldName)](#DataTable.ref)
        * [.refMeta(fieldName, key)](#DataTable.refMeta)
        * [.refRowMeta(fieldName, key)](#DataTable.refRowMeta)
        * [.refEnable(fieldName)](#DataTable.refEnable)
        * [.removeRowByRowId(rowId)](#DataTable.removeRowByRowId)
        * [.removeRow(index)](#DataTable.removeRow)
        * [.removeAllRows()](#DataTable.removeAllRows)
        * [.removeRows(indices)](#DataTable.removeRows)
        * [.clear()](#DataTable.clear)
        * [.addRow(row)](#DataTable.addRow)
        * [.addRows(rows)](#DataTable.addRows)
        * [.insertRow(index, row)](#DataTable.insertRow)
        * [.insertRows(index, rows)](#DataTable.insertRows)
        * [.createEmptyRow()](#DataTable.createEmptyRow) ⇒ <code>u.Row</code>
        * [.setAllRowsSelect()](#DataTable.setAllRowsSelect)
        * [.setRowSelect(index)](#DataTable.setRowSelect)
        * [.setRowsSelect(indices)](#DataTable.setRowsSelect)
        * [.addRowSelect(index)](#DataTable.addRowSelect)
        * [.addRowsSelect(indices)](#DataTable.addRowsSelect)
        * [.setAllRowsUnSelect([options])](#DataTable.setAllRowsUnSelect)
        * [.setRowUnSelect(index)](#DataTable.setRowUnSelect)
        * [.setRowsUnSelect(indices)](#DataTable.setRowsUnSelect)
        * [.toggleAllSelect()](#DataTable.toggleAllSelect)
        * [.setRowFocus(index, [quiet], [force])](#DataTable.setRowFocus)
        * [.setRowUnFocus()](#DataTable.setRowUnFocus)
        * [.setSimpleData(data, [options])](#DataTable.setSimpleData)
        * [.addSimpleData(data, status)](#DataTable.addSimpleData)
        * [.on(name, [callback], [one])](#DataTable.on) ⇒ <code>[DataTable](#DataTable)</code>
        * [.off(name, [callback])](#DataTable.off) ⇒ <code>[DataTable](#DataTable)</code>
        * [.one(name, [callback])](#DataTable.one)
        * [.trigger(name)](#DataTable.trigger) ⇒ <code>[DataTable](#DataTable)</code>

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
var row = {
   field1:'value1'
}
datatable.copyRow(1,row)
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
var row1 = {
   field1:'value1'
}
var row2 = {
   field1:'value1'
}
datatable.copyRow(1,[row1,row2])
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
var data = {
   rows:[{
     filed1:'value1',
     field2:'value2'
   },{
     filed1:'value11',
     field2:'value21'
   }],
   select:0,
}
var op = {
    unSelect:true
}
datatable.setData(data,op)
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
datatable.setValue('filed1','value1') //设置当前行字段值
var row = datatable.getRow(1)
datatable.setValue('filed1','value1',row) //设置在指定行字段值
datatable.setValue('filed1','value1',row,'ctx') //设置在指定行字段值，同时传入自定义数据
```
<a name="DataTable.isEnable"></a>

### DataTable.isEnable([fieldName]) ⇒ <code>boolean</code>
判断DataTable或指定字段是否可修改

**返回值**: <code>boolean</code> - DataTable/指定字段是否可修改  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| [fieldName] | <code>string</code> | 需要进行判断的字段值 |

**Example**  
```js
datatable.isEnable() //获取datatable是否可修改
datatable.isEnable('field1') //获取字段field1是否可修改
```
<a name="DataTable.setEnable"></a>

### DataTable.setEnable(enable)
设置DataTable是否可修改


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| enable | <code>boolean</code> | true表示可修改，否则表示不可修改 |

**Example**  
```js
datatable.setEnable(true)
```
<a name="DataTable.getCurrentRow"></a>

### DataTable.getCurrentRow() ⇒ <code>null</code> &#124; <code>u.Row</code>
获取DataTable对象的当前行

**返回值**: <code>null</code> &#124; <code>u.Row</code> - DataTable对象的当前行  
**Example**  
```js
datatable.getCurrentRow()
```
<a name="DataTable.getCurrentIndex"></a>

### DataTable.getCurrentIndex() ⇒ <code>number</code>
获取DataTable对象的当前行对应的index

**返回值**: <code>number</code> - DataTable对象的当前行对应的index  
**Example**  
```js
datatable.getCurrentIndex()
```
<a name="DataTable.getData"></a>

### DataTable.getData() ⇒ <code>array</code>
获取DataTable的数据信息

**返回值**: <code>array</code> - 数据信息对应的数组，每项对应一条数据  
**Example**  
```js
datatable.getData()
```
<a name="DataTable.getDataByRule"></a>

### DataTable.getDataByRule(rule) ⇒ <code>array</code>
按照特定规则获取数据

**返回值**: <code>array</code> - 按照规则获取到的数据信息  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| rule | <code>string</code> | DataTable.SUBMIT.current('current') ：当前选中行 DataTable.SUBMIT.focus('focus') ：当前focus行 DataTable.SUBMIT.all('all') ：所有行 DataTable.SUBMIT.select('select') ：当前页选中行 DataTable.SUBMIT.change('change') ：发生改变的行 DataTable.SUBMIT.empty('empty') ：不获取数据，返回空数组 DataTable.SUBMIT.allSelect('allSelect') ：所有页选中行 DataTable.SUBMIT.allPages('allPages') ：所有页的数据 |

**Example**  
```js
datatable.getDataByRule(‘all’)
```
<a name="DataTable.getRow"></a>

### DataTable.getRow(index) ⇒ <code>object</code>
根据索引获取指定行数据信息

**返回值**: <code>object</code> - 获取到的指定行数据信息  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> | 需要获取的数据信息的索引 |

**Example**  
```js
datatable.getRow(1)
```
<a name="DataTable.getRowByRowId"></a>

### DataTable.getRowByRowId(rowid) ⇒ <code>Row</code>
根据rowid获取Row对象


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| rowid | <code>string</code> | 需要获取的Row对应的rowid |

**Example**  
```js
datatable.getRowByRowId('rowid')
```
<a name="DataTable.getRowIndex"></a>

### DataTable.getRowIndex(需要获取索引的row对象) ⇒ <code>\*</code>
获取Row对象对应的索引


| 参数 | 类型 |
| --- | --- |
| 需要获取索引的row对象 | <code>u.Row</code> |

**Example**  
```js
var row = datatable.getRow(1)
datatable.getRowIndex(row) // 1
```
<a name="DataTable.getRowsByField"></a>

### DataTable.getRowsByField(field, value) ⇒ <code>array</code>
根据字段及字段值获取所有数据行

**返回值**: <code>array</code> - 根据字段及字段值获取的所有数据行  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| field | <code>string</code> | 需要获取行的对应字段 |
| value | <code>string</code> | 需要获取行的对应字段值 |

**Example**  
```js
datatable.getRowsByField('field1','value1')
```
<a name="DataTable.getRowByField"></a>

### DataTable.getRowByField(field, value) ⇒ <code>u.Row</code>
根据字段及字段值获取第一条数据行

**返回值**: <code>u.Row</code> - 根据字段及字段值获取第一条数据行  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| field | <code>string</code> | 需要获取行的对应字段 |
| value | <code>string</code> | 需要获取行的对应字段值 |

**Example**  
```js
datatable.getRowByField('field1','value1')
```
<a name="DataTable.getAllRows"></a>

### DataTable.getAllRows() ⇒ <code>array</code>
获取当前页的所有数据行

**返回值**: <code>array</code> - 获取到的数据行  
**Example**  
```js
datatable.getAllRows()
```
<a name="DataTable.getAllPageRows"></a>

### DataTable.getAllPageRows() ⇒ <code>array</code>
获取所有页的所有数据行

**返回值**: <code>array</code> - 获取到的数据行  
**Example**  
```js
datatable.getAllPageRows()
```
<a name="DataTable.getChangedDatas"></a>

### DataTable.getChangedDatas(withEmptyRow) ⇒ <code>array</code>
获取发生变化的数据信息

**返回值**: <code>array</code> - 发生变化的数据信息  

| 参数 | 类型 | Default | 描述 |
| --- | --- | --- | --- |
| withEmptyRow | <code>boolean</code> | <code>false</code> | 未发生变化的数据是否使用空行代替，true表示以空行代替未发生变化行，false相反 |

**Example**  
```js
datatable.getChangedDatas()
```
<a name="DataTable.getChangedRows"></a>

### DataTable.getChangedRows() ⇒ <code>array</code>
获取发生改变的Row对象

**返回值**: <code>array</code> - 发生改变的Row对象  
**Example**  
```js
datatable.getChangedRows()
```
<a name="DataTable.getValue"></a>

### DataTable.getValue(fieldName, [row]) ⇒ <code>string</code>
根据字段获取对应Row对象的字段值

**返回值**: <code>string</code> - 获取到的字段值  

| 参数 | 类型 | Default | 描述 |
| --- | --- | --- | --- |
| fieldName | <code>string</code> |  | 需要获取的值对应的字段 |
| [row] | <code>u.Row</code> | <code>默认为当前行</code> | 对应的数据行 |

**Example**  
```js
datatable.getValue('field1')
var row = datatable.getRow(1)
datatable.getValue('field1',row)
```
<a name="DataTable.getIndexByRowId"></a>

### DataTable.getIndexByRowId(rowId)
根据行号获取行索引


| 参数 | 类型 |
| --- | --- |
| rowId | <code>String</code> |

**Example**  
```js
datatable.getIndexByRowId('rowid')
```
<a name="DataTable.getAllDatas"></a>

### DataTable.getAllDatas() ⇒ <code>array</code>
获取所有行数据信息

**返回值**: <code>array</code> - 所有行数据信息  
**Example**  
```js
datatable.getAllDatas()
```
<a name="DataTable.getRowIdsByIndices"></a>

### DataTable.getRowIdsByIndices(indices) ⇒ <code>array</code>
根据索引获取rowid

**返回值**: <code>array</code> - 获取到的rowid  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| indices | <code>array</code> | 需要获取rowid的索引值 |

**Example**  
```js
datatable.getRowIdsByIndices([1,2,5])
```
<a name="DataTable.getFocusRow"></a>

### DataTable.getFocusRow() ⇒ <code>u.Row</code>
获取焦点行

**返回值**: <code>u.Row</code> - 焦点行  
**Example**  
```js
datatable.getFocusRow()
```
<a name="DataTable.getFocusIndex"></a>

### DataTable.getFocusIndex() ⇒ <code>number</code>
获取焦点行索引

**返回值**: <code>number</code> - 焦点行索引  
**Example**  
```js
datatable.getFocusIndex()
```
<a name="DataTable.getMeta"></a>

### DataTable.getMeta([fieldName], [key]) ⇒ <code>object</code>
获取meta信息

**返回值**: <code>object</code> - meta信息  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| [fieldName] | <code>string</code> | 需要获取的字段 |
| [key] | <code>string</code> | 需要获取的字段指定meta信息 |

**Example**  
```js
datatable.getMeta() // 获取所有meta信息
datatable.getMeta('field1') // 获取field1所有meta信息
datatable.getMeta('field1','type') // 获取field1的key信息
```
<a name="DataTable.getRowMeta"></a>

### DataTable.getRowMeta([fieldName], [key]) ⇒ <code>object</code>
获取当前行的meta信息，如果不存在当前行则获取DataTable的meta信息

**返回值**: <code>object</code> - meta信息  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| [fieldName] | <code>string</code> | 需要获取的字段 |
| [key] | <code>string</code> | 需要获取的字段指定meta信息 |

**Example**  
```js
datatable.getRowMeta() // 获取当前行所有meta信息
datatable.getRowMeta('field1') // 获取当前行field1所有meta信息
datatable.getRowMeta('field1','type') // 获取当前行field1的key信息
```
<a name="DataTable.get参数"></a>

### DataTable.get参数(key) ⇒ <code>\*</code>
获取参数参数值

**返回值**: <code>\*</code> - 参数参数值  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | <code>string</code> | 参数对应的key |

**Example**  
```js
datatable.get参数('param1')
```
<a name="DataTable.getSelectedIndex"></a>

### DataTable.getSelectedIndex() ⇒ <code>number</code>
获取选中行索引，多选时，只返回第一个行索引

**返回值**: <code>number</code> - 选中行索引  
**Example**  
```js
datatable.getSelectedIndex()
```
<a name="DataTable.getSelectedIndices"></a>

### DataTable.getSelectedIndices() ⇒ <code>array</code>
获取选中的所有行索引数组

**返回值**: <code>array</code> - 所有行索引数组  
**Example**  
```js
datatable.getSelectedIndices()
```
<a name="DataTable.getSelectedDatas"></a>

### DataTable.getSelectedDatas([withEmptyRow]) ⇒ <code>array</code>
获取选中行的数据信息

**返回值**: <code>array</code> - 发生变化的数据信息  

| 参数 | 类型 | Default | 描述 |
| --- | --- | --- | --- |
| [withEmptyRow] | <code>boolean</code> | <code>false</code> | 未选中的数据是否使用空行代替，true表示以空行代替未选中行，false相反 |

**Example**  
```js
datatable.getSelectedDatas()
datatable.getSelectedDatas(true)
```
<a name="DataTable.getSelectedRows"></a>

### DataTable.getSelectedRows() ⇒ <code>array</code>
获取选中的Row对象

**返回值**: <code>array</code> - 选中的Row对象  
**Example**  
```js
datatable.getSelectedRows()
```
<a name="DataTable.getSimpleData"></a>

### DataTable.getSimpleData([options]) ⇒ <code>array</code>
获取数据信息，只获取字段名与字段值

**返回值**: <code>array</code> - 获取到的数据信息  

| 参数 | 类型 | Default | 描述 |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | [description] |
| [options.type] | <code>string</code> | <code>&quot;all&quot;</code> | 获取数据的规则 all：所有数据 current：当前行数据 focus：焦点行数据 select：选中行数据 change：发生改变的数据 |
| [options.fields] | <code>array</code> |  | 需要获取数据的字段名数组 |

**Example**  
```js
datatable.getSimpleData() // 获取所有数据信息
datatable.getSimpleData({type:'current'}) // 获取当前行数据信息
datatable.getSimpleData({type:'current','fields':['filed1','field3']}) // 获取当前行field1和filed3数据信息
```
<a name="DataTable.setMeta"></a>

### DataTable.setMeta(fieldName, key, value)
设置meta信息


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 需要设置meta信息的字段名 |
| key | <code>string</code> | meta信息的key |
| value | <code>string</code> | meta信息的值 |

**Example**  
```js
datatable.setMeta('filed1','type','string')
```
<a name="DataTable.updateMeta"></a>

### DataTable.updateMeta(meta)
更新meta信息


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| meta | <code>object</code> | 需要更新的meta信息 |

**Example**  
```js
var metaObj = {supplier: {meta: {precision:'3', default: '0239900x', display:'显示名称'}}}
datatable.updateMeta(metaObj)
```
<a name="DataTable.add参数"></a>

### DataTable.add参数(key, value)
增加参数参数


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | <code>string</code> | 需要增加的key值 |
| value | <code>\*</code> | 需要增加的具体指 |

**Example**  
```js
datatable.add参数('precision','3')
```
<a name="DataTable.add参数s"></a>

### DataTable.add参数s(params)
增加多个参数参数


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | 需要增加的参数对象 |

**Example**  
```js
var paramsObj = {
 'precision':'3',
 'default':'1.234'
}
datatable.add参数s(paramsObj)
```
<a name="DataTable.refSelectedRows"></a>

### DataTable.refSelectedRows(fieldName)
为选中行绑定监听，当选中行发生改变时触发对应方法


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 绑定的字段名 |

**Example**  
```js
datatable.refSelectedRows().subscribe(function(){})
```
<a name="DataTable.ref"></a>

### DataTable.ref(fieldName)
为某个字段绑定监听，当字段发生改变时触发对应方法


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 绑定的字段名 |

**Example**  
```js
datatable.ref('field1').subscribe(function(){})
```
<a name="DataTable.refMeta"></a>

### DataTable.refMeta(fieldName, key)
绑定字段属性，当字段属性发生改变时触发对应方法


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 绑定的字段名 |
| key | <code>string</code> | 绑定的属性key |

**Example**  
```js
datatable.refMeta('field1','type').subscribe(function(){})
```
<a name="DataTable.refRowMeta"></a>

### DataTable.refRowMeta(fieldName, key)
绑定当前行的字段属性，当字段属性发生改变时触发对应方法


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 绑定的字段名 |
| key | <code>string</code> | 绑定的属性key |

**Example**  
```js
datatable.refRowMeta('field1','type').subscribe(function(){})
```
<a name="DataTable.refEnable"></a>

### DataTable.refEnable(fieldName)
绑定字段是否可修改属性，当字段可修改属性发生改变时触发对应方法


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| fieldName | <code>string</code> | 绑定的字段名 |

**Example**  
```js
datatable.refEnable('field1').subscribe(function(){})
```
<a name="DataTable.removeRowByRowId"></a>

### DataTable.removeRowByRowId(rowId)
根据rowId删除指定行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| rowId | <code>string</code> | 需要删除行的rowId |

**Example**  
```js
datatable.removeRowByRowId('rowid1')
```
<a name="DataTable.removeRow"></a>

### DataTable.removeRow(index)
根据索引删除指定行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> | 需要删除行的索引 |

**Example**  
```js
datatable.removeRow(1)
```
<a name="DataTable.removeAllRows"></a>

### DataTable.removeAllRows()
删除所有行

**Example**  
```js
datatable.removeAllRows();
```
<a name="DataTable.removeRows"></a>

### DataTable.removeRows(indices)
根据索引数据删除多条数据行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| indices | <code>array</code> | 需要删除的数据行对应索引数组 |

**Example**  
```js
datatable.removeRows([1,2])
```
<a name="DataTable.clear"></a>

### DataTable.clear()
清空datatable的所有数据以及分页数据以及index

**Example**  
```js
datatable.clear()
```
<a name="DataTable.addRow"></a>

### DataTable.addRow(row)
在最后位置添加一条数据行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| row | <code>u.Row</code> | 数据行 |

**Example**  
```js
var row1 = new Row({parent: datatable})
row1.setData({
 field1: 'value1',
 field2: 'value2'
})
datatable.addRow(row1)
```
<a name="DataTable.addRows"></a>

### DataTable.addRows(rows)
在最后位置添加多条数据行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| rows | <code>array</code> | 数据行数组 |

**Example**  
```js
var row1 = new Row({parent: datatable})
row1.setData({
 field1: 'value1',
 field2: 'value2'
})
var row2 = new Row({parent: datatable})
row2.setData({
 field1: 'value11',
 field2: 'value22'
})
datatable.addRow([row1,row2])
```
<a name="DataTable.insertRow"></a>

### DataTable.insertRow(index, row)
在指定索引位置添加一条数据行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> | 指定索引 |
| row | <code>u.Row</code> | 数据行 |

**Example**  
```js
var row1 = new Row({parent: datatable})
row1.setData({
 field1: 'value1',
 field2: 'value2'
})
datatable.insertRow(1,row1)
```
<a name="DataTable.insertRows"></a>

### DataTable.insertRows(index, rows)
在指定索引位置添加多条数据行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> | 指定索引 |
| rows | <code>array</code> | 数据行数组 var row1 = new Row({parent: datatable}) row1.setData({  field1: 'value1',  field2: 'value2' }) var row2 = new Row({parent: datatable}) row2.setData({  field1: 'value11',  field2: 'value22' }) datatable.insertRows(1,[row1,row2]) |

<a name="DataTable.createEmptyRow"></a>

### DataTable.createEmptyRow() ⇒ <code>u.Row</code>
创建空行

**返回值**: <code>u.Row</code> - 空行对象  
**Example**  
```js
datatable.createEmptyRow();
```
<a name="DataTable.setAllRowsSelect"></a>

### DataTable.setAllRowsSelect()
设置所有行选中

**Example**  
```js
datatable.setAllRowsSelect()
```
<a name="DataTable.setRowSelect"></a>

### DataTable.setRowSelect(index)
根据索引设置选中行，清空之前已选中的所有行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> | 需要选中行的索引 |

**Example**  
```js
datatable.setRowSelect(1)
```
<a name="DataTable.setRowsSelect"></a>

### DataTable.setRowsSelect(indices)
根据索引数组设置选中行，清空之前已选中的所有行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| indices | <code>array</code> | 需要选中行的索引数组 |

**Example**  
```js
datatable.setRowsSelect([1,2])
```
<a name="DataTable.addRowSelect"></a>

### DataTable.addRowSelect(index)
根据索引添加选中行，不会清空之前已选中的行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> | 需要选中行的索引 |

**Example**  
```js
datatable.addRowSelect(1)
```
<a name="DataTable.addRowsSelect"></a>

### DataTable.addRowsSelect(indices)
根据索引数组添加选中行，不会清空之前已选中的行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| indices | <code>array</code> | 需要选中行的索引数组 |

**Example**  
```js
datatabel.addRowsSelect([1,2])
```
<a name="DataTable.setAllRowsUnSelect"></a>

### DataTable.setAllRowsUnSelect([options])
全部取消选中


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| [options] | <code>object</code> | 可选参数 |
| [options.quiet] | <code>boolean</code> | 如果为true则不触发事件，否则触发事件 |

**Example**  
```js
datatable.setAllRowsUnSelect() // 全部取消选中
datatable.setAllRowsUnSelect({quiet:true}) // 全部取消选中,不触发事件
```
<a name="DataTable.setRowUnSelect"></a>

### DataTable.setRowUnSelect(index)
根据索引取消选中


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> | 需要取消选中的行索引 |

**Example**  
```js
datatable.setRowUnSelect(1)
```
<a name="DataTable.setRowsUnSelect"></a>

### DataTable.setRowsUnSelect(indices)
根据索引数组取消选中


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| indices | <code>array</code> | 需要取消选中的行索引数组 |

**Example**  
```js
datatable.setRowsUnSelect([1,2])
```
<a name="DataTable.toggleAllSelect"></a>

### DataTable.toggleAllSelect()
当全部选中时取消选中，否则全部选中

<a name="DataTable.setRowFocus"></a>

### DataTable.setRowFocus(index, [quiet], [force])
设置焦点行


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| index | <code>number</code> &#124; <code>u.Row</code> | 行对象或者行index |
| [quiet] | <code>boolean</code> | 如果为true则不触发事件，否则触发事件 |
| [force] | <code>boolean</code> | 如果为true当index行与已focus的行相等时，仍然触发事件，否则不触发事件 |

**Example**  
```js
datatable.setRowFocus(1) // 设置第二行为焦点行
datatable.setRowFocus(1,true) // 设置第二行为焦点行，不触发事件
datatable.setRowFocus(1,false,true) // 设置第二行为焦点行，如果当前焦点行为第二行，仍旧触发事件
```
<a name="DataTable.setRowUnFocus"></a>

### DataTable.setRowUnFocus()
焦点行反选

**Example**  
```js
datatable.setRowUnFocus()
```
<a name="DataTable.setSimpleData"></a>

### DataTable.setSimpleData(data, [options])
设置数据, 只设置字段值


| 参数 | 类型 | Default | 描述 |
| --- | --- | --- | --- |
| data | <code>array</code> |  | 数据信息 |
| [options] | <code>boject</code> |  | 可配置参数 |
| [options.unSelect] | <code>boject</code> | <code>true</code> | 是否默认选中第一行，如果为true则不选中第一行，否则选中第一行 |

**Example**  
```js
var data = [{
  filed1:'value1',
  field2:'value2'
},{
  filed1:'value11',
  field2:'value21'
}]
datatable.setSimpleData(data)
datatable.setSimpleData(data,{unSelect:false})
```
<a name="DataTable.addSimpleData"></a>

### DataTable.addSimpleData(data, status)
追加数据, 只设置字段值


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| data | <code>array</code> | 数据信息 |
| status | <code>string</code> | 追加数据信息的状态，参照Row对象的状态介绍 |

**Example**  
```js
var data = [{
  filed1:'value1',
  field2:'value2'
},{
  filed1:'value11',
  field2:'value21'
}]
datatable.addSimpleData(data,Row.STATUS.NEW)
```
<a name="DataTable.on"></a>

### DataTable.on(name, [callback], [one]) ⇒ <code>[DataTable](#DataTable)</code>
为DataTable对象添加监听

**返回值**: <code>[DataTable](#DataTable)</code> - 当前的DataTable对象  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | <code>string</code> &#124; <code>array</code> &#124; <code>object</code> | 针对不同用法分别对应监听名称、监听名称对应的数组、监听名称及对应的回调组成的对象 |
| [callback] | <code>function</code> | 监听对应的回调函数 |
| [one] | <code>boolean</code> | 是否只执行一次监听，为true则表示只执行一次回调函数，否则每次触发监听都是执行回调函数 |

**Example**  
```js
datatable.on(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
datatable.on([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
datatable.on({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
```
<a name="DataTable.off"></a>

### DataTable.off(name, [callback]) ⇒ <code>[DataTable](#DataTable)</code>
为DataTable对象取消监听

**返回值**: <code>[DataTable](#DataTable)</code> - 当前的DataTable对象  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | <code>string</code> &#124; <code>array</code> &#124; <code>object</code> | 针对不同用法分别对应监听名称、监听名称对应的数组、监听名称及对应的回调组成的对象 |
| [callback] | <code>function</code> | 监听对应的回调函数 |

**Example**  
```js
datatable.off(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
datatable.off([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
datatable.off({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
```
<a name="DataTable.one"></a>

### DataTable.one(name, [callback])
为DataTable对象添加只执行一次的监听


| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | <code>string</code> &#124; <code>array</code> &#124; <code>object</code> | 针对不同用法分别对应监听名称、监听名称对应的数组、监听名称及对应的回调组成的对象 |
| [callback] | <code>function</code> | 监听对应的回调函数 |

**Example**  
```js
datatable.one(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
datatable.one([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
datatable.one({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
```
<a name="DataTable.trigger"></a>

### DataTable.trigger(name) ⇒ <code>[DataTable](#DataTable)</code>
触发DataTable对象绑定的事件监听

**返回值**: <code>[DataTable](#DataTable)</code> - 当前的DataTable对象  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | <code>string</code> | 需要触发的事件监听对应的名称 |

**Example**  
```js
datatable.trigger('valuechange')
```
